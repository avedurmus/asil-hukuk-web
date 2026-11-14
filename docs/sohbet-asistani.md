# Sohbet Asistanı (Asil Asistan)

Sitenin her sayfasında sağ altta görünen yapay zekâ destekli karşılama asistanı.
Müvekkil adayını karşılar, sorununu anlayıp ilgili çalışma alanına yönlendirir,
sitedeki bilgilere dayanarak genel bilgi verir ve Av. Emre Durmuş'un
programına göre ön görüşme randevusu oluşturur.

## Nasıl çalışır?

| Parça | Dosya |
|---|---|
| Sohbet penceresi (arayüz) | `components/ChatWidget.tsx` |
| Sunucu uç noktası | `app/api/chat/route.ts` |
| Ortak asistan çekirdeği (Claude API, araç döngüsü; WhatsApp ile ortak) | `lib/chatbot/agent.ts` |
| Asistanın talimatı ve bilgi tabanı | `lib/chatbot/systemPrompt.ts` |
| Çalışma programı, tatiller, görüşme süresi | `data/appointmentSettings.ts` |
| Boş saat hesabı | `lib/booking/slots.ts` |
| Randevu çekirdeği (ayrıntı: `docs/randevu-sistemi.md`) | `lib/booking/*` |

- **Bilgi tabanı** sitenin kendi içeriğinden üretilir: `data/services.ts`
  (çalışma alanları ve rehber notları) ile `data/faq.ts` (SSS). Bu dosyalar
  güncellendiğinde asistan da otomatik olarak güncel bilgiyle konuşur.
- **Randevu saatleri** `data/appointmentSettings.ts` içindeki haftalık
  programdan hesaplanır; resmî tatiller, arife günleri ve `blockedDates`
  (izin günleri) elenir. Asistan saatleri asla kendisi uydurmaz, her seferinde
  bu hesaplamayı çağırır.
- **Randevu oluşturma** yalnızca kullanıcı bilgileri ve KVKK onayını sohbette
  açıkça onayladıktan sonra yapılır. Randevu Google Takvim'e yazılır ve büroya
  Gmail ile bildirilir; kullanıcıya referans kodu, takvime ekleme (.ics) ve
  WhatsApp düğmesi gösterilir.

Aynı asistan WhatsApp hattında da çalışabilir: bkz. `docs/whatsapp-asistani.md`.

## Randevu sistemi

Asistan, takvimli randevu sayfasıyla (`/randevu`) aynı çekirdeği kullanır:
boş saatleri getirir, randevu oluşturur, mevcut randevuyu referans kodu ve
telefonla sorgular, erteler, iptal eder. Sitedeki pencerede sunduğu saatler
tıklanabilir düğmeler olarak gösterilir.

Çalışma modları, Google Takvim + Gmail bağlantısının kurulumu, büro yönetim
paneli ve sorun giderme için bkz. **`docs/randevu-sistemi.md`**.

## Kurulum (Vercel)

Vercel → Proje → Settings → Environment Variables bölümüne ekleyin
(örnek: `.env.example`):

- `ANTHROPIC_API_KEY` — **zorunlu.** Anahtar yoksa pencere açılır ama
  kullanıcıya telefon/WhatsApp seçenekleri gösterilir.
- `CHATBOT_MODEL` — isteğe bağlı, varsayılan `claude-opus-5-5`.
- `CHATBOT_EFFORT` — isteğe bağlı (`low`, `medium`, `high`), varsayılan `low`
  (hızlı yanıt). Yanıt kalitesi yetersiz kalırsa `medium` deneyin.

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
  (sessionStorage) tutulur. Randevu bilgileri e-posta bildirimi, (bağlıysa)
  Google Takvim etkinliği ve randevu kaydı olarak saklanır (bkz.
  `docs/randevu-sistemi.md` → Gizlilik).
- Sohbet mesajları yanıt üretmek için Anthropic'e (Claude API) gönderilir;
  KVKK aydınlatma metninizde yurt dışı hizmet sağlayıcısı olarak belirtilmesi
  önerilir.

## Maliyet ve kötüye kullanım

- Sabit talimat ve bilgi tabanı önbelleğe alınır (prompt caching), böylece
  aynı içerik her mesajda tam ücretle yeniden işlenmez.
- Her IP için 10 dakikada 40 mesaj ve günde 3 randevu sınırı vardır; mesaj
  başına 2.000 karakter, sohbet başına son 40 mesaj işlenir. Yoğun kötüye
  kullanımda Vercel Firewall ile `/api/chat` için ek hız sınırı tanımlanabilir.
