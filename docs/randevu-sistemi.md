# Randevu Sistemi

Sitenin randevu sistemi üç kanaldan aynı çekirdeği kullanır:

- **Takvimli randevu sayfası** – `/randevu`: ziyaretçi gün ve saat seçer, bilgilerini
  yazar, randevusunu kendisi oluşturur.
- **Asil Asistan (sitedeki sohbet)** – saatleri tıklanabilir düğmelerle sunar,
  randevu oluşturur, mevcut randevuyu sorgular, erteler, iptal eder.
- **WhatsApp asistanı** – aynı araçlar; kullanıcının numarası doğrulanmış olduğu
  için randevusunu referans kodu söylemeden de sorgulayabilir.

Her randevunun bir **referans kodu** (`AH-XXXXXX`) vardır. Müvekkil adayı bu kod
ve telefon numarasıyla `/randevu/sorgula` sayfasından (veya asistana yazarak)
randevusunu görebilir, erteleyebilir, iptal edebilir.

## Parçalar

| Parça | Dosya |
|---|---|
| Çalışma programı, tatiller, süre, sınırlar | `data/appointmentSettings.ts` |
| Çekirdek: uygunluk, oluşturma, sorgulama, erteleme, iptal, bildirim | `lib/booking/index.ts` |
| Boş saat hesabı | `lib/booking/slots.ts` |
| Randevu kayıt deposu (Upstash Redis) | `lib/booking/store.ts`, `lib/redis.ts` |
| Google bağlantısı (hataya dayanıklı sarmalayıcı) | `lib/booking/calendar.ts` |
| Google Takvim + Gmail köprüsü | `lib/booking/appsScriptCalendar.ts`, `docs/google-apps-script/Code.gs` |
| Google hizmet hesabı (alternatif, yalnızca takvim) | `lib/booking/googleCalendar.ts` |
| Uç noktalar | `app/api/randevu/**` |
| Randevu sayfası ve bileşenleri | `app/randevu/page.tsx`, `components/booking/*` |
| Randevu sorgulama / erteleme / iptal | `app/randevu/sorgula/page.tsx` |
| Büro yönetim paneli | `app/randevu/yonetim/page.tsx`, `lib/booking/admin.ts` |
| Asistan araçları | `lib/chatbot/agent.ts`, `lib/chatbot/systemPrompt.ts` |

## Nasıl çalışır?

1. **Boş saatler** = çalışma programı − resmî tatiller − büronun kapattığı günler
   − Google Takvim'deki dolu saatler − sistemdeki etkin randevular.
2. **Saat kilidi:** Randevu oluşturulurken saat Redis'te atomik olarak kilitlenir;
   aynı saate iki randevu verilemez (takvim bağlı olmasa bile).
3. **Takvim:** Google bağlantısı çalışıyorsa randevu Google Takvim'e yazılır ve
   durum **onaylı** olur. Çalışmıyorsa randevu **talep** olarak kaydedilir; saat
   yine müvekkil adayı için ayrılır ve büro teyit eder.
4. **Bildirim:** Büroya önce **Gmail** ile (Google köprüsü üzerinden, avukatın
   kendi hesabından) bildirim gider. Köprüye ulaşılamazsa bildirim kaybolmasın
   diye Formspree e-postası yedek yoldur.
5. **Değişiklik:** Erteleme ve iptalde takvim etkinliği güncellenir, saat kilidi
   bırakılır, büroya bildirim gider. Randevuya `changeCutoffHours` (2) saatten az
   kaldıysa değişiklik çevrimiçi yapılamaz; telefon gerekir.

### Hiçbir dış bağlantı sistemi tek başına durduramaz

| Sorun | Sistem ne yapar? |
|---|---|
| Google köprüsüne ulaşılamıyor (ör. HTTP 404) | Saatler programdan sunulur, randevu talep olarak alınır, bildirim Formspree ile gider ve e-postada uyarı yer alır. |
| Köprünün eski sürümü yayında (Gmail / silme desteği yok) | Takvim çalışır; bildirim Formspree ile gider. |
| Redis'e ulaşılamıyor | Randevu yine alınır (takvim + e-posta); yalnızca çevrimiçi sorgulama / erteleme / iptal kullanılamaz. |
| Ne takvim ne e-posta çalışıyor | Randevu alınmaz; kullanıcı telefona yönlendirilir (büronun haberi olmayan randevu oluşmaz). |

Sorunlar Vercel kayıtlarında `[randevu]` önekiyle görünür; Google bağlantısının
güncel durumu büro panelinin üstünde de gösterilir.

## Google Takvim ve Gmail bağlantısı (Apps Script)

Google Cloud projesi gerekmez; kod avukatın kendi Google hesabında çalışır.

1. av.edurmus@gmail.com ile <https://script.google.com> adresine girin. Mevcut
   "Asil Asistan Takvim" projesini açın ya da **Yeni proje** oluşturun.
2. `Code.gs` içeriğini silip `docs/google-apps-script/Code.gs` dosyasının
   tamamını yapıştırın. `__APPS_SCRIPT_SECRET__` yerine Vercel'deki
   `APPS_SCRIPT_SECRET` değerini yazın (doldurulmuş kodu depoya eklemeyin).
   Değeri hatırlamıyorsanız yeni, uzun ve rastgele bir değer belirleyip hem
   koda hem Vercel'e yazın.
3. Üstteki işlev listesinden **`test`**'i seçip **Çalıştır**'a basın ve Google'ın
   istediği izinleri onaylayın (Takvim ve **e-posta gönderme**). Yürütme
   günlüğünde dolu saatler listelenmeli, Gmail'inize bir deneme e-postası gelmelidir.
4. **Dağıt → Yeni dağıtım** → tür: **Web uygulaması**; *Şu kullanıcı olarak
   yürüt*: **Ben**, *Erişimi olanlar*: **Herkes** → **Dağıt**.
5. Verilen **Web uygulaması URL**'sini (`https://script.google.com/macros/s/…/exec`)
   tarayıcıda açın: `{"ok":true,"service":"asil-hukuk-randevu","version":2}`
   görmelisiniz.
6. Bu adresi Vercel → Settings → Environment Variables altında `APPS_SCRIPT_URL`
   olarak kaydedin ve yeniden yayınlayın (Deployments → ⋯ → Redeploy).

Kodda sonradan değişiklik yaparsanız **Dağıt → Dağıtımları yönet → düzenle →
Sürüm: Yeni sürüm** ile aynı URL'yi güncelleyin; "Yeni dağıtım" yeni bir URL
üretir ve eskisi `APPS_SCRIPT_URL` içinde kalırsa bağlantı kopar.

### Takvim bağlantısını onarmak

Vercel kayıtlarında veya büro panelinde şu hatalardan biri görünüyorsa:

- **`HTTP 404`** – Dağıtım silinmiş / arşivlenmiş ya da `APPS_SCRIPT_URL` hatalı.
  4.–6. adımları yeniden yapın.
- **`JSON yerine sayfa döndürdü`** – Dağıtımda *Erişimi olanlar* "Herkes" değil.
- **`gizli anahtarı uyuşmuyor`** – `Code.gs` içindeki `SECRET` ile Vercel'deki
  `APPS_SCRIPT_SECRET` farklı.
- **`Takvim okunamadı: …`** – `BUSY_CALENDAR_IDS` içindeki takvim hesapta yok.

Dikkat edilecekler:

- **Tüm gün** etkinlikler ve reddettiğiniz davetler dolu sayılmaz. Bütün günü
  kapatmak için büro panelindeki "Kapalı günler"i kullanın.
- Randevu etkinliğini doğrudan Google Takvim'den silerseniz sistemdeki kayıt ve
  saat kilidi kalır. Randevuları büro panelinden iptal edin; etkinlik de silinir.

## Büro yönetim paneli

`/randevu/yonetim` – yaklaşan randevular, teyit bekleyen talepleri **onaylama**,
randevu **iptali**, **gün kapatma** ve Google bağlantısının durumu.

- Giriş için büroya gelen her randevu bildirim e-postasındaki **"Yönetim paneli"**
  bağlantısını açın. Bağlantı açıldığında tarayıcıya 30 günlük bir oturum çerezi
  yazılır; sonraki girişlerde `/randevu/yonetim` adresi doğrudan açılır.
- Erişim anahtarı Redis erişim anahtarından türetilir; isterseniz `BOOKING_ADMIN_KEY`
  ile kendiniz belirleyebilirsiniz. Bağlantıyı kimseyle paylaşmayın.
- Büro bir randevuyu iptal ettiğinde müvekkil adayına otomatik bildirim gitmez;
  karttaki telefon / WhatsApp düğmeleriyle kendiniz haber verin.

## Programı değiştirmek

`data/appointmentSettings.ts`: `weeklySchedule`, `durationMinutes`,
`minNoticeHours`, `horizonDays`, `holidays`, `halfDays`, `blockedDates`,
`changeCutoffHours`, `maxActivePerPhone`, `retentionDays`.

## Gizlilik

Randevu kayıtları (ad soyad, telefon, e-posta, konu, özet, saat) Upstash Redis'te
randevu tarihinden sonra `retentionDays` (90) gün saklanır ve kendiliğinden
silinir; KVKK aydınlatma metni (`/kvkk`) buna göre güncellenmiştir. Süreyi
değiştirirseniz metni de güncelleyin.

## Kötüye kullanım koruması

- IP başına: saatte 6 randevu denemesi, 10 dakikada 12 sorgulama.
- Telefon başına en fazla 2 ileri tarihli randevu.
- Sorgulamada kod doğru, telefon yanlışsa da "bulunamadı" yanıtı verilir.
- Asistan üzerinden sohbet başına 1, günde 3 randevu; saatte 6 hatalı sorgu.
