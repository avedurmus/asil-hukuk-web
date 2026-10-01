# Sohbet Asistanı (Asil Asistan)

Sitenin her sayfasında sağ altta görünen yapay zekâ destekli karşılama asistanı.
Müvekkil adayını karşılar, sorununu anlayıp ilgili çalışma alanına yönlendirir,
sitedeki bilgilere dayanarak genel bilgi verir ve Av. Emre Durmuş'un
programına göre ön görüşme randevusu oluşturur.

## Nasıl çalışır?

| Parça | Dosya |
|---|---|
| Sohbet penceresi (arayüz) | `components/ChatWidget.tsx` |
| Sunucu uç noktası (Claude API, araç döngüsü) | `app/api/chat/route.ts` |
| Asistanın talimatı ve bilgi tabanı | `lib/chatbot/systemPrompt.ts` |
| Çalışma programı, tatiller, görüşme süresi | `data/appointmentSettings.ts` |
| Boş saat hesabı | `lib/booking/slots.ts` |
| Randevu kaydı ve bildirim | `lib/booking/index.ts` |
| Takvim bağlantısı seçimi | `lib/booking/calendar.ts` |
| Google Takvim – Apps Script köprüsü (önerilen) | `lib/booking/appsScriptCalendar.ts`, `docs/google-apps-script/Code.gs` |
| Google Takvim – hizmet hesabı (alternatif) | `lib/booking/googleCalendar.ts` |

- **Bilgi tabanı** sitenin kendi içeriğinden üretilir: `data/services.ts`
  (çalışma alanları ve rehber notları) ile `data/faq.ts` (SSS). Bu dosyalar
  güncellendiğinde asistan da otomatik olarak güncel bilgiyle konuşur.
- **Randevu saatleri** `data/appointmentSettings.ts` içindeki haftalık
  programdan hesaplanır; resmî tatiller, arife günleri ve `blockedDates`
  (izin günleri) elenir. Asistan saatleri asla kendisi uydurmaz, her seferinde
  bu hesaplamayı çağırır.
- **Randevu oluşturma** yalnızca kullanıcı bilgileri ve KVKK onayını sohbette
  açıkça onayladıktan sonra yapılır. Talep, iletişim formunun kullandığı
  Formspree adresine e-posta olarak gönderilir; kullanıcıya referans kodu,
  takvime ekleme (.ics) ve WhatsApp düğmesi gösterilir.

## İki çalışma modu

1. **Talep modu (varsayılan):** Google Takvim bağlı değilken asistan çalışma
   programındaki saatleri önerir ve seçilen saati *randevu talebi* olarak
   e-postayla iletir. Kullanıcıya büronun arayıp teyit edeceği söylenir. Aynı
   saate iki talep gelmesi mümkün olduğundan teyit araması önemlidir.
2. **Takvim modu:** Google Takvim ortam değişkenleri tanımlanırsa avukatın
   takvimindeki dolu saatler önerilmez ve onaylanan randevu takvime doğrudan
   etkinlik olarak yazılır. Kullanıcıya randevunun oluşturulduğu söylenir.

## Kurulum (Vercel)

Vercel → Proje → Settings → Environment Variables bölümüne ekleyin
(örnek: `.env.example`):

- `ANTHROPIC_API_KEY` — **zorunlu.** Anahtar yoksa pencere açılır ama
  kullanıcıya telefon/WhatsApp seçenekleri gösterilir.
- `CHATBOT_MODEL` — isteğe bağlı, varsayılan `claude-opus-5-5`.
- `CHATBOT_EFFORT` — isteğe bağlı (`low`, `medium`, `high`), varsayılan `low`
  (hızlı yanıt). Yanıt kalitesi yetersiz kalırsa `medium` deneyin.
- `FORMSPREE_FORM_ID` — isteğe bağlı, varsayılan sitedeki iletişim formu.

### Google Takvim'i bağlamak (Apps Script, önerilen)

Google Cloud projesi ve takvim paylaşımı gerektirmez; kod avukatın kendi
Google hesabında çalışır. Doluluğa bakılacak takvimler ve randevunun yazılacağı
takvim `docs/google-apps-script/Code.gs` içinde tanımlıdır (Asil Hukuk Takvimi
ve Emre's iPhone).

1. av.edurmus@gmail.com ile https://script.google.com adresine girin,
   **Yeni proje** oluşturun ve adını "Asil Asistan Takvim" yapın.
2. `Code.gs` içeriğini silip `docs/google-apps-script/Code.gs` dosyasını
   yapıştırın. `__APPS_SCRIPT_SECRET__` yerine Vercel'deki
   `APPS_SCRIPT_SECRET` değerini yazın (doldurulmuş kodu depoya eklemeyin).
3. Üstteki işlev listesinden `test`'i seçip **Çalıştır**'a basın; Google'ın
   istediği izinleri onaylayın (*Gelişmiş → Güvenli olmayan sayfaya git* çıkarsa
   kendi kodunuz olduğu için devam edebilirsiniz). Yürütme günlüğünde dolu
   saatler listelenmelidir.
4. **Dağıt → Yeni dağıtım** → tür: **Web uygulaması**; *Şu kullanıcı olarak
   yürüt*: **Ben**, *Erişimi olanlar*: **Herkes** → **Dağıt**.
5. Verilen **Web uygulaması URL**'sini (`https://script.google.com/macros/s/…/exec`)
   Vercel'de `APPS_SCRIPT_URL` olarak tanımlayın ve yeniden yayınlayın.

Kodda değişiklik yaparsanız **Dağıt → Dağıtımları yönet → düzenle → Sürüm:
Yeni sürüm** ile aynı URL'yi güncelleyin.

Takvimdeki her dolu etkinlik (duruşma, toplantı vb.) ilgili saati otomatik
olarak kapatır. Dikkat edilecekler:

- **Tüm gün** etkinlikler (doğum günü, hatırlatma vb.) ve reddettiğiniz
  davetler dolu sayılmaz. İzin veya adliye günü gibi bütün günü kapatmak için
  saatli bir etkinlik (ör. 09:00–18:00) oluşturun ya da tarihi `blockedDates`
  listesine ekleyin.
- Takvimlerden biri okunamazsa asistan çift randevu riskine girmemek için saat
  önermez ve kullanıcıyı telefona yönlendirir; ayrıntı Vercel kayıtlarında
  görünür.
- Randevu yazılmadan hemen önce saat takvimde yeniden kontrol edilir; aynı anda
  gelen iki talepten yalnızca biri kaydedilir.

### Alternatif: Google hizmet hesabı

Apps Script yerine bir Google Cloud hizmet hesabı da kullanılabilir (Apps
Script tanımlıysa o önceliklidir).

1. [Google Cloud Console](https://console.cloud.google.com/)'da bir proje açın,
   **Google Calendar API**'yi etkinleştirin.
2. *IAM & Admin → Service Accounts* altında bir hizmet hesabı oluşturun ve
   JSON anahtarı indirin.
3. Google Takvim'de randevuların yazılacağı takvimin *Ayarlar ve paylaşım*
   bölümünden, hizmet hesabının e-postasını **"Etkinliklerde değişiklik
   yapma"** yetkisiyle ekleyin.
4. Vercel'e şunları ekleyin:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — JSON'daki `client_email`
   - `GOOGLE_PRIVATE_KEY` — JSON'daki `private_key` (tırnak içinde, `\n`'ler korunarak)
   - `GOOGLE_CALENDAR_ID` — randevuların yazılacağı takvim (Asil Hukuk Takvimi: `av.edurmus@gmail.com`)
   - `GOOGLE_BUSY_CALENDAR_IDS` — isteğe bağlı; doluluğu ayrıca dikkate
     alınacak diğer takvimlerin kimlikleri, virgülle ayrılmış. Bu takvimleri de
     hizmet hesabıyla en az "Yalnızca boş/meşgul bilgisini görme" yetkisiyle
     paylaşın.
5. Vercel'de yeniden yayınlayın (Deployments → ⋯ → Redeploy).

Takvimdeki her dolu etkinlik (duruşma, toplantı vb.) ilgili saati otomatik
olarak kapatır; ayrıca bir şey yapmanız gerekmez. İki noktaya dikkat:

- **Tüm gün** etkinlikler (doğum günü, hatırlatma vb.) ve reddettiğiniz
  davetler dolu sayılmaz. İzin veya adliye günü gibi bütün günü kapatmak için
  saatli bir etkinlik (ör. 09:00–18:00) oluşturun ya da tarihi `blockedDates`
  listesine ekleyin.
- Takvimlerden biri okunamazsa asistan çift randevu riskine girmemek için saat
  önermez ve kullanıcıyı telefona yönlendirir; Vercel kayıtlarında
  `Takvim doluluk bilgisi okunamadı` hatası görünür.

## Programı değiştirmek

`data/appointmentSettings.ts`:

- `weeklySchedule` — her gün için randevu başlangıç saatleri.
- `durationMinutes` — ön görüşme süresi.
- `minNoticeHours` / `horizonDays` — en erken ve en geç randevu sınırları.
- `holidays` / `halfDays` — resmî tatiller ve arife günleri (dinî bayramları
  her yıl Diyanet takvimine göre güncelleyin).
- `blockedDates` — izin, seyahat gibi kapalı günler.

## Gizlilik ve meslek kuralları

- Pencerenin üstünde asistanın yapay zekâ olduğu, hukuki danışmanlık yerine
  geçmediği ve hassas bilgi paylaşılmaması gerektiği belirtilir.
- Asistan; sonuç garantisi vermez, ücret rakamı söylemez, reklam niteliğinde
  ifade kullanmaz, somut olaya özel strateji önermez ve acil durumlarda (gözaltı,
  şiddet vb.) telefon veya 112'ye yönlendirir. Kurallar
  `lib/chatbot/systemPrompt.ts` içindedir.
- Sohbet geçmişi sunucuda saklanmaz; yalnızca ziyaretçinin tarayıcı sekmesinde
  (sessionStorage) tutulur. Randevu bilgileri yalnızca e-posta bildirimi ve
  (bağlıysa) Google Takvim etkinliği olarak iletilir.
- Sohbet mesajları yanıt üretmek için Anthropic'e (Claude API) gönderilir;
  KVKK aydınlatma metninizde yurt dışı hizmet sağlayıcısı olarak belirtilmesi
  önerilir.

## Maliyet ve kötüye kullanım

- Sabit talimat ve bilgi tabanı önbelleğe alınır (prompt caching), böylece
  aynı içerik her mesajda tam ücretle yeniden işlenmez.
- Her IP için 10 dakikada 40 mesaj ve günde 3 randevu sınırı vardır; mesaj
  başına 2.000 karakter, sohbet başına son 40 mesaj işlenir. Yoğun kötüye
  kullanımda Vercel Firewall ile `/api/chat` için ek hız sınırı tanımlanabilir.
