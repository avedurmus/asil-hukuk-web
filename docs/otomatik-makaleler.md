# Günlük Hukuk Makaleleri

Her sabah büronun çalışma alanlarında **iki** kapsamlı makale yayımlanır.
Makaleler YargıMCP (Yargı PRO) araçlarıyla bulunan güncel içtihat ve mevzuata
dayanır; ana sayfada, giriş bölümünün hemen altındaki "son eklenenler" şeridinde ve
`/blog` sayfasında görünür.

Bu belge hem büro için açıklama hem de her sabah çalışan otomatik görevin
izlediği **çalışma talimatıdır**. Görevin davranışını değiştirmek için bu
dosyayı düzenlemek yeterlidir.

## Nasıl çalışır?

| Parça | Dosya |
|---|---|
| Makale dosyaları (her biri ayrı) | `content/makaleler/YYYY-MM-DD-<id>.json` |
| Makaleleri blogla birleştiren yükleyici | `lib/posts.ts` |
| Ana sayfadaki son eklenenler şeridi | `components/LatestPostsStrip.tsx` |
| Yayın öncesi denetim | `scripts/makale-dogrula.mjs` (`npm run makale:dogrula`) |

Elle yazılan yazılar `data/blogPosts.ts` içinde kalır. Bir günlük makaleyi
yayından kaldırmak için ilgili JSON dosyasını silmek yeterlidir.

---

## Otomatik görev için talimat

Aşağıdaki adımları sırayla uygula. Bir adımda başarısız olursan **yayımlama**;
nedenini 8. adımdaki e-postayla bildir.

### 1. Hazırlık

1. Depo çalışma dizininde yoksa `avedurmus/asil-hukuk-web` deposunu
   (`add_repo`, push erişimiyle) ekleyip klonla.
2. `origin/main`'den `makale/<YYYY-MM-DD>` dalını aç ve `npm ci` çalıştır.
3. Bugünün tarihini İstanbul saatine göre belirle (`TZ=Europe/Istanbul date +%F`).
   Bu tarih için `content/makaleler/` altında zaten iki makale varsa dur:
   görev o gün tamamlanmış demektir.

### 2. Konu seçimi

Haftanın gününe göre iki farklı alandan birer konu seç:

| Gün | 1. makale | 2. makale |
|---|---|---|
| Pazartesi | Aile Hukuku | İş Hukuku |
| Salı | Ceza Hukuku | Gayrimenkul Hukuku |
| Çarşamba | Ticaret Hukuku | Aile Hukuku |
| Perşembe | İş Hukuku | Ceza Hukuku |
| Cuma | Gayrimenkul Hukuku | Arabuluculuk |
| Cumartesi | Ticaret Hukuku | Ceza Hukuku |
| Pazar | Aile Hukuku | Gayrimenkul Hukuku |

Alanların kapsamı `data/services.ts` içindeki hizmet açıklamalarıdır (ör.
Gayrimenkul: kira, tahliye, tapu iptal-tescil, kat mülkiyeti, kentsel
dönüşüm, ortaklığın giderilmesi; Ticaret: şirketler, icra takibi, çek-senet,
alacak tahsili).

- Müvekkil adaylarının gerçekten aradığı, somut bir soruya cevap veren dar bir
  konu seç ("Kira artışında yüzde 25 sınırı bitti mi?" gibi). Genel
  "X hukuku nedir" yazıları yazma.
- Tekrarı önle: `content/makaleler/` ve `data/blogPosts.ts` içindeki başlık
  ve etiketlere bak (`grep -h '"title"' content/makaleler/*.json`). Aynı
  konuyu son 90 günde işlediysen başka bir konu seç; ancak aynı konuda yeni ve
  önemli bir karar ya da kanun değişikliği varsa farklı açıdan yazabilirsin.
- Yeni kanun değişiklikleri, Yargıtay Hukuk/Ceza Genel Kurulu ve İçtihadı
  Birleştirme kararları, Anayasa Mahkemesi kararları önceliklidir.

### 3. Araştırma (YargıMCP)

1. Önce `kullanici_profili_getir` çağır ve çıktısındaki yönergeye uy. Kurulum
   tamamlanmamış görünüyorsa **dur**; makale yazma.
2. `hukuk_skill` ile listeyi al; içtihat araştırması veya makale yazımına uyan
   bir skill varsa tam metnini al ve talimatlarına uy.
3. Her makale için:
   - `semantik_ictihat_ara` ve `ictihat_ara` ile Yargıtay, bölge adliye ve
     gerekirse Danıştay kararlarını ara; mümkünse son 3 yılın kararlarını seç.
     Anayasa Mahkemesi için `aym_ictihat_ara` kullan.
   - Dayanacağın en az **3 kararın tam metnini** `ictihat_getir` ile oku. Bir
     kararı yalnızca tam metnini okuduysan ve aktardığın ilke metinde gerçekten
     varsa kullan.
   - İlgili kanun maddelerini `mevzuat_ara` / `mevzuat_getir` ile güncel
     hâliyle doğrula. Madde numarası, süre ve oran gibi bilgileri ezberden
     yazma.
4. Kararın bağlantısı: araç çıktısındaki `source_url`. Yoksa Bedesten kararları
   için `https://mevzuat.adalet.gov.tr/ictihat/<documentId>`. Bağlantısı
   belirlenemeyen kararı `decisions` listesine koyma. URL uydurma.

### 4. Yazım kuralları

- **Dil ve üslup:** Türkçe; açık, sade ve güven veren bir anlatım. Hedef okur
  hukukçu olmayan müvekkil adayıdır; teknik terimleri ilk geçtiği yerde açıkla.
  Büro adına birinci tekil şahısla ("aktarıyorum") ya da tarafsız anlatımla yaz.
- **Uzunluk:** 1.500–2.500 kelime; en az 3, tercihen 5–7 `<h2>` bölümü.
- **Yapı:** Kısa giriş → `<div class="ictihat-ilke"><p><strong>Özetle:</strong> …</p></div>`
  → konu bölümleri → kararların değerlendirmesi → "Uygulamaya dönük
  çıkarımlar" (madde listesi) → bilgilendirme notu.
- **Atıflar metin içinde** hukuk pratiğindeki biçimiyle verilir: "Yargıtay
  3. Hukuk Dairesi'nin 12.03.2025 tarihli, 2024/1234 E., 2025/567 K. sayılı
  kararı"; kanun adı ve madde numarası. Metinde Yargı PRO veya YargıMCP'den
  bahsetme, araştırma aracına bağlantı verme.
- **Meslek kuralları (Avukatlık Kanunu m. 55, TBB Reklam Yasağı
  Yönetmeliği):** sonuç garantisi verme; "en iyi", "uzman", "kesin kazanırsınız"
  gibi reklam niteliğinde ifadeler kullanma; başka avukat veya bürolarla
  kıyaslama yapma; ücret bilgisi verme; okuru doğrudan büroyu aramaya çağırma
  (sayfanın altındaki iletişim bölümü bunu zaten yapar).
- **Kesinlik:** Emin olmadığın bir bilgiyi yazma. Uygulamada tartışmalı
  konularda farklı görüşleri ve dairelerin farklı kararlarını belirt.
- **Son paragraf** daima şu kalıpta olsun:
  `<p><em>Not: Bu yazı bilgilendirme amaçlıdır ve somut dosyanızdaki durumu değerlendirmez. …</em></p>`
- **HTML:** yalnızca `p, h2, h3, ul, ol, li, strong, em, a, blockquote, br,
  table, thead, tbody, tr, th, td` ve `<div class="ictihat-ilke">`. Stil,
  script veya başka öznitelik kullanma; bağlantılar `https://` ya da site içi
  `/` ile başlasın. İlgili hizmet sayfasına (`/calisma-alanlarimiz/<id>`)
  ve varsa ilgili eski yazılara metin içinde bağlantı ver.

### 5. Dosya biçimi

Her makale `content/makaleler/<YYYY-MM-DD>-<id>.json` dosyasıdır:

```json
{
  "id": "konut-kiralarinda-yuzde-25-siniri-bitti-mi",
  "title": "Konut Kiralarında Yüzde 25 Sınırı Bitti mi? Kira Artışında Güncel Durum",
  "seoTitle": "Kira Artışında Yüzde 25 Sınırı Bitti mi?",
  "excerpt": "80–320 karakterlik, blog listesinde görünecek özet.",
  "seoDescription": "110–158 karakterlik, Google sonuçlarında görünecek açıklama.",
  "dateISO": "2026-10-05",
  "category": "Gayrimenkul Hukuku",
  "kind": "makale",
  "tags": ["kira artışı", "TÜFE", "kira tespit davası"],
  "decisions": [
    {
      "court": "Yargıtay 3. Hukuk Dairesi",
      "esas": "2024/1234",
      "karar": "2025/567",
      "date": "12.03.2025",
      "url": "https://…",
      "principle": "Karardan çıkan ilkenin tek cümlelik özeti."
    }
  ],
  "sources": [
    { "label": "6098 sayılı Türk Borçlar Kanunu m. 344", "url": "https://www.mevzuat.gov.tr/…" }
  ],
  "content": "<p>…</p>"
}
```

- `id`: başlıktan türetilmiş, Türkçe karaktersiz, küçük harf ve tireli
  (en fazla 90 karakter); dosya adındaki id ile aynı.
- `seoTitle` ve `seoDescription`: Google sonuç sayfasında görünen başlık ve
  açıklamadır. Başlığın sonuna otomatik olarak " | Asil Hukuk" eklenir;
  Google ~60 karakterden sonrasını keser. Bu yüzden:
  - `seoTitle` en fazla **52** karakter; başlık 52 karakteri aşıyorsa
    zorunludur. Okurun arayacağı ana ifadeyle başlasın ("Ziynet Eşyaları
    Boşanmada Kime Kalır?").
  - `seoDescription` **110–158** karakter; özet 158 karakteri aşıyorsa
    zorunludur. Sorunun cevabını vaat eden, aranan ifadeyi içeren tek-iki
    cümle olsun. İkisinde de reklam niteliğinde ifade kullanma.
- `category`: `Aile Hukuku`, `İş Hukuku`, `Ceza Hukuku`, `Gayrimenkul Hukuku`,
  `Ticaret Hukuku`, `Arabuluculuk` (gerekirse `Anayasa Hukuku`, `Genel`).
- `kind`: yazı ağırlıkla kararların incelemesiyse `"ictihat"` (en az 2 karar
  gerekir), değilse `"makale"`.
- `date`, `readTime`, `daily` yazma; otomatik hesaplanır. `imageUrl` koyma;
  tipografik kapak kullanılır.

### 6. Denetim ve yayın

1. `npm run makale:dogrula` hatasız geçmeli; hata varsa düzelt.
2. `npm run build` başarılı olmalı.
3. Commit mesajı: `feat(blog): günlük makaleler (<YYYY-MM-DD>)`, gövdede iki
   başlık. Dalı push et, `main`'e PR aç (başlık aynı; gövdede başlıklar,
   kategoriler ve dayanılan karar künyeleri) ve Vercel önizlemesi başarılı
   olunca **squash** ile birleştir. Birleştirme canlı yayını başlatır.
4. Birleştirmeden sonra Vercel'de (`asil-hukuk-web` projesi) üretim yayınının
   `READY` olduğunu doğrula.

### 7. Hata durumları

- Denetim veya derleme iki düzeltme denemesinden sonra hâlâ başarısızsa
  birleştirme; PR'ı açık bırak ve e-postada nedenini yaz.
- YargıMCP'ye ulaşılamıyor, profil kurulmamış ya da yeterli karar bulunamıyorsa
  kaynaksız makale **yazma**; yalnızca e-postayla bildir.
- Yalnızca bir makale hazırlanabildiyse onu yayımla ve e-postada belirt.

### 8. E-posta özeti

Gmail ile **av.edurmus@gmail.com** adresine, kendi hesabından şu konuyla gönder:
`Günün makaleleri yayında – <5 Ekim 2026>` (hata varsa `… – yayımlanamadı`).
Gövdede her makale için başlık, kategori, `https://asilhukuk.net/blog/<id>`
bağlantısı ve dayanılan karar künyeleri yer alsın. En alta şu notu ekle:
"Uygun bulmadığınız bir makaleyi kaldırmak için Claude'a 'şu makaleyi
kaldır' demeniz yeterlidir."
