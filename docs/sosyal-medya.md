# Sosyal Medya Paylaşımları

Her günlük makale için LinkedIn, X ve Facebook'a uygun **üç ayrı paylaşım metni**
hazırlanır ve makale dosyasındaki `social` alanına yazılır.

| Platform | Nasıl paylaşılır? |
|---|---|
| LinkedIn (kişisel profil) | **Otomatik.** Make, `https://asilhukuk.net/sosyal/linkedin.xml` akışını izleyip paylaşır. |
| X | **Otomatik.** Make, `https://asilhukuk.net/sosyal/x.xml` akışını izleyip paylaşır. |
| Facebook (kişisel profil) | **Elle.** Facebook kişisel profile otomatik paylaşıma hiçbir araçla izin vermiyor. Metin sabah e-postasında hazır gelir; kopyalayıp yapıştırmanız yeterlidir. |

Akışlarda yalnızca `social` alanı olan yazılar yer alır. Her öğenin açıklaması
(`description`), bağlantı dahil olduğu gibi paylaşılacak metindir.

Bu belge hem büro için açıklama hem de otomatik görevin paylaşım metinleri için
**çalışma talimatıdır**.

## Make kurulumu (bir kez)

Make'in ücretsiz paketi aylık sınırlı sayıda işlem (operation/credit) içerir. Her
senaryo günde bir kez çalışır; iki senaryo birlikte ayda yaklaşık 200 işlem harcar.
Güncel ücretsiz sınırı make.com'da kontrol edin.

### 1. Hesap ve bağlantılar

1. <https://www.make.com> üzerinden ücretsiz hesap açın.
2. **Connections** bölümünden LinkedIn hesabınızı bağlayın. Kişisel profil için
   LinkedIn'in kendi giriş ekranı açılır.
3. X hesabınızı bağlayın. X, Make'ten kendi geliştirici uygulamanızın anahtarlarını
   isteyebilir: <https://developer.x.com> → ücretsiz paket → uygulama oluştur → "Read and
   write" izni. Bu adımda takılırsanız Claude'a sorun.

### 2. LinkedIn senaryosu

1. **Create a new scenario** deyin.
2. İlk modül olarak **RSS → Watch RSS feed items** ekleyin:
   - URL: `https://asilhukuk.net/sosyal/linkedin.xml`
   - Maximum number of returned items: **2**. Günde iki makale yayımlandığı için
     tek çalıştırmada ikisi de paylaşılır. 1 yazılırsa paylaşılmayan yazılar birikir.
   - "Choose where to start" sorusuna **From now on** deyin. Bu, eski yazıların
     paylaşılmasını önler.
3. İkinci modül olarak **LinkedIn → Create a Post**'u (kullanıcı/üye gönderisi) ekleyin:
   - Paylaşım metni alanına RSS'ten gelen **Description**'ı eşleyin. Bağlantı metnin
     içinde zaten var.
   - Modülde bağlantı/makale (URL) alanı varsa oraya **URL / Link** alanını eşleyin.
     Böylece yazının önizleme kartı da görünür.
   - Görünürlük: **Public** (herkese açık).
4. Zamanlamayı (saat simgesi) **Every day**, saat **10:00** yapın. Makaleler
   genellikle 08:00 civarında yayında olur. Saat dilimi Europe/Istanbul olmalı.
5. Senaryoyu **ON** konumuna getirin.

### 3. X senaryosu

LinkedIn senaryosunu kopyalayın (Clone) ve iki değişiklik yapın:

- RSS adresini `https://asilhukuk.net/sosyal/x.xml` yapın.
- İkinci modülü **X → Create a Post** ile değiştirin. Metin alanına **Description**'ı eşleyin.

İsterseniz saati LinkedIn'den farklı seçin (ör. 11:00).

### 4. Deneme

Senaryoyu bir kez **Run once** ile çalıştırın. "From now on" seçtiyseniz yeni yazı
gelene kadar paylaşım yapılmaz. Hemen denemek isterseniz başlangıcı
"Choose manually" ile bir yazı seçerek yapın; o yazı paylaşılır.

### Facebook'u otomatikleştirmek isterseniz

Facebook kişisel profil yerine bir **Facebook Sayfası**'na otomatik paylaşıma
izin verir. Bir büro sayfası açarsanız Claude'a söyleyin. Bir Facebook akışı eklenir
ve aynı şekilde üçüncü bir Make senaryosu kurulur.

---

## Otomatik görev için talimat

Makaleyi yazdıktan sonra makale dosyasına (`content/makaleler/<tarih>-<id>.json`),
`content` alanından önce şu alanı ekle:

```json
"social": {
  "linkedin": "…",
  "x": "…",
  "facebook": "…"
}
```

`https://asilhukuk.net/blog/<id>` bağlantısı **üç metnin hepsinde** birebir
bulunmalıdır. Metinler düz metindir: HTML ve Markdown kullanma, satır sonları serbesttir.

### LinkedIn (400–2.000 karakter; ideal 700–1.300)

- **İlk satır:** Okuru durduran somut bir soru veya yaygın bir yanlışın düzeltilmesi
  ("Bir yıl işlem yapılmazsa icra dosyası düşer bilgisi eksik."). LinkedIn ilk iki
  satırdan sonrasını "devamını gör" ile kısaltır.
- **Gövde:** Kısa paragraflar. Ana cevap ile kanun maddesini ver. En önemli iki-üç
  karar ilkesini "→" ile başlayan satırlarda ver. Daire ve yıl belirt, künye
  numarası verme.
- **Kapanış:** "Ayrıntılar yazının tamamında:" ve bağlantı. En sonda 3–5 hashtag
  (ör. `#nafaka #AileHukuku #Yargıtay`).
- **Üslup:** Birinci tekil şahıs, profesyonel. Emoji kullanma.

### X (en fazla 270 karakter; bağlantı 23 karakter sayılır)

- Tek cümlede soru ve cevap, ardından en çarpıcı tek bilgi.
- Sonra bağlantı ve en fazla 1–2 hashtag.
- Yalnızca bir bağlantı olmalı.

### Facebook (200–1.500 karakter)

- LinkedIn'den daha sade ve sıcak bir dil kullan. Hedef, hukukçu olmayan okurdur.
- Soruyla başla. İki kısa paragrafta cevap ver ve bir pratik uyarı ekle. Sonra
  "Ayrıntıları yazıda anlattım:" ve bağlantı.
- Hashtag kullanma.

### Kurallar (denetim kontrol eder)

- Avukatlık meslek kuralları burada da geçerlidir:
  - sonuç vaadi ve reklam dili kullanma;
  - "bizi arayın", "randevu alın", "DM atın", "ücretsiz danışma" gibi çağrılar yapma;
  - ücret bilgisi verme;
  - başka avukatlarla kıyaslama yapma.
- Makalede olmayan bir bilgi ekleme.
- `npm run makale:dogrula` uzunluk, bağlantı ve yasaklı ifadeleri denetler.
  `2026-11-09` ve sonrasındaki makalelerde `social` alanı zorunludur.

### E-posta

Sabah özet e-postasına her makale için **"Facebook'ta paylaşmak için"** başlığı
altında `social.facebook` metnini olduğu gibi ekle. LinkedIn ve X'in Make
tarafından saat 10:00'da otomatik paylaşılacağını bir cümleyle belirt.
