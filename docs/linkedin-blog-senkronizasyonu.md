# LinkedIn İçtihat Paylaşımlarının Blog'a Senkronizasyonu — Fizibilite Raporu

> Araştırma tarihi: 21 Eylül 2026
> Kapsam: `linkedin.com/in/avukat-emre-durmuş-a5981523` kişisel profilindeki
> içtihat paylaşımlarının `asilhukuk.net/blog` bölümüne aktarılması.

## 1. Kısa cevap

**Gerçek zamanlı, tam otomatik senkronizasyon LinkedIn tarafından mümkün kılınmıyor.**
Bir kişisel profilin kendi gönderilerini **okuyan** herkese açık (self-service) bir
LinkedIn API'si yok. Buna karşılık **yarı otomatik** bir akış tamamen mümkün ve bu
repoda kurulmuş durumdadır: LinkedIn'in resmi veri arşivi indirilir, içindeki
`Shares.csv` dosyası bir script ile blog yazılarına dönüştürülür.

## 2. Denenen ve elenen yollar

### 2.1 LinkedIn resmi API'si (Posts API) — ❌ okuma için kapalı

LinkedIn'in geliştirici dokümantasyonuna göre onay gerektirmeyen "Open Permissions"
izinleri yalnızca şunları kapsıyor:

- OpenID Connect ile giriş (ad, unvan, fotoğraf, e-posta okuma),
- `w_member_social` — üyenin **kendi adına paylaşım yapması**, yorum ve beğeni.

Yani API ile profile **yazmak** serbest, **okumak** serbest değil. Bir üyenin kendi
gönderi akışını çekmek Marketing Developer Platform / partner onayı gerektiriyor ve
bu onay kurumsal sayfalar ile üçüncü kişi adına paylaşım senaryoları için veriliyor;
tekil bir avukatlık bürosunun blog beslemesi bu kapsama girmiyor.

Kaynaklar:
- <https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access>
- <https://www.getphyllo.com/post/linkedin-api-ultimate-guide-on-linkedin-api-integration>

### 2.2 Member Data Portability API — ❌ Türkiye'de kullanılamıyor

LinkedIn, AB Dijital Hizmetler Yasası gereği üyelerin kendi verilerine (profil,
gönderiler, mesajlar, beğeniler) programatik erişimini sağlayan bir API açtı ve bu
API partner onayı gerektirmiyor. Ancak **yalnızca profil konumu AEA (AB/EEA) veya
İsviçre olan üyeler** kullanabiliyor. Profil konumu Türkiye olduğu için bu yol
şu an kapalı.

Kaynak: <https://www.linkedin.com/help/linkedin/answer/a6214075>

### 2.3 Profil sayfasını kazımak (scraping) — ❌ önerilmiyor

LinkedIn kullanıcı sözleşmesi otomatik veri çekmeyi açıkça yasaklıyor; profil
sayfaları oturum açmadan `999`/`403` döndürüyor ve üçüncü parti "LinkedIn RSS"
servisleri kişisel profillerde değil, çoğunlukla şirket sayfalarında çalışıyor.
Bir hukuk bürosunun kurumsal sitesi için hem hukuki hem itibari risk taşıyor;
ayrıca bu ortamda `linkedin.com`'a giden çıkış trafiği zaten engelli.

### 2.4 LinkedIn veri arşivi + içe aktarma scripti — ✅ seçilen yol

LinkedIn'in kendi sunduğu resmi dışa aktarma özelliği:

> **Ayarlar ve Gizlilik → Veri gizliliği → Verilerinizin bir kopyasını alın**

Arşiv genelde birkaç dakika, en geç 24 saat içinde e-posta ile geliyor.
`Complete_LinkedInDataExport.zip` içindeki **`Shares.csv`** dosyası tüm
gönderilerin metnini, tarihini, bağlantısını ve varsa medya URL'sini içeriyor.
Bu, hesabın kendi verisi olduğu için ne sözleşme ihlali ne de teknik engel var.

Kaynak: <https://www.linkedin.com/help/linkedin/answer/a566336/export-connections-from-linkedin>

## 3. Kurulan akış

```
LinkedIn → "Verilerinizin bir kopyasını alın" → Shares.csv
                     │
                     ▼
   node scripts/import-linkedin-shares.mjs Shares.csv
                     │
                     ▼
        data/linkedinPosts.generated.ts   (üretilen dosya)
                     │
                     ▼
      data/blogPosts.ts içinde birleştirilir → /blog
```

Kullanım:

```bash
# Önce ne olacağını gör (dosyaya yazmaz)
node scripts/import-linkedin-shares.mjs ~/Downloads/Shares.csv --dry-run

# Sadece içtihat içeren paylaşımları al (varsayılan davranış)
node scripts/import-linkedin-shares.mjs ~/Downloads/Shares.csv

# Tüm paylaşımları al
node scripts/import-linkedin-shares.mjs ~/Downloads/Shares.csv --all
```

Script'in yaptıkları:

- `Shares.csv`'yi (çok satırlı, tırnaklı alanlar dahil) ayrıştırır,
- varsayılan olarak yalnızca **içtihat/karar içerikli** paylaşımları süzer
  (Yargıtay, Danıştay, AYM, esas/karar numarası kalıpları vb.),
- metinden başlık, özet, okuma süresi ve SEO uyumlu bir `slug` üretir,
- `E. 2024/3358`, `K. 2025/2449` gibi karar künyelerini ayıklayıp yazının
  `decisions` alanına koyar,
- düz metni paragraf/liste yapısına dönüştürüp HTML üretir,
- her yazıyı `source: { platform: "linkedin", url, postedAt }` ile işaretler,
  böylece blog kartında "LinkedIn paylaşımı" rozeti görünür.

**Önemli:** Script üretilen içeriği doğrudan yayına almaz; `data/linkedinPosts.generated.ts`
dosyasını yazar. Yayına alınmadan önce metin gözden geçirilmeli, karar künyeleri
doğrulanmalı ve yazıya bir görsel atanmalıdır. Bir avukatlık bürosunun sitesinde
yayımlanan her içtihat değerlendirmesinin kontrolden geçmesi gerektiği için bu
adım bilinçli olarak manuel bırakılmıştır.

## 4. Ters yön: Blog → LinkedIn (otomatikleştirilebilir)

Okuma kapalı olsa da **yazma açık**. `w_member_social` izniyle, sitede yeni bir
yazı yayımlandığında LinkedIn profiline otomatik paylaşım yapılabilir:

1. <https://developer.linkedin.com> üzerinde bir uygulama oluşturulur,
2. "Share on LinkedIn" ürünü eklenir (onay beklemeden aktif olur),
3. OAuth ile `w_member_social` izni alınır (token 60 gün geçerli, yenilenebilir),
4. Yeni yazı yayımlandığında `POST /rest/posts` ile paylaşım yapılır.

Limitler: üye başına günde 150, uygulama başına günde 100.000 istek.

Bu yön ileride istenirse ayrı bir iş olarak eklenebilir; bu çalışmanın kapsamında
uygulanmamıştır.

## 5. Özet tablo

| Yöntem | Otomatik? | Uygulanabilir? | Not |
|---|---|---|---|
| Posts API ile okuma | Evet | ❌ | Partner onayı gerekir, kişisel bloglara verilmiyor |
| Member Data Portability API | Evet | ❌ | Yalnızca AB/EEA/İsviçre üyeleri |
| Scraping / 3. parti RSS | Evet | ❌ | Sözleşmeye aykırı, teknik olarak da engelli |
| **Veri arşivi + import script** | Yarı | ✅ | **Kurulan yol** — resmi, güvenli, tekrarlanabilir |
| Blog → LinkedIn paylaşımı | Evet | ✅ | Ters yön, self-service, ileride eklenebilir |
