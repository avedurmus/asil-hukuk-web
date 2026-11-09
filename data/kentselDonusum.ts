/**
 * Kentsel Dönüşüm Rehberi içeriği.
 *
 * Tüm metinler 6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi
 * Hakkında Kanun ile 6306 Sayılı Kanunun Uygulama Yönetmeliği'nin yürürlükteki
 * hâline (son değişiklikler: 7471 sayılı Kanun — 7/11/2023; Yönetmelik
 * değişiklikleri — RG 21/5/2024-32552 ve RG 4/2/2026-33158) dayanır.
 *
 * İkonlar burada ad olarak tutulur; bileşen tarafında eşleştirilir. Böylece bu
 * dosya sunucu tarafında da sorunsuz içe aktarılabilir.
 */

export type IconName =
    | "search"
    | "mail"
    | "hammer"
    | "gavel"
    | "landmark"
    | "building"
    | "scale"
    | "coins"
    | "shield"
    | "clock"
    | "file";

/** Yol haritasındaki bir aşama. */
export interface DonusumAdimi {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    icon: IconName;
    /** Aşamanın görsel kimliği: Tailwind renk ailesi adı. */
    accent: "sky" | "amber" | "orange" | "emerald" | "rose" | "violet";
    dayanak: string;
    ozet: string;
    maddeler: { label: string; desc: string }[];
    sureler: { label: string; value: string; note?: string }[];
    yapilacaklar: string[];
    riskler: string[];
    /** ICTIHATLAR içindeki kayıtların id'leri. */
    ictihatIds: string[];
}

export const DONUSUM_ADIMLARI: DonusumAdimi[] = [
    {
        id: 1,
        slug: "riskli-yapi-tespiti",
        title: "Riskli Yapı Tespiti",
        subtitle: "Süreci tek malik başlatabilir",
        icon: "search",
        accent: "sky",
        dayanak: "6306 s. K. m.3",
        ozet:
            "Kentsel dönüşümün hukuki başlangıcı riskli yapı tespitidir. Tespiti, masrafı kendisine ait olmak üzere yapı maliklerinden herhangi biri Başkanlıkça lisanslandırılmış kurum ve kuruluşlara yaptırabilir; çoğunluk aranmaz. Başkanlık veya İdare tespiti resen de yapabilir ya da süre vererek maliklerden isteyebilir.",
        maddeler: [
            {
                label: "Tek malik yeterli",
                desc: "Tespit başvurusu için diğer maliklerin rızası ya da herhangi bir çoğunluk gerekmez. Bir bağımsız bölüm maliki ya da kanuni temsilcisi başvurabilir.",
            },
            {
                label: "Tapuya riskli yapı belirtmesi",
                desc: "Tespit tarihinden itibaren en geç on iş günü içinde tapu kütüğünün beyanlar hanesine riskli yapı belirtmesi işlenir. Bu belirtme, kira yardımı başvurusunun da ön koşuludur.",
            },
            {
                label: "Üçlü tebligat usulü",
                desc: "Tespit tutanağı yapıya asılır, maliklere e-Devlet Kapısı üzerinden bildirilir ve ilgili muhtarlıkta on beş gün süreyle ilan edilir. Ayrıca Başkanlığın internet sayfasında on beş gün ilan edilir.",
            },
            {
                label: "Tebliğ anı: ilanın son günü",
                desc: "Muhtarlıkta yapılan ilanın son günü, tespit işlemi ayni ve şahsi hak sahiplerine tebliğ edilmiş sayılır. Bütün yasal süreler bu tarihten işlemeye başlar.",
            },
            {
                label: "Tespit engellenemez",
                desc: "Tespitin engellenmesi hâlinde, mülki idare amirinin yazılı izniyle yeterli kolluk kuvveti marifetiyle kapalı kapılar açılarak tespit resen yapılır.",
            },
        ],
        sureler: [
            { label: "Tapuya belirtme", value: "10 iş günü", note: "Tespit tarihinden itibaren" },
            { label: "Muhtarlıkta ilan", value: "15 gün", note: "Son günü tebliğ sayılır" },
            { label: "İtiraz süresi", value: "15 gün", note: "Tebliğden itibaren — hak düşürücü" },
        ],
        yapilacaklar: [
            "Lisanslı kuruluşun Başkanlık lisansının geçerli olduğunu teyit edin; lisansı iptal edilmiş kuruluşun raporu süreci baştan sakatlar.",
            "Tespit tutanağının yapıya asıldığı günü, muhtarlık ilanının başlangıç ve bitiş tarihlerini fotoğrafla ve yazıyla kayıt altına alın.",
            "Tapu kaydınızın beyanlar hanesini kontrol ederek riskli yapı belirtmesinin işlendiğini doğrulayın.",
            "Raporun eki olan karot, röleve ve hesap raporlarının bir nüshasını mutlaka temin edin.",
        ],
        riskler: [
            "İlan tarihlerini takip etmemek: on beş günlük itiraz süresi, siz bir evrak almasanız bile ilanın son günü işlemeye başlar.",
            "Lisanslı kuruluşun yapıda teknik inceleme yapmadan rapor düzenlemesi; bu, idari para cezası ve lisans iptali sebebidir ama raporu kendiliğinden geçersiz kılmaz — itiraz etmek gerekir.",
            "Raporun müteahhit tarafından ödenerek yaptırılması; bu durumda tespitin tarafsızlığı ayrıca sorgulanmalıdır.",
        ],
        ictihatIds: ["danistay-6d-2022-1333"],
    },
    {
        id: 2,
        slug: "itiraz-ve-teknik-heyet",
        title: "İtiraz ve Teknik Heyet",
        subtitle: "Tek ve tekrarlanamaz savunma hakkı",
        icon: "mail",
        accent: "amber",
        dayanak: "6306 s. K. m.3/1 · Yön. m.9-10",
        ozet:
            "Riskli yapı tespitine karşı malikler veya kanuni temsilcileri on beş gün içinde itiraz edebilir. İtirazlar, üniversitelerden görevlendirilen dört üye ile Bakanlık/Başkanlık teşkilatında görevli üç üyeden oluşan yedi kişilik teknik heyetlerce incelenip karara bağlanır.",
        maddeler: [
            {
                label: "Yedi üyeli teknik heyet",
                desc: "Dört üye üniversitelerden, üç üye Bakanlık/Başkanlık teşkilatından (ikisi inşaat, biri jeoloji veya jeofizik mühendisi) görevlendirilir.",
            },
            {
                label: "Heyet itiraz sebebiyle bağlı değildir",
                desc: "Teknik heyet, dilekçedeki itiraz sebepleriyle sınırlı kalmaksızın raporun bütün teknik unsurlarını ve Riskli Yapıların Tespit Edilmesine İlişkin Esaslara uygunluğunu inceler; gerek görürse yapıyı bizzat yerinde görür.",
            },
            {
                label: "Eksiklik varsa rapor geri gönderilir",
                desc: "Raporda teknik eksiklik tespit edilirse rapor düzeltme için lisanslı kuruluşa gönderilir; eksikliklerin tamamı giderildikten sonra yapının riskli olup olmadığına dair nihai karar verilir.",
            },
            {
                label: "Nihai karar tespit tarihine göre verilir",
                desc: "Yapının riskli olup olmadığına ilişkin nihai karar, yapının riskli yapı tespitinin yapıldığı tarihteki durum ve özelliklerine göre verilir. Sonradan yapılan güçlendirme dikkate alınmaz.",
            },
            {
                label: "İkinci itiraz hakkı yoktur",
                desc: "Teknik heyetçe karara bağlanan bir riskli yapı tespit raporuna karşı başka bir malikçe yapılan itiraz üzerine yeniden inceleme yapılmaz. Komşunuzun itirazı reddedildiyse sizin itiraz hakkınız fiilen tükenir.",
            },
            {
                label: "İptal davası ve yürütmenin durdurulması",
                desc: "Kanun uyarınca tesis edilen idari işlemlere karşı tebliğ tarihinden itibaren otuz gün içinde idare mahkemesinde iptal davası açılabilir. Yürütmenin durdurulmasını yasaklayan hüküm Anayasa Mahkemesi'nce iptal edildiğinden bu davalarda yürütmenin durdurulması istenebilir.",
            },
        ],
        sureler: [
            { label: "İtiraz", value: "15 gün", note: "Tebliğ/ilanın son gününden itibaren" },
            { label: "İptal davası", value: "30 gün", note: "Tebliğden itibaren (İYUK)" },
            { label: "6/A kapsamında itiraz", value: "2 gün", note: "Ağır hasarlı/çökme riskli yapılarda" },
            { label: "6/A kapsamında inceleme", value: "3 gün", note: "Teknik heyetçe" },
        ],
        yapilacaklar: [
            "İtiraz dilekçesini teknik gerekçelerle hazırlayın: karot sayısı ve yerleri, beton dayanımı, donatı sıyırma, zemin ve deprem parametreleri hangi yönden hatalıdır?",
            "Bağımsız bir inşaat mühendisinden karşı teknik rapor alın ve itiraz dilekçesine ekleyin.",
            "İtirazı binadaki mümkün olan en çok malikle birlikte, aynı dilekçeyle yapın; ikinci itiraz hakkı bulunmadığından tek atışınız vardır.",
            "İtirazın reddi hâlinde otuz günlük dava süresini kaçırmayın; dava dilekçesinde keşif ve uzman bilirkişi heyeti incelemesi talep edin.",
        ],
        riskler: [
            "İtiraz sonucu beklenmeden dava açılması; idari merci tecavüzü ve süre sorunlarına yol açar.",
            "Yalnızca «binam sağlam» şeklinde teknik dayanaksız itiraz; heyet bu tür itirazları dosya üzerinden reddeder.",
            "İtiraz dilekçesini süresinde ama yetkisiz mercie vermek; dilekçenin ilgili İl Müdürlüğü kanalıyla teknik heyete ulaştığını teyit edin.",
        ],
        ictihatIds: ["danistay-6d-2022-1333", "danistay-6d-2021-12684", "aym-2014-41"],
    },
    {
        id: 3,
        slug: "tahliye-ve-yikim",
        title: "Tahliye ve Yıkım",
        subtitle: "Kira yardımı penceresi burada açılır",
        icon: "hammer",
        accent: "orange",
        dayanak: "6306 s. K. m.5 · Yön. m.16",
        ozet:
            "Tespit kesinleştikten sonra önce maliklerle anlaşma yolu esastır. Riskli yapıların yıktırılması için maliklere doksan günden fazla olmamak üzere süre verilir; bu sürede yıkılmazsa yapının idari makamlarca yıktırılacağı bildirilir, buna da uyulmazsa tahliye ve yıkım mülki amirlerce yapılır veya yaptırılır.",
        maddeler: [
            {
                label: "Yıktırma süresi: en çok 90 gün",
                desc: "Maliklere doksan günden fazla olmamak üzere süre verilir. Süre sonunda yıkım yapılmazsa idari makamlarca yıktırılacağı bildirilir.",
            },
            {
                label: "Masraflar malike yüklenir",
                desc: "Başkanlık veya İdare tarafından yapılan tespit, tahliye ve yıktırma masrafları hisseleri oranında maliklerden 6183 sayılı Kanuna göre tahsil edilir. Direnmek, maliyeti üstlenmek anlamına gelir.",
            },
            {
                label: "Tahliye ve yıkım tebligatı",
                desc: "Tutanak yapıya asılır, maliklere e-Devlet Kapısı üzerinden bildirilir, muhtarlıkta on beş gün ilan edilir; ilanın son günü tebliğ edilmiş sayılır.",
            },
            {
                label: "Kira yardımı veya faiz desteği",
                desc: "Anlaşma ile tahliye edilen yapıların malikleri, kiracıları ve yapıda ikamet eden sınırlı ayni hak sahipleri kira yardımından yararlanabilir. Kira yardımı ile faiz desteği birlikte kullanılamaz; biri seçilir.",
            },
            {
                label: "6/A: resen uygulama",
                desc: "Yıkılacak derecede riskli ya da ağır hasar gören yapılarda dönüşüm, maliklerin muvafakati aranmaksızın Başkanlıkça resen yapılabilir. Riskli yapı listesi kapıya asılır, muhtarlıkta iki gün ilan edilir; itiraz iki gün, inceleme üç gündür.",
            },
        ],
        sureler: [
            { label: "Yıktırma süresi", value: "en çok 90 gün", note: "Maliklere verilen süre" },
            { label: "Tahliye tebligatı ilanı", value: "15 gün", note: "Son günü tebliğ sayılır" },
            { label: "Kira yardımı başvurusu", value: "1 yıl", note: "Tahliye veya yıkım tarihinden itibaren" },
            { label: "Faiz desteği başvurusu", value: "3 yıl", note: "Bankaya başvuru için son süre" },
        ],
        yapilacaklar: [
            "Tahliye ve yıkım tarihini belgeleyin: yıkım ruhsatı, yıkım tutanağı ve enkaz kaldırma belgelerini saklayın.",
            "Kira yardımı başvurusunu bir yıllık süre içinde İl Müdürlüğüne (yetki devri varsa İdareye) yapın; başvuru tarihini kayda geçirin.",
            "Kiracı ve işyeri işleticisi iseniz defaten (tek seferlik) kira yardımı hakkınızı araştırın; bu hak malikten bağımsızdır.",
            "Kira yardımı mı faiz desteği mi daha avantajlı: kredi tutarınızı ve inşaat süresini birlikte hesaplayarak karar verin.",
        ],
        riskler: [
            "Kira yardımı başvurusunun bir yıllık süre geçtikten sonra yapılması; hak tümüyle kaybedilir.",
            "Yıkımı geciktirerek pazarlık gücü aradığını düşünmek; masraflar hisse oranında malike rücu edilir ve 6183 sayılı Kanuna göre tahsil edilir.",
            "Müteahhidin ödediği kira yardımının sözleşmede güvence altına alınmaması; inşaat durduğunda ödemeler de durur.",
        ],
        ictihatIds: [],
    },
    {
        id: 4,
        slug: "salt-cogunluk-karari",
        title: "Salt Çoğunluk Kararı ve Sözleşme",
        subtitle: "Hisse ağırlıklı %50+1 — kişi sayısı değil",
        icon: "gavel",
        accent: "emerald",
        dayanak: "6306 s. K. m.6/1 · Yön. m.15",
        ozet:
            "7471 sayılı Kanunla 7/11/2023 tarihinde yapılan değişiklikle karar yeter sayısı 2/3 çoğunluktan salt çoğunluğa indirildi. Ancak kanunun ifadesi nettir: karar, «sahip oldukları hisseleri oranında paydaşların salt çoğunluğu» ile alınır. Yani ölçüt kişi sayısı değil, arsa payı (hisse) ağırlığıdır.",
        maddeler: [
            {
                label: "Ölçüt arsa payıdır",
                desc: "Karar, paydaşların hisseleri oranında salt çoğunluğu ile alınır. Yirmi dairenin on biri lehte oy verse bile bu dairelerin arsa payı toplamı %50'yi aşmıyorsa karar geçerli değildir.",
            },
            {
                label: "Toplantı çağrısı: Ek-12 formu",
                desc: "Maliklerden birinin istemiyle bütün malikler toplantıya çağrılır. Yer ve zaman, Ek-12 formu doldurularak muhtarlıkta ya da yapı henüz yıkılmamışsa bina kapısında/duyuru panosunda on beş gün ilan edilerek veya noter aracılığıyla bildirilir; ilanın son günü tebliğ sayılır.",
            },
            {
                label: "Yıkım şartı yoktur",
                desc: "Karar alınması ve payların satışı için yapının yıktırılmış olması şartı aranmaz. Süreç bina ayakta iken de yürütülebilir.",
            },
            {
                label: "Kararın kapsamı",
                desc: "Tevhit, ifraz, taksim, terk, ihdas, tescil, yeniden bina yapımı, payların satışı, kat karşılığı veya hasılat paylaşımı ve diğer değerlendirme usulleri salt çoğunlukla karara bağlanabilir.",
            },
            {
                label: "Ruhsat için ön koşul",
                desc: "Yapı ruhsatı başvurusundan önce teklifin karara katılmayan maliklere usulünce tebliğ edilmiş ve bu maliklerin hisselerinin satışı için Müdürlüğe müracaat edilmiş olması gerekir. Müdürlük, salt çoğunluğun ve tebligatın tamamlandığına dair yazıyı ruhsat idaresine gönderir.",
            },
            {
                label: "Sözleşme resmi şekle tabidir",
                desc: "Arsa payı karşılığı inşaat sözleşmesi, taşınmaz mülkiyetinin nakli borcunu içerdiğinden kural olarak noterde düzenleme şeklinde yapılmalıdır. Adi yazılı sözleşme geçersizdir; ancak yükleniciye devri taahhüt edilen taşınmaz tapuda ona devredilmişse şekil eksikliği giderilmiş sayılır.",
            },
            {
                label: "Tapu devri avanstır",
                desc: "Arsanın yükleniciye devri, Yargıtay'ın yerleşik içtihadına göre avans niteliğindedir. Yüklenici, inşaatı sözleşme, onaylı proje, ruhsat ve imar mevzuatına uygun biçimde tamamlayıp teslim etmedikçe devraldığı paya hak kazanmaz.",
            },
        ],
        sureler: [
            { label: "Toplantı çağrısı ilanı", value: "15 gün", note: "Ek-12 formu ile" },
            { label: "Teklifin incelenmesi/kabulü", value: "15 gün", note: "Bildirimden itibaren" },
            { label: "Elektronik bildirim", value: "+5 gün", note: "Adrese ulaştığı günü izleyen 5. günün sonunda tebliğ sayılır" },
            { label: "Acele kamulaştırma eşiği", value: "30 gün", note: "Tebligatı izleyen 30 günde anlaşma sağlanamazsa" },
        ],
        yapilacaklar: [
            "Toplantıdan önce tapu kayıtlarından bütün paydaşların arsa paylarını çıkarın ve hisse ağırlıklı çoğunluk tablosunu hazırlayın.",
            "Çağrıyı Ek-12 formuyla yapın; ilan fotoğraflarını tarih görünecek şekilde arşivleyin veya noter kanalını tercih edin.",
            "Toplantı tutanağına gündemi, katılan paydaşların hisselerini ve oyları tek tek yazın; imzaları eksiksiz alın.",
            "Müteahhit sözleşmesini noterde düzenleme şeklinde imzalayın; sözleşmede hak sahiplerine isabet eden bağımsız bölümleri numarayla belirleyin.",
            "Sözleşmeyi tapuya şerh ettirin ve paylaşım tablosunu sözleşmenin eki hâline getirin.",
        ],
        riskler: [
            "Çoğunluğun kişi sayısına göre hesaplanması: en sık rastlanan ve en pahalı hata. Alınan karar ve ona dayanan bütün işlemler iptal edilebilir.",
            "Toplantı çağrısının bir malike ulaşmaması veya gündemin açıkça yazılmaması; aylar sonra tüm kararları sakatlar.",
            "Sözleşmede hak sahiplerine isabet eden bağımsız bölümlerin belirlenmemesi; kat irtifakı tesisi ve tapu devri aşamasında süreç kilitlenir.",
            "Teminat mektubu, gecikme cezası, ipotek yasağı ve fesih şartları olmayan müteahhit sözleşmesi imzalamak.",
        ],
        ictihatIds: ["yargitay-6hd-2025-3804", "yargitay-6hd-2023-3330", "yargitay-6hd-2022-483"],
    },
    {
        id: 5,
        slug: "pay-satisi",
        title: "Karara Katılmayan Payların Satışı",
        subtitle: "Açık artırma ve rayiç bedel denetimi",
        icon: "landmark",
        accent: "rose",
        dayanak: "6306 s. K. m.6/1 · Yön. m.15/A",
        ozet:
            "Hisseleri oranında salt çoğunlukla alınan karara katılmayan maliklere, karar ve anlaşma şartlarını içeren teklif bildirilir. Bildirimden itibaren on beş gün içinde teklif incelenmez veya kabul edilmezse, bu maliklerin arsa payları rayiç değerden az olmamak üzere açık artırma usulüyle satılır.",
        maddeler: [
            {
                label: "Teklif bildirimi",
                desc: "Tapuya elektronik tebligat adresi bildirenlere e-tebligatla, bildirmeyenlere noter aracılığıyla veya riskli yapılarda Ek-8, riskli alan ve rezerv yapı alanlarında Ek-10 formuyla muhtarlıkta on beş gün ilan edilerek bildirim yapılır.",
            },
            {
                label: "Rayiç bedelin belirlenmesi",
                desc: "Rayiç değer, maliklerce SPK'ca yetkilendirilmiş gayrimenkul değerleme kuruluşuna tespit ettirilen değer de gözetilerek, Müdürlük veya İdare bünyesinde kurulan en az üç kişilik Bedel Tespiti Komisyonunca belirlenir.",
            },
            {
                label: "İlk satış yalnız anlaşan paydaşlara",
                desc: "İlk satışa, hisseleri oranında salt çoğunlukla anlaşan paydaşlar dışında kimse katılamaz. Pay alınmak istenmezse sonraki satışlara, rayiç değerin yüzde onu oranında nakit teminat veren ve kararı kabul ettiğini yazılı beyan eden üçüncü şahıslar da katılabilir.",
            },
            {
                label: "Gıyapta satış geçerlidir",
                desc: "Payı satılacak malike yapılan tebligat, satışa izleyici olarak katılması amacını taşır. Bu maliklere tebligat yapılamamış olması veya satışa katılmamaları satışın geçerliliğini etkilemez; gıyaplarında yapılan satış geçerlidir.",
            },
            {
                label: "İpotek ve haciz engel değil",
                desc: "Satılacak pay üzerindeki ipotek, ihtiyati haciz, haciz ve intifa hakkı satışa engel olmaz; bu haklar satış bedeli üzerinde devam eder, bedele bloke konulur ve durum alacaklıya bildirilir.",
            },
            {
                label: "Alıcıya 7 gün",
                desc: "En yüksek teklifi veren katılımcı, yedi gün içinde satış bedelini vadeli hesaba yatırmak ve aynı sürede sözleşmeyi şartsız ve şerhsiz imzalayıp Müdürlüğe sunmak zorundadır. Aksi hâlde sırayla diğer pey sahiplerine geçilir.",
            },
            {
                label: "Bedel eksik hesaplanmışsa",
                desc: "Satış bedelinin eksik hesaplandığı gerekçesiyle verilen iptal kararı, işlemi tümden ortadan kaldırmaz; fark, ihale tarihinden işleyecek yasal faiziyle birlikte payı satın alan malik tarafından eski malike ödenir.",
            },
            {
                label: "İki ayrı yargı yolu",
                desc: "Kat malikleri kurulu kararına karşı adli yargıda, bu karara dayanılarak tesis edilen idari işlemlere (satışa davet, ihale) karşı idari yargıda dava açılabilir. İki yolu birbirine karıştırmak hak kaybına yol açar.",
            },
        ],
        sureler: [
            { label: "Teklifin kabulü", value: "15 gün", note: "Bildirimden itibaren" },
            { label: "Satış bedelinin yatırılması", value: "7 gün", note: "İhaleyi kazanan için" },
            { label: "Üçüncü kişi teminatı", value: "%10", note: "Rayiç değerin yüzde onu, nakit" },
            { label: "İdari dava süresi", value: "30 gün", note: "Satış/ihale işleminin tebliğinden" },
        ],
        yapilacaklar: [
            "Teklifi süresi içinde inceleyin ve inceleme talebinizi yazılı olarak kayda geçirin; sessiz kalmak kabul etmemekle aynı sonucu doğurur.",
            "Kendi arsa payınız için SPK yetkili bir değerleme kuruluşundan bağımsız rapor alın; Bedel Tespiti Komisyonu bu raporu gözetmek zorundadır.",
            "Kıymet takdirine itiraz ediyorsanız dava dilekçenizde keşif ve bilirkişi incelemesi talep edin; bedel farkı iptal sebebidir.",
            "Satış gününü ve yerini öğrenin, izleyici olarak katılın ve artırma tutanağının bir örneğini isteyin.",
            "Paylaşım tablosuna (hangi dairenin kime düştüğüne) ilişkin itirazlarınızı ayrıca ve açıkça dile getirin.",
        ],
        riskler: [
            "Teklifi hiç incelemeyip süreyi geçirmek: on beşinci günün sonunda pay satış sürecine girer.",
            "Tebligatın ulaşmadığını düşünerek süreci takip etmemek; gıyapta yapılan satış geçerlidir.",
            "Bedel itirazını somut emsal ve bilirkişi talebiyle desteklememek; soyut «düşük bedel» iddiası reddedilir.",
            "Adli yargıda açılması gereken davayı idari yargıda, idari yargıda açılması gerekeni adli yargıda açmak.",
        ],
        ictihatIds: ["danistay-4d-2025-1681", "danistay-4d-2024-7646"],
    },
    {
        id: 6,
        slug: "insaat-fesih-teslim",
        title: "İnşaat, Fesih ve Teslim",
        subtitle: "Müteahhit durursa yasal çıkış yolu",
        icon: "building",
        accent: "violet",
        dayanak: "6306 s. K. m.6/10, 6/13, 6/14",
        ozet:
            "Kanun, inşaatı yarım bırakan müteahhide karşı maliklere özel bir çıkış yolu tanır. Müteahhitten kaynaklanan sebeplerle bir yıl içinde yapım işine başlanmamışsa veya iş durmuş ve en az altı aydır projeyi bitirecek seviyede ekip ve ekipmanla devam edilmiyorsa, hisseleri oranında maliklerin salt çoğunluğu ile sözleşmelerin feshine karar verilebilir.",
        maddeler: [
            {
                label: "Fesih kararı ve Başkanlık tespiti",
                desc: "Salt çoğunlukla fesih kararı alınır ve Başkanlığa başvurularak işe başlanıp başlanmadığının veya yeterli ekip-ekipmanla devam edilip edilmediğinin tespiti istenir.",
            },
            {
                label: "30 günlük ihtar ve resen fesih",
                desc: "Durum tespit edilirse müteahhide otuz gün süre verilerek işe başlaması ihtar edilir. Buna rağmen başlanmazsa, ayrıca ihtara gerek kalmaksızın otuz günlük sürenin bittiği tarih itibarıyla sözleşmeler resen feshedilmiş sayılır ve tapudaki şerhler terkin edilir.",
            },
            {
                label: "Ödenen kira yardımı geri istenemez",
                desc: "Fesih tarihine kadar müteahhit tarafından hak sahiplerine yapılan kira yardımı ödemeleri hak sahiplerinden geri talep edilemez.",
            },
            {
                label: "Müteahhidin borçlarından haciz yasağı",
                desc: "Taşınmaz satış vaadi veya arsa payı karşılığı inşaat sözleşmesiyle müteahhide devredilmişse, malikler adına kat irtifakı kuruluncaya kadar — o işe ait malzeme ve işçilik alacakları hariç — müteahhidin üçüncü kişilere borçlarından dolayı haciz ve tedbir uygulanamaz. Yapım işine başlanmasından itibaren altı ay içinde kat irtifakı kurulmazsa bu koruma kalkar.",
            },
            {
                label: "Müteahhidin daire satışına sınır",
                desc: "Müteahhit, kendi payına düşen bağımsız bölümleri ancak inşaatın tamamlanma oranının yüzde on altındaki oranda satabilir. Tamamlanma oranında veya üstünde satış için bütün maliklerin muvafakati gerekir.",
            },
            {
                label: "Teslim ve iskân",
                desc: "Yüklenicinin edimi, inşaatı sözleşme, onaylı proje, ruhsat ve imar mevzuatına uygun biçimde tamamlayıp teslim etmektir. Sözleşmede kararlaştırılmışsa yapı kullanma izninin (iskân) alınması da teslim borcunun parçasıdır.",
            },
            {
                label: "Ortaklığın giderilmesi engel değil",
                desc: "Arsa hâline gelen taşınmazda ortaklığın giderilmesi davası açılabilir; ancak dava açılmış olması salt çoğunlukla karar alınmasına ve bu karara göre işlem yapılmasına engel teşkil etmez.",
            },
        ],
        sureler: [
            { label: "İşe başlama", value: "1 yıl", note: "Karardan itibaren; aşılırsa fesih yolu açılır" },
            { label: "Fiilî durma", value: "6 ay", note: "Yeterli ekip-ekipmanla devam edilmemesi" },
            { label: "Müteahhide ihtar", value: "30 gün", note: "Sonunda sözleşme resen feshedilmiş sayılır" },
            { label: "Kat irtifakı", value: "6 ay", note: "Kurulmazsa haciz koruması kalkar" },
        ],
        yapilacaklar: [
            "İnşaatın fiilî seviyesini düzenli olarak tarihli fotoğraf, yapı denetim kayıtları ve seviye tespit tutanaklarıyla belgeleyin.",
            "Durma hâlinde gecikmeyi ihtarname ile tespit ettirin ve salt çoğunlukla fesih kararı için toplantı çağrısı yapın.",
            "Kat irtifakının altı ay içinde kurulmasını takip edin; aksi hâlde müteahhidin borçları taşınmazınızı tehdit eder.",
            "Teslimde eksik ve ayıplı işler listesi (tespit tutanağı) düzenleyin; iskân alınmadan ibra imzalamayın.",
        ],
        riskler: [
            "Fesih için Başkanlık tespiti yolunu kullanmadan doğrudan dava açmak; süreç uzar ve inşaat yerinde çürür.",
            "Kat irtifakı kurulmadan altı ayın geçmesi; müteahhidin üçüncü kişilere borçları için taşınmaza haciz gelebilir.",
            "Müteahhidin tamamlanma oranı üzerinde daire satması; muvafakatiniz olmadan yapılan satışlar sonradan uzun davalara dönüşür.",
            "Eksik iş ve iskân şartı yerine getirilmeden tapu devri ve ibra verilmesi.",
        ],
        ictihatIds: ["yargitay-6hd-2025-3804", "yargitay-6hd-2022-1071", "yargitay-6hd-2024-4279"],
    },
];

/* ————————————————————————————————————————————————————————————————
 * İçtihat kartları
 * ———————————————————————————————————————————————————————————————— */

export interface Ictihat {
    id: string;
    mahkeme: string;
    daire: string;
    esas: string;
    karar: string;
    tarih: string;
    /** Kararın konusu — kart başlığı. */
    konu: string;
    /** Karardan çıkan hukuki ilke. */
    ilke: string;
    /** Malik veya müteahhit açısından somut sonuç. */
    pratikSonuc: string;
    etiketler: string[];
    /** mevzuat.adalet.gov.tr/ictihat bağlantısı; yoksa kaynak notu kullanılır. */
    url?: string;
    kaynakNotu?: string;
}

export const ICTIHATLAR: Ictihat[] = [
    {
        id: "yargitay-6hd-2025-3804",
        mahkeme: "Yargıtay",
        daire: "6. Hukuk Dairesi",
        esas: "2025/1168",
        karar: "2025/3804",
        tarih: "11.11.2025",
        konu: "İnşaata hiç başlamayan yüklenici karşısında sözleşmenin geriye etkili feshi",
        ilke:
            "Arsa payı karşılığı inşaat sözleşmeleri taşınmaz mülkiyetinin nakli borcunu içerdiğinden kural olarak noterde düzenleme şeklinde yapılmalıdır; resmi şekilde yapılmayan sözleşme geçersizdir. Ancak yükleniciye bedel olarak devredilmesi taahhüt edilen taşınmaz tapuda yükleniciye devredilmişse şekil eksikliği giderilmiş olur ve başlangıçta geçersiz sözleşme geçerli hâle gelir. Yüklenici kararlaştırılan sürede inşaat ruhsatını almamış ve inşaata hiç başlamamışsa, TBK m.124/1 uyarınca süre verilmesi etkisiz olacağından arsa sahipleri TBK m.125/3 uyarınca sözleşmenin geriye etkili feshini isteyebilir.",
        pratikSonuc:
            "Müteahhit ruhsat almayıp temel bile atmadıysa, önce ihtarla süre verme zorunluluğu yoktur; doğrudan geriye etkili fesih ve tapu iptali-tescil davası açılabilir. Adi yazılı sözleşme imzalandıysa ve tapu müteahhide devredildiyse sözleşmenin geçersizliğini ileri sürmek artık mümkün değildir.",
        etiketler: ["APKİS", "geriye etkili fesih", "resmi şekil", "TBK 125/3"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/1192391000",
    },
    {
        id: "yargitay-6hd-2023-3330",
        mahkeme: "Yargıtay",
        daire: "6. Hukuk Dairesi",
        esas: "2022/3514",
        karar: "2023/3330",
        tarih: "17.10.2023",
        konu: "Yüklenicinin bedele hak kazanmasının koşulları",
        ilke:
            "Arsa payı karşılığı inşaat sözleşmesi, eser sözleşmesinin bir türü olup iki tarafa borç yükleyen, ivazlı, çift tipli karma bir sözleşmedir. TMK m.706, Noterlik Kanunu m.60 ve Tapu Kanunu m.26 uyarınca geçerliliği noterde düzenleme şeklinde yapılmasına bağlıdır. Yüklenicinin sözleşmede kararlaştırılan tapu payına veya bağımsız bölümlere hak kazanabilmesi için inşaatı sözleşme ve ekleri, tasdikli proje, inşaat ruhsatı ile kamu düzeninden olan imar mevzuatına uygun olarak tamamlayıp arsa sahiplerine teslim etmesi gerekir.",
        pratikSonuc:
            "«Bina bitti» demek yeterli değildir: proje ve ruhsata aykırı, imar mevzuatını ihlal eden bir yapı teslim edilmişse yüklenici kararlaştırılan daireleri isteyemez. Teslim tutanağı imzalamadan önce ruhsat ve projeye uygunluğu bağımsız bir teknik raporla kontrol ettirin.",
        etiketler: ["APKİS", "eser sözleşmesi", "ruhsat", "imar mevzuatı"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/982893000",
    },
    {
        id: "yargitay-6hd-2022-483",
        mahkeme: "Yargıtay",
        daire: "6. Hukuk Dairesi",
        esas: "2021/2712",
        karar: "2022/483",
        tarih: "02.02.2022",
        konu: "Arsanın müteahhide devri avans niteliğindedir",
        ilke:
            "Yeknesaklık kazanan yargısal içtihatlara göre arsa sahibinin, inşaat yapılmak üzere arsasını yükleniciye devri avans niteliğinde kabul edilir; yüklenicinin taşınmaza hak kazanabilmesi için inşaatın sözleşmeye göre bitirilmesi, yani yüklenicinin yüklendiği edimi ifa etmiş olması aranır. Sözleşmeye konu taşınmazların üçüncü kişiye devri hâlinde ispat külfeti ters çevrilerek üçüncü kişinin iyiniyeti bakımından farklı bir ispat usulü benimsenmiştir.",
        pratikSonuc:
            "Tapuyu müteahhide devretmek mülkiyeti kesin olarak kaybetmek değildir. Müteahhit edimini yerine getirmezse devredilen paylar geri istenebilir; müteahhitten daire alan üçüncü kişiler de her hâlde korunmaz, iyiniyetlerini ispatla yükümlü hâle gelirler.",
        etiketler: ["avans", "tapu iptali", "üçüncü kişi", "iyiniyet"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/737904900",
    },
    {
        id: "yargitay-6hd-2022-1071",
        mahkeme: "Yargıtay",
        daire: "6. Hukuk Dairesi",
        esas: "2021/1225",
        karar: "2022/1071",
        tarih: "28.02.2022",
        konu: "Müteahhitten daire alan üçüncü kişinin tapu iptali ve tescil davası",
        ilke:
            "Yükleniciden bağımsız bölüm temlik alınmasına dayanan tapu iptali ve tescil davalarında, 30.09.1988 tarihli ve 1987/2 E., 1988/2 K. sayılı Yargıtay İçtihadı Birleştirme Kararı uygulanır. Mahkemece öncelikle yüklenicinin edimini — eseri meydana getirme ve teslim borcunu — yerine getirip getirmediği, ardından sözleşmedeki iskân (oturma izni) koşulu gibi diğer borçlarını ifa edip etmediği araştırılmalıdır.",
        pratikSonuc:
            "Müteahhitten maket üzerinden daire satın alanlar, yüklenicinin arsa sahibine karşı edimini tamamlamadığı sürece tapuyu alamaz. Satın almadan önce sözleşmede müteahhide hangi bağımsız bölümlerin düştüğünü, inşaat seviyesini ve iskân şartını denetleyin.",
        etiketler: ["temlik", "İBBGK 1987/2", "iskân", "tapu tescil"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/748237300",
    },
    {
        id: "yargitay-6hd-2024-4279",
        mahkeme: "Yargıtay",
        daire: "6. Hukuk Dairesi",
        esas: "2024/2724",
        karar: "2024/4279",
        tarih: "21.11.2024",
        konu: "Gecikme nedeniyle cezai şart ve sözleşmenin uyarlanması",
        ilke:
            "Arsa payı karşılığı inşaat sözleşmelerinde yüklenicinin asli edimi, finansmanı kendisi sağlayarak inşaatı sözleşme ve ekleri, tasdikli proje, ruhsat ve imara uygun olarak yapıp teslim etmektir. Sözleşmede kararlaştırılan bedel dışında arsa sahiplerine bağımsız bölüm verileceğinin kararlaştırılması sözleşmeyi satım sözleşmesi hâline getirmez; sözleşme tipik bir arsa payı karşılığı inşaat sözleşmesidir. Kararlaştırılan teslim tarihi ile iskân izninin alındığı tarih arasındaki gecikme için sözleşmedeki cezai şart hükmü uygulanır.",
        pratikSonuc:
            "Sözleşmeye gecikme cezası (cezai şart) yazdırmak, gecikmenin tek caydırıcı yaptırımıdır. Gecikme hesabında ölçüt, binanın fiilen bitmesi değil iskân izninin alındığı tarihtir; bu nedenle sözleşmede teslimin iskân alınmasıyla gerçekleşeceği açıkça yazılmalıdır.",
        etiketler: ["cezai şart", "gecikme", "iskân", "uyarlama"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/1115017700",
    },
    {
        id: "danistay-4d-2025-1681",
        mahkeme: "Danıştay",
        daire: "4. Daire",
        esas: "2024/3735",
        karar: "2025/1681",
        tarih: "17.03.2025",
        konu: "Arsa payının rayiç değerin altında satılması ihaleyi sakatlar",
        ilke:
            "Karara katılmayan maliklerin arsa payları, tespit edilen rayiç değerden az olmamak üzere satılabilir. Somut olayda pay metrekaresi 32.500 TL üzerinden satılmış, mahkemece yaptırılan keşif ve bilirkişi incelemesinde ise aynı payın metrekare değeri 36.000 TL olarak tespit edilmiştir. Davacıların hissesinin değerinden daha düşük bir fiyata satıldığı işlemde hukuka uyarlık bulunmadığı gerekçesiyle verilen iptal kararı onanmıştır. Daire ayrıca, iptal kararı üzerine yeniden yapılacak satışta davacıların paylaşıma ilişkin iddialarının da dikkate alınacağını belirtmiştir.",
        pratikSonuc:
            "Kıymet takdirine itiraz, pay satışına karşı en etkili savunma hattıdır. Dava dilekçesinde mutlaka keşif ve bilirkişi incelemesi talep edin; bilirkişinin bulduğu değer satış bedelinin üzerindeyse ihale iptal edilir. İptal kararı aynı zamanda paylaşım tablosunu yeniden tartışma imkânı doğurur.",
        etiketler: ["rayiç bedel", "kıymet takdiri", "ihalenin iptali", "bilirkişi"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/1211136500",
    },
    {
        id: "danistay-4d-2024-7646",
        mahkeme: "Danıştay",
        daire: "4. Daire",
        esas: "2023/11588",
        karar: "2024/7646",
        tarih: "19.12.2024",
        konu: "Gıyapta yapılan pay satışı ve iki ayrı yargı yolu",
        ilke:
            "Uygulama Yönetmeliği'nin, payı satılacak malike tebligat yapılamamış olmasının veya bu malikin satışa izleyici olarak katılmamasının satışın geçerliliğini etkilemeyeceğine ilişkin hükmü hukuka uygun bulunmuştur. Dairenin gerekçesine göre bu kural, dönüşümü sürüncemede bırakmamak amacıyla getirilmiştir ve azınlıkta kalan malikin mülkiyet hakkını ihlal etmez; çünkü malikin kat malikleri kurulu kararına karşı adli yargıda, bu karara dayanılarak tesis edilen idari işlemlere karşı idari yargıda dava açma hakkı her zaman bulunmaktadır. İlk satışın yalnızca anlaşma sağlayan paydaşlara açık olması da mülkiyet hakkının ihlali sayılmamıştır.",
        pratikSonuc:
            "«Bana tebligat gelmedi» savunması satışı tek başına geçersiz kılmaz. Korunmanın yolu süreci baştan takip etmek ve doğru yargı kolunu seçmektir: kat malikleri kurulu kararı adli yargıda, satışa davet ve ihale işlemleri idari yargıda dava konusu edilir.",
        etiketler: ["gıyapta satış", "tebligat", "yargı yolu", "mülkiyet hakkı"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/1138748200",
    },
    {
        id: "danistay-6d-2022-1333",
        mahkeme: "Danıştay",
        daire: "6. Daire",
        esas: "2021/5293",
        karar: "2022/1333",
        tarih: "10.02.2022",
        konu: "Riskli yapı uyuşmazlığında keşif ve uzman bilirkişi heyeti zorunluluğu",
        ilke:
            "Riskli yapı tespitine ilişkin işlemlerin hukuki değerlendirmesi, tespit raporundaki teknik değerlendirmelerin mevzuata ve gerçeklere uygun olup olmadığına göre yapılmalıdır. Vardığı sonuca ulaşmak için yapılan teknik değerlendirmeleri içermeyen ve yapının risk durumunu açıkça ortaya koymayan bir bilirkişi raporu hükme esas alınabilecek nitelikte değildir. Mahkemece, konusunda uzman bilirkişilerden oluşturulacak bir heyetle yapı alanında keşif ve bilirkişi incelemesi yaptırılması ve bunun sonucunda düzenlenecek rapor değerlendirilerek karar verilmesi gerekir.",
        pratikSonuc:
            "Riskli yapı tespitine karşı açılan iptal davasında dosya üzerinden karar verilmesine razı olmayın: keşif ve uzman heyet incelemesi talep edin, talebiniz reddedilirse bunu temyiz/istinaf sebebi olarak ileri sürün.",
        etiketler: ["riskli yapı", "keşif", "bilirkişi heyeti", "iptal davası"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/762312000",
    },
    {
        id: "danistay-6d-2021-12684",
        mahkeme: "Danıştay",
        daire: "6. Daire",
        esas: "2019/16858",
        karar: "2021/12684",
        tarih: "17.11.2021",
        konu: "Teknik heyetin teşkili ve ikinci itiraz hakkının bulunmaması",
        ilke:
            "Teknik heyet, üniversitelerden bildirilen dört üye ile ikisi inşaat mühendisi, biri jeoloji veya jeofizik mühendisi olmak üzere Bakanlık teşkilatında görev yapan üç üyenin katılımıyla yedi üyeli olarak teşkil edilir ve bu düzenleme hukuka uygundur. Heyet, itiraz dilekçesindeki sebeple bağlı olmaksızın raporun bütün teknik unsurlarını inceler; gerek görürse yapıyı bizzat yerinde görür; nihai kararını yapının tespit tarihindeki durumuna göre verir. Teknik heyetçe karara bağlanan bir riskli yapı tespit raporuna karşı başka bir malikçe yapılan itiraz üzerine yeniden inceleme yapılmaz.",
        pratikSonuc:
            "Binadaki bir malikin itirazı reddedildiyse, aynı rapora karşı diğer maliklerin itiraz hakkı fiilen tükenir. Bu nedenle itiraz, on beş gün içinde ve mümkün olan en çok malikin katılımıyla, tek ve eksiksiz bir dilekçeyle yapılmalıdır.",
        etiketler: ["teknik heyet", "itiraz", "yedi üye", "tekrar inceleme yok"],
        url: "https://mevzuat.adalet.gov.tr/ictihat/725313200",
    },
    {
        id: "danistay-8d-2026-3501",
        mahkeme: "Danıştay",
        daire: "8. Daire",
        esas: "2024/5003",
        karar: "2026/3501",
        tarih: "02.06.2026",
        konu: "Danışmanlık kuruluşlarının uyuşmazlık çözme yetkisinin iptali",
        ilke:
            "6306 Sayılı Kanunun Uygulama Yönetmeliği'nin 15/B maddesinde, kentsel dönüşüm danışmanlık ve müzakere kuruluşlarına «uyuşmazlıkların çözümü» alanında faaliyet gösterme yetkisi tanıyan ibare ile bu kuruluşların uyuşmazlık çözümü amacıyla taraflarla görüşme yapmasına, müzakere süreci yürütmesine ve bu sürecin gizliliğine ilişkin cümle ve bentler iptal edilmiştir.",
        pratikSonuc:
            "Lisanslı kentsel dönüşüm danışmanlık kuruluşları artık maliklerle müteahhit arasındaki uyuşmazlığı çözme veya arabulucu gibi müzakere yürütme yetkisine sahip değildir; yalnızca danışmanlık hizmeti verip yazılı görüş düzenleyebilirler. Hukuki uyuşmazlığınızı bu kuruluşlara değil, vekilinize ve yetkili yargı merciine taşıyın.",
        etiketler: ["danışmanlık kuruluşu", "Yönetmelik iptali", "müzakere", "15/B"],
        kaynakNotu:
            "Karar, 6306 Sayılı Kanunun Uygulama Yönetmeliği m.15/B metnindeki iptal şerhleriyle yayımlanmıştır (mevzuat.gov.tr).",
    },
    {
        id: "aym-2014-41",
        mahkeme: "Anayasa Mahkemesi",
        daire: "Genel Kurul",
        esas: "2012/87",
        karar: "2014/41",
        tarih: "27.02.2014",
        konu: "Yürütmenin durdurulması yasağının iptali",
        ilke:
            "6306 sayılı Kanunun 6. maddesinin dokuzuncu fıkrasının, bu Kanun uyarınca tesis edilen idari işlemlere karşı açılan davalarda yürütmenin durdurulmasına karar verilemeyeceğini öngören ikinci cümlesi iptal edilmiştir. Aynı kararla Kanunun 5. maddesinin beşinci fıkrasının ilk iki cümlesi ve 6. maddesinin onuncu fıkrası da iptal edilmiştir.",
        pratikSonuc:
            "6306 sayılı Kanun kapsamındaki riskli yapı tespiti, tahliye, yıkım ve pay satışı işlemlerine karşı açılan iptal davalarında yürütmenin durdurulması istenebilir. Dava dilekçesinde bu talebi, telafisi güç zararı somut biçimde ortaya koyarak mutlaka ileri sürün.",
        etiketler: ["yürütmenin durdurulması", "iptal", "idari dava", "m.6/9"],
        kaynakNotu: "İptal, 6306 sayılı Kanun m.5 ve m.6 metnindeki şerhlerde yayımlanmıştır (mevzuat.gov.tr).",
    },
];

/* ————————————————————————————————————————————————————————————————
 * Süre hesaplayıcı kuralları
 * ———————————————————————————————————————————————————————————————— */

export interface SureKurali {
    id: string;
    label: string;
    /** Başlangıç olayının açıklaması — kullanıcıya hangi tarihi gireceğini söyler. */
    baslangic: string;
    gun: number;
    dayanak: string;
    aciklama: string;
    kritik: boolean;
}

export const SURE_KURALLARI: SureKurali[] = [
    {
        id: "riskli-yapi-itiraz",
        label: "Riskli yapı tespitine itiraz",
        baslangic: "Muhtarlık ilanının son günü (tebliğ tarihi)",
        gun: 15,
        dayanak: "6306 s. K. m.3/1",
        aciklama:
            "Malikler veya kanuni temsilcileri bu süre içinde İl Müdürlüğü kanalıyla teknik heyete itiraz etmelidir. Aynı rapora karşı ikinci bir itiraz hakkı yoktur.",
        kritik: true,
    },
    {
        id: "idari-dava",
        label: "İdari işlemin iptali davası",
        baslangic: "İşlemin tebliğ edildiği gün",
        gun: 30,
        dayanak: "6306 s. K. m.6/9 · İYUK",
        aciklama:
            "Riskli yapı tespiti, tahliye, yıkım ve pay satışı gibi idari işlemler için dava süresidir. Yürütmenin durdurulması da bu dilekçede istenir.",
        kritik: true,
    },
    {
        id: "teklif-kabul",
        label: "Salt çoğunluk teklifinin incelenmesi/kabulü",
        baslangic: "Teklifin bildirildiği veya bildirilmiş sayıldığı gün",
        gun: 15,
        dayanak: "6306 s. K. m.6/1 · Yön. m.15/2",
        aciklama:
            "Bu süre içinde teklif incelenmez veya kabul edilmezse arsa payları açık artırma usulüyle satışa çıkar. E-tebligatta bildirim, adrese ulaştığı günü izleyen beşinci günün sonunda yapılmış sayılır.",
        kritik: true,
    },
    {
        id: "satis-bedeli",
        label: "İhaleyi kazananın bedeli yatırması",
        baslangic: "Satış (ihale) günü",
        gun: 7,
        dayanak: "Yön. m.15/A-8",
        aciklama:
            "Alıcı bu süre içinde bedeli vadeli hesaba yatırmak ve sözleşmeyi şartsız, şerhsiz imzalayıp Müdürlüğe sunmak zorundadır; aksi hâlde sırayla diğer pey sahiplerine geçilir.",
        kritik: false,
    },
    {
        id: "kira-yardimi",
        label: "Kira yardımı başvurusu",
        baslangic: "Tahliye veya yıkım tarihi",
        gun: 365,
        dayanak: "Yön. m.16/4",
        aciklama:
            "Başvuru riskli yapılarda İl Müdürlüğüne, yetki devri varsa İdareye yapılır. Bu bir yıllık süre geçtikten sonra kira yardımı hakkı kullanılamaz.",
        kritik: true,
    },
    {
        id: "faiz-destegi",
        label: "Faiz desteği için bankaya başvuru",
        baslangic: "Tahliye veya yıkım tarihi",
        gun: 1095,
        dayanak: "Yön. m.16/6",
        aciklama:
            "Başkanlıkla protokol imzalamış bankalara en geç üç yıl içinde başvurulmalıdır. Kira yardımı ile faiz desteği birlikte kullanılamaz.",
        kritik: false,
    },
    {
        id: "mutaahhit-ise-baslama",
        label: "Müteahhidin işe başlaması (fesih eşiği)",
        baslangic: "Oy birliği veya salt çoğunlukla karar alınan gün",
        gun: 365,
        dayanak: "6306 s. K. m.6/14",
        aciklama:
            "Müteahhitten kaynaklanan sebeplerle bu süre içinde yapım işine başlanmamışsa, hisseleri oranında maliklerin salt çoğunluğu ile sözleşmelerin feshine karar verilebilir.",
        kritik: false,
    },
    {
        id: "kat-irtifaki",
        label: "Kat irtifakının kurulması (haciz koruması)",
        baslangic: "Yapım işine başlandığı gün",
        gun: 182,
        dayanak: "6306 s. K. m.6/10",
        aciklama:
            "Bu süre içinde kat irtifakı kurulmazsa, müteahhidin üçüncü kişilere olan borçları nedeniyle taşınmaz hakkında haciz ve tedbir uygulanabilir hâle gelir.",
        kritik: true,
    },
];

/* ————————————————————————————————————————————————————————————————
 * Müteahhit sözleşmesi risk kontrol listesi
 * ———————————————————————————————————————————————————————————————— */

export interface KontrolMaddesi {
    id: string;
    baslik: string;
    aciklama: string;
    /** 3 = olmazsa olmaz, 2 = önemli, 1 = iyi olur. */
    agirlik: 1 | 2 | 3;
}

export const SOZLESME_KONTROL: KontrolMaddesi[] = [
    {
        id: "resmi-sekil",
        baslik: "Sözleşme noterde düzenleme şeklinde yapıldı",
        aciklama:
            "Arsa payı karşılığı inşaat sözleşmesi taşınmaz mülkiyetinin nakli borcunu içerdiğinden resmi şekle tabidir. Noter onaylı (tasdikli) değil, düzenleme şeklinde olması gerekir.",
        agirlik: 3,
    },
    {
        id: "paylasim-tablosu",
        baslik: "Hangi bağımsız bölümün kime düştüğü numarayla belirlendi",
        aciklama:
            "Hak sahiplerine isabet eden bağımsız bölümler sözleşmede belirlenmemişse kat irtifakı tesisi talep edilemez ve paylaşım kavgası kaçınılmaz olur.",
        agirlik: 3,
    },
    {
        id: "teslim-tarihi",
        baslik: "Teslim tarihi ve iskân şartı açıkça yazıldı",
        aciklama:
            "Teslimin, yapı kullanma izni (iskân) alınmasıyla gerçekleşeceği yazılmalıdır. Gecikme hesabı iskân tarihine göre yapılır.",
        agirlik: 3,
    },
    {
        id: "cezai-sart",
        baslik: "Gecikme cezası (cezai şart) kararlaştırıldı",
        aciklama:
            "Gecikmenin tek caydırıcı yaptırımıdır. Aylık, güncellenebilir ve kira bedeliyle ilişkilendirilmiş bir ceza tutarı belirlenmelidir.",
        agirlik: 3,
    },
    {
        id: "teminat",
        baslik: "Banka teminat mektubu veya eşdeğer güvence alındı",
        aciklama:
            "İnşaatın yarım kalması hâlinde zararı karşılayacak, süresiz veya inşaat süresini aşan vadeli teminat; müteahhidin şahsi taahhüdü güvence değildir.",
        agirlik: 3,
    },
    {
        id: "fesih-kosullari",
        baslik: "Fesih sebepleri ve sonuçları ayrıntılı düzenlendi",
        aciklama:
            "Kanundaki resen fesih yolunun yanında, sözleşmede de gecikme seviyesine bağlı fesih hakkı, devredilen payların iadesi ve tasfiye usulü yazılmalıdır.",
        agirlik: 3,
    },
    {
        id: "sureli-devir",
        baslik: "Tapu devri inşaat seviyesine bağlandı (kademeli devir)",
        aciklama:
            "Müteahhide düşen payların tamamını baştan devretmek yerine, devir inşaat tamamlanma oranına bağlanmalıdır. Kanun da müteahhidin satışını tamamlanma oranının %10 altıyla sınırlar.",
        agirlik: 3,
    },
    {
        id: "ipotek-yasagi",
        baslik: "Müteahhidin ipotek ve rehin tesis etmesi yasaklandı",
        aciklama:
            "Devredilen paylar üzerinde malikin yazılı izni olmaksızın ipotek, rehin veya başka ayni hak tesis edilemeyeceği açıkça kararlaştırılmalıdır.",
        agirlik: 3,
    },
    {
        id: "sozlesme-serhi",
        baslik: "Sözleşme tapuya şerh edildi",
        aciklama:
            "Şerh, sözleşmeyi üçüncü kişilere karşı ileri sürülebilir kılar ve müteahhidin payları habersiz devretmesini güçleştirir.",
        agirlik: 2,
    },
    {
        id: "teknik-sartname",
        baslik: "Teknik şartname ve malzeme listesi ek yapıldı",
        aciklama:
            "Marka-model veya eşdeğer nitelik düzeyinde malzeme listesi olmayan sözleşmede «benzer kalite» tartışması ayıplı iş davasına dönüşür.",
        agirlik: 2,
    },
    {
        id: "kira-yardimi-taahhudu",
        baslik: "Müteahhidin kira yardımı taahhüdü ve ödeme takvimi yazıldı",
        aciklama:
            "Aylık tutar, ödeme günü, artış oranı ve gecikme hâlinde uygulanacak yaptırım belirtilmelidir.",
        agirlik: 2,
    },
    {
        id: "ruhsat-proje",
        baslik: "Ruhsat, proje ve imar yükümlülükleri müteahhide bırakıldı",
        aciklama:
            "Ruhsat alma, proje onayı, harç ve bedellerin kime ait olduğu; ruhsatın belirli bir süre içinde alınacağı yazılmalıdır.",
        agirlik: 2,
    },
    {
        id: "ortak-alan",
        baslik: "Ortak alanlar, otopark ve depo payları tanımlandı",
        aciklama:
            "Otopark, depo, teras ve bahçe kullanım hakları yönetim planıyla birlikte netleştirilmelidir; aksi hâlde teslimden sonra uzun ihtilaflar doğar.",
        agirlik: 2,
    },
    {
        id: "vekalet-siniri",
        baslik: "Müteahhide verilecek vekaletnamenin sınırı belirlendi",
        aciklama:
            "Satış, ipotek ve kredi yetkisi içeren genel vekaletname verilmemeli; vekaletname yalnızca ruhsat ve imar işlemleriyle sınırlandırılmalıdır.",
        agirlik: 3,
    },
    {
        id: "uyusmazlik",
        baslik: "Yetkili mahkeme, delil tespiti ve hakem usulü kararlaştırıldı",
        aciklama:
            "Uyuşmazlık hâlinde hangi mahkemenin yetkili olduğu, seviye tespitinin nasıl yapılacağı ve bilirkişi usulü baştan belirlenmelidir.",
        agirlik: 1,
    },
];

/* ————————————————————————————————————————————————————————————————
 * Pratik bilgi panoları
 * ———————————————————————————————————————————————————————————————— */

export interface PratikPano {
    id: string;
    baslik: string;
    icon: IconName;
    dayanak: string;
    satirlar: { label: string; value: string; note?: string }[];
    not?: string;
}

export const PRATIK_PANOLAR: PratikPano[] = [
    {
        id: "kira-yardimi",
        baslik: "Kira Yardımı ve Destekler",
        icon: "coins",
        dayanak: "6306 s. K. m.5, m.6/3 · Yön. m.16",
        satirlar: [
            {
                label: "Riskli yapılarda kira yardımı süresi",
                value: "18 ay",
                note: "Riskli alan dışındaki riskli yapılar için",
            },
            {
                label: "Riskli alan ve rezerv yapı alanlarında",
                value: "en çok 48 ay",
                note: "Süre ilgili kurumca belirlenir",
            },
            {
                label: "Başvuru süresi",
                value: "1 yıl",
                note: "Tahliye veya yıkım tarihinden itibaren — hak düşürücü",
            },
            {
                label: "Kiracı ve işyeri işletenler",
                value: "aylık kira bedelinin 2 katı",
                note: "Defaten (tek seferlik) ödeme",
            },
            {
                label: "Kapıcı ve sınırlı ayni hak sahipleri",
                value: "aylık kira bedelinin 5 katı",
                note: "Defaten ödeme",
            },
            {
                label: "6/A kapsamında taşınma yardımı",
                value: "aylık kira bedelinin 3 katı",
                note: "Malik, kiracı ve yapıda ikamet eden sınırlı ayni hak sahiplerine",
            },
            {
                label: "Peşin ödeme imkânı",
                value: "1 yıla kadar",
                note: "Özel hesabın durumuna göre Başkanlıkça uygun görülürse",
            },
            {
                label: "Faiz desteği başvurusu",
                value: "en geç 3 yıl",
                note: "Protokollü bankalara; kira yardımı ile birlikte kullanılamaz",
            },
        ],
        not:
            "Aylık kira bedeli tutarı Başkanlıkça belirlenir ve her yıl güncellenir. Başvuru anında geçerli tutarı ilgili İl Müdürlüğünden teyit ettirin.",
    },
    {
        id: "vergi-harc",
        baslik: "Vergi, Harç ve Ücret Muafiyetleri",
        icon: "shield",
        dayanak: "6306 s. K. m.7/9-10 · Yön. m.16/9-12",
        satirlar: [
            { label: "Noter harçları", value: "muaf", note: "492 s. Harçlar K. m.38" },
            { label: "Tapu ve kadastro harçları", value: "muaf", note: "492 s. Harçlar K. m.57" },
            { label: "Belediye harçları", value: "muaf", note: "2464 s. K. m.79, mük. 79, 80 ve ek 1" },
            { label: "Damga vergisi", value: "muaf", note: "488 s. Damga Vergisi K." },
            { label: "Veraset ve intikal vergisi", value: "muaf", note: "7338 s. K." },
            { label: "Banka ve sigorta muameleleri vergisi", value: "muaf", note: "Kullandırılan krediler bakımından" },
            { label: "Döner sermaye ve belediye meclisi ücretleri", value: "muaf", note: "Her türlü ücret" },
            {
                label: "Belediye harç ve ücreti alınmayacak inşaat alanı",
                value: "mevcut alanın 1,5 katına kadar",
                note: "Fonksiyon değişikliğine bakılmaksızın",
            },
        ],
        not:
            "Muafiyetler, uygulama alanındaki mevcut yapıların imar mevzuatına uygun olup olmadığına bakılmaksızın uygulanır. Kaçak yapı olması muafiyeti kendiliğinden ortadan kaldırmaz.",
    },
    {
        id: "cogunluk",
        baslik: "Karar Yeter Sayıları",
        icon: "scale",
        dayanak: "6306 s. K. m.6 · Yön. m.15",
        satirlar: [
            {
                label: "Riskli yapı tespiti başvurusu",
                value: "1 malik",
                note: "Çoğunluk aranmaz",
            },
            {
                label: "Toplantıya çağrı",
                value: "1 malik",
                note: "Maliklerden birinin istemi yeterlidir",
            },
            {
                label: "Dönüşüm, müteahhit ve paylaşım kararı",
                value: "hisse ağırlıklı %50+1",
                note: "Kişi sayısı değil, arsa payı oranı esas alınır",
            },
            {
                label: "Birden fazla riskli yapı olan parselde",
                value: "hisse ağırlıklı %50+1",
                note: "Paydaş olup olmadıklarına bakılmaksızın bütün paydaşlar",
            },
            {
                label: "Boş parselle tevhit",
                value: "boş parselde oy birliği",
                note: "Planlı Alanlar İmar Yön. m.7/3 saklı",
            },
            {
                label: "Müteahhit sözleşmesinin feshi",
                value: "hisse ağırlıklı %50+1",
                note: "1 yıl işe başlamama veya 6 ay fiilî durma hâlinde",
            },
            {
                label: "Müteahhidin tamamlanma oranı üstünde daire satışı",
                value: "bütün maliklerin muvafakati",
                note: "Oranın %10 altındaki satış için muvafakat gerekmez",
            },
        ],
    },
];

/* ————————————————————————————————————————————————————————————————
 * Pay satışı müracaatında istenen belgeler
 * ———————————————————————————————————————————————————————————————— */

export const BELGE_LISTESI: { baslik: string; aciklama: string }[] = [
    {
        baslik: "Toplantıya davet belgeleri",
        aciklama:
            "Ek-12 formu, muhtarlık veya bina kapısı ilan tutanakları ya da noter çağrı evrakı; maliklerin toplantıya usulünce davet edildiğini gösterir.",
    },
    {
        baslik: "Toplantı tutanağı",
        aciklama: "Toplantının yapıldığına, gündeme ve katılan paydaşların hisselerine ilişkin tutanak.",
    },
    {
        baslik: "İmzalı karar tutanağı",
        aciklama:
            "Maliklerin hisseleri oranında salt çoğunlukla anlaştıklarını gösteren, anlaşan maliklerce imzalanmış karar tutanağı; ya da anlaşan maliklere ait sözleşme veya vekaletname örnekleri.",
    },
    {
        baslik: "Teklifin bildirildiğine dair belgeler",
        aciklama:
            "Kararın ve anlaşma şartlarını içeren teklifin e-tebligatla, noter aracılığıyla veya muhtarlıkta on beş gün ilan edilerek bildirildiğini ve kabul için on beş gün süre verildiğini gösteren belgeler.",
    },
    {
        baslik: "SPK yetkili değerleme raporu",
        aciklama:
            "Karara katılmayan maliklere ait taşınmazların, Sermaye Piyasası Kurulunca yetkilendirilen gayrimenkul değerleme kuruluşlarına tespit ettirilen değerine ilişkin belgeler.",
    },
];

/* ————————————————————————————————————————————————————————————————
 * Durum analizi sihirbazı
 * ———————————————————————————————————————————————————————————————— */

export interface SihirbazSorusu {
    id: string;
    soru: string;
    ipucu?: string;
    secenekler: { value: string; text: string }[];
}

export const SIHIRBAZ_SORULARI: SihirbazSorusu[] = [
    {
        id: "rol",
        soru: "Süreçteki konumunuz nedir?",
        secenekler: [
            { value: "malik-cogunluk", text: "Malikim; dönüşümü istiyorum ve çoğunluktayım" },
            { value: "malik-azinlik", text: "Malikim; karara katılmadım veya şartları adil bulmuyorum" },
            { value: "kiraci", text: "Kiracıyım ya da yapıda sınırlı ayni hak sahibiyim" },
            { value: "muteahhit", text: "Müteahhit / yüklenici tarafındayım" },
        ],
    },
    {
        id: "rapor",
        soru: "Riskli yapı raporu hangi aşamada?",
        ipucu: "Tapu kaydının beyanlar hanesinde «riskli yapı» belirtmesi varsa rapor işlenmiş demektir.",
        secenekler: [
            { value: "yok", text: "Henüz rapor alınmadı veya başvuru yapılmadı" },
            { value: "itiraz", text: "Rapor var; itiraz süresi içindeyiz veya itiraz inceleniyor" },
            { value: "kesin", text: "Rapor kesinleşti" },
            { value: "yikildi", text: "Bina tahliye edildi / yıkıldı" },
        ],
    },
    {
        id: "cogunluk",
        soru: "Arsa payı (hisse) ağırlıklı salt çoğunluk sağlandı mı?",
        ipucu: "Ölçüt kişi sayısı değil, lehte oy veren paydaşların arsa payı toplamının %50'yi aşmasıdır.",
        secenekler: [
            { value: "saglandi", text: "Evet, hisse ağırlıklı %50+1 sağlandı ve tutanağa bağlandı" },
            { value: "saglanmadi", text: "Hayır, henüz sağlanamadı" },
            { value: "belirsiz", text: "Emin değilim; hisse hesabı yapılmadı" },
        ],
    },
    {
        id: "sozlesme",
        soru: "Müteahhit sözleşmesi ne durumda?",
        secenekler: [
            { value: "yok", text: "Henüz müteahhit seçilmedi" },
            { value: "taslak", text: "Görüşmeler sürüyor, taslak inceleniyor" },
            { value: "imzali", text: "Noterde düzenleme şeklinde imzalandı" },
            { value: "duran", text: "İmzalandı ama inşaat başlamadı veya durdu" },
        ],
    },
];

export interface SihirbazSonucu {
    badge: string;
    title: string;
    oncelik: string;
    adimlar: string[];
    risk: string;
    /** DONUSUM_ADIMLARI içindeki slug. */
    adimSlug: string;
    ictihatIds: string[];
    cta: string;
}

/**
 * Cevaplara göre öneri üretir. Kurallar yukarıdan aşağıya, en aciliyeti yüksek
 * durum önce olacak şekilde değerlendirilir.
 */
export function sihirbazSonucu(c: Record<string, string>): SihirbazSonucu {
    const { rol, rapor, cogunluk, sozlesme } = c;

    if (rapor === "itiraz") {
        return {
            badge: "Acil · 15 gün",
            title: "İtiraz süresi işliyor",
            oncelik:
                "Riskli yapı tespitine itiraz, muhtarlık ilanının son gününden itibaren on beş gün içinde yapılmalıdır. Aynı rapora karşı ikinci bir itiraz hakkı bulunmadığından bu süre pratikte tek savunma fırsatınızdır.",
            adimlar: [
                "İlan tarihlerini belgeleyin ve kalan günü tam olarak hesaplayın.",
                "Bağımsız bir inşaat mühendisinden karşı teknik rapor alın.",
                "İtirazı binadaki mümkün olan en çok malikle birlikte, tek ve teknik gerekçeli dilekçeyle yapın.",
                "İtirazın reddi hâlinde otuz gün içinde iptal davası açın; keşif, uzman bilirkişi heyeti ve yürütmenin durdurulmasını talep edin.",
            ],
            risk:
                "Süre kaçırılırsa tespit kesinleşir; sonrasında yalnızca kesinleşmeye dayanan işlemler dava konusu edilebilir, raporun esası tartışılamaz hâle gelir.",
            adimSlug: "itiraz-ve-teknik-heyet",
            ictihatIds: ["danistay-6d-2021-12684", "danistay-6d-2022-1333", "aym-2014-41"],
            cta: "İtiraz Dilekçesi ve Teknik Rapor Desteği",
        };
    }

    if (rapor === "yok") {
        return {
            badge: "1. Aşama · Hazırlık",
            title: "Süreci başlatma ve tespit aşaması",
            oncelik:
                "Kentsel dönüşümün hukuki zemini riskli yapı tespitidir. Tespit yapılmadan alınan kararlar ve imzalanan sözleşmeler 6306 sayılı Kanun korumasından yararlanmaz. Tespiti tek bir malik de yaptırabilir.",
            adimlar: [
                "Başkanlıkça lisanslandırılmış, lisansı güncel bir kuruluş seçin ve raporu kendi adınıza yaptırın.",
                "Raporun eki karot, röleve ve hesap belgelerinin bir nüshasını alın.",
                "Tapu kaydının beyanlar hanesine riskli yapı belirtmesinin işlendiğini doğrulayın.",
                "Tespit tebliğ edilmeden müteahhitle bağlayıcı sözleşme imzalamayın.",
            ],
            risk:
                "Raporu müteahhidin yaptırması ve masrafı üstlenmesi, tespitin tarafsızlığını tartışmaya açar; ayrıca süreci baştan müteahhidin takvimine bağlar.",
            adimSlug: "riskli-yapi-tespiti",
            ictihatIds: ["danistay-6d-2022-1333"],
            cta: "Başvuru ve Raporlama Danışmanlığı Alın",
        };
    }

    if (rol === "kiraci") {
        return {
            badge: "Kiracı / Hak Sahibi",
            title: "Kira yardımı ve tahliye hakları",
            oncelik:
                "Kiracılar ve yapıda ikamet eden sınırlı ayni hak sahipleri, malik olmasalar bile kira yardımından yararlanabilir. Kiracılar bakımından yardım, aylık kira bedelinin iki katı oranında defaten ödenir; kapıcı ve sınırlı ayni hak sahipleri için beş kattır.",
            adimlar: [
                "Tahliye veya yıkım tarihini belgeleyin; kira yardımı başvurusu bu tarihten itibaren bir yıl içinde yapılmalıdır.",
                "Yapıda en az bir yıldır ikamet ettiğinizi veya işyeri bulundurduğunuzu gösteren belgeleri (abonelik, ikametgâh, vergi kaydı) toplayın.",
                "Başvuruyu riskli yapılarda İl Müdürlüğüne, yetki devri varsa İdareye yapın ve başvuru tarihini kayda geçirin.",
                "Kira sözleşmenizin 6306 kapsamındaki tahliye nedeniyle sona erdiğini yazılı olarak tespit ettirin.",
            ],
            risk:
                "Bir yıllık başvuru süresi hak düşürücüdür. Ayrıca kira yardımı ile faiz desteği birlikte kullanılamaz; ikisinden biri seçilmelidir.",
            adimSlug: "tahliye-ve-yikim",
            ictihatIds: [],
            cta: "Kira Yardımı Başvurusu İçin Destek Alın",
        };
    }

    if (rol === "malik-azinlik") {
        return {
            badge: "Savunma · Pay satışı riski",
            title: "Karara katılmayan malikin korunması",
            oncelik:
                "Teklifin bildirilmesinden itibaren on beş gün içinde teklif incelenmez veya kabul edilmezse arsa payınız rayiç değerden az olmamak üzere açık artırmayla satılır. Size tebligat yapılamamış olması veya satışa katılmamanız satışın geçerliliğini etkilemez.",
            adimlar: [
                "Teklifi süresinde inceleyin ve inceleme talebinizi yazılı olarak kayda geçirin.",
                "Kendi payınız için SPK yetkili bir değerleme kuruluşundan bağımsız rapor alın.",
                "Kıymet takdirine itiraz davanızda keşif ve bilirkişi incelemesi talep edin; bedel farkı iptal sebebidir.",
                "Doğru yargı kolunu seçin: kat malikleri kurulu kararı adli yargıda, satışa davet ve ihale işlemleri idari yargıda dava konusu edilir.",
                "Paylaşım tablosuna ilişkin itirazlarınızı ayrıca ve açıkça ileri sürün; iptal kararı paylaşımı yeniden tartışma imkânı doğurur.",
            ],
            risk:
                "Süreci «bana ulaşmadılar» diyerek takip etmemek en pahalı hatadır: gıyapta yapılan satış geçerli sayılır ve pay tapuda üçüncü kişiye geçer.",
            adimSlug: "pay-satisi",
            ictihatIds: ["danistay-4d-2025-1681", "danistay-4d-2024-7646"],
            cta: "Pay Satışına Karşı Hukuki Savunma Talep Edin",
        };
    }

    if (sozlesme === "duran") {
        return {
            badge: "Uygulama · Fesih yolu",
            title: "İnşaat durdu: yasal fesih mekanizması",
            oncelik:
                "Müteahhitten kaynaklanan sebeplerle bir yıl içinde işe başlanmamışsa ya da iş durmuş ve en az altı aydır projeyi bitirecek seviyede ekip ve ekipmanla devam edilmiyorsa, hisseleri oranında maliklerin salt çoğunluğu ile sözleşmelerin feshine karar verilebilir.",
            adimlar: [
                "Fiilî durmayı tarihli fotoğraf, yapı denetim kayıtları ve seviye tespit tutanaklarıyla belgeleyin.",
                "Salt çoğunlukla fesih kararı alın ve Başkanlığa başvurarak işe başlanıp başlanmadığının tespitini isteyin.",
                "Başkanlıkça müteahhide verilecek otuz günlük ihtar süresini takip edin; sürenin bitimiyle sözleşmeler resen feshedilmiş sayılır.",
                "Kat irtifakının kurulup kurulmadığını kontrol edin; yapım işine başlanmasından itibaren altı ay geçtiyse haciz koruması kalkmıştır.",
                "Ruhsatı almayıp inşaata hiç başlanmadıysa adli yargıda geriye etkili fesih ve tapu iptali-tescil davası gündeme gelir.",
            ],
            risk:
                "Fesih yoluna gitmeden beklemek, müteahhidin üçüncü kişilere borçları nedeniyle taşınmazın haciz riskine girmesine ve payların devredilmesine yol açar.",
            adimSlug: "insaat-fesih-teslim",
            ictihatIds: ["yargitay-6hd-2025-3804", "yargitay-6hd-2022-483", "yargitay-6hd-2024-4279"],
            cta: "Fesih ve Tapu İptali Süreci İçin Görüşelim",
        };
    }

    if (cogunluk === "belirsiz" || cogunluk === "saglanmadi") {
        return {
            badge: "2. Aşama · Karar alma",
            title: "Hisse ağırlıklı çoğunluk ve toplantı yönetimi",
            oncelik:
                "Kanun, kararın «sahip oldukları hisseleri oranında paydaşların salt çoğunluğu» ile alınmasını arar. Ölçüt kişi sayısı değil arsa payı ağırlığıdır; bu hesabın yanlış yapılması en sık görülen iptal sebebidir.",
            adimlar: [
                "Tapu kayıtlarından bütün paydaşların arsa paylarını çıkarıp hisse ağırlıklı çoğunluk tablosu hazırlayın.",
                "Çağrıyı Ek-12 formuyla yapın; muhtarlık veya bina kapısı ilanını on beş gün sürdürün ya da noter kanalını kullanın.",
                "Toplantı tutanağına gündemi, katılan paydaşların hisselerini ve oylarını tek tek yazın.",
                "Karara katılmayanlara teklifi usulüne uygun bildirin; yapı ruhsatı başvurusundan önce bu tebligat ve satış müracaatı tamamlanmış olmalıdır.",
            ],
            risk:
                "Çağrının bir malike ulaşmaması, gündemin açıkça yazılmaması veya çoğunluğun kişi sayısına göre hesaplanması, aylar sonra tüm kararların ve ruhsatın iptaliyle sonuçlanabilir.",
            adimSlug: "salt-cogunluk-karari",
            ictihatIds: ["danistay-4d-2024-7646", "yargitay-6hd-2023-3330"],
            cta: "Toplantı, Tutanak ve Tebligat Desteği Alın",
        };
    }

    if (sozlesme === "taslak" || sozlesme === "yok") {
        return {
            badge: "3. Aşama · Sözleşme",
            title: "Müteahhit sözleşmesinin kurulması",
            oncelik:
                "Arsa payı karşılığı inşaat sözleşmesi, dönüşümün anayasasıdır ve kural olarak noterde düzenleme şeklinde yapılmalıdır. Hak sahiplerine isabet eden bağımsız bölümler sözleşmede belirlenmemişse kat irtifakı tesisi de talep edilemez.",
            adimlar: [
                "Sözleşmeyi noterde düzenleme şeklinde imzalayın; noter onaylı (tasdikli) metin yeterli değildir.",
                "Paylaşım tablosunu bağımsız bölüm numarasıyla sözleşmeye ekleyin.",
                "Teminat mektubu, gecikme cezası, ipotek yasağı ve kademeli tapu devri maddelerini mutlaka ekletin.",
                "Müteahhide verilecek vekaletnameyi ruhsat ve imar işlemleriyle sınırlandırın; satış ve ipotek yetkisi vermeyin.",
                "Sözleşmeyi tapuya şerh ettirin.",
            ],
            risk:
                "Standart müteahhit sözleşmeleri genellikle yüklenici lehine ağır hükümler içerir. Teminatsız ve cezai şartsız bir sözleşmede inşaat yarım kalırsa elinizde yalnızca uzun bir dava kalır.",
            adimSlug: "salt-cogunluk-karari",
            ictihatIds: ["yargitay-6hd-2023-3330", "yargitay-6hd-2022-483", "yargitay-6hd-2024-4279"],
            cta: "Müteahhit Sözleşmesi Analizi Talep Edin",
        };
    }

    if (rol === "muteahhit") {
        return {
            badge: "Yüklenici",
            title: "Yüklenici tarafında risk yönetimi",
            oncelik:
                "Yüklenicinin bedele hak kazanması, inşaatı sözleşme ve ekleri, tasdikli proje, ruhsat ve imar mevzuatına uygun biçimde tamamlayıp teslim etmesine bağlıdır. Devralınan arsa payı avans niteliğindedir.",
            adimlar: [
                "Sözleşmeyi noterde düzenleme şeklinde kurun ve paylaşımı bağımsız bölüm numarasıyla belirleyin.",
                "Kat irtifakını, yapım işine başlanmasından itibaren altı ay içinde kurdurun; aksi hâlde taşınmaz haciz riskine girer.",
                "Kendi payınıza düşen bağımsız bölümleri yalnızca tamamlanma oranının yüzde onu altındaki oranda satın.",
                "İşe başlama ve seviye kayıtlarını düzenli tutun; bir yıl işe başlamama ya da altı ay durma, salt çoğunlukla fesih yolunu açar.",
                "Kira yardımı taahhütlerinizi aksatmayın; fesih hâlinde ödenenler geri istenemez ama aksaklık fesih gerekçesi olur.",
            ],
            risk:
                "Ruhsatı almayıp inşaata hiç başlamamak, TBK m.124/1 uyarınca süre verilmesini gereksiz kılar ve arsa sahiplerine doğrudan geriye etkili fesih hakkı verir.",
            adimSlug: "insaat-fesih-teslim",
            ictihatIds: ["yargitay-6hd-2025-3804", "yargitay-6hd-2022-1071"],
            cta: "Yüklenici Sözleşmesi ve Uyum Denetimi",
        };
    }

    return {
        badge: "4. Aşama · Uygulama",
        title: "Uygulama, pay satışı ve teslim takibi",
        oncelik:
            "Çoğunluk sağlandı ve sözleşme imzalandı. Bundan sonraki kritik işler, karara katılmayan payların usulüne uygun satışı, ruhsat öncesi tebligatların tamamlanması ve inşaat seviyesinin hukuki takibidir.",
        adimlar: [
            "Ruhsat başvurusundan önce teklifin karara katılmayanlara tebliğini ve Müdürlüğe satış müracaatını tamamlayın.",
            "Pay satışı müracaat dosyasını eksiksiz hazırlayın: davet belgeleri, tutanaklar, tebligat belgeleri ve SPK yetkili değerleme raporu.",
            "Kat irtifakının altı ay içinde kurulmasını takip edin.",
            "İnşaat seviyesini tarihli kayıtlarla izleyin; gecikmede ihtar ve fesih mekanizmasını zamanında devreye alın.",
            "Teslimde eksik iş listesi düzenleyin; iskân alınmadan ibra imzalamayın.",
        ],
        risk:
            "Tebligat ve müracaat sırası atlanırsa yapı ruhsatı sakatlanır; eksik dosya nedeniyle pay satışı aylarca gecikir ve inşaat takvimi kayar.",
        adimSlug: "pay-satisi",
        ictihatIds: ["danistay-4d-2024-7646", "danistay-4d-2025-1681"],
        cta: "Süreç Takibi ve Hukuki Yönetim Talebi",
    };
}

/* ————————————————————————————————————————————————————————————————
 * Rehbere özel sık sorulanlar
 * ———————————————————————————————————————————————————————————————— */

export const REHBER_SSS: { id: string; soru: string; cevap: string[] }[] = [
    {
        id: "cogunluk-kisi-mi-hisse-mi",
        soru: "Salt çoğunluk kişi sayısına göre mi, arsa payına göre mi hesaplanır?",
        cevap: [
            "Arsa payına göre. 6306 sayılı Kanunun 6. maddesi, kararın «yapının paydaşı olup olmadıkları gözetilmeksizin sahip oldukları hisseleri oranında paydaşların salt çoğunluğu» ile alınacağını söyler. Ölçüt, lehte oy veren paydaşların arsa payı toplamının yarıdan fazla olmasıdır.",
            "Bu nedenle yirmi dairelik bir binada on bir malikin olumlu oyu, bu maliklerin arsa payı toplamı yüzde elliyi aşmıyorsa yeterli değildir. Özellikle dükkân, dubleks ve farklı metrekaredeki bağımsız bölümlerin bulunduğu binalarda kişi sayısı ile hisse ağırlığı birbirinden ciddi biçimde ayrılır.",
            "Toplantıdan önce tapu kayıtlarından bütün paydaşların arsa paylarını çıkarıp hisse ağırlıklı bir tablo hazırlamak, sonradan açılacak iptal davalarının önünü kesen en pratik önlemdir.",
        ],
    },
    {
        id: "binanin-yikilmasi-sart-mi",
        soru: "Karar almak ve pay satışı için binanın yıkılmış olması şart mı?",
        cevap: [
            "Hayır. Uygulama Yönetmeliği'nin 15. maddesinin ikinci fıkrası, yapıların yıktırılmış olması şartı aranmaksızın tevhit, ifraz, taksim, terk, ihdas, tescil, yeniden bina yapımı, payların satışı ve kat karşılığı veya hasılat paylaşımı kararlarının alınabileceğini düzenler.",
            "Aynı şekilde Yönetmeliğin 15/A maddesi, açık artırma usulüyle satış işleminin yapılabilmesi için yapıların yıktırılmış olmasının gerekmediğini açıkça belirtir. Süreç, bina ayakta iken de hukuken yürütülebilir.",
        ],
    },
    {
        id: "tebligat-gelmezse",
        soru: "Bana hiç tebligat gelmediyse alınan kararlar ve satış geçersiz olur mu?",
        cevap: [
            "Kendiliğinden geçersiz olmaz. Riskli yapı tespiti, tahliye ve yıkım tebligatları; tutanağın yapıya asılması, e-Devlet Kapısı üzerinden bildirim ve muhtarlıkta on beş gün ilan yoluyla yapılır ve ilanın son günü tebliğ edilmiş sayılır. Elinize bir evrak geçmese de süreler işler.",
            "Pay satışı aşamasında ise Yönetmelik, payı satılacak malike tebligat yapılamamış olmasının veya bu malikin satışa izleyici olarak katılmamasının satışın geçerliliğini etkilemeyeceğini, gıyapta yapılan satışın geçerli olacağını düzenler. Danıştay 4. Dairesi 19.12.2024 tarihli kararıyla bu kuralı hukuka uygun bulmuş; gerekçesinde malikin kat malikleri kurulu kararına karşı adli yargıda, idari işlemlere karşı idari yargıda her zaman dava açabileceğini vurgulamıştır.",
            "Buna karşılık toplantı çağrısının veya teklifin usulüne aykırı biçimde bildirilmesi ayrı bir sorundur ve kararın ya da işlemin iptali sebebi olabilir. Önemli olan, tebligatın hangi usulle yapıldığının belgelenmesidir.",
        ],
    },
    {
        id: "bedel-dusuk",
        soru: "Arsa payım rayiç bedelin altında satıldı; ne yapabilirim?",
        cevap: [
            "Satış, Başkanlıkça tespit edilen rayiç değerden az olmamak üzere yapılabilir. Rayiç değer, maliklerce SPK yetkili değerleme kuruluşuna tespit ettirilen değer de gözetilerek Bedel Tespiti Komisyonunca belirlenir.",
            "İhalenin iptali istemiyle açacağınız idari davada keşif ve bilirkişi incelemesi talep etmek belirleyicidir. Danıştay 4. Dairesi 17.03.2025 tarihli kararıyla, metrekaresi 32.500 TL üzerinden satılan payın bilirkişi incelemesinde 36.000 TL olarak tespit edilmesi üzerine verilen iptal kararını onamıştır.",
            "Satışın yalnızca «satış bedelinin eksik hesaplandığı» gerekçesiyle iptal edilmesi hâlinde işlem tümden ortadan kalkmaz; fark, ihale tarihinden işleyecek yasal faiziyle birlikte payı satın alan malik tarafından eski malike ödenir.",
        ],
    },
    {
        id: "muteahhit-durdu",
        soru: "Müteahhit inşaatı yarım bıraktı; sözleşmeyi nasıl feshederiz?",
        cevap: [
            "6306 sayılı Kanunun 6. maddesinin on dördüncü fıkrası özel bir yol öngörür: müteahhitten kaynaklanan sebeplerle bir yıl içinde yapım işine başlanmamış ya da iş durmuş ve en az altı aydır projeyi bitirecek seviyede ekip ve ekipmanla devam edilmiyorsa, hisseleri oranında maliklerin salt çoğunluğu ile sözleşmelerin feshine karar verilebilir.",
            "Bu kararla Başkanlığa başvurulup tespit istenir. Durum tespit edilirse müteahhide otuz gün süre verilerek işe başlaması ihtar edilir; buna rağmen başlanmazsa ayrıca ihtara gerek kalmaksızın otuz günlük sürenin bittiği tarih itibarıyla sözleşmeler resen feshedilmiş sayılır ve tapudaki şerhler terkin edilir.",
            "Ruhsat hiç alınmamış ve inşaata hiç başlanmamışsa adli yargı yolu da açıktır. Yargıtay 6. Hukuk Dairesi 11.11.2025 tarihli kararında, kararlaştırılan sürede ruhsat almayan ve inşaata hiç başlamayan yüklenici bakımından TBK m.124/1 uyarınca süre verilmesinin etkisiz olacağını, arsa sahiplerinin TBK m.125/3 uyarınca sözleşmenin geriye etkili feshini isteyebileceğini belirtmiştir.",
        ],
    },
    {
        id: "tapu-devri-riskli-mi",
        soru: "Tapuyu müteahhide devretmek mülkiyeti kaybetmek midir?",
        cevap: [
            "Hayır. Yargıtay'ın yerleşik içtihadına göre arsa sahibinin, inşaat yapılmak üzere arsasını yükleniciye devri avans niteliğindedir. Yüklenici, inşaatı sözleşmeye uygun biçimde bitirip teslim etmedikçe devraldığı paya hak kazanmaz.",
            "Buna rağmen devrin kademeli yapılması, yani müteahhide düşen payların inşaat tamamlanma oranına bağlı olarak devredilmesi en güvenli yoldur. Kanun da müteahhidin kendi payına düşen bağımsız bölümleri ancak tamamlanma oranının yüzde onu altındaki oranda satabileceğini, bu oranın üstündeki satış için bütün maliklerin muvafakatinin gerektiğini düzenler.",
            "Ayrıca malikler adına kat irtifakı kuruluncaya kadar — o işe ait malzeme ve işçilik alacakları hariç — müteahhidin üçüncü kişilere borçlarından dolayı taşınmaza haciz ve tedbir uygulanamaz. Ancak yapım işine başlanmasından itibaren altı ay içinde kat irtifakı kurulmazsa bu koruma ortadan kalkar.",
        ],
    },
    {
        id: "adli-mi-idari-mi",
        soru: "Hangi davayı adli, hangisini idari yargıda açmalıyım?",
        cevap: [
            "Riskli yapı tespiti, teknik heyet kararı, tahliye ve yıkıma süre verilmesi, satışa davet ve açık artırma gibi idari işlemler idari yargıda — idare mahkemesinde — iptal davasına konu edilir. Dava süresi, işlemin tebliğinden itibaren otuz gündür ve yürütmenin durdurulması da bu dilekçede istenir.",
            "Kat malikleri kurulu kararının geçersizliği, arsa payı karşılığı inşaat sözleşmesinin feshi, tapu iptali ve tescil, cezai şart, gecikme tazminatı ve ayıplı iş talepleri ise adli yargıda, asliye hukuk mahkemesinde görülür.",
            "Danıştay 4. Dairesi 19.12.2024 tarihli kararında bu ikili yapıya özellikle dikkat çekmiş; malikin kurul kararına karşı adli yargıda, bu karara dayanılarak tesis edilen idari işlemlere karşı idari yargıda dava açma hakkının her zaman bulunduğunu belirtmiştir. Yanlış yargı kolunda açılan dava, görev yönünden reddedilir ve değerli zaman kaybedilir.",
        ],
    },
    {
        id: "ortakligin-giderilmesi",
        soru: "Ortaklığın giderilmesi davası dönüşümü durdurur mu?",
        cevap: [
            "Durdurmaz. 6306 sayılı Kanunun 6. maddesinin on altıncı fıkrası, yapıların yıktırılmasından sonra arsa hâline gelen taşınmazda ortaklığın giderilmesi için Türk Medeni Kanunu hükümlerine göre dava açılabileceğini; ancak bu davanın açılmış olmasının hisseleri oranında paydaşların salt çoğunluğu ile karar alınmasına ve bu karara göre işlem yapılmasına engel teşkil etmeyeceğini açıkça düzenler.",
            "Aynı kural Uygulama Yönetmeliği'nin 15. maddesinin birinci fıkrasında da tekrarlanmıştır. Dolayısıyla izale-i şuyu davası, dönüşüm sürecini askıya almak için kullanılabilecek bir araç değildir.",
        ],
    },
];
