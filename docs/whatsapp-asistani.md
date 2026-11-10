# WhatsApp Asistanı

Sitedeki **Asil Asistan**'ın WhatsApp'ta çalışan hâli. Büroya yazan müvekkil
adaylarını karşılar, konuyu ilgili çalışma alanına yönlendirir, kısa genel
bilgi verir, ön görüşme randevusu oluşturur ve gerektiğinde konuyu
Av. Emre Durmuş'a e-postayla iletir.

Bot, **büronun sabit hattında** çalışır ve Meta'nın WhatsApp Cloud API'sine
**doğrudan**, aracı firma olmadan bağlanır. Avukatın kişisel numarası
(0530 432 20 25) bundan hiç etkilenmez.

## Nasıl çalışır?

| Parça | Dosya |
|---|---|
| Webhook (Meta → site) | `app/api/whatsapp/route.ts` |
| Kurulum yardımcıları (durum, kayıt, abonelik) | `app/api/whatsapp/setup/route.ts` |
| Kime yanıt verileceği, devir, sohbet akışı | `lib/whatsapp/bot.ts` |
| WhatsApp API istemcisi | `lib/whatsapp/api.ts` |
| Sohbet geçmişi ve durum (Upstash Redis) | `lib/whatsapp/store.ts` |
| Ortak asistan çekirdeği (site + WhatsApp) | `lib/chatbot/agent.ts` |
| Talimatlar ve bilgi tabanı (`whatsapp` kanalı) | `lib/chatbot/systemPrompt.ts` |
| KVKK aydınlatma metni / gizlilik politikası | `app/kvkk/page.tsx` |

Bilgi tabanı, randevu programı ve meslek kuralları sitedeki asistanla
**aynıdır**. `data/services.ts`, `data/faq.ts` veya
`data/appointmentSettings.ts` güncellendiğinde WhatsApp asistanı da
güncellenir.

### Sohbet akışı

1. **İlk mesaj:** Kullanıcıya önce otomatik bir tanıtım gider. Tanıtımda
   asistanın yapay zekâ olduğu, hukuki danışmanlık vermediği, avukatla görüşmek
   için *avukat* yazılabileceği, hassas bilgi paylaşılmaması gerektiği ve KVKK
   sayfasının bağlantısı yer alır. Ardından asistanın yanıtı gelir.
2. **Art arda gelen mesajlar:** Birkaç saniye içinde gönderilen mesajlar tek
   yanıtta toplanır.
3. **Randevu:** Sitedekiyle aynı kurallarla alınır: KVKK onayı, boş saat
   kontrolü, e-posta bildirimi ve Google Takvim. Telefon numarası WhatsApp'tan
   bilindiği için ayrıca sorulmaz. Bildirim e-postasında kaynak olarak
   "WhatsApp asistanı" yazar.
4. **Avukata devir:** Şu durumlarda size **e-posta** gider (Formspree,
   iletişim formuyla aynı adres); e-postada özet ve `wa.me` bağlantısı bulunur:
   - kullanıcı *avukat* yazarsa veya bir insanla görüşmek isterse,
   - mevcut bir müvekkil kendi dosyası hakkında yazarsa,
   - acil bir durum varsa,
   - asistan yardımcı olamazsa.

   Kullanıcıya, mesai saatlerinde **0530 432 20 25'ten** dönüş yapılacağı
   söylenir. Bot sohbette yardımcı olmayı sürdürür. Aynı kişi için 72 saat
   içinde ikinci bir e-posta gönderilmez.
5. **Ses, fotoğraf, belge:** Asistan bunları okuyamaz. Kullanıcıya bir kez
   bilgi verir.

Sabit hattaki WhatsApp'a gelen mesajları başka bir yerden göremezsiniz. Size
yalnızca devir ve randevu e-postaları ulaşır.

## Kurulum

### 0. Ön koşullar

- **Sabit hat WhatsApp'ta kayıtlı olmamalı.** Daha önce WhatsApp Business
  uygulamasında kullanıldıysa önce o uygulamada *Ayarlar → Hesap → Hesabımı
  sil* ile kaldırın.
- **Upstash Redis Vercel'e bağlı olmalı.** Bu adım tamamlandı
  (`KV_REST_API_URL` / `KV_REST_API_TOKEN` tanımlı).
- **360dialog kullanılmayacak.** Aboneliği iptal edin. Kişisel numaranızın
  360dialog bağlantısı da kaldırılmalı.

### 1. Meta uygulamasına WhatsApp'ı ekleme

1. https://developers.facebook.com/apps/1503483311684677 adresini açın.
2. **Add product → WhatsApp → Set up** yolunu izleyin. Kullanım durumu
   soruluyorsa *Connect with customers through WhatsApp* seçin. İşletme
   portföyü olarak Asil Hukuk'u seçin (510298799379793).
3. Sol menüde **WhatsApp → API Setup** sayfası açılır. Buradaki test
   numarasıyla uğraşmanıza gerek yok.

### 2. Sabit hattı ekleme

1. **API Setup → Add phone number** düğmesine basın.
2. Görünen ad *Asil Hukuk Bürosu*, kategori *Professional Services /
   Hukuk*, saat dilimi İstanbul.
3. Numara olarak büro sabit hattını girin (ülke: Türkiye). Doğrulama yöntemi
   **Phone call (sesli arama)** olsun. Sabit hat çalınır, söylenen 6 haneli
   kodu girin.
4. Numara listede görünür. Yanındaki **Phone number ID** değerini not edin.
   **WhatsApp Business Account ID** değerini de not edin.
5. Görünen ad Meta incelemesine gider; onay genellikle kısa sürer. Onaydan
   önce de mesajlaşma çoğu zaman çalışır.

### 3. Kalıcı erişim anahtarı (System User)

API Setup sayfasındaki geçici anahtar 24 saatte biter. Kalıcı anahtar için:

1. https://business.facebook.com/settings → **Kullanıcılar → Sistem
   kullanıcıları → Ekle** yolunu izleyin. Ad *asil-whatsapp*, rol *Admin*.
2. **Varlık ata** adımında:
   - **Uygulamalar** altında uygulamanızı seçin, *Tam kontrol* verin.
   - **WhatsApp hesapları** altında hesabınızı seçin, *Tam kontrol* verin.
3. **Yeni anahtar oluştur** adımında:
   - uygulamayı seçin,
   - süre olarak **Hiçbir zaman (Never)** seçin,
   - izinler: `whatsapp_business_messaging` ve `whatsapp_business_management`.
4. Anahtarı kopyalayın. Bir daha gösterilmez; sohbete yazmayın.

### 4. Vercel ortam değişkenleri

Vercel → Proje → **Settings → Environment Variables** (ortam: Production):

| Değişken | Değer |
|---|---|
| `WHATSAPP_ACCESS_TOKEN` | 3. adımdaki kalıcı anahtar |
| `WHATSAPP_PHONE_NUMBER_ID` | 2. adımdaki Phone number ID |
| `WHATSAPP_WABA_ID` | 2. adımdaki WhatsApp Business Account ID |
| `WHATSAPP_APP_SECRET` | developers.facebook.com → Uygulama → **App settings → Basic → App secret** |
| `WHATSAPP_VERIFY_TOKEN` | Kendi belirlediğiniz uzun, rastgele bir metin (30+ karakter, harf ve rakam) |
| `WHATSAPP_ALLOWED_NUMBERS` | İlk test için yalnızca sizin cep numaranız (ör. `0530 432 20 25`) |

`WHATSAPP_BOT_ENABLED`'i henüz eklemeyin. Tanımlanmadıkça bot hiç yanıt
vermez.

Ekledikten sonra **Deployments → ⋯ → Redeploy** ile yeniden yayınlayın.

### 5. Webhook

1. developers.facebook.com → Uygulama → **WhatsApp → Configuration** sayfasını
   açın.
2. **Callback URL** olarak `https://asilhukuk.net/api/whatsapp` girin.
   **Verify token** olarak `WHATSAPP_VERIFY_TOKEN` değerini girin. **Verify
   and save** düğmesine basın.
3. **Webhook fields** altında **messages** alanına abone olun (*Subscribe*).

### 6. Numarayı kaydetme ve uygulamayı abone etme (tarayıcıdan)

Aşağıdaki adresleri sırayla tarayıcıda açın. `<KEY>` yerine
`WHATSAPP_VERIFY_TOKEN` değerini yazın.

1. **Kayıt:** `123456` yerine kendi belirlediğiniz 6 haneli bir PIN yazın ve
   PIN'i not edin; bu, numaranın iki adımlı doğrulama kodu olur.
   ```
   https://asilhukuk.net/api/whatsapp/setup?key=<KEY>&action=register&pin=123456
   ```
2. **Abonelik:**
   ```
   https://asilhukuk.net/api/whatsapp/setup?key=<KEY>&action=subscribe
   ```
3. **Durum kontrolü:**
   ```
   https://asilhukuk.net/api/whatsapp/setup?key=<KEY>&action=status
   ```
   Durum ekranında `"platform_type": "CLOUD_API"` ve `"status": "CONNECTED"`
   görünmelidir.

Her adımda `"ok": true` görmelisiniz. Hata çıkarsa ekrandaki metni olduğu gibi
iletin.

### 7. Uygulamayı canlıya alma (Live)

Geliştirme modundaki uygulamalara gerçek mesajların webhook'u gelmez.

1. developers.facebook.com → Uygulama → **App settings → Basic** sayfasını
   açın:
   - **Privacy policy URL:** `https://asilhukuk.net/kvkk`
   - **Category:** *Business and pages*
   - **App icon:** büro logosu (1024×1024)

   **Save** ile kaydedin.
2. Üst kısımdaki **App mode** anahtarını **Live** yapın (bazı panellerde
   **Publish**).

### 8. Test ve yayına alma

1. Vercel'de `WHATSAPP_BOT_ENABLED` = `true` ekleyip yeniden yayınlayın.
2. Cep telefonunuzdan sabit hatta WhatsApp'tan yazın ve şunları deneyin:
   - selamlaşma,
   - bir hukuki soru,
   - randevu,
   - *avukat* yazmak,
   - sesli mesaj.
3. Her şey doğruysa `WHATSAPP_ALLOWED_NUMBERS`'ı silin. Artık herkese yanıt
   verilir.
4. İsterseniz sitedeki WhatsApp düğmelerini bota yönlendirin: Vercel'de
   `NEXT_PUBLIC_WHATSAPP_NUMBER` = sabit hat (ör. `0216 XXX XX XX`)
   tanımlayıp yeniden yayınlayın. Tanımlanmazsa düğmeler 0530'a gitmeye devam
   eder.
5. Sabit hattı kartvizit, Google İşletme Profili gibi yerlerde "WhatsApp" olarak
   duyurabilirsiniz.

## Maliyet

- **Meta:** Kullanıcı yazdıktan sonraki 24 saat içinde verilen yanıtlar
  **ücretsizdir**. Bot kendiliğinden mesaj başlatmaz, şablon mesaj
  göndermez. Meta kurulumda ödeme yöntemi isteyebilir; bu kullanımda ücret
  doğmaz.
- **Claude API:** Sitedeki asistanla aynı hesap kullanılır; konuşma başına
  kuruşlar düzeyindedir.
- **Upstash Redis:** Ücretsiz plan yeterlidir.

## İsteğe bağlı ayarlar

- `WHATSAPP_PERSONAL_NUMBERS`: botun asla yanıt vermeyeceği numaralar
  (virgülle ayrılmış).
- `WHATSAPP_HUMAN_HOURS`: aynı kişi için tekrar devir e-postası gönderilmeyecek
  süre (saat, varsayılan 72).
- `WHATSAPP_MARK_READ=true`: mesajları okundu olarak işaretler ve "yazıyor…"
  gösterir.
- `WHATSAPP_GRAPH_VERSION`: Graph API sürümü (varsayılan `v23.0`).

### Birlikte kullanım (aynı numarada telefon + bot)

Kod, numaranın aynı zamanda telefondaki WhatsApp Business uygulamasında
kullanıldığı **birlikte kullanım** modunu da destekler
(`WHATSAPP_COEXISTENCE=true`). Bu modda:
- rehberdeki kişilere ve eski sohbetlere yanıt verilmez,
- avukat telefondan yazınca bot susar,
- `action=sync-contacts` ve `action=sync-history` kurulum adımları kullanılır.

Bu bağlantı ise yalnızca Meta onaylı bir iş ortağı (BSP) üzerinden ya da
uygulamanın Tech Provider olmasıyla kurulabiliyor. İş ortağı yoluyla
bağlanırsa `WHATSAPP_PROVIDER=360dialog` gibi ayarlar gerekir; ayrıntılar için
`lib/whatsapp/api.ts`'ye bakın.

## Gizlilik ve meslek kuralları

- Sohbet geçmişi Redis'te **7 gün** tutulur, sonra kendiliğinden silinir.
- Mesajlar Meta'ya (WhatsApp) ve yanıt üretmek için Anthropic'e (Claude API)
  iletilir. Bu durum `/kvkk` sayfasında belirtilmiştir.
- Asistan kendiliğinden mesaj başlatmaz ve toplu veya tanıtım mesajı
  göndermez; yalnızca kendisine yazanlara yanıt verir. Sonuç garantisi, ücret
  rakamı ve somut olaya özel strateji yasakları sitedeki asistanla aynıdır.
