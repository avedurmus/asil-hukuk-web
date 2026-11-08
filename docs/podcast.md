# Günlük Podcast Bölümü

Her sabah yayımlanan iki makale, aynı gün **tek bir podcast bölümünde** (5–8
dakika) özetlenir ve Av. Emre Durmuş'un ElevenLabs'ta klonlanmış sesiyle
seslendirilir. Bölüm:

- sitede, o günün iki makalesinin başında "Bu yazıyı dinleyin" oynatıcısıyla yayımlanır;
- sabah özet e-postasında bağlantısı, başlığı ve açıklamasıyla birlikte gönderilir;
  podcast'in barındırıldığı **RSS.com**'a elle yüklenir (aşağıda). RSS.com bölümü
  Spotify'a ve diğer platformlara kendisi dağıtır.

Program sayfası (eski bölümler dahil): <https://rss.com/podcasts/anlatan-avukat/>.
Sitedeki oynatıcılarda "Tüm bölümler" bağlantısı bu sayfaya gider
(`data/podcast.json` → `showUrl`). `spotifyShowUrl` doldurulursa "Spotify'da
dinleyin" bağlantısı da görünür; buraya bir bölümün değil, programın Spotify
adresi (`https://open.spotify.com/show/…`) yazılmalıdır.

Bu belge hem büro için açıklama hem de otomatik görevin podcast adımı için
**çalışma talimatıdır**.

## Nasıl çalışır?

| Parça | Dosya |
|---|---|
| Ayarlar (podcast adı, ses kimliği, yapay zekâ beyanı) | `data/podcast.json` |
| Bölüm dosyaları (konuşma metni, başlık, açıklama) | `content/podcast/YYYY-MM-DD.json` |
| Ses dosyaları | `public/podcast/YYYY-MM-DD.mp3` → `https://asilhukuk.net/podcast/YYYY-MM-DD.mp3` |
| Seslendirme (ElevenLabs) | `scripts/podcast-seslendir.mjs` (`npm run podcast:seslendir`) |
| Yayın öncesi denetim | `scripts/podcast-dogrula.mjs` (`npm run podcast:dogrula`) |
| Sitedeki oynatıcı | `components/PodcastPlayer.tsx`, `lib/podcast.ts` |

Bir bölümü sitede yayından kaldırmak için ilgili `.mp3` dosyasını silmek
yeterlidir. Oynatıcıyı tamamen kapatmak için `data/podcast.json` içinde
`"showOnSite": false` yapın.

## Kurulum (bir kez)

1. **ElevenLabs hesabı:** <https://elevenlabs.io> üzerinden hesap açın. Profesyonel
   ses klonu (Professional Voice Cloning) için Creator veya üstü bir paket gerekir.
   Bir bölüm yaklaşık 5.000–6.500 karakterdir; ayda ~150–200 bin karakter eder.
   Paketi buna göre seçin.
2. **Ses klonu:** Voices → Add a new voice → Professional Voice Clone. Podcast'in
   eski bölümlerinden **en az 30 dakika, tercihen 1–2 saat** temiz kayıt yükleyin.
   Müzik, jenerik ve başka konuşmacının olduğu kısımları çıkarın. ElevenLabs'ın
   istediği doğrulama cümlesini kendiniz okuyun. Eğitim birkaç saat sürebilir.
3. **Ses kimliği (Voice ID):** Klon hazır olunca sesin yanındaki menüden
   "Copy voice ID" ile kimliği kopyalayıp Claude'a verin. Kimlik
   `data/podcast.json` → `elevenlabs.voiceId` alanına yazılır. Bu bir parola
   değildir.
4. **API anahtarı:** ElevenLabs → Developers → API Keys → Create. Yetki olarak
   yalnızca "Text to Speech" yeterlidir. Anahtarı **sohbete yazmayın**. Claude
   oturumda güvenli bir form açar, anahtarı oraya girersiniz. Anahtar bulut
   ortamının ağ ayarlarında saklanır ve yalnızca `api.elevenlabs.io` isteklerine eklenir.
5. **Ses ayarları (isteğe bağlı):** `data/podcast.json` → `elevenlabs.voiceSettings`.
   - `stability` düştükçe tonlama canlanır ama dalgalanabilir.
   - `similarity_boost` yükseldikçe ses size daha çok benzer.
   - `speed` 0,7–1,2 arasıdır.

   İlk bölümleri dinledikten sonra birlikte ayarlarız.

## RSS.com'a yükleme (her gün, ~1 dakika)

1. Sabah e-postasındaki **MP3 bağlantısından** dosyayı indirin.
2. RSS.com'a giriş yapın → **Anlatan Avukat** programı → **New Episode** →
   dosyayı yükleyin.
3. E-postadaki **başlığı** ve **açıklamayı** olduğu gibi yapıştırıp **Publish** deyin.

RSS.com bölümü Spotify'a ve diğer platformlara kendisi gönderir; Spotify'da
görünmesi birkaç saat sürebilir. Bölümü ayrıca Spotify for Creators'a
**yüklemeyin**, aksi hâlde aynı bölüm iki kez görünebilir.

Bölüm sizin sesinizle yayımlandığı için bu adım aynı zamanda son kontroldür:
beğenmediğiniz bölümü yüklemeyin ve Claude'a "şu günün podcast'ini kaldır"
deyin.

---

## Otomatik görev için talimat

Bu adım `docs/otomatik-makaleler.md`'deki 6. adımın içinde, makaleler
denetlendikten **sonra** ve commit'ten **önce** uygulanır. Podcast adımındaki
bir hata makalelerin yayımlanmasını **engellemez**.

### P1. Konuşma metnini yaz

Bugünün tüm makalelerini (`content/makaleler/<tarih>-*.json`) baştan sona oku ve
`content/podcast/<YYYY-MM-DD>.json` dosyasını yaz:

```json
{
  "dateISO": "2026-11-08",
  "title": "Nafaka Ne Zaman Biter? İcra Dosyası Ne Zaman Düşer?",
  "description": "Spotify bölüm açıklaması (düz metin)…",
  "articles": ["<1. makalenin id'si>", "<2. makalenin id'si>"],
  "script": "Seslendirilecek konuşma metni…"
}
```

`audio` ve `durationSec` alanlarını yazma; seslendirme betiği ekler.

**`title`:** İki makalenin sorularını birleştiren kısa başlık. Reklam dili kullanma.

**`description`** (düz metin, en fazla 4.000 karakter):

- Bir cümlelik giriş.
- Her makale için iki-üç cümlelik özet ve `Yazının tamamı: https://asilhukuk.net/blog/<id>` satırı.
- "Bu bölüm bilgilendirme amaçlıdır ve somut durumunuzu değerlendirmez." cümlesi.
- En sonda `data/podcast.json` → `aiDisclosure` metni, **birebir**.

**`script`**, konuşma metnidir:

- **Uzunluk:** 700–950 kelime. Türkçe seslendirmede bu 5–8 dakika eder; denetim
  650–1.050 dışını reddeder.
- **Yapı:**
  1. Açılış: "Merhaba, ben Avukat Emre Durmuş. <podcastName>'a hoş geldiniz."
     Ardından günün iki sorusu tek cümlede.
  2. Birinci makale, yaklaşık yarı süre.
  3. Doğal bir geçiş cümlesi ("Şimdi ikinci konumuza geçelim…").
  4. İkinci makale.
  5. Kapanış: yazıların tamamının asilhukuk.net blogunda olduğu, ardından
     "Bu bölüm bilgilendirme amaçlıdır ve sizin somut durumunuzu değerlendirmez…"
     notu ve teşekkür.
- **Konuşur gibi yaz:** Birinci tekil şahıs, kısa cümleler. Dinleyiciye "siz"
  diye hitap et. Her makalede ana soruya net cevap ver, en önemli bir-iki karardan
  çıkan ilkeyi anlat, iki-üç pratik uyarı ver. Her şeyi anlatmaya çalışma;
  ayrıntı için yazıya yönlendir.
- **Seslendirme kuralları** (denetim kontrol eder):
  - **Rakam yok.** Sayıları yazıyla yaz: "iki bin yirmi altı", "yüzde yirmi beş",
    "yüz yetmiş altıncı madde".
  - **Kısaltma yok.** "TMK m. 176" yerine "Türk Medeni Kanunu'nun yüz yetmiş
    altıncı maddesi"; "İİK" yerine "İcra ve İflas Kanunu". "m.", "E.", "K.",
    "vb." kullanma.
  - **Künye okuma yok.** Esas/karar numarası verme. Kararı daire ve zamanla
    an: "Yargıtay İkinci Hukuk Dairesi'nin iki bin yirmi altı yılı eylül ayında
    verdiği bir kararda…". "Bu yıl" gibi zamanla eskiyen ifadeler yerine yılı söyle.
  - **Yazı işareti yok.** HTML, Markdown, madde işareti, tablo kullanma; parantezden
    kaçın. Paragrafları boş satırla ayır.
- **Meslek kuralları:** Makalelerdeki kurallar burada da geçerlidir. Sonuç
  garantisi verme, reklam niteliğinde ifade kullanma, ücret bilgisi verme,
  "bizi arayın" deme. Makalede olmayan bir hukuki bilgi ekleme; metin yalnızca
  makalelerin özetidir.

### P2. Denetle

```bash
npm run podcast:dogrula -- content/podcast/<YYYY-MM-DD>.json
```

Hata varsa düzelt. Uyarılar (`!`) engel değildir, ama bak.

### P3. Seslendir

`data/podcast.json` içinde `elevenlabs.voiceId` boşsa bu adımı atla. E-postada
"podcast kurulumu tamamlanmadı" de.

```bash
npm run podcast:seslendir -- <YYYY-MM-DD>
```

- Betik `public/podcast/<tarih>.mp3` dosyasını üretir ve bölüm dosyasına
  `audio` ve `durationSec` alanlarını yazar.
- Süre 5–8 dakikanın dışındaysa konuşma metnini düzeltip `--force` ile **bir kez**
  yeniden üret. ElevenLabs kotasını boşa harcamamak için en fazla iki deneme yap.
- 401 hatası anahtarın eksik veya geçersiz olduğu anlamına gelir. 403 veya bağlantı
  hatası ağ izninin olmadığını gösterir. Bu durumlarda yeniden deneme. Bölüm
  dosyasını sessiz olarak (audio alanı olmadan) commit'e ekle, hatayı e-postada bildir.
- Ses dosyası yalnızca bir kez üretilir. Var olan sesi `--force` olmadan ezmez.

### P4. Commit ve e-posta

- `content/podcast/<tarih>.json` ve `public/podcast/<tarih>.mp3` makalelerle
  **aynı commit'e ve aynı PR'a** girer. PR gövdesine bölüm başlığını ve süresini ekle.
- Özet e-postasına **"Podcast bölümü"** başlıklı bir bölüm ekle:
  - bölüm başlığı ve süresi;
  - MP3 bağlantısı `https://asilhukuk.net/podcast/<tarih>.mp3`. Bu bağlantı
    canlı yayın tamamlandıktan sonra çalışır; e-postayı bu yüzden yayın
    `READY` olduktan sonra gönder;
  - RSS.com'a yapıştırılacak açıklama metni (olduğu gibi);
  - "RSS.com → Anlatan Avukat → New Episode → dosyayı yükle → başlık ve açıklamayı yapıştır → Publish" hatırlatması.
- Seslendirme yapılamadıysa nedenini yaz.

## Notlar

- **Depo boyutu:** 64 kbps tek kanallı MP3 ile bölüm başına ~3 MB, yılda ~1 GB
  eder. Depo büyüdüğünde eski ses dosyaları Vercel Blob'a taşınabilir ya da
  yalnızca RSS.com'da bırakılabilir.
- **Yüklemeyi de otomatikleştirmek:** RSS.com'un bölüm yükleme API'si var
  (<https://api.rss.com/v4/docs>, `X-API-Key` başlığıyla). Ancak API şimdilik
  yalnızca RSS.com'un **Network** paketlerinde açık ve beta aşamasında. Paket bu
  seviyeye yükseltilirse görev MP3'ü RSS.com'a kendisi yükleyebilir ve günlük elle
  yükleme adımı kalkar.
