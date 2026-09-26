/** Yazının türü: serbest makale mi, belirli kararlar üzerine içtihat notu mu. */
export type BlogPostKind = "makale" | "ictihat";

/** İçtihat notlarında incelenen kararın künyesi. */
export interface DecisionRef {
    /** "Yargıtay 6. Hukuk Dairesi", "Anayasa Mahkemesi Genel Kurulu" gibi. */
    court: string;
    esas?: string;
    karar?: string;
    /** Başvuru numarası (AYM bireysel başvuruları için). */
    basvuruNo?: string;
    /** "18.03.2014" biçiminde karar tarihi. */
    date: string;
    /** Kararın tam metnine giden bağlantı. */
    url?: string;
    /** Karardan çıkan ilkenin tek cümlelik özeti. */
    principle?: string;
}

/** Yazının dayandığı mevzuat veya diğer kaynaklar. */
export interface SourceRef {
    label: string;
    url?: string;
}

/**
 * Yazı LinkedIn paylaşımından içe aktarıldıysa kaynağını taşır.
 * scripts/import-linkedin-shares.mjs bu alanı doldurur.
 */
export interface ExternalSource {
    platform: "linkedin";
    url?: string;
    /** ISO tarih; paylaşımın LinkedIn'de yayımlandığı an. */
    postedAt?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    dateISO: string;
    /** İçerik veya başlık sonradan güncellendiyse "26 Eylül 2026" biçiminde tarih. */
    updated?: string;
    /** Güncelleme tarihi (ISO); arama motorlarına dateModified olarak bildirilir. */
    updatedISO?: string;
    readTime: string;
    category: string;
    /** Kapak görseli. Belirtilmezse listede tipografik bir kapak üretilir. */
    imageUrl?: string;
    content: string; // HTML string or Markdown
    /** Belirtilmezse "makale" kabul edilir. */
    kind?: BlogPostKind;
    tags?: string[];
    decisions?: DecisionRef[];
    sources?: SourceRef[];
    source?: ExternalSource;
}

/** Blog listesinde kullanılan kategori sırası ve etiketleri. */
export const blogCategories = [
    "Aile Hukuku",
    "İş Hukuku",
    "Ceza Hukuku",
    "Gayrimenkul Hukuku",
    "Ticaret Hukuku",
    "Anayasa Hukuku",
    "Genel",
] as const;

export const blogPosts: BlogPost[] = [
    {
        id: "bir-avukat-ile-neden-calismaliyiz",
        title: "Bir Avukat ile Neden Çalışmalıyız?",
        excerpt: "Hak düşürücü süreler, zorunlu arabuluculuk, delil ve usul kuralları: Hukuki bir sorunla karşılaştığınızda avukattan destek almanın önemi ve avukatla çalışırken dikkat edilmesi gerekenler.",
        date: "26 Eylül 2026",
        dateISO: "2026-09-26",
        readTime: "6 dk okuma",
        category: "Genel",
        tags: ["avukat", "hukuki danışmanlık", "hak düşürücü süre", "arabuluculuk", "vekalet ücreti"],
        sources: [
            { label: "1136 sayılı Avukatlık Kanunu (m. 35, 36, 163, 164)", url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=1136&MevzuatTur=1&MevzuatTertip=5" },
            { label: "6100 sayılı Hukuk Muhakemeleri Kanunu (m. 345)", url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6100&MevzuatTur=1&MevzuatTertip=5" },
            { label: "5271 sayılı Ceza Muhakemesi Kanunu (m. 150)", url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5271&MevzuatTur=1&MevzuatTertip=5" },
        ],
        content: `
            <p>Hukuki bir sorunla karşılaşan pek çok kişinin ilk sorusu şudur: <strong>"Bu işi kendim halledemez miyim?"</strong> Türk hukukunda kural olarak herkes kendi davasını bizzat takip edebilir. Ancak dava açmak, süreleri doğru hesaplamak, delilleri zamanında sunmak ve usul kurallarına uymak, hukuki eğitim ve tecrübe gerektiren işlerdir. Bu yazıda, bir avukatla çalışmanın hangi durumlarda ve neden önem taşıdığını ele alıyoruz.</p>

            <hr class="my-6 border-gray-200" />

            <h3>1. Avukatlık, Kanunla Tanımlanmış Bir Kamu Hizmetidir</h3>
            <p>1136 sayılı Avukatlık Kanunu'nun 35. maddesine göre kanun işleri hakkında mütalaa vermek, hakları dava etmek ve savunmak, adli işlemleri takip etmek ve bunlara ilişkin belgeleri düzenlemek avukatlara aittir. Yargı mercileri önünde başkasını temsil yetkisi de kural olarak baroya kayıtlı avukatlara tanınmıştır.</p>
            <p>Avukat, müvekkilinin sırlarını saklamakla yükümlüdür (Av. K. m. 36). Bu yükümlülük, avukatla paylaştığınız bilgilerin güvence altında olduğu anlamına gelir; sorununuzu tüm ayrıntılarıyla anlatabilmeniz doğru hukuki değerlendirmenin ön koşuludur.</p>

            <h3>2. Süreler Kaçırıldığında Hak Kaybı Geri Dönülmez Olabilir</h3>
            <p>Hukukta pek çok süre <strong>hak düşürücü</strong> niteliktedir; süre geçtikten sonra hak, haklı olsanız bile kullanılamaz. Örneğin:</p>
            <ul>
                <li><strong>İşe iade:</strong> Fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurulmalıdır.</li>
                <li><strong>Tahliye taahhüdü:</strong> Taahhüt edilen tahliye tarihinden itibaren 1 ay içinde icra takibi veya dava yoluna gidilmelidir.</li>
                <li><strong>İstinaf:</strong> Hukuk davalarında ilk derece mahkemesi kararına karşı istinaf süresi, kararın tebliğinden itibaren iki haftadır (HMK m. 345).</li>
            </ul>
            <p>Bu sürelerin başlangıcı, tebligatın usulüne uygun yapılıp yapılmadığı ve tatil günlerine denk gelmesi gibi ayrıntılar sonucu doğrudan etkiler. Süre takibi, avukatlık hizmetinin en temel ve en kritik parçalarından biridir.</p>

            <h3>3. Dava Açmadan Önce Zorunlu Aşamalar Var</h3>
            <p>Günümüzde birçok uyuşmazlıkta doğrudan dava açmak mümkün değildir. İş hukukundan kaynaklanan alacak ve işe iade talepleri, ticari alacaklar, tüketici uyuşmazlıkları ve kira ilişkisinden doğan uyuşmazlıklarda <strong>arabulucuya başvuru dava şartıdır</strong>. Bu aşama atlanırsa dava usulden reddedilir.</p>
            <p>Arabuluculuk görüşmeleri, çoğu zaman uyuşmazlığın mahkemeye gitmeden çözülebileceği en önemli fırsattır. Bu görüşmelere hangi talep ve belgelerle gidileceğinin önceden planlanması, varılacak anlaşmanın içeriğini doğrudan belirler.</p>

            <h3>4. Davayı Kazandıran Çoğu Zaman Delil ve Usuldür</h3>
            <p>Haklı olmak ile hakkı ispat edebilmek aynı şey değildir. Hangi vakıanın hangi delille ispat edileceği, tanık dinletilip dinletilemeyeceği, bilirkişi raporuna süresinde itiraz edilip edilmediği gibi usul kuralları, davanın sonucunu esastan belirleyebilir. Dilekçeler aşamasında ileri sürülmeyen bir iddia veya gösterilmeyen bir delil, sonradan çoğu zaman dikkate alınmaz.</p>

            <h3>5. Bazı Durumlarda Avukat Yardımı Zorunludur</h3>
            <p>Ceza muhakemesinde, şüpheli veya sanık çocuksa, kendisini savunamayacak derecede malulse ya da alt sınırı beş yıldan fazla hapis cezasını gerektiren bir suçtan soruşturma veya kovuşturma yürütülüyorsa, istemi aranmaksızın bir <strong>müdafi</strong> görevlendirilir (CMK m. 150). Ancak müdafi yardımı bu hâllerle sınırlı değildir; şüpheli, ifade verdiği ilk andan itibaren bir avukatın hukuki yardımından yararlanma hakkına sahiptir.</p>

            <h3>6. Önleyici Hukuk: Sorun Çıkmadan Önce Danışmak</h3>
            <p>Avukatlık yalnızca dava takibinden ibaret değildir. Kira, satış, kat karşılığı inşaat veya iş sözleşmesi imzalamadan önce yapılacak bir hukuki inceleme, ileride yıllar sürebilecek bir uyuşmazlığı baştan önleyebilir. Özellikle taşınmaz alım-satımı, şirket kuruluşu ve ortaklık ilişkileri gibi yüksek değerli işlemlerde bu inceleme, maliyetinin çok üzerinde bir güvence sağlar.</p>

            <hr class="my-6 border-gray-200" />

            <h3>Avukatla Çalışırken Nelere Dikkat Edilmeli?</h3>
            <ul>
                <li><strong>Baro kaydını kontrol edin:</strong> Avukatlık yapma yetkisi yalnızca baroya kayıtlı avukatlara aittir. Kayıt durumu, ilgili baronun veya Türkiye Barolar Birliği'nin avukat sorgulama hizmetlerinden öğrenilebilir.</li>
                <li><strong>Ücret sözleşmesini yazılı yapın:</strong> Avukatlık ücretinin kapsamı, ödeme şekli ve masrafların kime ait olduğu yazılı bir sözleşmeyle belirlenmelidir (Av. K. m. 163). Ücret, Türkiye Barolar Birliği tarafından her yıl belirlenen Avukatlık Asgari Ücret Tarifesi'nin altında olamaz.</li>
                <li><strong>Vekaletnamenin kapsamını bilin:</strong> Vekaletname notere düzenletilir; avukata hangi işlemler için yetki verildiği vekaletnamede açıkça yer alır.</li>
                <li><strong>Karşı vekalet ücretini sorun:</strong> Davanın kazanılması hâlinde mahkemece karşı tarafa yükletilen vekalet ücreti, kanun gereği avukata aittir (Av. K. m. 164). Bu konunun sözleşmede açıkça düzenlenmesi, sonradan doğabilecek yanlış anlamaları önler.</li>
                <li><strong>Bilgi ve belgeleri eksiksiz paylaşın:</strong> Size karşı olan bilgiler de dahil olmak üzere tüm ayrıntıları avukatınızla paylaşmanız, gerçekçi bir değerlendirme ve doğru strateji için gereklidir.</li>
            </ul>

            <blockquote class="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 italic text-gray-700">
                <strong>Özetle:</strong> Avukatla çalışmak, bir uyuşmazlığı kazanmanın garantisi değildir; hiçbir avukat dava sonucu için güvence veremez. Ancak sürelerin doğru takip edilmesi, zorunlu aşamaların eksiksiz tamamlanması ve iddiaların doğru delillerle ileri sürülmesi, hakkınıza ulaşma ihtimalini önemli ölçüde artırır.
            </blockquote>

            <p><em>Not: Bu yazı genel bilgilendirme amaçlıdır ve somut olaylar için hukuki danışmanlık yerine geçmez.</em></p>
        `
    },
    {
        id: "anlasmali-bosanma-davasi-ne-kadar-surer",
        title: "Anlaşmalı Boşanma Davası Ne Kadar Sürer? 2026 Güncel Süreç",
        excerpt: "Anlaşmalı boşanma davası şartları, süreci ve gerekli belgeler hakkında detaylı rehber. Tek celsede boşanmak mümkün mü?",
        date: "27 Aralık 2024",
        dateISO: "2024-12-27",
        updated: "26 Eylül 2026",
        updatedISO: "2026-09-26",
        readTime: "4 dk okuma",
        category: "Aile Hukuku",
        imageUrl: "/images/anlasmali-bosanma-header.png",
        content: `
            <p>Anlaşmalı boşanma, evlilik birliğinin temelden sarsılması nedeniyle eşlerin boşanma ve boşanmanın mali sonuçları (nafaka, tazminat) ile çocukların durumu (velayet) konusunda anlaşarak mahkemeye başvurmalarıdır. 4721 sayılı Türk Medeni Kanunu'nun 166. maddesinde düzenlenmiştir.</p>

            <h3>Anlaşmalı Boşanma Şartları Nelerdir?</h3>
            <ul>
                <li><strong>Evlilik Süresi:</strong> Evliliğin en az 1 yıl sürmüş olması gerekir.</li>
                <li><strong>Başvuru:</strong> Eşlerin birlikte başvurması veya bir eşin açtığı davayı diğerinin kabul etmesi gerekir.</li>
                <li><strong>Hakim Huzurunda İrade Beyanı:</strong> Hakim, tarafları bizzat dinleyerek iradelerinin serbestçe açıklandığına kanaat getirmelidir.</li>
                <li><strong>Protokolün Onaylanması:</strong> Boşanmanın mali sonuçları ve çocukların durumu konusunda taraflarca hazırlanan protokolün hakim tarafından uygun bulunması gerekir.</li>
            </ul>

            <h3>Anlaşmalı Boşanma Süreci Nasıl İşler?</h3>
            <p>Süreç, yetkili Aile Mahkemesine sunulan "Anlaşmalı Boşanma Protokolü" ve dava dilekçesi ile başlar. Mahkeme yoğunluğuna göre duruşma günü verilir. Genellikle duruşmalar 1-3 ay içerisinde yapılır. İstanbul Kartal Adliyesi gibi yoğun adliyelerde bu süre değişebilir.</p>

            <h3>Tek Celsede Boşanmak Mümkün Mü?</h3>
            <p>Evet, anlaşmalı boşanma davaları, şartların sağlanması ve hakimin protokolü onaylaması durumunda genellikle tek celsede sonuçlanır.</p>

            <p><em>Not: Bu yazı bilgilendirme amaçlıdır. Hukuki hak kaybı yaşamamak için bir avukattan profesyonel destek almanız önerilir.</em></p>
        `
    },
    {
        id: "ise-iade-davasi-sartlari",
        title: "İşe İade Davası Şartları ve Süreci",
        excerpt: "Haksız yere işten çıkarılan işçilerin hakları nelerdir? İşe iade davası açma süresi ve arabuluculuk şartı.",
        date: "20 Aralık 2024",
        dateISO: "2024-12-20",
        readTime: "5 dk okuma",
        category: "İş Hukuku",
        imageUrl: "/images/ise-iade-header.png",
        content: `
            <p>İş güvencesi kapsamında olan işçiler, geçerli bir neden olmaksızın işten çıkarıldıklarında işe iade davası açabilirler. İş Kanunu, işverenin fesih (işten çıkarma) yetkisini sınırlandırmıştır.</p>

            <h3>İşe İade Davası Açma Şartları</h3>
            <ul>
                <li><strong>İş Kanunu'na Tabi Olmak:</strong> İşçi İş Kanunu kapsamında çalışmalıdır.</li>
                <li><strong>Kıdem:</strong> İşçinin en az 6 aylık kıdemi olmalıdır.</li>
                <li><strong>İşyeri Büyüklüğü:</strong> İşyerinde en az 30 işçi çalışıyor olmalıdır.</li>
                <li><strong>Belirsiz Süreli Sözleşme:</strong> İşçi ile işveren arasındaki sözleşme belirsiz süreli olmalıdır.</li>
                <li><strong>Fesih Nedeni:</strong> İşveren fesih için geçerli bir sebep bildirmemiş veya bildirdiği sebep geçerli değilse dava açılabilir.</li>
            </ul>

            <h3>Dava Açma Süresi ve Arabuluculuk</h3>
            <p>İş sözleşmesi feshedilen işçi, fesih bildiriminin tebliğinden itibaren <strong>1 ay içinde</strong> arabulucuya başvurmak zorundadır. Arabuluculuk sürecinde anlaşma sağlanamazsa, son tutanağın düzenlendiği tarihten itibaren 2 hafta içinde iş mahkemesinde dava açılmalıdır.</p>

            <p>Süresi içinde başvuru yapılmaması hak düşürücü niteliktedir ve davanın reddine sebep olur. Bu nedenle sürecin uzman bir avukatla takibi önemlidir.</p>
        `
    },
    {
        id: "bosanma-surecinde-mal-kacirma",
        title: "Boşanma Sürecinde Mal Kaçırma ve Hukuki Çareler",
        excerpt: "Boşanma sürecinde mal kaçırma, Edinilmiş Mallara Katılma Rejimi kapsamında en sık karşılaşılan sorunlardan biridir. Hukuki zemin, önleyici tedbirler ve alacak haklarını inceliyoruz.",
        date: "7 Ocak 2026",
        dateISO: "2026-01-07",
        readTime: "6 dk okuma",
        category: "Aile Hukuku",
        imageUrl: "/images/bosanma-mal-kacirma.png",
        content: `
            <p>Boşanma sürecinde mal kaçırma (eşlerden birinin mal varlığını diğerinin haklarını kısıtlamak amacıyla elden çıkarması), <strong>"Edinilmiş Mallara Katılma Rejimi"</strong> kapsamında en sık karşılaşılan sorunlardan biridir. Türk Medeni Kanunu (TMK), bu tür kötü niyetli devirlere karşı diğer eşin "Katılma Alacağını" koruyan güçlü mekanizmalar öngörmüştür.</p>

            <p>Bu süreci hukuki zemin, önleyici tedbirler ve tasfiye sırasındaki haklar olarak üç ana başlıkta inceleyebiliriz:</p>

            <hr class="my-6 border-gray-200" />

            <h3>1. Hukuki Zemin: Eklenecek Değerler (TMK m. 229)</h3>

            <p>Mal rejiminin tasfiyesinde, kâğıt üzerinde mal varlığı "yok" veya "azalmış" görünse bile, kanun koyucu belirli şartlarda bu malları <strong>sanki hiç elden çıkarılmamış gibi</strong> hesaba katar. Buna <strong>"Eklenecek Değerler"</strong> denir.</p>

            <p>İki temel durum söz konusudur:</p>

            <ul>
                <li><strong>Son 1 Yıl İçindeki Karşılıksız Kazandırmalar:</strong> Mal rejiminin sona ermesinden (genellikle boşanma davasının açıldığı tarih) önceki bir yıl içinde, diğer eşin rızası olmadan yapılan olağan hediyeler dışındaki karşılıksız kazandırmalar (bağışlar vb.), tasfiye hesabına dahil edilir.</li>
                <li><strong>Kötü Niyetli Devirler (Süre Sınırı Yoktur):</strong> Bir eşin, <strong>diğer eşin katılma alacağını azaltmak kastıyla</strong> yaptığı devirler, 1 yıl öncesinde yapılmış olsa dahi hesaba katılır. Burada kilit nokta "kastın" ispatıdır.</li>
            </ul>

            <h3>2. Dava Öncesi ve Dava Sırasında Alınacak Tedbirler</h3>

            <p>Mal kaçırmayı engellemek veya kaçırılan malın takibini yapmak için atılması gereken proaktif adımlar şunlardır:</p>

            <h4>A. İhtiyati Tedbir Talebi</h4>

            <p>Boşanma davası açılırken veya mal rejimi tasfiyesi davası ile birlikte, mevcut malların devrini önlemek için mahkemeden <strong>İhtiyati Tedbir</strong> talep edilmelidir.</p>

            <ul>
                <li><strong>Tapu Kayıtlarına Şerh:</strong> Gayrimenkuller üzerine "davalıdır" şerhi veya tedbir konulması.</li>
                <li><strong>Banka Hesaplarına Bloke:</strong> Mevduat hesaplarına tedbir konulması.</li>
                <li><strong>Araç Kayıtlarına Tedbir:</strong> Trafik tescil kayıtlarına şerh düşülmesi.</li>
            </ul>

            <blockquote class="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 italic text-gray-700">
                <strong>Önemli Not:</strong> Yargıtay uygulamalarında, sadece boşanma davası içerisinde talep edilen mal rejimine ilişkin tedbirler bazen reddedilebilmektedir. Bu nedenle, mal rejimi tasfiyesi davasının boşanma ile birlikte açılması (harcı yatırılarak) ve tedbirin bu dosya üzerinden istenmesi daha garantili bir yoldur.
            </blockquote>

            <h4>B. Aile Konutu Şerhi</h4>

            <p>Eğer taşınmaz aile konutu niteliğindeyse ve henüz satılmadıysa, Tapu Müdürlüğü'ne başvurarak (dava açmadan da yapılabilir) doğrudan <strong>Aile Konutu Şerhi</strong> koydurulabilir. Bu şerh, diğer eşin rızası olmadan evin satılmasını veya ipotek edilmesini engeller.</p>

            <h3>3. Mal Rejiminin Tasfiyesi ve Alacağın Tahsili</h3>

            <p>Eş malı kaçırmış olsa bile, tasfiye davasında izlenecek strateji şudur:</p>

            <ol>
                <li><strong>Muvazaa İddiası (TBK m. 19):</strong> Eş, malı satmış gibi gösterip aslında bağışladıysa veya düşük bedelle tanıdık birine devrettiyse, bu işlemin muvazaalı (danışıklı) olduğu ve iptali gerektiği ileri sürülebilir.</li>
                <li><strong>Hesaba Dahil Etme:</strong> Mal fiilen elden çıkmış olsa bile, o malın <strong>devir tarihindeki değil, tasfiye tarihindeki (karara en yakın) sürüm değeri</strong> üzerinden hesaplama yapılır. Yani mal kaçıran eş, mal elinde olmasa bile, o malın bugünkü değeri üzerinden diğer eşe "Katılma Alacağı" ödemek zorunda kalır.</li>
                <li><strong>Üçüncü Kişiye Sorumluluk Yükleme (TMK m. 241):</strong> Eğer borçlu eşin mal varlığı, diğer eşin katılma alacağını ödemeye yetmiyorsa; karşılıksız kazandırma yapılan veya kötü niyetle mal devredilen <strong>üçüncü kişiden</strong> de eksik kalan miktar talep edilebilir. Buna "Üçüncü Kişiye Rücu" denir.</li>
            </ol>

            <h3>4. İspat Yükü ve Deliller</h3>

            <p>Mal kaçırma iddiasında ispat yükü, bunu iddia eden eştedir. Kullanılabilecek en güçlü deliller:</p>

            <ul>
                <li><strong>Banka Kayıtları:</strong> Davadan hemen önce çekilen yüklü miktarlar veya yapılan transferler.</li>
                <li><strong>Tapu Kayıtları (TAK BİS):</strong> Geçmişe dönük pasif tapu kayıtlarının celbi (kimin üzerine, ne zaman, kime devredilmiş?).</li>
                <li><strong>Tanık Beyanları:</strong> "Malı kaçıracağını söylüyordu" şeklindeki görgüye dayalı tanıklıklar.</li>
                <li><strong>Hayatın Olağan Akışı:</strong> Eşin malı sattığı paranın nereye harcandığının belgelenememesi (paranın buharlaşması), mal kaçırma kastının varlığına karinedir.</li>
            </ul>

            <hr class="my-6 border-gray-200" />

            <h3>Özet Tablo: Eyleme Göre Hukuki Yol</h3>

            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-600 border border-gray-200">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 border-r border-b">Durum</th>
                            <th scope="col" class="px-6 py-3 border-b">Hukuki Çare</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Mal henüz satılmadı</td>
                            <td class="px-6 py-4">Aile Konutu Şerhi veya Mahkemeden İhtiyati Tedbir</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Mal 1 yıl içinde bağışlandı</td>
                            <td class="px-6 py-4">TMK m. 229/1 uyarınca Eklenecek Değer</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Mal kötü niyetle (kasıtlı) satıldı</td>
                            <td class="px-6 py-4">TMK m. 229/2 uyarınca Eklenecek Değer</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Satış "danışıklı" (sahte) yapıldı</td>
                            <td class="px-6 py-4">TBK m. 19 Muvazaa Nedeniyle Tapu İptal ve Tescil</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Eşin parası yetmiyor</td>
                            <td class="px-6 py-4">TMK m. 241 Üçüncü Kişiye Dava Açma Hakkı</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },
    {
        id: "kiraci-tahliye-davasi-sartlari-suresi",
        title: "Kiracı Tahliye Davası Nasıl Açılır? Şartları ve Süresi 2026",
        excerpt: "Kiracı tahliye davası şartları, tahliye taahhütnamesi ile tahliye, kiranın ödenmemesi nedeniyle tahliye ve zorunlu arabuluculuk süreci hakkında güncel hukuki rehber.",
        date: "13 Haziran 2026",
        dateISO: "2026-06-13",
        readTime: "7 dk okuma",
        category: "Gayrimenkul Hukuku",
        imageUrl: "/images/justice-symbol.png",
        content: `
            <p>Son yıllarda yaşanan ekonomik gelişmeler ve kira fiyatlarındaki artışlar, ev sahibi ile kiracı arasındaki uyuşmazlıkları zirveye taşımıştır. Bu kapsamda en çok merak edilen konulardan biri de <strong>"Kiracı Tahliye Davası"</strong> süreçleridir. Türk Borçlar Kanunu (TBK), kiracının korunması ilkesini benimsemiş olsa da belirli şartların varlığı halinde ev sahibine kiracıyı tahliye etme hakkı tanımıştır.</p>

            <p>Bu rehberimizde, 2026 yılı güncel mevzuatı ve Yargıtay kararları ışığında kiracı tahliye davası şartlarını, tahliye sebeplerini ve sürecin ne kadar sürdüğünü detaylıca ele alacağız.</p>

            <hr class="my-6 border-gray-200" />

            <h3>1. En Sık Kullanılan Kiracı Tahliye Sebepleri</h3>
            <p>Ev sahibinin kiracıyı keyfi olarak evden çıkarması yasal olarak mümkün değildir. Tahliye için kanunda sınırlı olarak sayılan sebeplerden en az birinin gerçekleşmiş olması gerekir:</p>

            <h4>A. Yazılı Tahliye Taahhütnamesi ile Tahliye</h4>
            <p>Kiracının, kiralananı belirli bir tarihte boşaltmayı yazılı olarak üstlendiği belgedir. Tahliye taahhütnamesinin geçerli olabilmesi için şu şartlar zorunludur:</p>
            <ul>
                <li><strong>Yazılı Olmalıdır:</strong> Sözlü taahhüt geçersizdir.</li>
                <li><strong>Serbest İradeyle İmzalanmalıdır:</strong> Kiracı baskı altında olmadan imzalamış olmalıdır.</li>
                <li><strong>Düzenleme Tarihi Kira Sözleşmesinden Sonra Olmalıdır:</strong> En kritik şart budur. Kira sözleşmesi ile aynı gün veya sözleşme imzalanmadan önce alınan taahhütnameler Yargıtay kararlarına göre geçersiz sayılır. Tahliye tarihi ise net olarak belirtilmelidir.</li>
            </ul>

            <h4>B. İhtiyaç Nedeniyle Tahliye (Gereksinim)</h4>
            <p>Ev sahibinin kendisi, eşi, altsoyu (çocukları, torunları), üstsoyu (anne, babası) veya kanunen bakmakla yükümlü olduğu diğer kişiler için konut veya işyeri gereksinimi ortaya çıkarsa tahliye davası açılabilir. Bu ihtiyacın <strong>gerçek, samimi ve zorunlu</strong> olması şarttır. Geçici veya spekülatif ihtiyaçlar tahliye nedeni sayılmaz.</p>

            <h4>C. İki Haklı İhtar Nedeniyle Tahliye</h4>
            <p>Bir kira yılı içerisinde, kira bedelinin ödenmemesi nedeniyle kiracıya farklı aylarda <strong>iki haklı ihtarname</strong> çekilmişse, ev sahibi kira yılının bitiminden itibaren 1 ay içinde tahliye davası açabilir. İhtarnamelerin noter kanalıyla çekilmesi ispat kolaylığı açısından çok önemlidir.</p>

            <hr class="my-6 border-gray-200" />

            <h3>2. Kira Uyuşmazlıklarında Zorunlu Arabuluculuk Şartı</h3>
            <p>Yasal düzenlemeler uyarınca, kira uyuşmazlıklarında doğrudan dava açılması mümkün değildir. <strong>Tahliye davası açmadan önce arabulucuya başvurulması zorunludur.</strong></p>
            <p>Arabuluculuk sürecinde taraflar anlaşamazsa, arabulucunun düzenlediği "anlaşmazlık son tutanağı" ile birlikte Sulh Hukuk Mahkemesinde dava açılabilir. Arabuluculuk süreci genellikle 3 ila 4 hafta içerisinde tamamlanmaktadır.</p>

            <h3>3. Kiracı Tahliye Davası Ne Kadar Sürer?</h3>
            <p>Tahliye davalarının süresi, dayanılan tahliye sebebine ve mahkemenin iş yoğunluğuna göre değişiklik gösterir:</p>

            <div class="overflow-x-auto my-6">
                <table class="w-full text-sm text-left text-gray-600 border border-gray-200">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 border-r border-b">Tahliye Gerekçesi</th>
                            <th scope="col" class="px-6 py-3 border-b">Ortalama Dava Süresi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Geçerli Tahliye Taahhütnamesi</td>
                            <td class="px-6 py-4">3 - 6 Ay (İlamsız İcra takibi ile daha hızlı)</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">İhtiyaç (Gereksinim) Nedeniyle Tahliye</td>
                            <td class="px-6 py-4">8 - 14 Ay</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">İki Haklı İhtar Nedeniyle Tahliye</td>
                            <td class="px-6 py-4">10 - 18 Ay</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">Kira Bedelinin Ödenmemesi (İcra Takibi)</td>
                            <td class="px-6 py-4">6 - 10 Ay</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <blockquote class="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 italic text-gray-700">
                <strong>Profesyonel Tavsiye:</strong> Tahliye taahhütnamelerinde süreler çok katıdır. Taahhüt edilen tarihten itibaren <strong>1 ay içinde</strong> icra takibi veya dava açılmazsa hak düşer ve taahhütname geçerliliğini yitirir. Bu nedenle süre takibinin profesyonel bir gayrimenkul avukatı tarafından yapılması kritik önem taşır.
            </blockquote>

            <h3>4. Görevli ve Yetkili Mahkeme</h3>
            <p>Kiracı tahliye davalarında görevli mahkeme **Sulh Hukuk Mahkemesi**'dir. Yetkili mahkeme ise taşınmazın bulunduğu yer mahkemesidir. Örneğin, İstanbul Kartal'daki bir taşınmaz için açılacak tahliye davasında **İstanbul Anadolu (Kartal) Sulh Hukuk Mahkemeleri** yetkilidir.</p>

            <p><em>Uyarı: Bu makaledeki bilgiler genel bilgilendirme amaçlı olup yasal danışmanlık yerine geçmez. Kira hukuku süreleri ve usul kuralları çok sıkı olan bir alandır; hak kaybına uğramamak adına bir avukata danışmanız önerilir.</em></p>
        `
    },
    {
        id: "sirketlerde-alacak-tahsili-ve-icra-takibi",
        title: "Şirketlerde Alacak Tahsili ve İcra Takibi Rehberi",
        excerpt: "Şirketlerin fatura ve cari hesap alacaklarının tahsili, ihtiyati haciz kararı, ticari arabuluculuk ve icra takibi süreçleri hakkında şirket yöneticileri için yasal rehber.",
        date: "13 Haziran 2026",
        dateISO: "2026-06-13",
        readTime: "8 dk okuma",
        category: "Ticaret Hukuku",
        imageUrl: "/images/justice-symbol.png",
        content: `
            <p>Ticari hayatta nakit akışının düzenli sağlanması, şirketlerin sürdürülebilirliği açısından hayati öneme sahiptir. Ancak mal teslimi veya hizmet ifasına rağmen zamanında ödenmeyen faturalar, cari hesap alacakları ve karşılıksız çek/senetler şirketleri ciddi finansal dar boğazlara sürükleyebilir. Bu gibi durumlarda, yasal süreçlerin hızlı ve doğru işletilmesi alacağın tahsil kabiliyetini doğrudan belirler.</p>

            <p>Bu rehberimizde, şirketlerin ticari alacaklarını tahsil ederken kullanabileceği hukuki mekanizmaları, icra takibi yöntemlerini ve **ihtiyati haciz** gibi koruyucu önlemleri şirket yöneticileri için sadeleştirerek ele alacağız.</p>

            <hr class="my-6 border-gray-200" />

            <h3>1. Ticari Alacak Türleri ve Belgelendirme</h3>
            <p>Bir icra takibinin başarıya ulaşmasındaki en önemli unsur alacağın belgelendirilmesidir. Şirketlerin en sık karşılaştığı alacak türleri şunlardır:</p>
            <ul>
                <li><strong>Fatura ve Cari Hesap Alacakları:</strong> Satılan mal veya verilen hizmet karşılığında düzenlenen faturaya ve taraflar arasındaki cari hesap ekstresine dayanan alacaklardır. Faturaya 8 gün içinde itiraz edilmemesi, içeriğinin kabul edildiği anlamına gelir (TTK m. 21/2).</li>
                <li><strong>Kambiyo Senetleri (Çek, Senet/Bono):</strong> Ticari işlemlerde en güçlü güvencelerden biridir. Kambiyo senetlerine dayalı icra takipleri, normal takiplere göre çok daha hızlı sonuçlanır.</li>
                <li><strong>Sözleşmeye Dayalı Alacaklar:</strong> İki şirket arasında imzalanmış, teslim ve ödeme vadelerini belirten yazılı sözleşmelerdir.</li>
            </ul>

            <h3>2. Alacak Tahsilinde Hızlı Çözüm: İhtiyati Haciz Kararı</h3>
            <p>Borçlunun mallarını kaçırmasını veya gizlemesini önlemek amacıyla, henüz icra takibi kesinleşmeden önce mahkemeden alınan geçici hukuki koruma kararına **İhtiyati Haciz** denir.</p>
            <p>Şirketlerin alacaklarını garanti altına alması için en etkili hukuki yoldur. İhtiyati haciz kararı alabilmek için:</p>
            <ul>
                <li>Alacağın vadesinin gelmiş (muaccel) olması,</li>
                <li>Alacağın bir rehinle teminat altına alınmamış olması,</li>
                <li>Alacağın varlığına dair mahkemeye yaklaşık bir ispat sunulması (fatura, sevk irsaliyesi, sözleşme vb.) gerekir.</li>
            </ul>
            <p>Karar alındıktan sonra 10 gün içinde icra dairesine başvurularak borçlunun banka hesaplarına, araçlarına ve tapularına **anında fiili veya kaydi haciz** uygulanır. Bu durum, borçlu şirketi anlaşma masasına oturmaya zorlayan en büyük kozdur.</p>

            <hr class="my-6 border-gray-200" />

            <h3>3. İcra Takip Yolları ve İtiraz Süreçleri</h3>
            <p>Şirketler alacakları için temelde iki farklı icra takibi yolu seçebilir:</p>

            <h4>A. Genel Haciz Yoluyla İlamsız Takip</h4>
            <p>Herhangi bir mahkeme kararı veya kambiyo senedi olmadan, sadece fatura veya sözleşmeye dayanarak (hatta belgesiz olarak bile) açılabilen takip türüdür.
            Borçluya ödeme emri gönderilir. **Borçlunun ödeme emrine 7 gün içinde itiraz etme hakkı vardır.** İtiraz edildiği anda icra takibi durur.</p>

            <h4>B. Kambiyo Senetlerine Özgü Haciz Yolu</h4>
            <p>Alacağın çek veya bonoya (senet) dayanması durumunda açılır. Borçlunun itiraz süresi **5 gündür** ve itiraz etmek takibi kendiliğinden durdurmaz (satışı durdurur). İtiraz ancak İcra Mahkemesine yapılabilir.</p>

            <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6">
                <p className="text-amber-800 text-sm md:text-base">
                    <strong>Kritik Uyarı:</strong> İlamsız icra takiplerinde borçlu şirketin kötü niyetli olarak borca itiraz etmesi durumunda, alacaklı şirket **İtirazın İptali Davası** açmalıdır. Mahkeme alacaklıyı haklı bulursa, borçlu şirket alacağın yanı sıra en az **%20 oranında İcra İnkar Tazminatı** ödemeye mahkum edilir.
                </p>
            </div>

            <h3>4. Zorunlu Ticari Arabuluculuk Süreci</h3>
            <p>Türk Ticaret Kanunu (TTK m. 5/A) uyarınca, konusu bir miktar paranın ödenmesi olan ticari uyuşmazlıklarda dava açmadan önce **arabuluculuk sürecinin tamamlanmış olması dava şartıdır.**</p>
            <p>İcra takibine itiraz edilmesi sonucu açılacak İtirazın İptali davalarından önce de ticari arabulucuya başvurulması zorunludur. Arabuluculuk aşamasında anlaşma sağlanırsa düzenlenen tutanak mahkeme ilamı hükmündedir ve doğrudan icra edilebilir.</p>

            <h3>Özet Tablo: Ticari Alacak Yönetim Adımları</h3>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-sm text-left text-gray-600 border border-gray-200">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 border-r border-b">Aşama</th>
                            <th scope="col" class="px-6 py-3 border-r border-b">Yapılacak İşlem</th>
                            <th scope="col" class="px-6 py-3 border-b">Hukuki Sonuç</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">1. Adım</td>
                            <td class="px-6 py-4 border-r">Faturanın Karşı Tarafa Tebliği & Cari Hesap Mutabakatı</td>
                            <td class="px-6 py-4">8 günlük itiraz süresi başlar, alacak kesinleşir.</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">2. Adım</td>
                            <td class="px-6 py-4 border-r">Asliye Ticaret Mahkemesinden İhtiyati Haciz Talebi</td>
                            <td class="px-6 py-4">Dava açılmadan borçlunun mal kaçırması engellenir.</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">3. Adım</td>
                            <td class="px-6 py-4 border-r">İlamsız İcra Takibinin Başlatılması</td>
                            <td class="px-6 py-4">Borçluya 7 günlük ödeme/itiraz süresi verilir.</td>
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">4. Adım</td>
                            <td class="px-6 py-4 border-r">Borçlu İtiraz Ederse: Ticari Arabuluculuğa Başvuru</td>
                            <td class="px-6 py-4">Dava şartı yerine getirilir, anlaşma aranır.</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r">5. Adım</td>
                            <td class="px-6 py-4 border-r">Anlaşamama Halinde: İtirazın İptali Davası</td>
                            <td class="px-6 py-4">Borç kesinleşir, haciz işlemleri devam eder + %20 tazminat alınır.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p><em>Not: Şirketlerin alacak takipleri yüksek meblağlar içerdiğinden, usul hataları alacağın tamamen tahsil edilemez hale gelmesine sebep olabilir. Sürecin başından itibaren uzman bir ticaret ve icra avukatı ile çalışılması firmanızın finansal güvenliği için elzemdir.</em></p>
        `
    },
    {
        id: "hagb-2026-degisikligi-cmk-231",
        title: "HAGB Yeniden Yazıldı: CMK m. 231'de 2026 Değişikliği Ne Getirdi?",
        excerpt: "16 Temmuz 2026 tarihli 7589 sayılı Kanun, hükmün açıklanmasının geri bırakılması kurumunu baştan düzenledi. Sanığın kabulü şartından denetim süresi ihlalinin sonuçlarına kadar değişen her şey.",
        date: "12 Eylül 2026",
        dateISO: "2026-09-12",
        readTime: "7 dk okuma",
        category: "Ceza Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/hagb-cmk-231.svg",
        tags: ["HAGB", "CMK 231", "denetim süresi", "istinaf", "7589 sayılı Kanun"],
        sources: [
            {
                label: "5271 sayılı Ceza Muhakemesi Kanunu m. 231 (16.07.2026 t. 7589 s. K. ile değişik)",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5271&MevzuatTur=1&MevzuatTertip=5",
            },
            {
                label: "5271 sayılı Ceza Muhakemesi Kanunu geçici m. 6 (02.03.2024 t. 7499 s. K.)",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5271&MevzuatTur=1&MevzuatTertip=5",
            },
        ],
        content: `
            <p>Hükmün açıklanmasının geri bırakılması (HAGB), 2006 yılından bu yana Türk ceza muhakemesinin en çok tartışılan kurumlarından biriydi. Kurumun en ağır eleştirisi, kararların esas yönünden hiçbir denetimden geçmemesiydi: itiraz mercii yalnızca şeklî koşullarla sınırlı bir inceleme yapıyor, mahkûmiyetin esasına dair hiçbir değerlendirme yapılmıyordu.</p>

            <p>Bu yapı önce 2 Mart 2024 tarihli 7499 sayılı Kanun'la kanun yolu bakımından, ardından <strong>16 Temmuz 2026 tarihli 7589 sayılı Kanun'la maddenin tamamı bakımından</strong> yeniden düzenlendi. Aşağıda değişikliğin uygulamaya yansıyan yönlerini aktarıyorum.</p>

            <div class="ictihat-ilke">
                <p><strong>Özetle:</strong> CMK m. 231'in 5 ilâ 14. fıkraları 7589 sayılı Kanun'la yeniden yazıldı. Sanığın kabulü şartı metinden çıkarıldı, denetim süresi ihlalinde mahkemeye ara çözümler üretme yetkisi tanındı, kanun yolu istinaf olarak korundu ve kurumun uygulanamayacağı suçlar yeniden belirlendi.</p>
            </div>

            <h2>1. Temel koşullar: sanığın kabulü şartı metinden çıktı</h2>

            <p>Yeni düzenlemeye göre yargılama sonunda hükmolunan ceza <strong>iki yıl veya daha az süreli hapis ya da adlî para cezası</strong> ise mahkemece HAGB'ye karar verilebilir. Kurum, müsadereye ilişkin hükümler hariç, kurulan hükmün sanık hakkında bir hukukî sonuç doğurmamasını ifade eder.</p>

            <p>Karar verilebilmesi için aranan üç koşul şudur:</p>

            <ul>
                <li>Sanığın daha önce kasıtlı bir suçtan mahkûm olmamış bulunması,</li>
                <li>Mahkemece, sanığın kişilik özellikleri ile duruşmadaki tutum ve davranışları göz önünde bulundurularak yeniden suç işlemeyeceği hususunda kanaate varılması,</li>
                <li>Suçun işlenmesiyle mağdurun veya kamunun uğradığı zararın aynen iade, suçtan önceki hâle getirme veya tazmin suretiyle tamamen giderilmesi.</li>
            </ul>

            <p>Buradaki en dikkat çekici nokta, eski metinde yer alan <em>"sanığın kabul etmemesi hâlinde hükmün açıklanmasının geri bırakılmasına karar verilmez"</em> cümlesinin yeni düzenlemede bulunmamasıdır. Sanığın rızası artık maddede bir koşul olarak sayılmamaktadır.</p>

            <p>Zararın derhal giderilemediği hâller için kanun bir kapı bırakmıştır: sanık hakkında, zararı denetim süresince <strong>aylık taksitler hâlinde</strong> ödemek suretiyle tamamen gidermesi koşuluyla da HAGB kararı verilebilir.</p>

            <h2>2. Denetim süresi ve yükümlülükler</h2>

            <p>HAGB kararı verilen sanık <strong>beş yıl süreyle denetim süresine</strong> tâbi tutulur. Bu süre içinde kişi hakkında kasıtlı bir suç nedeniyle bir daha HAGB kararı verilemez.</p>

            <p>Mahkeme, bu süre içinde bir yılı aşmamak üzere belirleyeceği bir süreyle denetimli serbestlik tedbiri olarak sanığın bir eğitim programına devam etmesine, gözetim altında ücret karşılığı çalıştırılmasına ya da belli yerlere gitmekten yasaklanmasına karar verebilir. Denetim süresi içinde dava zamanaşımı durur.</p>

            <h2>3. Denetim süresinin ihlali: artık "ya hep ya hiç" değil</h2>

            <p>Denetim süresi içinde kasten yeni bir suç işlenmediği ve yükümlülüklere uyulduğu takdirde, açıklanması geri bırakılan hüküm ortadan kaldırılarak <strong>davanın düşmesine</strong> karar verilir.</p>

            <p>Asıl yenilik ihlal hâlindedir. Eski uygulamada denetim süresinin ihlali hükmün aynen açıklanması sonucunu doğuruyordu. Yeni düzenlemede mahkeme hükmü açıklar; ancak kendisine yüklenen yükümlülükleri yerine getiremeyen sanığın durumunu değerlendirerek:</p>

            <ul>
                <li>cezanın <strong>yarısına kadar</strong> belirleyeceği bir kısmının infaz edilmemesine,</li>
                <li>ya da koşullarının varlığı hâlinde hükümdeki hapis cezasının ertelenmesine veya seçenek yaptırımlara çevrilmesine</li>
            </ul>

            <p>karar vererek <strong>yeni bir mahkûmiyet hükmü</strong> kurabilir. Açıklanan veya yeni kurulan hükme itiraz edilebilir; itiraz mercii ancak bu fıkradaki koşullarla sınırlı bir değerlendirme yapabilir.</p>

            <p>Bu düzenleme, denetim süresinin sonuna doğru işlenen küçük bir ihlal yüzünden cezanın tamamının infaz edilmesi gibi orantısız sonuçların önüne geçmeyi amaçlamaktadır.</p>

            <h2>4. Kanun yolu: itirazdan istinafa</h2>

            <p>CMK m. 272/3'teki istinaf sınırları saklı kalmak üzere, HAGB kararına karşı <strong>istinaf</strong> yoluna başvurulabilir. Bölge adliye mahkemesince verilen kararlar hakkında CMK m. 286 hükümleri uygulanır. Karar ilk derece mahkemesi sıfatıyla bölge adliye mahkemesi veya Yargıtay tarafından verilmişse temyiz yolu açıktır.</p>

            <p>Kritik nokta inceleme kapsamındadır: istinaf ve temyiz yolunda karar ve hüküm, <strong>usul ve esasa ilişkin hukuka aykırılıklar</strong> yönünden incelenir. Yani sanık artık yalnızca "koşullar var mıydı" sorusuyla sınırlı kalmayıp mahkûmiyetin esasını da denetletebilmektedir.</p>

            <h2>5. Geçiş hükmü: 1 Haziran 2024 eşiği</h2>

            <p>CMK geçici m. 6 uygulamada sıkça gözden kaçan bir ayrım getirir:</p>

            <ul>
                <li>Kanun yoluna ilişkin değişiklikler, <strong>1 Haziran 2024 tarihi ve sonrasında</strong> verilen HAGB kararları hakkında uygulanır.</li>
                <li>1 Haziran 2024 tarihinden <strong>önce</strong> verilen HAGB kararları hakkında itiraz kanun yolunun uygulanmasına devam olunur ve bu itirazlar değişiklikten önceki hükümlere göre sonuçlandırılır.</li>
            </ul>

            <p>Dolayısıyla eski tarihli bir HAGB kararıyla karşılaşıldığında, başvurulacak kanun yolunu belirleyen ölçüt kararın tarihidir.</p>

            <h2>6. Kayıt sistemi ve uygulanamayacağı suçlar</h2>

            <p>HAGB kararları adlî sicile işlenmez; bunlara mahsus ayrı bir sisteme kaydedilir. Bu kayıtlar ancak bir soruşturma veya kovuşturmayla bağlantılı olarak Cumhuriyet savcısı, hâkim veya mahkeme tarafından istenmesi hâlinde ve yalnızca maddede belirtilen amaçla kullanılabilir.</p>

            <p>Son olarak, kurumun uygulanamayacağı suçlar şöyle belirlenmiştir: <strong>işkence ve eziyet suçları</strong> ile <strong>kamu görevlisinin görevi sebebiyle işlediği ve Anayasa'nın 17. maddesi kapsamında kötü muamele kabul edilebilecek suçlar</strong>. Bu istisna, Anayasa Mahkemesi ve Avrupa İnsan Hakları Mahkemesi içtihadında uzun süredir vurgulanan "cezasızlık" sorununa verilmiş yasal bir cevaptır.</p>

            <h2>Uygulamaya dönük çıkarımlar</h2>

            <ul>
                <li>Devam eden dosyalarda, zararın giderilmesi koşulunun taksitle yerine getirilebileceği hatırlatılarak HAGB talebi ayrıca ve açıkça gündeme getirilmelidir.</li>
                <li>Denetim süresi ihlali tespit edilen dosyalarda, hükmün aynen açıklanması yerine cezanın bir kısmının infaz edilmemesi talebi somut gerekçelerle ileri sürülmelidir.</li>
                <li>Kanun yolu dilekçelerinde kararın tarihine göre itiraz mı istinaf mı olduğu baştan doğru belirlenmelidir; yanlış yola başvuru süre kaybına yol açar.</li>
            </ul>

            <p><em>Not: Bu yazı bilgilendirme amaçlıdır ve somut dosyanızdaki durumu değerlendirmez. Ceza yargılamasında süreler kısa ve sonuçları ağırdır; bir müdafi ile çalışılması önerilir.</em></p>
        `
    },
    {
        id: "tahliye-taahhudu-gecerlilik-ictihat",
        title: "İçtihat Notu: Tahliye Taahhütnamesi Ne Zaman Geçerlidir?",
        excerpt: "Boş kâğıda atılan imza, sözleşmeyle aynı gün alınan taahhüt, sonradan yazılan tarih... Yargıtay'ın tahliye taahhüdünde geçerlilik ölçütünü kararlar üzerinden inceliyoruz.",
        date: "5 Eylül 2026",
        dateISO: "2026-09-05",
        readTime: "6 dk okuma",
        category: "Gayrimenkul Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/tahliye-taahhudu.svg",
        tags: ["tahliye taahhüdü", "TBK 352", "kira", "icra"],
        decisions: [
            {
                court: "Yargıtay 6. Hukuk Dairesi",
                esas: "2013/11078",
                karar: "2014/3241",
                date: "18.03.2014",
                url: "https://mevzuat.adalet.gov.tr/ictihat/97303300",
                principle:
                    "Kira ilişkisi kurulduktan sonra, sözleşme süresi dolmadan verilen tahliye taahhüdü geçerlidir; tarihin sonradan yazıldığı iddiası aynı güçte bir belgeyle ispatlanmalıdır.",
            },
            {
                court: "Yargıtay 6. Hukuk Dairesi",
                esas: "2011/13867",
                karar: "2012/2026",
                date: "13.02.2012",
                url: "https://mevzuat.adalet.gov.tr/ictihat/1053266700",
                principle:
                    "Boş kâğıda imza atan kimse bunun sonucuna katlanır; anlaşmaya aykırı doldurulduğu iddiası aynı kuvvette yasal bir belge ile kanıtlanmalıdır.",
            },
            {
                court: "Yargıtay 6. Hukuk Dairesi",
                esas: "2013/12792",
                karar: "2013/13798",
                date: "09.10.2013",
                url: "https://mevzuat.adalet.gov.tr/ictihat/535594300",
                principle:
                    "Kiracının taşınmaza henüz girmediği bir tarihte alınan taahhüt serbest iradenin ürünü sayılmaz; noterde 'hâlen kiracısıyım' ibaresi taşıyan taahhüt ise değerlendirmeyi değiştirir.",
            },
            {
                court: "Yargıtay 6. Hukuk Dairesi",
                esas: "2009/10286",
                karar: "2010/558",
                date: "26.01.2010",
                url: "https://mevzuat.adalet.gov.tr/ictihat/605738600",
                principle:
                    "Kira sözleşmesinin ödeme şartlarını düzenleyen maddesi tahliye taahhüdü niteliğinde değildir; taahhütte belli bir tarihte tahliye açıkça üstlenilmelidir.",
            },
        ],
        sources: [
            {
                label: "6098 sayılı Türk Borçlar Kanunu m. 352",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5",
            },
        ],
        content: `
            <p>Tahliye taahhütnamesi, kiraya veren açısından en hızlı sonuç veren tahliye sebebidir. Buna karşılık geçerlilik koşulları, uygulamada en çok hata yapılan alanlardan biridir. Aşağıda Yargıtay'ın bu konudaki ölçütlerini kararlar üzerinden topladım.</p>

            <h2>Kanuni çerçeve</h2>

            <p>TBK m. 352/1'e göre kiracı, <strong>kiralananın teslim edilmesinden sonra</strong>, kiraya verene karşı kiralananı belli bir tarihte boşaltmayı yazılı olarak üstlendiği hâlde boşaltmamışsa, kiraya veren kira sözleşmesini bu tarihten başlayarak <strong>bir ay içinde</strong> icraya başvurmak veya dava açmak suretiyle sona erdirebilir.</p>

            <p>Metindeki iki ifade belirleyicidir: "teslim edilmesinden sonra" ve "belli bir tarihte". İçtihatların tamamı bu iki ifadenin yorumu etrafında şekillenir.</p>

            <h2>1. Taahhüt kira ilişkisi kurulduktan sonra verilmelidir</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 6. Hukuk Dairesi, E. 2013/11078, K. 2014/3241, 18.03.2014:</strong></p>
                <p>"Kural olarak kira ilişkisi kurulduktan sonra alınan taahhütnamenin kiracının serbest iradesi ürünü olduğu kabul edilmelidir... Sözleşme süresi sona ermeden kiralananın tahliye edileceği yönünde taahhütname düzenlenmesinde hukuksal ve mantıksal bir engel olmadığı gibi, böyle bir taahhütnamenin hayatın olağan akışına aykırı olduğu da ileri sürülemez."</p>
            </div>

            <p>Bu karar, uygulamada sık rastlanan bir savunmayı bertaraf eder: kiracılar çoğu zaman "sözleşme daha bitmemişken neden tahliye taahhüdü vereyim" diyerek taahhüdün olağan hayat akışına aykırı olduğunu ileri sürer. Daire bu savunmayı kabul etmemiştir.</p>

            <p>Buna karşılık taahhüt, kiracı taşınmaza <strong>girmeden önce</strong> alınmışsa durum değişir. E. 2013/12792, K. 2013/13798 sayılı dosyada yerel mahkeme, kira sözleşmesinin başlangıç tarihinden önce düzenlenen taahhüdü, kiracının henüz taşınmaza girmediği gerekçesiyle geçersiz saymıştır. Dairenin bu dosyada dikkat çektiği nokta ise, noterde düzenlenen taahhütnamede <em>"hâlen kiracısı olarak kullanmakta olduğum"</em> ibaresinin bulunmasıdır; bu ibare, değerlendirmeyi kiracı aleyhine çevirir.</p>

            <h2>2. Boş kâğıda atılan imza ve sonradan yazılan tarih</h2>

            <p>Uygulamadaki en yaygın itiraz, taahhütnamenin boş olarak imzalandığı ve tarihin sonradan doldurulduğu yönündedir. Yargıtay'ın bu konudaki tutumu nettir:</p>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 6. Hukuk Dairesi, E. 2011/13867, K. 2012/2026, 13.02.2012:</strong></p>
                <p>"...anlaşmaya aykırı doldurulduğu iddiası aynı kuvvette yasal bir belge ile kanıtlanamadığından davalının bu savunmasına itibar edilemez. Boş kâğıda imza atan kimsenin bunun sonucuna katlanması gerekir."</p>
            </div>

            <p>Daire aynı kararda, Hukuk Genel Kurulu'nun 12.12.1990 gün ve 1990/6-628, 01.07.1992 gün ve 357/422 ile 17.01.1999 gün ve 1999/6-28/10 sayılı kararlarının da aynı doğrultuda olduğunu belirtmiştir. Aynı ilke E. 2013/11078 sayılı kararda da tekrarlanır: davalı, tahliye tarihinin belgeye sonradan yazıldığı iddiasını <strong>aynı ispat gücüne sahip başka bir belgeyle</strong> kanıtlamak durumundadır.</p>

            <p>Bu, kiracı bakımından çok dar bir savunma alanı bırakır. Pratikte tek gerçekçi yol, TBK m. 39 (eski BK m. 31) uyarınca süresinde irade fesadı iddiasıyla taahhütnamenin iptalini istemektir; E. 2011/13867 sayılı kararda daire, davalının bu yasal hakkını kullanmadığına ayrıca dikkat çekmiştir.</p>

            <h2>3. Taahhüt açık ve belirli bir tarihi içermelidir</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 6. Hukuk Dairesi, E. 2009/10286, K. 2010/558, 26.01.2010:</strong></p>
                <p>"Tahliye taahhüdünde kiracının açıkça kiralananı belli bir tarihte tahliye etmeyi taahhüt etmesi, kabullenmesi zorunludur... kira parasının ödenmesine ilişkin sözleşme maddesinin şartlı tahliye taahhüdü olarak nitelendirilmesi mümkün değildir."</p>
            </div>

            <p>Bu karar, kira sözleşmesine konulan "kira ödenmezse sözleşme feshedilmiş sayılır ve tahliye işlemine başlanır" türü maddelerin tahliye taahhüdü sayılamayacağını ortaya koyar. Kiraya verenler sıklıkla bu maddeye dayanarak taahhüde dayalı tahliye istemekte ve dava reddedilmektedir.</p>

            <h2>Kontrol listesi</h2>

            <ul>
                <li><strong>Zamanlama:</strong> Taahhüt, taşınmaz teslim edildikten sonra mı alınmış? Metinde kiracılık sıfatını gösteren bir ibare var mı?</li>
                <li><strong>Belirlilik:</strong> Belli bir tahliye tarihi açıkça yazılmış mı? Şarta bağlı ve muğlak ifadelerden kaçınılmış mı?</li>
                <li><strong>Şekil:</strong> Taahhüt yazılı mı? Noterde düzenleme şeklinde alınması ispat gücünü belirgin biçimde artırır.</li>
                <li><strong>Kişi:</strong> Taahhüt kiracının kendisi tarafından mı verilmiş? Aile konutu niteliğindeki taşınmazlarda eşin rızası ayrıca değerlendirilmelidir.</li>
                <li><strong>Süre:</strong> Taahhüt edilen tarihten itibaren <strong>bir ay</strong> içinde icra takibi başlatılmış veya dava açılmış mı? Bu süre hak düşürücüdür.</li>
            </ul>

            <p><em>Not: Kararlar somut olayın özelliklerine göre verilmiştir; dosyanızdaki taahhütnamenin geçerliliği ayrıca değerlendirilmelidir.</em></p>
        `
    },
    {
        id: "katilma-alacagi-mal-kacirma-ictihat",
        title: "İçtihat Notu: Mal Kaçırma Hâlinde Katılma Alacağı Nasıl Korunur?",
        excerpt: "Eşin malı üçüncü kişiye devretmesi tapu iptaline yol açar mı? TMK m. 229 kapsamında eklenecek değerler, üçüncü kişinin sorumluluğu ve ihbarın işlevi.",
        date: "29 Ağustos 2026",
        dateISO: "2026-08-29",
        readTime: "7 dk okuma",
        category: "Aile Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/katilma-alacagi.svg",
        tags: ["mal rejimi", "TMK 229", "katılma alacağı", "muvazaa"],
        decisions: [
            {
                court: "Yargıtay 8. Hukuk Dairesi",
                esas: "2015/11338",
                karar: "2017/2301",
                date: "21.02.2017",
                url: "https://mevzuat.adalet.gov.tr/ictihat/300489500",
                principle:
                    "Eşin talep hakkı aynî değil alacak hakkıdır; karşılıksız kazandırma veya devir tespit edilse bile işlemin iptaline karar verilemez ve üçüncü kişi bu aşamada alacaktan sorumlu tutulmaz.",
            },
            {
                court: "Yargıtay 2. Hukuk Dairesi",
                esas: "2024/3358",
                karar: "2025/2449",
                date: "06.03.2025",
                url: "https://mevzuat.adalet.gov.tr/ictihat/1137110500",
                principle:
                    "Katılma alacağı kanundan doğar; talep eden eşin geliri olması veya mal varlığının edinilmesine katkıda bulunması gerekmez.",
            },
            {
                court: "Yargıtay 4. Hukuk Dairesi",
                esas: "2011/8323",
                karar: "2011/7656",
                date: "29.06.2011",
                url: "https://mevzuat.adalet.gov.tr/ictihat/1002278000",
                principle:
                    "Evlilik birliği sona ermeden ve eşe karşı tasfiye davası açılmadan TMK m. 229 uygulanamaz; muvazaa iddiası genel hükümlere göre asliye hukuk mahkemesinde incelenir.",
            },
        ],
        sources: [
            {
                label: "4721 sayılı Türk Medeni Kanunu m. 229, 231, 236, 241",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4721&MevzuatTur=1&MevzuatTertip=5",
            },
        ],
        content: `
            <p>Boşanma sürecinde en sık sorulan sorulardan biri şudur: "Eşim taşınmazı kardeşinin üzerine geçirdi, tapuyu iptal ettirebilir miyim?" Cevap, çoğu kişinin beklediğinden farklıdır. Aşağıda konunun içtihattaki yerini kararlarla aktarıyorum.</p>

            <h2>Kanuni dayanak: eklenecek değerler</h2>

            <p>TMK m. 229 uyarınca şu iki kalem, mal rejiminin sona erdiği anda mevcutmuş gibi edinilmiş mallara değer olarak eklenir:</p>

            <ul>
                <li>Eşlerden birinin mal rejiminin sona ermesinden önceki <strong>bir yıl içinde</strong>, diğer eşin rızası olmadan, olağan hediyeler dışında yaptığı karşılıksız kazandırmalar,</li>
                <li>Bir eşin mal rejiminin devamı süresince diğer eşin <strong>katılma alacağını azaltmak kastıyla</strong> yaptığı devirler.</li>
            </ul>

            <p>Maddenin son fıkrası, bu tür uyuşmazlıklarda verilen mahkeme kararının, <strong>davanın kendisine ihbar edilmiş olması koşuluyla</strong>, kazandırma veya devirden yararlanan üçüncü kişilere karşı da ileri sürülebileceğini öngörür.</p>

            <h2>1. Talep aynî değil, alacak hakkıdır</h2>

            <p>Konunun kilidi burasıdır. Yargıtay 8. Hukuk Dairesi bunu açıkça ifade eder:</p>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 8. Hukuk Dairesi, E. 2015/11338, K. 2017/2301, 21.02.2017:</strong></p>
                <p>"Eşin talep hakkı, edinilmiş malın mülkiyetine yönelik bir aynî hak olmayıp, malın değeri üzerinden hesaplanan bir alacak hakkı niteliğinde olduğundan; karşılıksız kazandırma veya devrin yapıldığının tespit edilmesi hâlinde, işlemin (tasarrufun) iptaline karar verilemez ve eşle birlikte üçüncü kişi davalı olarak gösterilse bile, bu aşamada davacı lehine hüküm altına alınan katılma alacağından üçüncü kişi sorumlu tutulmaz."</p>
            </div>

            <p>Yani devredilen taşınmaz geri alınmaz; devrin <strong>değeri</strong> tasfiye hesabına katılır ve alacak eski eşe yöneltilir. Bu, hak kaybı değildir; korumanın yöntemidir.</p>

            <h2>2. Üçüncü kişinin konumu ve ihbarın işlevi</h2>

            <p>Aynı kararda dairenin açıkladığı iki aşamalı yapı önemlidir. İlk aşamada hüküm davalı eski eş yönünden kurulur; üçüncü kişi yönünden ise dava, TMK m. 229/2-son maddesindeki <strong>ihbar işlevini</strong> yerine getirmiş olur. Kararda, TMK m. 229 anlamında üçüncü kişi lehine kazandırma veya devir yapıldığının tespit edilmiş olması yeterlidir.</p>

            <p>Bu ihbarın hukukî sonucu şudur: üçüncü kişi aleyhine sonradan TMK m. 241'e dayanılarak alacak davası açıldığında, <strong>229. maddedeki kazandırma veya devir koşullarının gerçekleşip gerçekleşmediği yeniden araştırma konusu yapılmaz.</strong> Bu nedenle tasfiye davasında üçüncü kişinin davaya dâhil edilmesi veya davanın ona ihbarı, ileride açılacak dava bakımından belirleyici bir adımdır.</p>

            <h2>3. Katılma alacağı için katkı şartı yoktur</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 2. Hukuk Dairesi, E. 2024/3358, K. 2025/2449, 06.03.2025:</strong></p>
                <p>"Katılma alacağı, kanundan kaynaklanan bir hak olup bu hakkı talep eden eşin gelirinin olmasına veya söz konusu mal varlığının edinilmesine, iyileştirilmesine ya da korunmasına katkıda bulunulmasına gerek yoktur."</p>
            </div>

            <p>Bu ilke, özellikle ev içi emek harcayan ve kendi adına geliri bulunmayan eşler bakımından belirleyicidir. Karar, artık değere katılma alacağının; eklenecek değerler (m. 229) ve denkleştirmeden (m. 230) elde edilen miktarlar dâhil olmak üzere, edinilmiş malların toplam değerinden borçlar düşüldükten sonra kalan artık değerin (m. 231) yarısı olduğunu da (m. 236/1) yinelemektedir.</p>

            <h2>4. Zamanlama: evlilik sürerken TMK m. 229 işlemez</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 4. Hukuk Dairesi, E. 2011/8323, K. 2011/7656, 29.06.2011:</strong></p>
                <p>"Somut olayda davacı eşine karşı tasfiye davası açmadığı gibi evlilik birliği de henüz sona ermemiştir. Medeni Kanunun 229. maddesi uygulanma imkânı bulunmamaktadır."</p>
            </div>

            <p>Bu kararda daire, eşin mal kaçırmak için üçüncü kişiyle yaptığı muvazaalı işlemin iptali isteminin genel hükümlere göre <strong>asliye hukuk mahkemesinde</strong> görülmesi gerektiğini belirtmiştir. Dolayısıyla talebin hukukî nitelendirmesi, evliliğin devam edip etmediğine ve tasfiye davasının açılıp açılmadığına göre değişir; görevli mahkeme de buna bağlı olarak farklılaşır.</p>

            <h2>Uygulamaya dönük adımlar</h2>

            <ul>
                <li>Boşanma davasıyla birlikte, devri yapılan taşınmazlar üzerine <strong>ihtiyati tedbir şerhi</strong> talep edilmelidir; şerh, sonraki devirlerde iyiniyet savunmasını zayıflatır.</li>
                <li>Tasfiye davasında devirden yararlanan üçüncü kişiye <strong>davanın ihbarı</strong> ihmal edilmemelidir; TMK m. 241 kapsamındaki ikinci dava bakımından belirleyicidir.</li>
                <li>Devir tarihleri, mal rejiminin sona erdiği tarihe göre hesaplanmalıdır: bir yıllık süre yalnızca karşılıksız kazandırmalar için geçerlidir; katılma alacağını azaltma kastıyla yapılan devirlerde süre sınırı yoktur.</li>
                <li>Kastın ispatı için banka hareketleri, devir bedelinin gerçekten ödenip ödenmediği, taraflar arasındaki yakınlık ve devir ile dava tarihi arasındaki zaman aralığı birlikte değerlendirilmelidir.</li>
            </ul>

            <p><em>Not: Mal rejimi tasfiyesi hesaplamaya dayalı ve teknik bir alandır; bu yazı genel çerçeveyi aktarır, somut dosya değerlendirmesi yerine geçmez.</em></p>
        `
    },
    {
        id: "fazla-mesai-ispati-hakkaniyet-indirimi-ictihat",
        title: "İçtihat Notu: Fazla Mesainin Tanıkla İspatı ve Hakkaniyet İndirimi",
        excerpt: "Tanık hangi dönem için dinlenir, hakkaniyet indirimi ne zaman yapılır, 'elden ödedik' savunması dinlenir mi? Yargıtay'ın fazla çalışma ispatındaki ölçütleri.",
        date: "22 Ağustos 2026",
        dateISO: "2026-08-22",
        readTime: "6 dk okuma",
        category: "İş Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/fazla-mesai.svg",
        tags: ["fazla mesai", "ispat", "hakkaniyet indirimi", "tanık"],
        decisions: [
            {
                court: "Yargıtay 9. Hukuk Dairesi",
                esas: "2011/35569",
                karar: "2013/28288",
                date: "05.11.2013",
                url: "https://mevzuat.adalet.gov.tr/ictihat/441849100",
                principle:
                    "Tanık yalnızca kendi çalıştığı dönem için bilgi verebilir; tüm dönem aynı şekilde çalışılıyormuş gibi hesaplama yapılamaz.",
            },
            {
                court: "Yargıtay 9. Hukuk Dairesi",
                esas: "2011/50012",
                karar: "2013/34784",
                date: "24.12.2013",
                url: "https://mevzuat.adalet.gov.tr/ictihat/485687000",
                principle:
                    "Tanık beyanına dayanılarak hesaplanan fazla mesai ücretinden, hakkın özünü etkilemeyecek oranda hakkaniyet indirimi yapılması gerekir.",
            },
            {
                court: "Yargıtay 7. Hukuk Dairesi",
                esas: "2014/15810",
                karar: "2015/1321",
                date: "11.02.2015",
                url: "https://mevzuat.adalet.gov.tr/ictihat/149307600",
                principle:
                    "İşveren ödemeyi ancak yazılı belgeyle ispat edebilir; 'elden ödendi' yönündeki tanık beyanlarına değer verilemez ve indirim hakkın özünü ortadan kaldıracak şekilde yapılamaz.",
            },
            {
                court: "Yargıtay 9. Hukuk Dairesi",
                esas: "2010/41983",
                karar: "2013/3664",
                date: "30.01.2013",
                url: "https://mevzuat.adalet.gov.tr/ictihat/249848400",
                principle:
                    "İşyeriyle ilgisi olmayan veya işçiyle birlikte çalışmamış kişilerin beyanıyla fazla çalışmanın kanıtlandığı kabul edilemez.",
            },
        ],
        sources: [
            {
                label: "4857 sayılı İş Kanunu m. 41, 63, 68",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5",
            },
        ],
        content: `
            <p>Fazla çalışma alacağı, işçilik alacakları içinde en çok bozma sebebi üreten kalemdir. Sorun genellikle alacağın varlığında değil, <strong>hangi dönem için ve hangi oranda</strong> hesaplandığındadır. Yargıtay'ın yerleşik ölçütlerini kararlarla toparladım.</p>

            <h2>İspat yükünün dağılımı</h2>

            <p>Kural nettir: fazla çalışma yapıldığını işçi, karşılığının ödendiğini işveren ispatlar. İşyerinde imzalı puantaj, giriş-çıkış kaydı veya banka ödemesi varsa bunlar esas alınır; yoksa işçi tanık deliline başvurabilir.</p>

            <h2>1. Tanık yalnızca kendi dönemi için dinlenir</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 9. Hukuk Dairesi, E. 2011/35569, K. 2013/28288, 05.11.2013:</strong></p>
                <p>"Davacı fazla çalışmayı ispat için tanık beyanına dayanmış, iddiayı doğrulayan davacı tanığının işyerinde 5-6 ay çalıştığı anlaşılmaktadır. Bu tanığın sadece kendi çalıştığı dönemle ilgili bilgi sahibi olduğu gözetilmeden tüm dönem için aynı şekilde çalışma devam ediyormuş gibi hesaplama yapılması isabetsizdir."</p>
            </div>

            <p>Daire, mahkemeden tanığın çalıştığı dönemi belirleyip yalnızca bu dönem için fazla çalışmanın kanıtlandığını, diğer dönemler bakımından ise iddianın ispatlanamadığını kabul etmesini istemiştir. Aynı yaklaşım E. 2011/27549, K. 2013/23993 sayılı kararda da tekrarlanır.</p>

            <p>Uygulamaya çevirisi: dava dilekçesinde tanıkların çalışma dönemleri açıkça belirtilmeli, farklı dönemler için farklı tanıklar gösterilmelidir. Tek bir tanıkla on yıllık bir dönem ispatlanamaz.</p>

            <h2>2. Tanığın işyeriyle bağlantısı aranır</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 9. Hukuk Dairesi, E. 2010/41983, K. 2013/3664, 30.01.2013:</strong></p>
                <p>"Davacı iddiasını doğrulayan ve bilirkişi raporunda beyanları dikkate alınan tanıklar ise işyeri ile ilgisi olmayan ya da davacı ile birlikte çalışmayan kişiler olup bu durumda davacının fazla çalışma yaptığının kanıtlandığı kabul edilemez."</p>
            </div>

            <p>Bu kararda daire ayrıca, davalı işyerinin resmî kurum niteliğinde olması ve çalışmaların kayda geçirilip ödenmesi olgusunu da vurgulamıştır. Kayıt tutulan işyerlerinde tanık beyanının kayıtları bertaraf etmesi beklenmez.</p>

            <h2>3. Hakkaniyet indirimi: ne zaman yapılır, ne zaman yapılmaz</h2>

            <p>Yerleşik uygulamaya göre fazla çalışmanın uzun bir süre için hesaplanması ve miktarın yüksek çıkması hâlinde hakkaniyet indirimi yapılır. Ancak bunun sınırları vardır:</p>

            <ul>
                <li><strong>Yapılır:</strong> Hesaplama takdirî delil niteliğindeki tanık beyanlarına dayanıyorsa (E. 2011/50012, K. 2013/34784).</li>
                <li><strong>Yapılmaz:</strong> Fazla çalışma tanık anlatımları yerine <strong>yazılı belgelere ve işveren kayıtlarına</strong> dayanıyorsa indirime gidilmez.</li>
                <li><strong>Ölçü:</strong> İndirim, işçinin çalışma şekline, işin düzenlenmesine ve hesaplanan miktara göre takdir edilir; <strong>hakkın özünü ortadan kaldıracak oranda</strong> indirim yapılamaz.</li>
            </ul>

            <p>7. Hukuk Dairesi'nin E. 2014/15810, K. 2015/1321 sayılı kararında, bilirkişinin %40'tan başlayıp %70'e kadar terditli seçenekler sunduğu ve mahkemenin %50 indirimi benimsediği dosyada karar bozulmuş, "daha makul bir oranda indirim yapılmak üzere" hüküm kaldırılmıştır. Yani yüksek oranlı indirimler de denetime tâbidir.</p>

            <h2>4. "Elden ödedik" savunması</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 7. Hukuk Dairesi, E. 2014/15810, K. 2015/1321, 11.02.2015:</strong></p>
                <p>"İşveren işçilik alacaklarının ödendiğini ancak yazılı belge ile ispat edebilir. Yapılan fazla çalışma ve hafta tatili çalışmasının karşılığının elden ödendiğine ilişkin tanık beyanlarına değer verilemez. Tanıkların bu yöndeki beyanları ancak kendileri açısından bağlayıcı olup tanıkların açabilecekleri davada dikkate alınabilir."</p>
            </div>

            <p>Bu ilke iki yönlüdür: işveren tanıkla ödeme ispatlayamaz; buna karşılık tanığın "bize elden ödendi" beyanı, o tanığın kendi açacağı davada aleyhine delil olarak kullanılabilir.</p>

            <h2>5. Ara dinlenme ve hesaplama tekniği</h2>

            <p>Fazla çalışmanın belirlenmesinde 4857 sayılı Kanun'un 68. maddesi uyarınca <strong>ara dinlenme süreleri</strong> mutlaka düşülmelidir. Bilirkişi raporlarında en sık rastlanan hata, günlük çalışma süresinden ara dinlenmenin indirilmemesidir; bu tek başına bozma sebebidir.</p>

            <h2>Dosya hazırlarken</h2>

            <ul>
                <li>Tanık listesinde her tanığın işyerindeki çalışma dönemi belirtilmeli; dönemler işçinin tüm kıdemini kapsayacak biçimde planlanmalıdır.</li>
                <li>İşveren kayıtlarının (puantaj, PDKS, bordro) dosyaya getirtilmesi talep edilmelidir; kayıt varsa indirim uygulanmaz, bu işçi lehinedir.</li>
                <li>Bilirkişi raporuna itirazda ara dinlenme düşümü ve tanık dönemleriyle hesap dönemi arasındaki uyum ayrıca denetlenmelidir.</li>
                <li>İndirim oranına yönelik itiraz, "hakkın özü" ölçütüne dayandırılmalıdır.</li>
            </ul>

            <p><em>Not: İşçilik alacaklarında beş yıllık zamanaşımı bulunduğundan, fesihten sonra vakit kaybedilmemesi önerilir.</em></p>
        `
    },
    {
        id: "alti-isgunluk-hak-dusurucu-sure-ictihat",
        title: "İçtihat Notu: Haklı Fesihte Altı İş Günlük Süre Ne Zaman Başlar?",
        excerpt: "Disiplin kurulu süreyi başlatır mı, devamsızlıkta süre hangi günden işler, ücreti ödenmeyen işçi ne zamana kadar fesih yapabilir? 4857 m. 26'nın içtihattaki karşılığı.",
        date: "15 Ağustos 2026",
        dateISO: "2026-08-15",
        readTime: "6 dk okuma",
        category: "İş Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/alti-isgunu.svg",
        tags: ["haklı fesih", "4857 m.26", "hak düşürücü süre", "devamsızlık"],
        decisions: [
            {
                court: "Yargıtay 9. Hukuk Dairesi",
                esas: "2013/3170",
                karar: "2014/36282",
                date: "01.12.2014",
                url: "https://mevzuat.adalet.gov.tr/ictihat/100225800",
                principle:
                    "İşveren tüzel kişi ise altı iş günlük süre feshe yetkili merciin öğrendiği günden başlar; müfettiş soruşturması veya disiplin kurulu görüşmesi süreyi başlatmaz.",
            },
            {
                court: "Yargıtay 22. Hukuk Dairesi",
                esas: "2013/24200",
                karar: "2014/33827",
                date: "01.12.2014",
                url: "https://mevzuat.adalet.gov.tr/ictihat/108501200",
                principle:
                    "Devamsızlık hâlinde altı iş günlük süre, son devamsızlık tutanağının düzenlendiği günden itibaren başlar.",
            },
            {
                court: "Yargıtay 7. Hukuk Dairesi",
                esas: "2013/19399",
                karar: "2014/536",
                date: "17.01.2014",
                url: "https://mevzuat.adalet.gov.tr/ictihat/97957300",
                principle:
                    "Ücreti ödenmeyen işçi bakımından haklı fesih sebebi süreklilik gösterdiğinden hak düşürücü süre işlemez.",
            },
            {
                court: "Yargıtay 22. Hukuk Dairesi",
                esas: "2017/5726",
                karar: "2017/4976",
                date: "09.03.2017",
                url: "https://mevzuat.adalet.gov.tr/ictihat/360645400",
                principle:
                    "İşi yavaşlatma gibi süreklilik gösteren eylemlerde altı iş günlük süre eylemin bittiği tarihten başlar; ücret alacağında fesih hakkı ödemenin yapıldığı ana kadar kullanılabilir.",
            },
        ],
        sources: [
            {
                label: "4857 sayılı İş Kanunu m. 24, 25, 26",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5",
            },
        ],
        content: `
            <p>Haklı fesih hakkı süresiz değildir. 4857 sayılı Kanun'un 26. maddesi iki ayrı süre öngörür: feshe sebep olan olayın <strong>öğrenilmesinden itibaren altı iş günü</strong> ve her hâlde <strong>fiilin gerçekleşmesinden itibaren bir yıl</strong>. Bu süreler içinde fesih yoluna gitmeyen tarafın feshi, haklı feshin sonuçlarını doğurmaz.</p>

            <p>Uygulamadaki tartışma, sürenin hangi anda başladığıdır. Yargıtay'ın bu konudaki ölçütleri şöyledir.</p>

            <h2>1. Sürenin hesabı ve tüzel kişi işverende başlangıç</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 9. Hukuk Dairesi, E. 2013/3170, K. 2014/36282, 01.12.2014:</strong></p>
                <p>"Altı iş günlük süre işçi ya da işverenin haklı feshe neden olan olayı öğrendiği günden itibaren işlemeye başlar. Olayı öğrenme günü hesaba katılmaksızın, takip eden iş günleri sayılarak altıncı günün bitiminde haklı fesih yetkisi sona erer. İşverenin tüzel kişi olması durumunda altı işgünlük süre feshe yetkili merciin öğrendiği günden başlar. Bu konuda müfettiş soruşturması yapılması, olayın disiplin kurulunca görüşülmesi süreyi başlatmaz. Olayın feshe yetkili kişi ya da kurula intikal ettirildiği gün altı iş günlük sürenin başlangıcını oluşturur."</p>
            </div>

            <p>Bu, kurumsal işverenler bakımından belirleyici bir ayrımdır. Soruşturmanın başlaması değil, dosyanın <strong>feshe yetkili organa intikali</strong> süreyi başlatır. Şirket içi yetki devri belgeleri bu nedenle dosyaya sunulmalıdır.</p>

            <p>Ayrıca kanun, işçinin olaydan maddî çıkar sağladığı hâllerde bir yıllık sürenin işlemeyeceğini öngörmüştür: altı iş gününe uyulmak koşuluyla olayın üzerinden ne kadar süre geçerse geçsin işverenin haklı fesih imkânı vardır.</p>

            <h2>2. Devamsızlıkta süre son tutanaktan başlar</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 22. Hukuk Dairesi, E. 2013/24200, K. 2014/33827, 01.12.2014:</strong></p>
                <p>"4857 sayılı Kanun'un 26. maddesinde düzenlenen altı iş günlük hak düşürücü süre son devamsızlık tutanağının düzenlendiği günden itibaren başlar."</p>
            </div>

            <p>Bu dosyada işçi, devamsızlık nedeniyle yapılan feshin süresinde olmadığını ileri sürmüş; yerel mahkeme işverenin hakkını altı iş günü içinde kullanmadığı gerekçesiyle feshi haksız saymıştı. Daire, işverenin ihtarname keşide ettiği ve işçinin mazeret bildirmediği olguları karşısında sürenin geçirilmediğini tespit ederek kararı bozmuştur.</p>

            <p>Uygulamaya çevirisi: devamsızlık tutanakları her gün ayrı ayrı ve tanık imzalı düzenlenmeli, süre son tutanağa göre hesaplanmalıdır.</p>

            <h2>3. Süreklilik gösteren sebeplerde süre işlemez</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 7. Hukuk Dairesi, E. 2013/19399, K. 2014/536, 17.01.2014:</strong></p>
                <p>"Somut olayda, davacının 2009 yılı Ocak, Şubat ve Mart aylarına ait ücretinin ödenmemesi olgusu hâlen devam etmektedir, bu nedenle hak düşürücü süre işlemez."</p>
            </div>

            <p>Ücreti ödenmeyen işçi, ödeme yapılmadığı sürece her zaman haklı sebeple fesih yapabilir; çünkü haklı fesih sebebi her an devam etmektedir. Aynı ilke işyerinde işi yavaşlatma ve üretimi düşürme eylemleri için de geçerlidir: 22. Hukuk Dairesi'nin E. 2017/5726 sayılı kararında belirtildiği üzere, eylem süreklilik gösteriyorsa altı iş günlük süre <strong>eylemin bittiği tarihten</strong> başlar.</p>

            <p>Buna karşılık daire, ücret alacağı bakımından önemli bir sınır çizer: temadi eden bir durum olmakla birlikte <strong>fesih hakkı ödemenin yapıldığı ana kadar kullanılabilir</strong>. Ödeme yapıldıktan sonra artık o gecikmeye dayanarak haklı fesih yapılamaz.</p>

            <h2>4. Anlık işlem – sürekli sonuç ayrımı</h2>

            <p>9. Hukuk Dairesi'nin E. 2013/3170 sayılı kararında yapılan ayrım uygulamada sıkça gözden kaçar: işçinin daimî olarak başka bir göreve atanması veya iş şartlarının esaslı şekilde ağırlaştırılması hâlinde, bu değişikliğin <strong>sonuçları</strong> sürekli görünse de <strong>işlem anlıktır</strong>. Bu nedenle sözleşmesini feshetmeyi düşünen işçinin bunu altı iş günü içinde işverene bildirmesi gerekir.</p>

            <p>Yani "koşullar hâlâ ağır" denilerek aylar sonra yapılan fesih, haklı fesih sayılmaz.</p>

            <h2>Kontrol listesi</h2>

            <ul>
                <li>Öğrenme tarihi belgeyle sabitlenmeli; tüzel kişi işverende dosyanın yetkili organa intikal tarihi kayda geçirilmelidir.</li>
                <li>Süre hesabında öğrenme günü sayılmaz, iş günleri sayılır; hafta tatili ve genel tatil günleri hesaba katılmaz.</li>
                <li>Devamsızlıkta her gün için ayrı tutanak düzenlenmeli, ihtar çekilmeli, süre son tutanaktan hesaplanmalıdır.</li>
                <li>İşçi tarafında: ücret ödenmediği sürece fesih hakkı devam eder, ancak ödeme yapıldıktan sonra bu sebep tükenir.</li>
                <li>Esaslı değişiklik hâllerinde altı iş günlük süre beklenmeden hareket edilmelidir.</li>
            </ul>

            <p><em>Not: Haklı fesih beyanının yazılı olarak ve sebep açıkça belirtilerek yapılması, sonraki yargılamada ispat bakımından belirleyicidir.</em></p>
        `
    },
    {
        id: "kira-tespiti-hak-ve-nesafet-ictihat",
        title: "İçtihat Notu: Beş Yıl Sonrası Kira Tespitinde Hak ve Nesafet İlkesi",
        excerpt: "Beş yılın sonunda kira nasıl belirlenir? Emsal kira incelemesi, boş olarak getireceği bedel ve eski kiracı indirimi üzerine Yargıtay'ın yöntemi.",
        date: "8 Ağustos 2026",
        dateISO: "2026-08-08",
        readTime: "6 dk okuma",
        category: "Gayrimenkul Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/kira-tespiti.svg",
        tags: ["kira tespiti", "TBK 344", "hak ve nesafet", "emsal kira"],
        decisions: [
            {
                court: "Yargıtay 3. Hukuk Dairesi",
                esas: "2025/3101",
                karar: "2025/4808",
                date: "14.10.2025",
                url: "https://mevzuat.adalet.gov.tr/ictihat/1184948800",
                principle:
                    "Beş yılın sonunda bilirkişi taşınmazın boş olarak getireceği kira bedelini belirler; ardından hak ve nesafet gereği %5 ilâ %20 arasında indirim yapılarak makul bedele hükmedilir.",
            },
            {
                court: "Yargıtay 3. Hukuk Dairesi",
                esas: "2017/5232",
                karar: "2018/10274",
                date: "18.10.2018",
                url: "https://mevzuat.adalet.gov.tr/ictihat/469917800",
                principle:
                    "Emsal kira sözleşmeleri dosyaya getirtilip taşınmazla tek tek karşılaştırılmalı, emsalin neden uygun olduğu somut gerekçelerle açıklanmalıdır.",
            },
            {
                court: "Yargıtay 3. Hukuk Dairesi",
                esas: "2017/7958",
                karar: "2019/6930",
                date: "19.09.2019",
                url: "https://mevzuat.adalet.gov.tr/ictihat/539775700",
                principle:
                    "Tespiti istenen dönem endeks dönemi içinde kalıyorsa hak ve nesafete göre değil, endekse göre belirleme yapılmalıdır.",
            },
            {
                court: "Yargıtay 6. Hukuk Dairesi",
                esas: "2014/10939",
                karar: "2014/12542",
                date: "17.11.2014",
                url: "https://mevzuat.adalet.gov.tr/ictihat/97490900",
                principle:
                    "Hak ve nesafete göre belirlenen kira, endekse göre bulunan bedelden düşük olmayacak şekilde takdir edilmelidir.",
            },
        ],
        sources: [
            {
                label: "6098 sayılı Türk Borçlar Kanunu m. 344",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5",
            },
            { label: "18.11.1964 tarihli ve 2/4 sayılı Yargıtay İçtihadı Birleştirme Kararı" },
        ],
        content: `
            <p>Kira tespiti davalarında en sık karıştırılan konu, uygulanacak yöntemin hangi döneme göre belirleneceğidir. TBK m. 344 iki ayrı rejim öngörür ve yanlış rejimin uygulanması tek başına bozma sebebidir.</p>

            <h2>İki rejim: endeks dönemi ve hak ve nesafet dönemi</h2>

            <p>TBK m. 344'e göre tarafların yenilenen kira dönemlerinde uygulanacak kira bedeline ilişkin anlaşmaları, bir önceki kira yılında <strong>tüketici fiyat endeksindeki on iki aylık ortalamalara göre değişim oranını</strong> geçmemek koşuluyla geçerlidir. Bu kural bir yıldan uzun süreli sözleşmelerde de uygulanır.</p>

            <p>Maddenin üçüncü fıkrası ise farklıdır: beş yıldan uzun süreli veya beş yıldan sonra yenilenen sözleşmelerde ve her beş yılın sonunda, kira bedeli; TÜFE değişim oranı, <strong>kiralananın durumu ve emsal kira bedelleri</strong> göz önünde tutularak hâkim tarafından hakkaniyete uygun biçimde belirlenir.</p>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 3. Hukuk Dairesi, E. 2017/7958, K. 2019/6930, 19.09.2019:</strong></p>
                <p>"...tespiti talep edilen dönemin endeks dönemi olduğu kabul edilerek, bir önceki yıl ödenen kira bedelinin endeks oranında artırılarak davalı tarafından en son ödenen bedelden az olmamak üzere kira bedelinin tespiti gerekirken yazılı gerekçe ile hak ve nesafete göre kira bedelinin tespiti doğru görülmemiş, bozmayı gerektirmiştir."</p>
            </div>

            <p>Yani beş yıl dolmadan açılan davalarda hâkim rayiç bedele göre serbest takdir yapamaz; endeksle bağlıdır.</p>

            <h2>Hak ve nesafet döneminde izlenecek yöntem</h2>

            <p>Beş yıl dolduktan sonra uygulanacak yöntem, 18.11.1964 tarihli ve 2/4 sayılı İçtihadı Birleştirme Kararı ile yerleşik Yargıtay uygulamasında adım adım belirlenmiştir:</p>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 3. Hukuk Dairesi, E. 2025/3101, K. 2025/4808, 14.10.2025:</strong></p>
                <p>"...bilirkişi tarafından kiralananın boş olarak aynı şartlarda kiraya verilmesi hâlinde getireceği kira bedelinin belirlenmesi sonrasında %5 ilâ %20 arası 'hak ve nesafet' ilkesi uyarınca indirim yapılarak kira parasının... tespitine karar verilirken; öncelikle tarafların tüm delilleri, varsa emsal kira sözleşmelerinin aslı veya onaylı örnekleri dosyaya alınmalı, bilirkişi marifetiyle kiralanan taşınmaz ve taraf emsalleri tek tek görülüp incelenmeli..."</p>
            </div>

            <p>Kararın ortaya koyduğu sıra şudur:</p>

            <ol>
                <li>Tarafların tüm delilleri ve emsal kira sözleşmelerinin aslı veya onaylı örnekleri dosyaya alınır.</li>
                <li>Bilirkişi, dava konusu taşınmazı ve taraf emsallerini <strong>tek tek yerinde görüp</strong> inceler.</li>
                <li>Elde edilen veriler somutlaştırılarak konum, çevre, nitelik, kullanım şekli, kira başlangıç tarihi ve kira süreleri gibi bedele etki eden tüm nitelikler karşılaştırılır.</li>
                <li>Emsalin neden uygun emsal olduğu ya da olmadığı <strong>somut gerekçelerle</strong> açıklanır.</li>
                <li>Taşınmazın boş olarak yeniden kiraya verilmesi hâlinde getirebileceği kira parası belirlenir.</li>
                <li>Hâkim, hak ve nesafete, kiracılık süresine ve tarafların sözleşmeden bekledikleri amaca uygun bir indirim yaparak makul kira parasına hükmeder.</li>
            </ol>

            <p>3. Hukuk Dairesi'nin E. 2017/5232, K. 2018/10274 sayılı kararı da aynı yöntemi yineler ve mahkemelerden bu ilkeler ışığında rapor alınmasını ister.</p>

            <h2>İndirimin alt sınırı</h2>

            <div class="ictihat-ilke">
                <p><strong>Yargıtay 6. Hukuk Dairesi, E. 2014/10939, K. 2014/12542, 17.11.2014:</strong></p>
                <p>"Hak ve nesafete uygun kira belirlenirken en son ödenen aylık kira bedeline endekse göre artış yapılarak belirlenen kiradan daha düşük olmayacak şekilde taşınmazın boş olarak yeniden kiraya verilmesi hâlinde getirebileceği brüt kira bedelinden, davalının eski kiracı olduğu gözetilerek hakkaniyete uygun bir miktarda indirim yapılması gerekmektedir."</p>
            </div>

            <p>Bu, kiraya veren bakımından bir güvencedir: hak ve nesafet indirimi, kirayı endeksle bulunacak bedelin altına düşürecek biçimde uygulanamaz.</p>

            <h2>Dava açarken dikkat edilecekler</h2>

            <ul>
                <li><strong>Dönem tespiti:</strong> Tespiti istenen kira yılının endeks dönemine mi hak ve nesafet dönemine mi düştüğü, sözleşmenin başlangıç tarihi üzerinden hesaplanmalıdır.</li>
                <li><strong>Süre:</strong> Kararın yeni dönemin başından itibaren hüküm doğurması için, yeni kira döneminin başlangıcından en geç <strong>otuz gün önce</strong> dava açılmalı ya da kiraya veren bu süre içinde yazılı artış bildiriminde bulunmalıdır.</li>
                <li><strong>Emsal:</strong> Emsal kira sözleşmelerinin aslı veya onaylı örneği sunulmalıdır; tanık beyanına dayalı soyut emsaller hükme esas alınmaz.</li>
                <li><strong>Arabuluculuk:</strong> Kira ilişkisinden kaynaklanan uyuşmazlıklarda dava açmadan önce arabulucuya başvurulması dava şartıdır.</li>
                <li><strong>Rapor itirazı:</strong> Bilirkişinin emsalleri yerinde görüp görmediği ve emsal seçim gerekçesi ayrıca denetlenmelidir.</li>
            </ul>

            <p><em>Not: Kira tespiti kararları geleceğe etkili olduğundan, dönem ve süre hesabındaki bir hata bir yıllık kayba yol açabilir.</em></p>
        `
    },
    {
        id: "makul-surede-yargilanma-aym-pilot-karar",
        title: "İçtihat Notu: Makul Sürede Yargılanma ve AYM'nin Pilot Kararı",
        excerpt: "Uzayan yargılama karşısında başvurulabilecek etkili bir yol var mı? Anayasa Mahkemesi'nin Nevriye Kuruç pilot kararı ve yapısal sorun tespiti.",
        date: "1 Ağustos 2026",
        dateISO: "2026-08-01",
        readTime: "5 dk okuma",
        category: "Anayasa Hukuku",
        kind: "ictihat",
        imageUrl: "/images/ictihat/makul-sure.svg",
        tags: ["makul süre", "bireysel başvuru", "etkili başvuru hakkı", "pilot karar"],
        decisions: [
            {
                court: "Anayasa Mahkemesi Genel Kurulu (Pilot Karar)",
                basvuruNo: "2021/58970 (Nevriye Kuruç)",
                date: "05.07.2022",
                url: "https://normkararlarbilgibankasi.anayasa.gov.tr/kbb/?id=3d5ebd09-8d2b-3e56-a003-ffc8344b761e",
                principle:
                    "Yedi yılı aşan işçilik alacağı yargılaması makul süreyi aşmıştır; makul sürede yargılanma hakkıyla bağlantılı etkili başvuru yolunun bulunmaması yapısal bir sorundur.",
            },
        ],
        sources: [
            { label: "Anayasa m. 36, 40, 141/4" },
            { label: "Avrupa İnsan Hakları Sözleşmesi m. 6/1 ve m. 13" },
            {
                label: "6384 sayılı Kanun (İnsan Hakları Tazminat Komisyonu)",
                url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6384&MevzuatTur=1&MevzuatTertip=5",
            },
        ],
        content: `
            <p>Müvekkillerin en sık dile getirdiği şikâyet, davaların uzunluğudur. Bu şikâyetin hukukî bir karşılığı vardır: Anayasa'nın 36. maddesinde güvence altına alınan adil yargılanma hakkı, uyuşmazlıkların <strong>makul sürede</strong> karara bağlanmasını da kapsar. Anayasa'nın 141/4. maddesi ise davaların en az giderle ve mümkün olan süratle sonuçlandırılmasını yargının görevi sayar.</p>

            <h2>Pilot karar: Nevriye Kuruç başvurusu</h2>

            <p>Anayasa Mahkemesi Genel Kurulu, 5 Temmuz 2022 tarihli ve 2021/58970 başvuru numaralı <em>Nevriye Kuruç</em> kararında konuyu pilot karar usulüyle ele almıştır.</p>

            <p>Olayda başvurucu, 1999-2014 yılları arasında temizlik işçisi olarak çalıştığı hastaneye karşı 10 Aralık 2014'te kıdem tazminatı ve işçilik alacakları davası açmıştır. İlk derece mahkemesi 2017'de karar vermiş, bölge adliye mahkemesi 2020'de kararı kaldırmış, mahkeme 2021'de yeniden karar vermiş ve karar bireysel başvuru tarihinde hâlâ kesinleşmemiştir.</p>

            <div class="ictihat-ilke">
                <p><strong>Anayasa Mahkemesi Genel Kurulu, B. No: 2021/58970, 05.07.2022:</strong></p>
                <p>"...başvurucu tarafından 10/12/2014 tarihinde açılan işçi alacağı davasının devam ettiği, somut olaydaki 7 yılı aşkın yargılama süresinin makul olmadığı sonucuna ulaşılmıştır."</p>
            </div>

            <h2>Mahkemenin kullandığı ölçütler</h2>

            <p>Karar, makul süre değerlendirmesinde şu unsurların birlikte ele alınacağını belirtir:</p>

            <ul>
                <li>Dava malzemesinin veya uygulanacak hukuk kurallarının karmaşık olup olmadığı,</li>
                <li>Tarafların yargılama sürecindeki tutumu ve usule ilişkin haklarını kullanırken gerekli özeni gösterip göstermedikleri,</li>
                <li>Yargı makamları ile dava sürecinde kamu gücü kullanan tüm devlet organlarına atfedilebilir <strong>yapısal sorunlar ve organizasyon eksikliği</strong> bulunup bulunmadığı,</li>
                <li>Başvurucunun hukukî korumanın bir an önce gerçekleşmesindeki yararı.</li>
            </ul>

            <p>Kararda ayrıca, iş davalarının niteliği bakımından özel bir hassasiyet vurgusu yapılmıştır: kanun koyucu, iş hukukunun çalışanı koruyucu niteliği sebebiyle özel bir iş yargılaması sistemi kurmuş ve basit yargılama usulü öngörmüştür. Bu nedenle işçi alacağı davalarında yargılama süreleri konusunda <strong>daha hassas bir değerlendirme</strong> yapılması gerekir.</p>

            <h2>Süre nasıl hesaplanır?</h2>

            <p>Medenî hak ve yükümlülüklere ilişkin yargılamalarda sürenin başlangıcı <strong>davanın açıldığı tarihtir</strong>. Bitiş tarihi, çoğu zaman icra aşamasını da kapsayacak şekilde yargılamanın sona erdiği tarihtir; yargılaması devam eden davalarda ise Anayasa Mahkemesi'nin ihlal şikâyeti hakkında karar verdiği tarih esas alınır.</p>

            <p>Bu, önemli bir usul kolaylığıdır: makul sürede yargılanma şikâyeti bakımından, <strong>yargılama devam ederken de</strong> bireysel başvuruda bulunulabilir. Karar, bunun başvuru yollarının tüketilmesi kuralının istisnalarından biri olduğunu <em>Güher Ergun ve diğerleri</em> (B. No: 2012/13) kararına atıfla yineler.</p>

            <h2>Etkili başvuru yolu sorunu</h2>

            <p>Kararın pilot karar niteliği kazanmasının sebebi ikinci şikâyettir: yargılamanın uzunluğundan şikâyet edilebilecek etkili bir iç hukuk yolunun bulunmaması.</p>

            <p>Anayasa Mahkemesi bu noktada AİHM içtihadına dayanır. <em>Daneshpayeh/Türkiye</em> (B. No: 21086/04) kararında Türk hukuk sisteminde yargılama süresinin uzunluğuna ilişkin etkili bir şikâyet mekanizması bulunmadığı tespit edilmiş; <em>Ümmühan Kaplan/Türkiye</em> (B. No: 24240/07) kararında ise bu durum <strong>yapısal ve sistematik bir sorun</strong> sayılarak pilot karar usulü uygulanmıştır.</p>

            <p>6384 sayılı Kanun'la kurulan İnsan Hakları Tazminat Komisyonu, AİHM tarafından <em>Müdür Turgut ve diğerleri/Türkiye</em> kararında etkili bir iç hukuk yolu olarak kabul edilmiştir. Ancak bu yolun kapsamı sınırlıdır ve Anayasa Mahkemesi önündeki başvuru sayısı artmaya devam etmiştir.</p>

            <h2>Pratik sonuçlar</h2>

            <ul>
                <li>Uzayan dosyalarda makul süre şikâyeti, yargılama sonuçlanmadan da bireysel başvuruya konu edilebilir.</li>
                <li>Başvuruda gecikmenin hangi aşamada ve hangi sebeple yaşandığı (bilirkişi raporunun beklenmesi, dosyanın kaldırılıp yeniden görülmesi, tebligat gecikmeleri) somut olarak gösterilmelidir.</li>
                <li>Tarafın kendi kusurundan kaynaklanan gecikmeler aleyhe değerlendirildiğinden, dosyada süre uzatma ve mazeret taleplerinin gereksiz yere çoğaltılmaması önemlidir.</li>
                <li>İşçilik alacakları, nafaka gibi kişisel yararın yüksek olduğu dosyalarda süre değerlendirmesi daha sıkı yapılmaktadır; bu husus başvuruda ayrıca vurgulanmalıdır.</li>
            </ul>

            <p><em>Not: Bireysel başvuruda otuz günlük süre ve usul kuralları katıdır; başvuru öncesinde dosyanın bu yönden incelenmesi gerekir.</em></p>
        `
    }
];
