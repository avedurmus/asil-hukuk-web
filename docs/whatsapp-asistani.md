# WhatsApp Asistanı

Sitedeki **Asil Asistan**'ın WhatsApp hattı (0530 432 20 25) üzerinde çalışan
hâli. Büroya yazan müvekkil adaylarını karşılar, konuyu ilgili çalışma alanına
yönlendirir, kısa genel bilgi verir, ön görüşme randevusu oluşturur ve
gerektiğinde sohbeti Av. Emre Durmuş'a devreder.

Numara **birlikte kullanım** (Meta: "coexistence") ile bağlanır. Telefondaki
WhatsApp Business uygulaması aynen çalışmaya devam eder: kişisel yazışmalar
sürer, asistanın yazdıkları da telefonda görünür ve istediğiniz sohbeti
telefondan devralabilirsiniz.

## Nasıl çalışır?

| Parça | Dosya |
|---|---|
| Webhook (Meta → site) | `app/api/whatsapp/route.ts` |
| Rehber / geçmiş eşitlemesini başlatma | `app/api/whatsapp/sync/route.ts` |
| Kime yanıt verileceği, devir, sohbet akışı | `lib/whatsapp/bot.ts` |
| WhatsApp API istemcisi | `lib/whatsapp/api.ts` |
| Sohbet geçmişi ve durum (Upstash Redis) | `lib/whatsapp/store.ts` |
| Ortak asistan çekirdeği (site + WhatsApp) | `lib/chatbot/agent.ts` |
| Talimatlar ve bilgi tabanı (`whatsapp` kanalı) | `lib/chatbot/systemPrompt.ts` |

Bilgi tabanı, randevu programı ve meslek kuralları sitedeki asistanla
**aynıdır**; `data/services.ts`, `data/faq.ts` veya
`data/appointmentSettings.ts` güncellendiğinde WhatsApp asistanı da güncellenir.

### Kişisel sohbetler nasıl korunur?

Numara kişisel olarak da kullanıldığı için asistan "şüphede sus" ilkesiyle
çalışır. Aşağıdakilere **hiç yanıt vermez**:

- **Telefon rehberinizdeki herkes.** Kurulumdan sonra rehber eşitlenir;
  sonradan rehbere eklediğiniz kişiler de otomatik işlenir.
- **Kurulumdan önce yazıştığınız herkes.** Son 6 ayın sohbet listesi eşitlenir.
  Yalnızca numaralar işaretlenir, mesaj içerikleri saklanmaz.
- **`WHATSAPP_PERSONAL_NUMBERS`** listesindeki numaralar.
- **Telefondan yazdığınız her sohbet:** Bir kişiye telefondan yazdığınız anda
  asistan o sohbette `WHATSAPP_HUMAN_HOURS` (varsayılan 72) saat susar.
- **Gruplar:** Grup mesajları API'ye hiç gelmez.

Böylece asistan pratikte yalnızca **sizinle ilk kez yazışan, rehberinizde
olmayan** kişilere yanıt verir. Bu kişiler büyük ölçüde siteden ve Google'dan
gelen müvekkil adaylarıdır. Kayıt deposuna (Redis) ulaşılamazsa asistan yine
yanıt vermez.

### Sohbet akışı

1. **İlk mesaj:** Kullanıcıya önce otomatik bir tanıtım gider. Tanıtımda
   asistanın yapay zekâ olduğu, hukuki danışmanlık vermediği, avukatla görüşmek
   için *avukat* yazılabileceği ve hassas bilgi paylaşılmaması gerektiği
   belirtilir. Ardından asistanın yanıtı gelir.
2. **Art arda gelen mesajlar:** Birkaç saniye içinde gönderilen mesajlar tek
   yanıtta toplanır.
3. **Randevu:** Randevu, sitedekiyle aynı kurallarla alınır (KVKK onayı, boş
   saat kontrolü, e-posta bildirimi, Google Takvim). Telefon numarası
   WhatsApp'tan bilindiği için ayrıca sorulmaz. Bildirim e-postasında kaynak
   "WhatsApp asistanı" olarak görünür.
4. **Avukata devir:** Asistan şu durumlarda sohbeti size devreder:
   - kullanıcı *avukat* yazarsa ya da bir insanla görüşmek isterse,
   - mevcut bir müvekkil kendi dosyası hakkında yazarsa,
   - acil bir durum varsa,
   - asistan yardımcı olamazsa.

   Devirde size **e-posta** gider (Formspree, iletişim formuyla aynı adres).
   E-postada özet ve `wa.me` bağlantısı bulunur. Asistan o sohbette 72 saat
   susar; telefondan yanıt verirsiniz.
5. **Ses, fotoğraf, belge:** Asistan bunları okuyamaz. Kullanıcıya bir kez
   bilgi verir; içerik telefonunuzda sizi bekler.

## Kurulum

### 1. Kişisel WhatsApp'tan WhatsApp Business'a geçiş (telefonda, 10 dk)

Birlikte kullanım yalnızca **WhatsApp Business** uygulamasıyla çalışır.

1. WhatsApp'ta yedek alın: *Ayarlar → Sohbetler → Sohbet yedeği*.
2. Aynı telefona **WhatsApp Business** uygulamasını kurun ve 0530 432 20 25
   numarasını girin. Uygulama, numaranın WhatsApp'ta kayıtlı olduğunu görür ve
   sohbetleri taşımayı önerir; onaylayın. Sohbetler, gruplar ve medya taşınır.
3. İşletme profilini doldurun: ad *Asil Hukuk Bürosu*, kategori *Hukuk
   Hizmetleri*, adres, çalışma saatleri, `https://asilhukuk.net`.
4. Uygulamanın güncel olduğundan emin olun (en az 2.24.17).

Kişisel kullanım aynen sürer. Tek fark, kişilerinizin profilinizde "işletme
hesabı" ibaresini görmesidir.

### 2. Numarayı API'ye bağlama (birlikte kullanım)

Meta, birlikte kullanım bağlantısını yalnızca **Embedded Signup** akışıyla ve
yalnızca **Tech Provider** veya **Solution Partner** statüsündeki uygulamalar
üzerinden yapıyor. İki yol var.

**Yol A: İş ortağı (BSP) üzerinden (önerilen, aynı gün)**

Birlikte kullanımı destekleyen bir WhatsApp iş ortağına (ör. 360dialog)
kaydolun. Kayıt akışında "mevcut WhatsApp Business uygulaması numaramı bağla"
seçeneğini seçin. Telefonda *Ayarlar → Bağlı cihazlar*'dan gösterilen QR kodu
okutun ve 6 aylık geçmiş paylaşımını onaylayın. İş ortağının verdiği API
anahtarıyla Vercel'de `WHATSAPP_PROVIDER=360dialog` tanımlanır.

İş ortağını seçmeden önce şunları teyit edin:
- Türkiye numarası için birlikte kullanımı destekliyor mu?
- Webhook'u kendi adresimize olduğu gibi iletiyor mu? Şu alanlar dahil olmalı:
  `smb_message_echoes`, `smb_app_state_sync`, `history`.
- Cloud API uyumlu mesaj gönderimi sunuyor mu?
- Aylık ücreti nedir?

**Yol B: Kendi Meta uygulamanızla (uygulama no 1503483311684677)**

Ara firmaya ücret ödenmez, ancak Meta'nın onay süreci gerekir:

1. business.facebook.com → *Güvenlik Merkezi*'nden işletme doğrulaması.
2. developers.facebook.com'da uygulamayı **Tech Provider** olarak kaydetmek.
   Bunun için `whatsapp_business_messaging` ve `whatsapp_business_management`
   izinlerinde uygulama incelemesi gerekir. Süre birkaç gün ile birkaç hafta
   arasıdır.
3. *Facebook Login for Business* altında Embedded Signup yapılandırması
   oluşturmak. Ardından `featureType: "whatsapp_business_app_onboarding"` ile
   kayıt sayfasını sitede yayınlamak (bu sayfa ayrıca yazılmalıdır).
4. Kendi numaranızla bu sayfadan geçip QR kodu okutmak.

Bu yolda Vercel'de `WHATSAPP_PROVIDER` tanımlanmaz (varsayılan `meta`).
`WHATSAPP_PHONE_NUMBER_ID`, kalıcı System User anahtarı ve App Secret girilir.

### 3. Vercel ayarları

1. **Kayıt deposu:** Vercel → Proje → *Storage* → *Upstash Redis* (ücretsiz
   plan yeterli) → projeye bağlayın. `UPSTASH_REDIS_REST_URL` /
   `UPSTASH_REDIS_REST_TOKEN` (veya `KV_REST_API_URL` / `KV_REST_API_TOKEN`)
   otomatik tanımlanır.
2. **Ortam değişkenleri** (*Settings → Environment Variables*, örnek:
   `.env.example`):
   - `WHATSAPP_ACCESS_TOKEN`: Meta System User anahtarı veya iş ortağının API
     anahtarı.
   - `WHATSAPP_PHONE_NUMBER_ID`: yalnızca Yol B (WhatsApp Manager → Telefon
     numaraları).
   - `WHATSAPP_APP_SECRET`: yalnızca Yol B (Uygulama → *Ayarlar → Temel*).
     Webhook imzasını doğrular.
   - `WHATSAPP_VERIFY_TOKEN`: kendi belirlediğiniz uzun, rastgele bir metin.
   - `WHATSAPP_PROVIDER=360dialog`: yalnızca Yol A.
   - `WHATSAPP_ALLOWED_NUMBERS`: **ilk test için** yalnızca kendi ikinci
     numaranız. Bu tanımlıyken asistan başka hiç kimseye yanıt vermez.
   - `WHATSAPP_BOT_ENABLED=true`: tanımlanmadıkça asistan hiç yanıt vermez,
     yalnızca rehber/geçmiş bilgisini kaydeder.
3. Yeniden yayınlayın (*Deployments → ⋯ → Redeploy*).

### 4. Webhook

- **Adres:** `https://asilhukuk.net/api/whatsapp`. İmza göndermeyen iş
  ortaklarında (Yol A) adres şöyle olur:
  `https://asilhukuk.net/api/whatsapp?key=<WHATSAPP_VERIFY_TOKEN>`.
- **Doğrulama anahtarı:** `WHATSAPP_VERIFY_TOKEN` değeri.
- **Abone olunacak alanlar:** `messages`, `smb_message_echoes`,
  `smb_app_state_sync`, `history`.

### 5. Rehber ve geçmiş eşitlemesi (bağlantıdan sonraki 24 saat içinde!)

Tarayıcıda iki adresi birer kez açın:

```
https://asilhukuk.net/api/whatsapp/sync?key=<WHATSAPP_VERIFY_TOKEN>&type=contacts
https://asilhukuk.net/api/whatsapp/sync?key=<WHATSAPP_VERIFY_TOKEN>&type=history
```

Sonuç birkaç dakika içinde webhook'a gelir. Kontrol için Upstash
konsolunda `wa:personal:*` anahtarları görünmelidir. Bu adım atlanırsa
rehberdeki kişileriniz asistana yazabilir. Bu durumda en azından sık
yazıştıklarınızı `WHATSAPP_PERSONAL_NUMBERS`'a ekleyin.

### 6. Test ve yayına alma

1. `WHATSAPP_ALLOWED_NUMBERS` = ikinci telefonunuz. O telefondan şunları
   deneyin:
   - selamlaşma,
   - bir hukuki soru,
   - randevu,
   - *avukat* yazmak,
   - sesli mesaj.
2. Asistan yazarken telefondan aynı sohbete yazın; asistan susmalıdır.
3. Kişisel bir kişinizden mesaj geldiğinde asistanın yanıt vermediğini görün.
4. Her şey doğruysa `WHATSAPP_ALLOWED_NUMBERS`'ı silip yeniden yayınlayın.

## Birlikte kullanımda bilinmesi gerekenler

- Telefondaki WhatsApp Business uygulamasını **en az 14 günde bir açın**. Aksi
  hâlde Meta bağlantıyı askıya alabilir.
- Kurulum sırasında WhatsApp Web / masaüstü bağlantıları kopar. Yeniden QR ile
  bağlayın.
- Kaybolan mesajlar ve tek seferlik görüntüleme gibi bazı özellikler
  birlikte kullanımda kısıtlanabilir.
- **Ücret:** Müvekkil yazdıktan sonraki 24 saat içinde API'den verilen yanıtlar
  Meta tarafından ücretlendirilmez. Telefondan yazdıklarınız zaten ücretsizdir.
  Asistan kendiliğinden mesaj başlatmaz.

## İsteğe bağlı ayarlar

- `WHATSAPP_HUMAN_HOURS`: devirden veya telefondan yazmanızdan sonra
  asistanın susacağı süre (saat, varsayılan 72).
- `WHATSAPP_PERSONAL_NUMBERS`: asistanın asla yanıt vermeyeceği numaralar
  (virgülle ayrılmış, `0532 …` veya `+90 532 …` biçiminde).
- `WHATSAPP_MARK_READ=true`: asistan mesajı okundu olarak işaretler ve
  "yazıyor…" gösterir. Varsayılan kapalıdır. Açıldığında sohbet telefonunuzda
  da okunmuş görünür ve yeni mesajları gözden kaçırabilirsiniz.
- `WHATSAPP_GRAPH_VERSION`: Graph API sürümü (varsayılan `v23.0`).

## Gizlilik ve meslek kuralları

- Sohbet geçmişi Redis'te **7 gün** tutulur, sonra kendiliğinden silinir.
  Rehber/geçmiş eşitlemesinden yalnızca numaralar saklanır.
- Mesajlar Meta'ya (WhatsApp) ve yanıt üretmek için Anthropic'e (Claude API)
  iletilir. Yol A'da iş ortağı da veri işleyendir. KVKK aydınlatma metninde
  bu yurt dışı hizmet sağlayıcıların belirtilmesi gerekir. Sitede henüz ayrı bir
  KVKK aydınlatma sayfası bulunmuyor.
- Asistan kendiliğinden mesaj başlatmaz ve toplu veya tanıtım mesajı
  göndermez; yalnızca kendisine yazanlara yanıt verir. Sonuç garantisi, ücret
  rakamı ve somut olaya özel strateji yasakları sitedeki asistanla aynıdır.
