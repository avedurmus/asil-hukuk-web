export interface FAQItem {
    /** SEO ve derin bağlantı (deep link) için kalıcı kimlik. */
    id: string;
    question: string;
    /**
     * Hukuk bilgisi olmayan bir okurun ilk bakışta anlayacağı bir-iki cümlelik
     * sade cevap. Ayrıntı ve kanun maddeleri `answer` içinde kalır.
     */
    shortAnswer?: string;
    /** Düz metin. Paragraflar çift satır sonu ile ayrılır. */
    answer: string;
    category: FAQCategoryId;
    /** Sayfa içi aramada eşleşmeyi genişleten eş anlamlılar. */
    keywords?: string[];
    /** Konuyu derinleştiren blog yazısının id'si. */
    relatedPostId?: string;
}

export type FAQCategoryId =
    | "Aile Hukuku"
    | "İş Hukuku"
    | "Ceza Hukuku"
    | "Gayrimenkul ve Kira Hukuku"
    | "Kentsel Dönüşüm"
    | "Miras Hukuku"
    | "İcra ve Ticaret Hukuku"
    | "Genel";

export interface FAQCategory {
    id: FAQCategoryId;
    /** Kategori listesinde ve filtre butonlarında görünen kısa ad. */
    label: string;
    description: string;
}

export const faqCategories: FAQCategory[] = [
    {
        id: "Aile Hukuku",
        label: "Aile Hukuku",
        description: "Boşanma, velayet, nafaka, mal rejimi ve tazminat.",
    },
    {
        id: "İş Hukuku",
        label: "İş Hukuku",
        description: "İşe iade, kıdem ve ihbar tazminatı, işçilik alacakları.",
    },
    {
        id: "Ceza Hukuku",
        label: "Ceza Hukuku",
        description: "Soruşturma, gözaltı, tutukluluk, HAGB ve uzlaştırma.",
    },
    {
        id: "Gayrimenkul ve Kira Hukuku",
        label: "Gayrimenkul ve Kira",
        description: "Tahliye, kira artışı, kira tespiti, tapu ve önalım.",
    },
    {
        id: "Kentsel Dönüşüm",
        label: "Kentsel Dönüşüm",
        description: "Riskli yapı tespiti, anlaşma çoğunluğu ve kira yardımı.",
    },
    {
        id: "Miras Hukuku",
        label: "Miras Hukuku",
        description: "Saklı pay, tenkis, mirasın reddi ve muris muvazaası.",
    },
    {
        id: "İcra ve Ticaret Hukuku",
        label: "İcra ve Ticaret",
        description: "İcra takibi, itirazın iptali, ihtiyati haciz, çek ve senet.",
    },
    {
        id: "Genel",
        label: "Genel",
        description: "Vekalet, avukatlık ücreti, yargılama giderleri ve süreç.",
    },
];

export const faqs: FAQItem[] = [
    // ————————————————————————————————— Aile Hukuku
    {
        id: "anlasmali-bosanma-suresi",
        category: "Aile Hukuku",
        question: "Anlaşmalı boşanma davası ne kadar sürer?",
        shortAnswer:
            "Eşler her konuda (nafaka, velayet, mal paylaşımı) anlaşmışsa dava genellikle tek duruşmada biter. Dava açıldıktan sonra kararın kesinleşip nüfusa işlenmesi çoğunlukla 1-3 ay sürer.",
        answer:
            "Anlaşmalı boşanma davaları, tarafların boşanma ve fer'îleri (nafaka, tazminat, velayet, mal paylaşımı) konusunda tam mutabakata varması ve hâkimin protokolü uygun bulması hâlinde kural olarak tek celsede sonuçlanır.\n\nDava açıldıktan sonra duruşma gününün verilmesi mahkemenin iş yoğunluğuna göre 1 hafta ile 1 ay arasında değişir. Duruşmada verilen kararın gerekçeli hâle getirilmesi, taraflara tebliği ve iki haftalık istinaf süresinin geçmesiyle karar kesinleşir; nüfusa işlenmesi bu kesinleşmeden sonra yapılır. Uygulamada dava açılışından nüfusa tescile kadar geçen toplam süre çoğunlukla 1-3 aydır.",
        keywords: ["tek celse", "protokol", "hızlı boşanma"],
        relatedPostId: "anlasmali-bosanma-davasi-ne-kadar-surer",
    },
    {
        id: "anlasmali-bosanma-sartlari",
        category: "Aile Hukuku",
        question: "Anlaşmalı boşanmanın şartları nelerdir?",
        shortAnswer:
            "Evliliğin en az bir yıl sürmüş olması, iki eşin de boşanmak istemesi ve nafaka, velayet ve mal paylaşımını gösteren bir protokol üzerinde anlaşmış olmanız gerekir. Hâkim eşleri bizzat dinler.",
        answer:
            "Türk Medeni Kanunu'nun 166/3. maddesi dört şart arar:\n\n1) Evliliğin en az bir yıl sürmüş olması. 2) Eşlerin mahkemeye birlikte başvurması veya bir eşin açtığı davayı diğerinin kabul etmesi. 3) Hâkimin tarafları bizzat dinleyerek iradelerinin serbestçe açıklandığına kanaat getirmesi. 4) Boşanmanın malî sonuçları ile çocukların durumu hakkında taraflarca hazırlanan düzenlemenin (protokolün) hâkimce uygun bulunması.\n\nHâkim, tarafların ve çocukların menfaatlerini gözeterek protokolde değişiklik yapılmasını isteyebilir; bu değişiklik taraflarca kabul edilmedikçe boşanmaya karar verilemez. Evlilik bir yılı doldurmamışsa anlaşmalı boşanma yolu kapalıdır, çekişmeli dava açılması gerekir.",
        keywords: ["tmk 166", "bir yıl", "protokol şartı"],
    },
    {
        id: "cekismeli-bosanma-suresi",
        category: "Aile Hukuku",
        question: "Çekişmeli boşanma davası ne kadar sürer?",
        shortAnswer:
            "İlk mahkeme aşaması ortalama 1,5-2 yıl sürer; itiraz edilirse toplam 3-4 yılı bulabilir. Bu sürede nafaka ve çocukla ilgili geçici kararlar çok daha kısa sürede alınabilir.",
        answer:
            "Çekişmeli boşanma davalarının süresi; toplanacak delillere, dinlenecek tanık sayısına, velayet konusunda uzman (pedagog) raporu alınıp alınmayacağına ve mahkemenin iş yoğunluğuna göre değişir.\n\nİlk derece mahkemesi aşaması ortalama 1,5-2 yıl sürmektedir. Karara karşı istinaf ve ardından temyiz yoluna gidilmesi hâlinde sürecin toplam 3-4 yıla ulaştığı görülmektedir. Yargılama sürerken tedbir nafakası, velayetin geçici düzenlenmesi ve 6284 sayılı Kanun kapsamındaki koruma tedbirleri talep edilebilir; bunlar hakkında genellikle çok kısa sürede karar verilir.",
        keywords: ["dava süresi", "istinaf", "temyiz"],
    },
    {
        id: "velayet-kime-verilir",
        category: "Aile Hukuku",
        question: "Boşanmada velayet kime verilir?",
        shortAnswer:
            "Belirleyici olan, çocuğun yararıdır; kimin haklı olduğu değil. Küçük çocukların velayeti çoğunlukla anneye verilir; yaklaşık 8 yaşından büyük çocukların görüşü de mahkemece dinlenir.",
        answer:
            "Velayet düzenlemesinde tek ölçüt \"çocuğun üstün yararı\"dır; ebeveynlerin kusuru kural olarak belirleyici değildir.\n\nHâkim; çocuğun yaşını, bedensel ve ruhsal gelişimini, alıştığı çevreyi, ebeveynlerin yaşam koşullarını ve çocukla kurdukları bağı değerlendirir. Anne bakım ve şefkatine muhtaç yaştaki küçük çocukların velayeti uygulamada çoğunlukla anneye bırakılır. İdrak çağındaki (genellikle 8 yaş üstü) çocukların görüşü, BM Çocuk Haklarına Dair Sözleşme uyarınca mahkemece dinlenir ve dikkate alınır; ancak çocuğun beyanı tek başına bağlayıcı değildir.\n\nVelayet kesin hüküm oluşturmaz: koşullar değişirse velayetin değiştirilmesi davası her zaman açılabilir.",
        keywords: ["çocuğun üstün yararı", "ortak velayet", "pedagog"],
    },
    {
        id: "bosanmada-mal-paylasimi",
        category: "Aile Hukuku",
        question: "Boşanmada mallar nasıl paylaşılır?",
        answer:
            "1 Ocak 2002'den sonra kurulan evliliklerde, eşler başka bir rejim seçmedikçe yasal mal rejimi \"edinilmiş mallara katılma\"dır (TMK m. 218 vd.).\n\nBu rejimde mallar ikiye ayrılır. Kişisel mallar (evlilik öncesi edinilenler, miras ve bağış yoluyla gelenler, manevi tazminatlar, kişisel kullanım eşyaları) paylaşıma girmez. Edinilmiş mallar ise evlilik süresince emek karşılığı elde edilen değerlerdir: ücret, serbest meslek kazancı, SGK ödemeleri, kişisel malların gelirleri ve bunların yerine geçen değerler.\n\nHer eş, diğerinin edinilmiş mallarının \"artık değeri\"nin yarısı üzerinde katılma alacağına sahiptir (TMK m. 236). Bu bir alacak hakkıdır; malın mülkiyetine ortak olunmaz, para olarak hüküm altına alınır. Katılma alacağı için mala katkıda bulunmuş olmak şart değildir.\n\nÖnemli: Mal paylaşımı boşanma davasının içinde karara bağlanmaz; ayrı bir \"mal rejiminin tasfiyesi\" davası açılması gerekir ve bu dava boşanma kesinleşmeden sonuçlandırılamaz.",
        keywords: ["edinilmiş mal", "katılma alacağı", "tasfiye", "kişisel mal"],
        relatedPostId: "katilma-alacagi-mal-kacirma-ictihat",
    },
    {
        id: "mal-kacirma-ne-yapilir",
        category: "Aile Hukuku",
        question: "Eşim boşanmadan önce malları üzerine devretti, ne yapabilirim?",
        answer:
            "TMK m. 229 bu durumu düzenler. Mal rejiminin sona ermesinden önceki bir yıl içinde diğer eşin rızası olmadan yapılan karşılıksız kazandırmalar ile mal rejimi süresince katılma alacağını azaltmak kastıyla yapılan devirler, tasfiyede \"eklenecek değer\" olarak edinilmiş mallara dâhil edilir. Yani mal fiilen elden çıkmış olsa bile hesaba katılır.\n\nYargıtay'ın yerleşik uygulamasına göre bu tür devirlerde tapu iptal ve tescil kararı verilemez; talep hakkı mala yönelik aynî bir hak değil, değer üzerinden hesaplanan alacak hakkıdır. Devirden yararlanan üçüncü kişi davada taraf gösterilse dahi ilk aşamada alacaktan sorumlu tutulmaz; dava ona ihbar edilmiş olur ve TMK m. 241 koşullarıyla sonradan ona karşı dava açılabilir.\n\nKoruyucu adım olarak, dava açılırken taşınmazlar üzerine ihtiyati tedbir şerhi konulması talep edilmelidir.",
        keywords: ["muvazaa", "tmk 229", "eklenecek değer", "ihtiyati tedbir"],
        relatedPostId: "katilma-alacagi-mal-kacirma-ictihat",
    },
    {
        id: "mal-rejimi-zamanasimi",
        category: "Aile Hukuku",
        question: "Mal paylaşımı davası için süre sınırı var mı?",
        answer:
            "Mal rejiminin tasfiyesinden kaynaklanan katılma alacağı ve değer artış payı talepleri, Yargıtay'ın yerleşik uygulamasında on yıllık zamanaşımına tâbidir ve bu süre boşanma kararının kesinleştiği tarihten itibaren işlemeye başlar.\n\nBoşanma davası devam ederken de tasfiye davası açılabilir; ancak mahkeme boşanma kesinleşene kadar bu davayı bekletici mesele yapar. Uygulamada hak kaybı yaşamamak için boşanma kesinleştikten hemen sonra dava açılması önerilir; aradan geçen sürede malların elden çıkarılması hâlinde ispat güçleşir.",
        keywords: ["10 yıl", "zamanaşımı", "kesinleşme"],
    },
    {
        id: "nafaka-turleri",
        category: "Aile Hukuku",
        question: "Kaç çeşit nafaka vardır?",
        shortAnswer:
            "Dört tür nafaka vardır: dava sürerken ödenen tedbir nafakası, çocuk için ödenen iştirak nafakası, boşanınca yoksulluğa düşecek eşe ödenen yoksulluk nafakası ve akrabalar arasındaki yardım nafakası.",
        answer:
            "Türk hukukunda dört tür nafaka bulunur:\n\nTedbir nafakası (TMK m. 169): Dava süresince eşin ve çocukların geçimi için hükmedilir, talep olmasa bile hâkim resen karar verebilir.\n\nİştirak nafakası (TMK m. 182): Boşanmadan sonra velayeti kendisine verilmeyen eşin, çocuğun bakım ve eğitim giderlerine katılmasıdır. Çocuk ergin olunca kural olarak sona erer; eğitim devam ediyorsa yardım nafakasına dönüşebilir.\n\nYoksulluk nafakası (TMK m. 175): Boşanma yüzünden yoksulluğa düşecek tarafa, kusuru daha ağır olmamak koşuluyla ödenir.\n\nYardım nafakası (TMK m. 364): Altsoy, üstsoy ve kardeşlerin birbirine karşı yükümlülüğüdür; boşanmayla ilgisi yoktur.",
        keywords: ["tedbir", "iştirak", "yoksulluk", "yardım nafakası"],
    },
    {
        id: "yoksulluk-nafakasi-suresiz-mi",
        category: "Aile Hukuku",
        question: "Yoksulluk nafakası ömür boyu mu ödenir?",
        answer:
            "TMK m. 175 uyarınca yoksulluk nafakası süresiz olarak hükmedilir; ancak \"ömür boyu\" demek doğru değildir, çünkü kanun sona erme hâllerini ayrıca düzenlemiştir.\n\nTMK m. 176/3'e göre nafaka alacaklısının yeniden evlenmesi ya da taraflardan birinin ölümü hâlinde nafaka kendiliğinden kalkar. Nafaka alan tarafın evlenme olmaksızın fiilen evliymiş gibi yaşaması, yoksulluğunun ortadan kalkması veya haysiyetsiz hayat sürmesi hâlinde ise mahkeme kararıyla kaldırılır.\n\nAyrıca TMK m. 176/4 uyarınca tarafların malî durumlarının değişmesi hâlinde nafakanın artırılması veya azaltılması istenebilir.",
        keywords: ["nafakanın kaldırılması", "tmk 176", "artırım"],
    },
    {
        id: "ziynet-esyalari",
        category: "Aile Hukuku",
        question: "Düğünde takılan altınlar (ziynet eşyası) kime aittir?",
        shortAnswer:
            "Düğünde takılan kadına özgü takılar (bilezik, kolye vb.) kime takılırsa takılsın kadının sayılır; damada takılan para ve altınlar erkeğin kabul edilir. Takıların varlığını fotoğraf, video ve tanıkla ispat etmek gerekir.",
        answer:
            "Yargıtay'ın yerleşik uygulamasına göre, kime takıldığına bakılmaksızın kadına özgü ziynet eşyaları kadının kişisel malı sayılır. Damada takılan para ve altınlar ise erkeğe ait kabul edilir; aksi yöndeki yerel âdet iddiası ispat edilmedikçe sonuca etkili olmaz.\n\nZiynet alacağı davasında ispat yükü, eşyaları talep eden taraftadır. Düğün görüntüleri, fotoğraflar, takı listesi, tanık beyanları ve bozdurma işlemine ilişkin banka/kuyumcu kayıtları delil olarak kullanılır. Karşı taraf eşyaların rızayla ve karşılıksız verildiğini (bağışlandığını) veya iade edildiğini ispatlarsa sorumluluktan kurtulur.\n\nTalep, eşyanın aynen iadesi; mümkün değilse dava tarihindeki rayiç bedelinin ödenmesi şeklinde ileri sürülür.",
        keywords: ["altın", "takı", "ziynet alacağı", "ispat"],
    },
    {
        id: "aldatma-tazminat",
        category: "Aile Hukuku",
        question: "Aldatılan eş tazminat alabilir mi?",
        answer:
            "Evet. TMK m. 174/1 uyarınca, mevcut veya beklenen menfaatleri boşanma yüzünden zedelenen kusursuz ya da daha az kusurlu taraf, kusurlu taraftan uygun bir maddi tazminat isteyebilir.\n\nTMK m. 174/2'ye göre ise boşanmaya sebep olan olaylar yüzünden kişilik hakkı saldırıya uğrayan taraf manevi tazminat talep edebilir. Aldatma (zina), TMK m. 161 uyarınca hem özel boşanma sebebidir hem de manevi tazminat bakımından tipik bir kişilik hakkı ihlalidir.\n\nZina sebebine dayalı boşanma davası, öğrenmeden itibaren altı ay ve her hâlde fiilin üzerinden beş yıl geçmekle düşer. Bu süre kaçırılsa bile, evlilik birliğinin temelinden sarsılması (TMK m. 166) sebebine dayanılabilir. Aldatan eşin birlikte olduğu üçüncü kişiye karşı tazminat davası açılması ise Yargıtay uygulamasında kural olarak kabul edilmemektedir.",
        keywords: ["zina", "manevi tazminat", "tmk 174", "üçüncü kişi"],
    },
    {
        id: "bosanma-davasi-nerede-acilir",
        category: "Aile Hukuku",
        question: "Boşanma davası hangi mahkemede açılır?",
        answer:
            "Görevli mahkeme Aile Mahkemesidir; aile mahkemesi bulunmayan yerlerde bu sıfatla Asliye Hukuk Mahkemesi görevlidir.\n\nYetki bakımından TMK m. 168 iki seçenek sunar: eşlerden birinin yerleşim yeri mahkemesi ya da eşlerin davadan önce son defa altı aydan beri birlikte oturdukları yer mahkemesi. Davacı bu yerlerden dilediğinde davasını açabilir.\n\nAnlaşmalı boşanmada taraflar yetki konusunda serbestçe anlaşabilir; uygulamada protokolde belirtilen yer mahkemesinde dava açılır.",
        keywords: ["yetkili mahkeme", "aile mahkemesi", "tmk 168"],
    },
    {
        id: "6284-koruma-karari",
        category: "Aile Hukuku",
        question: "Şiddet ve tehdit durumunda uzaklaştırma kararı nasıl alınır?",
        answer:
            "6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun kapsamında koruyucu ve önleyici tedbir kararı istenebilir.\n\nBaşvuru Aile Mahkemesine yapılabileceği gibi, gecikmesinde sakınca bulunan hâllerde kolluğa (polis/jandarma) veya mülki amire de yapılabilir; kolluk amiri tarafından alınan tedbir kararı en geç 24 saat içinde hâkim onayına sunulur.\n\nTedbir kararı için delil veya belge sunulması şart değildir; beyan esas alınarak karar verilir. Hâkim; şiddet uygulayanın konuttan uzaklaştırılmasına, mağdura yaklaşmamasına, iletişim araçlarıyla rahatsız etmemesine, silahını teslim etmesine ve mağdura geçici nafaka ödenmesine karar verebilir. Tedbir kararına aykırı davranılması hâlinde zorlama hapsi uygulanır.",
        keywords: ["uzaklaştırma", "şiddet", "koruma kararı", "tedbir"],
    },

    // ————————————————————————————————— İş Hukuku
    {
        id: "ise-iade-suresi",
        category: "İş Hukuku",
        question: "İşe iade davası açma süresi nedir?",
        shortAnswer:
            "İşten çıkarıldığınız size bildirildiği günden itibaren 1 ay içinde arabulucuya başvurmanız gerekir. Anlaşma olmazsa 2 hafta içinde dava açılmalıdır. Bu süreler kaçırılırsa işe dönme hakkı tamamen kaybedilir.",
        answer:
            "İş sözleşmesi feshedilen işçi, fesih bildiriminin tebliğinden itibaren bir ay içinde arabulucuya başvurmak zorundadır; arabuluculuk, işe iade davasında dava şartıdır.\n\nArabuluculuk görüşmelerinde anlaşma sağlanamazsa, son tutanağın düzenlendiği tarihten itibaren iki hafta içinde İş Mahkemesinde işe iade davası açılmalıdır. Bu süreler hak düşürücü niteliktedir; kaçırılması hâlinde işe iade hakkı tümüyle sona erer, yalnızca kıdem ve ihbar tazminatı gibi alacaklar talep edilebilir.",
        keywords: ["arabuluculuk", "1 ay", "2 hafta", "hak düşürücü süre"],
        relatedPostId: "ise-iade-davasi-sartlari",
    },
    {
        id: "ise-iade-sartlari",
        category: "İş Hukuku",
        question: "İşe iade davası açabilmek için hangi şartlar gerekir?",
        answer:
            "İş güvencesi hükümlerinden yararlanabilmek için dört şartın birlikte bulunması gerekir (4857 sayılı Kanun m. 18):\n\n1) İşçinin İş Kanunu'na tabi olarak çalışması. 2) İşyerinde en az otuz işçi çalıştırılması (işverenin aynı iş kolundaki tüm işyerlerindeki işçi sayısı birlikte hesaplanır). 3) İşçinin en az altı aylık kıdeminin bulunması (yer altı işlerinde bu şart aranmaz). 4) Sözleşmenin belirsiz süreli olması ve işveren tarafından geçerli bir sebep gösterilmeksizin feshedilmesi.\n\nİşletmenin bütününü sevk ve idare eden işveren vekilleri ile işyerinin tamamını yöneten ve işçi alıp çıkarma yetkisi bulunan işveren vekilleri iş güvencesi kapsamı dışındadır.\n\nDavanın kabulü hâlinde işçi en çok dört aylık boşta geçen süre ücretine hak kazanır; işveren işe başlatmazsa ayrıca en az dört, en çok sekiz aylık ücret tutarında işe başlatmama tazminatı ödenir.",
        keywords: ["30 işçi", "6 ay kıdem", "iş güvencesi", "geçerli sebep"],
        relatedPostId: "ise-iade-davasi-sartlari",
    },
    {
        id: "kidem-tazminati-sartlari",
        category: "İş Hukuku",
        question: "Kıdem tazminatı hangi hâllerde alınır?",
        shortAnswer:
            "Aynı işyerinde en az 1 yıl çalıştıysanız ve işveren sizi haklı bir sebep olmadan çıkardıysa (ya da maaş ödenmemesi gibi haklı bir sebeple siz ayrıldıysanız) kıdem tazminatı alırsınız. Kendi isteğinizle istifa ederseniz kural olarak alamazsınız.",
        answer:
            "Kıdem tazminatına hak kazanmak için işçinin aynı işverene bağlı olarak en az bir yıl çalışmış olması ve iş sözleşmesinin kanunda sayılan sebeplerden biriyle sona ermesi gerekir.\n\nHak kazandıran başlıca hâller: işverenin haklı sebep dışında yaptığı fesih; işçinin 4857 m. 24 uyarınca haklı sebeple feshi (ücretin ödenmemesi, sigorta priminin eksik yatırılması, mobbing, ağır çalışma koşulları vb.); askerlik görevi; emeklilik veya yaşlılık aylığına hak kazanma; kadın işçinin evlendiği tarihten itibaren bir yıl içinde feshi; işçinin ölümü hâlinde mirasçıların talebi.\n\nTazminat, her tam yıl için 30 günlük giydirilmiş brüt ücret üzerinden hesaplanır; yıldan artan süreler oransal olarak eklenir. Her yıl için ödenecek tutar, yasal kıdem tazminatı tavanını aşamaz. İşçinin istifası ve işverence 4857 m. 25/II uyarınca yapılan haklı fesih kıdem tazminatı hakkı doğurmaz.",
        keywords: ["1 yıl", "istifa", "tavan", "giydirilmiş ücret", "emeklilik"],
    },
    {
        id: "ihbar-tazminati-sureleri",
        category: "İş Hukuku",
        question: "İhbar tazminatı nasıl hesaplanır?",
        answer:
            "Belirsiz süreli iş sözleşmesini fesheden taraf, 4857 sayılı Kanun m. 17'deki bildirim sürelerine uymak zorundadır. Uymayan taraf, karşı tarafa bu sürelere ait ücret tutarında ihbar tazminatı öder.\n\nBildirim süreleri kıdeme göre şöyledir: 6 aydan az çalışma için 2 hafta; 6 ay - 1,5 yıl arası için 4 hafta; 1,5 yıl - 3 yıl arası için 6 hafta; 3 yıldan fazla çalışma için 8 hafta.\n\nBu süreler asgarî olup sözleşmeyle artırılabilir. İhbar tazminatı, kıdem tazminatı gibi giydirilmiş brüt ücret üzerinden hesaplanır ve tavan sınırı yoktur. Haklı sebeple derhal fesih hâllerinde (4857 m. 24 ve 25) ihbar tazminatı doğmaz.",
        keywords: ["bildirim süresi", "2 hafta", "8 hafta", "m.17"],
    },
    {
        id: "fazla-mesai-ispat",
        category: "İş Hukuku",
        question: "Fazla mesai yaptığımı nasıl ispatlarım?",
        answer:
            "Fazla çalışma yapıldığının ispatı işçiye, ücretinin ödendiğinin ispatı ise işverene aittir.\n\nİşyerinde imzalı puantaj kayıtları, giriş-çıkış (PDKS) kayıtları veya fazla mesai ödemesini gösteren banka kayıtları varsa bunlar esas alınır. Yazılı delil yoksa işçi, iddiasını tanık beyanlarıyla ispat edebilir. Ancak Yargıtay tanık delilinde iki önemli sınır koyar: tanık yalnızca kendi çalıştığı döneme ilişkin bilgi verebilir; işyeriyle ilgisi olmayan veya işçiyle birlikte çalışmamış kişilerin beyanı hükme esas alınamaz.\n\nHesaplanan alacak tanık beyanına dayanıyor ve uzun bir dönemi kapsıyorsa, mahkemece hakkın özünü ortadan kaldırmayacak ölçüde \"hakkaniyet indirimi\" (takdiri indirim) uygulanır. Fazla mesainin yazılı belgelere ve işveren kayıtlarına dayandığı hâllerde ise bu indirim yapılmaz.\n\nİşverenin ödeme savunması yalnızca yazılı belgeyle ispatlanabilir; \"elden ödendi\" yönündeki tanık beyanlarına itibar edilmez.",
        keywords: ["tanık", "puantaj", "hakkaniyet indirimi", "ispat yükü"],
        relatedPostId: "fazla-mesai-ispati-hakkaniyet-indirimi-ictihat",
    },
    {
        id: "alti-isgunu-kurali",
        category: "İş Hukuku",
        question: "İşveren olayı öğrendikten ne kadar sonra haklı fesih yapabilir?",
        answer:
            "4857 sayılı Kanun m. 26 uyarınca haklı fesih yetkisi, feshe sebep olan olayın öğrenilmesinden itibaren altı iş günü ve her hâlde fiilin gerçekleşmesinden itibaren bir yıl içinde kullanılmalıdır. Bu süreler hak düşürücüdür.\n\nAltı iş günlük süre, olayın öğrenildiği gün hesaba katılmaksızın işler. İşveren tüzel kişi ise süre, feshe yetkili merciin (yönetim kurulu, disiplin kurulu vb.) öğrendiği günden başlar; müfettiş soruşturması yapılması veya olayın kurulda görüşülmesi süreyi tek başına başlatmaz.\n\nHaklı fesih sebebi süreklilik gösteriyorsa hak düşürücü süre işlemez. Örneğin ücreti ödenmeyen işçi, ödeme yapılmadığı sürece her zaman haklı sebeple fesih yapabilir. Devamsızlık hâlinde ise süre, son devamsızlık tutanağının düzenlendiği günden itibaren başlar.\n\nİşçinin olaydan maddi çıkar sağladığı hâllerde bir yıllık süre işlemez; altı iş gününe uyulmak kaydıyla aradan ne kadar zaman geçerse geçsin fesih yapılabilir.",
        keywords: ["m.26", "hak düşürücü", "devamsızlık", "haklı fesih"],
        relatedPostId: "alti-isgunluk-hak-dusurucu-sure-ictihat",
    },
    {
        id: "iscilik-alacaklarinda-zamanasimi",
        category: "İş Hukuku",
        question: "İşçilik alacaklarında zamanaşımı süresi kaç yıldır?",
        answer:
            "7036 sayılı İş Mahkemeleri Kanunu ile yapılan düzenleme sonrasında, 25 Ekim 2017 tarihinden sonra sona eren iş sözleşmelerinde kıdem tazminatı, ihbar tazminatı, kötüniyet tazminatı, yıllık izin ücreti ve eşit davranma ilkesine aykırılıktan doğan tazminat alacakları beş yıllık zamanaşımına tâbidir.\n\nÜcret, fazla mesai, hafta tatili, ulusal bayram ve genel tatil ücreti gibi dönemsel alacaklar için zamanaşımı Türk Borçlar Kanunu m. 147 uyarınca zaten beş yıldır ve bu süre alacağın doğduğu tarihten itibaren geriye doğru işler.\n\nBu nedenle uzun süre çalışılan işyerlerinde, dava tarihinden geriye beş yılı aşan fazla mesai ve tatil alacakları zamanaşımı def'i ileri sürüldüğünde reddedilir.",
        keywords: ["5 yıl", "tbk 147", "zamanaşımı def'i"],
    },
    {
        id: "is-davasinda-arabuluculuk",
        category: "İş Hukuku",
        question: "İş davası açmadan önce arabulucuya gitmek zorunlu mu?",
        shortAnswer:
            "Evet. İşçi alacakları, tazminat ve işe iade için dava açmadan önce arabulucuya gitmek zorunludur; gidilmezse dava reddedilir. İş kazası ve meslek hastalığı tazminatları bunun dışındadır.",
        answer:
            "Evet. 7036 sayılı Kanun m. 3 uyarınca, bireysel veya toplu iş sözleşmesine dayanan işçi ve işveren alacağı ile tazminatı ve işe iade talebiyle açılacak davalarda arabulucuya başvurulmuş olması dava şartıdır.\n\nArabulucuya başvurulmadan doğrudan açılan dava, herhangi bir işlem yapılmaksızın usulden reddedilir. Arabuluculuk süreci kural olarak üç hafta içinde sonuçlandırılır; zorunlu hâllerde bu süre en fazla bir hafta uzatılabilir.\n\nİstisna: İş kazası veya meslek hastalığından kaynaklanan maddi-manevi tazminat davaları ile bunlara ilişkin rücu davalarında arabuluculuk zorunlu değildir.",
        keywords: ["dava şartı", "3 hafta", "iş kazası istisnası"],
    },
    {
        id: "yillik-izin-sureleri",
        category: "İş Hukuku",
        question: "Yıllık ücretli izin süreleri ne kadardır?",
        answer:
            "4857 sayılı Kanun m. 53'e göre yıllık izne hak kazanmak için işyerinde deneme süresi dâhil en az bir yıl çalışmış olmak gerekir.\n\nİzin süreleri: 1 yıldan 5 yıla kadar (5 yıl dâhil) çalışanlar için 14 gün; 5 yıldan fazla 15 yıldan az çalışanlar için 20 gün; 15 yıl ve daha fazla çalışanlar için 26 günden az olamaz. On sekiz yaşından küçük ve elli yaşından büyük işçilere verilecek izin ise 20 günden az olamaz.\n\nBu süreler asgarîdir, sözleşmeyle artırılabilir. Yıllık izin hakkından vazgeçilemez ve iş sözleşmesi devam ederken izin ücretle değiştirilemez. Kullandırılmayan izinlerin ücreti ancak sözleşmenin sona ermesi hâlinde, son ücret üzerinden ödenir.",
        keywords: ["14 gün", "20 gün", "26 gün", "izin ücreti"],
    },
    {
        id: "issizlik-maasi-sartlari",
        category: "İş Hukuku",
        question: "İşsizlik maaşı almanın şartları nelerdir?",
        answer:
            "4447 sayılı Kanun uyarınca işsizlik ödeneğine hak kazanmak için üç şart aranır:\n\n1) İş sözleşmesinin işçinin kendi kusuru veya istifası dışındaki bir sebeple sona ermiş olması. 2) Son 120 gün hizmet akdine tabi olarak kesintisiz çalışmış olmak. 3) Son üç yıl içinde en az 600 gün işsizlik sigortası primi ödemiş olmak.\n\nBaşvuru, fesih tarihinden itibaren otuz gün içinde İŞKUR'a yapılmalıdır. Ödenek süresi prim gün sayısına göre değişir: 600 gün primi olan 180 gün, 900 gün primi olan 240 gün, 1080 gün ve üzeri primi olan 300 gün ödenek alır.\n\nHaklı sebeple istifa eden işçi de (ücretinin ödenmemesi gibi) bu haktan yararlanabilir; bu sebeple işten ayrılırken fesih gerekçesinin yazılı olarak bildirilmesi önemlidir.",
        keywords: ["İŞKUR", "600 gün", "120 gün", "30 gün başvuru"],
    },

    // ————————————————————————————————— Ceza Hukuku
    {
        id: "hagb-nedir",
        category: "Ceza Hukuku",
        question: "Hükmün Açıklanmasının Geri Bırakılması (HAGB) nedir?",
        answer:
            "HAGB, yargılama sonunda hükmolunan cezanın iki yıl veya daha az süreli hapis ya da adlî para cezası olması hâlinde, kurulan hükmün sanık hakkında hukukî sonuç doğurmaması sonucunu veren bir kurumdur (CMK m. 231).\n\nKarar verilebilmesi için sanığın daha önce kasıtlı bir suçtan mahkûm olmamış olması, mahkemenin yeniden suç işlemeyeceği kanaatine varması ve suçtan doğan zararın aynen iade, eski hâle getirme veya tazmin yoluyla tamamen giderilmesi gerekir. Zarar derhal giderilemiyorsa, denetim süresi boyunca aylık taksitlerle ödenmesi koşuluyla da karar verilebilir.\n\nHAGB kararı verilen sanık beş yıl süreyle denetim süresine tâbi tutulur. Bu sürede kasten yeni bir suç işlenmez ve yükümlülüklere uyulursa hüküm ortadan kaldırılarak davanın düşmesine karar verilir. Aksi hâlde mahkeme hükmü açıklar; ancak sanığın durumunu değerlendirerek cezanın yarısına kadar bir kısmının infaz edilmemesine ya da koşulları varsa erteleme veya seçenek yaptırıma çevirme yönünde yeni bir hüküm de kurabilir.\n\nHAGB kararları adlî sicile işlenmez; yalnızca bunlara mahsus ayrı bir sisteme kaydedilir ve sadece bir soruşturma veya kovuşturmayla bağlantılı olarak savcı, hâkim veya mahkemece istenebilir.\n\nİşkence ve eziyet suçları ile kamu görevlisinin görevi sebebiyle işlediği ve Anayasa'nın 17. maddesi kapsamında kötü muamele sayılabilecek suçlarda HAGB uygulanamaz.",
        keywords: ["denetim süresi", "5 yıl", "adli sicil", "cmk 231"],
        relatedPostId: "hagb-2026-degisikligi-cmk-231",
    },
    {
        id: "hagb-kanun-yolu",
        category: "Ceza Hukuku",
        question: "HAGB kararına karşı hangi kanun yoluna başvurulur?",
        answer:
            "HAGB kararlarına karşı uzun yıllar yalnızca itiraz yolu açıktı ve itiraz mercii kararı yalnızca şeklî koşullar yönünden inceleyebiliyordu. Bu durum, kararın esas yönünden hiçbir denetimden geçmemesi sonucunu doğuruyordu.\n\n2024 yılında yapılan değişiklikle bu sistem terk edildi: CMK m. 272/3'teki istinaf sınırları saklı kalmak üzere, HAGB kararına karşı istinaf yoluna başvurulabilir. Bölge adliye mahkemesince verilen kararlar hakkında CMK m. 286 hükümleri uygulanır. Karar ilk derece mahkemesi sıfatıyla bölge adliye mahkemesi veya Yargıtay tarafından verilmişse temyiz yolu açıktır. İstinaf ve temyiz incelemesinde karar ve hüküm, usul ve esasa ilişkin hukuka aykırılıklar yönünden denetlenir.\n\nGeçiş hükmü önemlidir: 1 Haziran 2024 tarihinden önce verilen HAGB kararları bakımından itiraz kanun yolunun uygulanmasına devam olunur ve bu itirazlar değişiklikten önceki hükümlere göre sonuçlandırılır.",
        keywords: ["istinaf", "itiraz", "1 haziran 2024", "cmk 272"],
        relatedPostId: "hagb-2026-degisikligi-cmk-231",
    },
    {
        id: "ifadede-avukat",
        category: "Ceza Hukuku",
        question: "İfade verirken avukat bulundurmak zorunlu mudur?",
        shortAnswer:
            "Çoğu durumda zorunlu değildir ama kesinlikle önerilir. 18 yaşından küçükler ve ağır suçlarda avukat ücretsiz olarak baro tarafından atanır. Avukatsız alınan karakol ifadesi, sonradan hâkim önünde kabul etmezseniz tek başına delil sayılmaz.",
        answer:
            "Kural olarak şüphelinin müdafi yardımından yararlanması bir haktır, zorunluluk değildir. Ancak CMK m. 150 uyarınca bazı hâllerde müdafi görevlendirilmesi zorunludur:\n\nŞüpheli veya sanığın on sekiz yaşını doldurmamış olması, sağır veya dilsiz olması ya da kendisini savunamayacak derecede malul olması hâllerinde; ayrıca alt sınırı beş yıldan fazla hapis cezasını gerektiren suçlarda istem aranmaksızın barodan müdafi görevlendirilir.\n\nZorunlu olmadığı hâllerde dahi, ifade ve sorgunun hukuka uygun yürütülmesi, susma hakkının doğru kullanılması ve tutanakların denetlenmesi bakımından avukat huzurunda ifade verilmesi güçlü biçimde önerilir. Müdafi hazır bulunmaksızın kollukça alınan ifade, hâkim veya mahkeme huzurunda şüpheli veya sanık tarafından doğrulanmadıkça hükme esas alınamaz (CMK m. 148/4).",
        keywords: ["müdafi", "zorunlu müdafi", "susma hakkı", "cmk 150"],
    },
    {
        id: "gozalti-suresi",
        category: "Ceza Hukuku",
        question: "Gözaltı süresi en fazla ne kadardır?",
        shortAnswer:
            "Kural olarak en fazla 24 saattir. Toplu suçlarda savcı bu süreyi her seferinde 1 günü geçmeyecek şekilde en fazla 3 gün uzatabilir. Gözaltındaki kişi avukatıyla görüşme ve yakınlarına haber verilmesi hakkına sahiptir.",
        answer:
            "CMK m. 91 uyarınca gözaltı süresi, yakalama yerine en yakın hâkim veya mahkemeye gönderilmesi için zorunlu süre hariç, yakalama anından itibaren yirmi dört saati geçemez. Yakalama yerine en yakın hâkim veya mahkemeye gönderilme için zorunlu süre on iki saatten fazla olamaz.\n\nToplu olarak işlenen suçlarda, delillerin toplanmasındaki güçlük veya şüpheli sayısının çokluğu sebebiyle Cumhuriyet savcısı gözaltı süresinin her defasında bir günü geçmemek üzere üç gün süreyle uzatılmasına yazılı olarak emir verebilir.\n\nGözaltına alınan kişinin yakınlarına derhal haber verilmesi, sağlık kontrolünden geçirilmesi ve müdafi ile görüşebilmesi zorunludur. Gözaltına alma ve sürenin uzatılması kararlarına karşı sulh ceza hâkimliğine itiraz edilebilir.",
        keywords: ["24 saat", "4 gün", "yakalama", "itiraz"],
    },
    {
        id: "uzlastirma-nedir",
        category: "Ceza Hukuku",
        question: "Uzlaştırma nedir, hangi suçlarda uygulanır?",
        answer:
            "Uzlaştırma, CMK m. 253 kapsamındaki suçlarda şüpheli ile mağdurun bir uzlaştırmacı aracılığıyla anlaşmasını sağlayan ve soruşturmanın kovuşturmaya yer olmadığı kararıyla sonuçlanmasına imkân veren zorunlu bir aşamadır.\n\nKapsama giren başlıca suçlar: soruşturulması ve kovuşturulması şikâyete bağlı suçlar (hakaret, tehdit gibi) ile kanunda ayrıca sayılan kasten yaralama, taksirle yaralama, konut dokunulmazlığının ihlali, iş ve çalışma hürriyetinin ihlali, güveni kötüye kullanma, dolandırıcılığın basit hâli, hırsızlığın bazı hâlleri gibi suçlar.\n\nCinsel dokunulmazlığa karşı suçlarda ve uzlaştırma kapsamına giren bir suçun, kapsama girmeyen başka bir suçla birlikte işlenmesi hâlinde uzlaştırma yoluna gidilemez. Ayrıca 6284 sayılı Kanun kapsamındaki aile içi şiddet olaylarında uzlaştırma hükümleri uygulanmaz.\n\nUzlaşma sağlanır ve edim yerine getirilirse dava açılmaz; kovuşturma aşamasında sağlanırsa düşme kararı verilir.",
        keywords: ["cmk 253", "şikayete bağlı", "kovuşturmaya yer yok"],
    },
    {
        id: "adli-sicil-silinmesi",
        category: "Ceza Hukuku",
        question: "Adli sicil kaydı nasıl silinir?",
        shortAnswer:
            "Ceza infaz edilince sabıka kaydı silinip arşive alınır; arşiv kaydı da çoğu durumda 5 yıl sonra tamamen silinir. Bunun için Cumhuriyet başsavcılığına dilekçeyle başvurabilirsiniz.",
        answer:
            "5352 sayılı Adlî Sicil Kanunu uyarınca adlî sicildeki bilgiler, cezanın veya güvenlik tedbirinin infazının tamamlandığı tarihten itibaren silinerek arşiv kaydına alınır. Ayrıca ceza mahkûmiyetini bütün sonuçlarıyla ortadan kaldıran şikâyetten vazgeçme, etkin pişmanlık, ceza zamanaşımının dolması veya genel af hâllerinde de kayıt arşive aktarılır.\n\nArşiv kaydı ise kural olarak, ilgilinin ölümü üzerine ya da fiilin kanunla suç olmaktan çıkarılması hâlinde tamamen silinir. Bunun dışında; mahkûmiyete ilişkin karar bir hak yoksunluğuna sebep olmuşsa yasaklanmış hakların geri verilmesi kararı alınmasıyla, hak yoksunluğu doğurmayan hâllerde ise arşive alınma tarihinden itibaren beş yıl geçmesiyle silinir.\n\nSilme işlemi için Adlî Sicil ve İstatistik Genel Müdürlüğüne veya Cumhuriyet başsavcılığına dilekçeyle başvurulur.",
        keywords: ["arşiv kaydı", "yasaklanmış hakların geri verilmesi", "5352"],
    },
    {
        id: "tutuklama-adli-kontrol",
        category: "Ceza Hukuku",
        question: "Tutuklama yerine adli kontrol kararı verilebilir mi?",
        answer:
            "Evet. CMK m. 109 uyarınca tutuklama sebeplerinin varlığına rağmen hâkim, tutuklama yerine adlî kontrol uygulanmasına karar verebilir. Kanun, tutuklamayı en son çare (ultima ratio) olarak konumlandırır.\n\nAdlî kontrol yükümlülükleri arasında yurt dışına çıkış yasağı, belirli aralıklarla kolluğa imza verme, konutu terk etmeme, belirli yerlere gitmeme, güvence bedeli yatırma ve elektronik kelepçe ile izleme gibi tedbirler bulunur.\n\nTutuklama kararına karşı yedi gün içinde itiraz edilebilir. Ayrıca tutukluluk hâlinin devamına ilişkin kararlara karşı da itiraz yolu açıktır ve şüpheli her zaman salıverilme talebinde bulunabilir. Tutukluluk incelemesi en geç otuzar günlük sürelerle resen yapılır.",
        keywords: ["cmk 109", "elektronik kelepçe", "itiraz", "ultima ratio"],
    },

    // ————————————————————————————————— Gayrimenkul ve Kira
    {
        id: "kiraci-tahliyesi-suresi",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Kiracı tahliyesi ne kadar sürer?",
        shortAnswer:
            "Yazılı tahliye taahhüdü varsa ve kiracı itiraz etmezse birkaç hafta sürebilir. Kira ödenmemesinde süreç birkaç ay, ev sahibinin ihtiyacı sebebiyle açılan davalarda ise 1-1,5 yılı bulabilir.",
        answer:
            "Süre, tahliye sebebine göre belirgin biçimde değişir.\n\nEn hızlı yol, geçerli bir yazılı tahliye taahhüdüne dayanan icra takibidir; itiraz edilmezse birkaç hafta içinde sonuç alınabilir. İtiraz hâlinde İcra Hukuk Mahkemesinde açılacak itirazın kaldırılması ve tahliye davası genellikle 4-8 ay sürer.\n\nKira bedelinin ödenmemesi sebebiyle otuz günlük ihtarlı ödeme emri gönderilip süresinde ödeme yapılmazsa tahliye istenebilir. İhtiyaç sebebiyle tahliye davaları ise kira süresinin bitiminden itibaren bir ay içinde açılmalıdır ve yargılaması 1-1,5 yılı bulabilir.\n\n1 Eylül 2023'ten itibaren kiralanan taşınmazların ilamsız icra yoluyla tahliyesine ilişkin hükümler hariç olmak üzere, kira ilişkisinden kaynaklanan uyuşmazlıklarda dava açmadan önce arabulucuya başvurulması dava şartıdır; bu da sürece üç hafta kadar ekler.",
        keywords: ["tahliye taahhüdü", "icra", "ihtiyaç", "arabuluculuk"],
        relatedPostId: "kiraci-tahliye-davasi-sartlari-suresi",
    },
    {
        id: "tahliye-taahhudu-gecerlilik",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Tahliye taahhütnamesi hangi hâllerde geçerlidir?",
        answer:
            "TBK m. 352/1 uyarınca kiracı, kiralananın tesliminden sonra, kiraya verene karşı kiralananı belli bir tarihte boşaltmayı yazılı olarak üstlenmişse ve boşaltmamışsa, kiraya veren bu tarihten başlayarak bir ay içinde icraya başvurarak veya dava açarak sözleşmeyi sona erdirebilir.\n\nBuradaki kritik şart \"teslimden sonra\" verilmiş olmasıdır. Kira sözleşmesiyle aynı anda, yani kiracı henüz taşınmaza girmeden alınan taahhüt, kiracının serbest iradesinin ürünü sayılmadığından geçersizdir. Buna karşılık kira ilişkisi kurulduktan sonra, sözleşme süresi dolmadan verilen taahhüt geçerlidir; bunun hayatın olağan akışına aykırı olduğu ileri sürülemez.\n\nUygulamada en çok tartışılan konu, boş kâğıda atılan imzaya tarihin sonradan yazılmasıdır. Yargıtay'ın yerleşik içtihadına göre belgenin anlaşmaya aykırı doldurulduğu iddiası, ancak aynı güçte yazılı bir belgeyle ispatlanabilir; boş kâğıda imza atan kişi bunun sonucuna katlanır.\n\nBir aylık süre hak düşürücüdür ve kaçırılması hâlinde taahhüde dayanılamaz.",
        keywords: ["tbk 352", "boş taahhütname", "1 ay", "imza"],
        relatedPostId: "tahliye-taahhudu-gecerlilik-ictihat",
    },
    {
        id: "kira-artis-orani",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Kira bedeline yıllık en fazla ne kadar zam yapılabilir?",
        shortAnswer:
            "Yıllık kira artışı, son 12 aylık TÜFE ortalamasını geçemez. Sözleşmede daha yüksek bir oran yazsa bile yalnızca bu sınıra kadar olan kısmı geçerlidir. Eskiden konutlarda uygulanan %25 sınırı artık geçerli değildir.",
        answer:
            "TBK m. 344 uyarınca tarafların yenilenen kira dönemlerinde uygulanacak kira bedeline ilişkin anlaşmaları, bir önceki kira yılında tüketici fiyat endeksindeki (TÜFE) on iki aylık ortalamalara göre değişim oranını geçmemek koşuluyla geçerlidir. Bu kural bir yıldan uzun süreli sözleşmelerde de uygulanır.\n\nTaraflar artış konusunda hiç anlaşmamışsa, kira bedeli yine aynı oranı geçmemek üzere hâkim tarafından belirlenir.\n\nSözleşmede TÜFE oranının üzerinde bir artış kararlaştırılmışsa, bu anlaşma tamamen geçersiz olmaz; yalnızca yasal üst sınırı aşan kısmı hüküm ifade etmez. Konut kiralarında bir dönem uygulanan yüzde 25'lik geçici tavan sona ermiş olup, geçerli üst sınır TÜFE on iki aylık ortalamasıdır.",
        keywords: ["TÜFE", "zam oranı", "tbk 344", "yüzde 25"],
    },
    {
        id: "kira-tespit-davasi",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Kira tespit davası ne zaman açılır, kira nasıl belirlenir?",
        answer:
            "TBK m. 344/3 uyarınca, beş yıldan uzun süreli veya beş yıldan sonra yenilenen kira sözleşmelerinde ve her beş yılın sonunda, yeni kira yılında uygulanacak kira bedeli; TÜFE'deki on iki aylık ortalamalara göre değişim oranı, kiralananın durumu ve emsal kira bedelleri göz önünde tutularak hâkim tarafından hakkaniyete uygun biçimde belirlenir. Bu dönemde TÜFE üst sınırı uygulanmaz.\n\nYargıtay'ın yerleşik uygulamasına göre beş yıl sonrasındaki belirleme \"hak ve nesafet\" dönemi kabul edilir. Bilirkişi marifetiyle taşınmazın boş olarak yeniden kiraya verilmesi hâlinde getireceği rayiç kira bedeli tespit edilir; ardından kiracının eski kiracı olduğu gözetilerek hakkaniyet gereği bir indirim yapılır ve makul kira bedeline hükmedilir.\n\nYeni kira döneminin başlangıcından en geç otuz gün önce dava açılması veya kiraya verenin bu süre içinde artış bildiriminde bulunması hâlinde karar, yeni dönemin başından itibaren hüküm doğurur. Aksi hâlde tespit edilen bedel bir sonraki kira yılında uygulanır.",
        keywords: ["hak ve nesafet", "5 yıl", "emsal kira", "30 gün"],
        relatedPostId: "kira-tespiti-hak-ve-nesafet-ictihat",
    },
    {
        id: "ihtiyac-nedeniyle-tahliye",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Ev sahibi ihtiyaç sebebiyle kiracıyı çıkarabilir mi?",
        shortAnswer:
            "Evet; ev sahibi, kendisi veya yakın ailesi için evde gerçekten ve zorunlu olarak oturması gerekiyorsa dava açabilir. Bu ihtiyacı ispat etmek zorundadır ve tahliyeden sonra 3 yıl boyunca evi başkasına kiralayamaz.",
        answer:
            "Evet, ancak sıkı koşullara bağlıdır. TBK m. 350 uyarınca kiraya veren; kiralananı kendisi, eşi, altsoyu, üstsoyu veya kanun gereği bakmakla yükümlü olduğu diğer kişiler için konut ya da işyeri gereksinimi sebebiyle kullanma zorunluluğu varsa dava açabilir.\n\nİhtiyacın gerçek, samimi ve zorunlu olması gerekir; bu üç unsur birlikte aranır ve ispat yükü kiraya verendedir. Belirli süreli sözleşmelerde dava, sürenin sonunda; belirsiz süreli sözleşmelerde fesih dönemine ve bildirim süresine uyularak belirlenecek tarihten başlayarak bir ay içinde açılmalıdır.\n\nTBK m. 355'teki yeniden kiralama yasağı önemli bir güvencedir: ihtiyaç sebebiyle tahliye edilen taşınmaz, haklı sebep olmaksızın üç yıl geçmedikçe eski kiracısından başkasına kiralanamaz. Aykırı davranan kiraya veren, son kira yılında ödenen bir yıllık kira bedelinden az olmamak üzere tazminat öder.",
        keywords: ["gerçek samimi zorunlu", "tbk 350", "3 yıl yasağı"],
    },
    {
        id: "yeni-malik-ihtiyaci",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Kiracılı ev satın aldım, kiracıyı ne zaman çıkarabilirim?",
        shortAnswer:
            "Evi almanız kira sözleşmesini sona erdirmez. Kendiniz veya yakınınız için ihtiyacınız varsa, aldıktan sonraki 1 ay içinde kiracıya yazılı bildirim yapıp, satın alma tarihinden 6 ay sonra tahliye davası açabilirsiniz.",
        answer:
            "TBK m. 351 uyarınca kiralananı sonradan edinen kişi, onu kendisi, eşi, altsoyu, üstsoyu veya kanun gereği bakmakla yükümlü olduğu diğer kişiler için konut veya işyeri gereksinimi sebebiyle kullanma zorunluluğu varsa, edinme tarihinden başlayarak bir ay içinde durumu kiracıya yazılı olarak bildirmek koşuluyla, edinme tarihinden itibaren altı ay sonra dava açabilir.\n\nYeni malik bu bildirimi yapmazsa bu hakkını kaybetmez; bu kez sözleşme süresinin bitiminden başlayarak bir ay içinde dava açabilir.\n\nSatış, kira sözleşmesini kendiliğinden sona erdirmez: TBK m. 310 uyarınca yeni malik kira sözleşmesinin tarafı hâline gelir ve önceki sözleşme koşullarıyla bağlıdır. Bu nedenle \"evi aldım, kiracı hemen çıksın\" talebi hukuken sonuç doğurmaz.",
        keywords: ["tbk 351", "6 ay", "1 ay bildirim", "tbk 310"],
    },
    {
        id: "iki-hakli-ihtar",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Kirayı geç ödeyen kiracı tahliye edilebilir mi?",
        answer:
            "Evet. TBK m. 352/2 uyarınca kiracı, bir kira yılı içinde veya bir yıldan kısa süreli kira sözleşmelerinde kira süresi içinde, kira bedelini ödemediği için kendisine yazılı olarak iki haklı ihtarda bulunulmasına sebep olmuşsa; kiraya veren, kira süresinin bitiminden başlayarak bir ay içinde tahliye davası açabilir. Bir yıldan uzun süreli sözleşmelerde bu süre, ihtarların yapıldığı kira yılının bitiminden itibaren işler.\n\nİhtarların \"haklı\" sayılması için farklı aylara ait kira bedellerine ilişkin olması ve ödeme yapılmadan önce çekilmiş olması gerekir; aynı aya ilişkin tekrarlanan ihtarlar tek ihtar sayılır.\n\nAyrı bir yol olarak TBK m. 315 uyarınca, muaccel kira bedeli ödenmezse kiracıya konut ve çatılı işyeri kiralarında en az otuz günlük süre verilerek ihtar çekilir; bu sürede de ödenmezse sözleşme feshedilerek tahliye istenebilir.",
        keywords: ["iki haklı ihtar", "temerrüt", "30 gün", "tbk 315"],
    },
    {
        id: "onalim-sufa-hakki",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Paylı mülkiyette önalım (şufa) hakkı nasıl kullanılır?",
        answer:
            "TMK m. 732 uyarınca paylı mülkiyette bir paydaşın taşınmaz üzerindeki payını tamamen veya kısmen üçüncü kişiye satması hâlinde, diğer paydaşlar önalım hakkını kullanabilir. Amaç, paydaşlar arasına dışarıdan kişilerin girmesini engellemektir.\n\nHak, dava yoluyla kullanılır. TMK m. 733/4 uyarınca satışın paydaşlara noter aracılığıyla bildirildiği tarihten itibaren üç ay ve her hâlde satışın üzerinden iki yıl geçmekle önalım hakkı düşer. Bu süreler hak düşürücüdür ve mahkemece resen dikkate alınır.\n\nÖnalım bedeli olarak satış bedeli ile alıcının ödediği tapu giderleri esas alınır; mahkemece belirlenen bedelin süresinde depo edilmesi zorunludur. Paydaşlar arasındaki satışlarda, bağış ve trampa gibi satış sayılmayan devirlerde önalım hakkı kullanılamaz. Fiilî taksim (paydaşların taşınmazı fiilen bölüşüp kullanması) savunması ispatlanırsa dava reddedilir.",
        keywords: ["tmk 732", "3 ay 2 yıl", "fiili taksim", "paydaş"],
    },
    {
        id: "ecrimisil-nedir",
        category: "Gayrimenkul ve Kira Hukuku",
        question: "Ecrimisil (haksız işgal tazminatı) nedir?",
        answer:
            "Ecrimisil, bir taşınmazı hukuki dayanağı olmaksızın kullanan kötüniyetli zilyedin, malike ödemekle yükümlü olduğu haksız işgal tazminatıdır.\n\nMirasçılar arasında sık görülür: terekedeki taşınmazı tek başına kullanan mirasçıdan, diğer mirasçılar payları oranında ecrimisil isteyebilir. Ancak burada intifadan men koşulu aranır; yani davacının, davalıya taşınmazı kullanmasına rıza göstermediğini açıkça bildirmiş olması gerekir. Bu koşulun bazı istisnaları (taşınmazın kira geliri getiren nitelikte olması, davalının taşınmazı kendisine izafeten kullanması gibi) Yargıtay içtihatlarıyla belirlenmiştir.\n\nEcrimisil alacağı beş yıllık zamanaşımına tâbidir; dava tarihinden geriye doğru beş yıllık dönem için talep edilebilir. Bedel, taşınmazın niteliğine göre kira geliri veya ürün geliri esas alınarak bilirkişi incelemesiyle belirlenir.",
        keywords: ["haksız işgal", "intifadan men", "5 yıl", "mirasçı"],
    },

    // ————————————————————————————————— Kentsel Dönüşüm
    {
        id: "riskli-yapi-itiraz",
        category: "Kentsel Dönüşüm",
        question: "Riskli yapı tespitine nasıl itiraz edilir?",
        answer:
            "6306 sayılı Kanun kapsamında lisanslı kuruluşça yapılan riskli yapı tespiti, ilgili idarece maliklere tebliğ edilir. Tebliğ tarihinden itibaren on beş gün içinde, yapının bulunduğu yerdeki Çevre, Şehircilik ve İklim Değişikliği İl Müdürlüğüne dilekçeyle itiraz edilebilir.\n\nİtirazlar, üniversitelerden görevlendirilen dört öğretim üyesi ile Bakanlık temsilcisi iki üyeden oluşan teknik heyetçe incelenir. Heyet raporu doğrultusunda tespit ya iptal edilir ya da kesinleşir.\n\nİdari itiraz reddedilirse, işlemin iptali istemiyle İdare Mahkemesinde dava açılabilir. Ancak 6306 sayılı Kanun m. 6/9 uyarınca bu davalarda yürütmenin durdurulmasına karar verilemez; bu nedenle dava açılmış olması yıkım işlemlerini kendiliğinden durdurmaz.",
        keywords: ["15 gün", "teknik heyet", "yürütmenin durdurulması", "6306"],
    },
    {
        id: "kentsel-donusum-cogunluk",
        category: "Kentsel Dönüşüm",
        question: "Kentsel dönüşümde anlaşmaya katılmayan malike ne olur?",
        answer:
            "6306 sayılı Kanun m. 6 uyarınca riskli yapı yıkıldıktan sonra arsa hâline gelen taşınmazda yapılacak uygulamaya, hisseleri oranında maliklerin en az üçte iki çoğunluğu ile karar verilir.\n\nBu karara katılmayan maliklerin arsa payları, Bakanlıkça belirlenen ve rayiç değerin altında olmamak üzere SPK lisanslı değerleme kuruluşlarınca tespit edilen bedel üzerinden, anlaşan maliklere açık artırma usulüyle satılır. Satış gerçekleşmezse bu paylar, rayiç bedel Hazinece ödenmek suretiyle tapuda Hazine adına tescil edilir.\n\nÜçte iki çoğunluğun usulüne uygun sağlanmaması, toplantı çağrısının tüm maliklere tebliğ edilmemesi veya değerleme raporunun rayiç bedeli yansıtmaması hâllerinde işlemlere karşı dava yolu açıktır. Bu nedenle sürecin her aşamasında tebligatların ve tutanakların saklanması önemlidir.",
        keywords: ["2/3 çoğunluk", "açık artırma", "SPK değerleme", "hazine"],
    },
    {
        id: "kentsel-donusum-kira-yardimi",
        category: "Kentsel Dönüşüm",
        question: "Kentsel dönüşümde kira yardımı alınabilir mi?",
        answer:
            "Evet. Riskli yapı olarak tespit edilen binadaki malikler, kiracılar ve sınırlı ayni hak sahipleri, Bakanlıkça belirlenen tutar ve süre kapsamında kira yardımından yararlanabilir.\n\nKira yardımı ile faiz desteği birlikte kullanılamaz; hak sahibi ikisinden birini seçer. Başvuru, yapının yıktırılmış olması ve tapu kaydının beyanlar hanesine riskli yapı şerhinin işlenmiş olması koşuluyla ilgili müdürlüğe yapılır.\n\nYardımın süresi ve aylık tutarı her yıl Bakanlıkça güncellenir; malikler ile kiracılar için farklı esaslar uygulanır. Kiracılar bakımından yardım genellikle tek seferlik ödeme şeklindedir. Güncel tutar ve süreler için başvuru anında ilgili müdürlükten teyit alınması gerekir.",
        keywords: ["kira yardımı", "faiz desteği", "hak sahibi", "riskli yapı şerhi"],
    },

    // ————————————————————————————————— Miras Hukuku
    {
        id: "sakli-pay-oranlari",
        category: "Miras Hukuku",
        question: "Saklı pay nedir, oranları nasıldır?",
        answer:
            "Saklı pay, mirasbırakanın tasarruf işlemleriyle ortadan kaldıramayacağı, kanunla güvence altına alınmış asgarî miras payıdır.\n\nTMK m. 506 uyarınca saklı pay oranları: altsoy için yasal miras payının yarısı; ana ve babadan her biri için yasal miras payının dörtte biri; sağ kalan eş için, altsoy veya ana-baba zümresiyle birlikte mirasçı olması hâlinde yasal miras payının tamamı, diğer hâllerde yasal miras payının dörtte üçü.\n\nSaklı paylı mirasçıların payı dışında kalan kısım \"tasarruf edilebilir kısım\" olup, mirasbırakan bu kısım üzerinde vasiyetname veya miras sözleşmesiyle serbestçe tasarruf edebilir. Saklı payı zedeleyen kazandırmalara karşı tenkis davası açılır.",
        keywords: ["tmk 506", "tasarruf edilebilir kısım", "altsoy", "sağ kalan eş"],
    },
    {
        id: "tenkis-davasi",
        category: "Miras Hukuku",
        question: "Tenkis davası nedir, ne zaman açılır?",
        answer:
            "Tenkis davası, mirasbırakanın saklı paylı mirasçıların paylarını zedeleyen ölüme bağlı veya sağlararası kazandırmalarının, saklı pay tamamlanacak ölçüde indirilmesini sağlayan davadır.\n\nTMK m. 571 uyarınca dava hakkı, mirasçıların saklı paylarının zedelendiğini öğrendikleri tarihten başlayarak bir yıl ve her hâlde vasiyetnamelerde açılma tarihinin, diğer tasarruflarda mirasın açılması tarihinin üzerinden on yıl geçmekle düşer. Bu süreler hak düşürücüdür.\n\nTenkis, kazandırmanın tamamının iptalini gerektirmez; yalnızca saklı payı tamamlayacak orana kadar indirim yapılır. Savunma yoluyla tenkis def'i ise süreye bağlı değildir ve her zaman ileri sürülebilir.",
        keywords: ["1 yıl 10 yıl", "tmk 571", "tenkis def'i", "vasiyetname"],
    },
    {
        id: "muris-muvazaasi",
        category: "Miras Hukuku",
        question: "Mirastan mal kaçırma (muris muvazaası) davası nedir?",
        answer:
            "Muris muvazaası, mirasbırakanın mirasçılarından mal kaçırmak amacıyla, gerçekte bağışlamak istediği taşınmazı tapuda satış veya ölünceye kadar bakma sözleşmesi gibi göstererek devretmesidir.\n\n1 Nisan 1974 tarihli ve 1/2 sayılı Yargıtay İçtihadı Birleştirme Kararı bu konuda esas alınır. Görünürdeki satış işlemi tarafların gerçek iradesini yansıtmadığı için, gizli bağış işlemi de şekil şartına uyulmadığı için geçersizdir. Bu nedenle saklı pay sahibi olsun olmasın tüm mirasçılar tapu iptali ve tescil davası açabilir.\n\nMuvazaanın ispatında; mirasbırakanın gerçek bir satış yapmaya ihtiyacı olup olmadığı, satış bedeli ile taşınmazın gerçek değeri arasındaki fark, mirasbırakan ile devralan arasındaki ilişki, bedelin gerçekten ödenip ödenmediği ve yöresel âdetler değerlendirilir. Tanık dâhil her türlü delille ispat mümkündür.\n\nDava, mirasbırakanın ölümünden sonra açılabilir ve herhangi bir hak düşürücü süreye veya zamanaşımına tâbi değildir. Tenkis davasından farkı, kazandırmanın tamamının iptalinin istenebilmesidir.",
        keywords: ["yibk 1974", "tapu iptali", "bağış", "zamanaşımı yok"],
    },
    {
        id: "mirasin-reddi",
        category: "Miras Hukuku",
        question: "Miras nasıl reddedilir, süresi nedir?",
        shortAnswer:
            "Ölümü ve mirasçı olduğunuzu öğrendiğiniz tarihten itibaren 3 ay içinde Sulh Hukuk Mahkemesine başvurarak mirası reddedebilirsiniz. Bu süre geçerse veya mirasa ait mallarla ilgili işlem yaparsanız reddetme hakkınızı kaybedebilirsiniz.",
        answer:
            "TMK m. 605 vd. uyarınca yasal ve atanmış mirasçılar mirası reddedebilir. Ret beyanı, mirasın açıldığı yerdeki Sulh Hukuk Mahkemesine yazılı veya sözlü olarak yapılır ve kayıtsız şartsız olmalıdır.\n\nSüre üç aydır (TMK m. 606). Bu süre yasal mirasçılar için mirasbırakanın ölümünü ve mirasçı olduklarını öğrendikleri tarihten; vasiyetname ile atanmış mirasçılar için tasarrufun kendilerine resmen bildirildiği tarihten işlemeye başlar. Süre hak düşürücüdür.\n\nÖlümü anında mirasbırakanın ödemeden aczi açıkça belli veya resmen tespit edilmiş ise, miras reddedilmiş sayılır (TMK m. 605/2); bu hâlde ayrıca ret beyanında bulunmaya gerek yoktur, ancak alacaklıların takibi hâlinde mirasın hükmen reddi davası açılması gerekebilir.\n\nMirasçı, terekeyi sahiplenir veya tereke işlerine karışırsa ret hakkını kaybeder.",
        keywords: ["3 ay", "hükmen ret", "sulh hukuk", "tmk 606"],
    },
    {
        id: "mirascilik-belgesi",
        category: "Miras Hukuku",
        question: "Veraset ilamı (mirasçılık belgesi) nereden alınır?",
        shortAnswer:
            "Çoğu durumda herhangi bir noterden kısa sürede alınabilir. Yabancı uyruklu mirasçı varsa veya nüfus kayıtlarında sorun varsa Sulh Hukuk Mahkemesine başvurmak gerekir.",
        answer:
            "Mirasçılık belgesi, mirasçıların kimler olduğunu ve paylarını gösteren belgedir. İki yoldan alınabilir:\n\nNoterden: Nüfus kayıtları üzerinden mirasçılığın tereddütsüz biçimde belirlenebildiği hâllerde herhangi bir noter mirasçılık belgesi düzenleyebilir. Hızlı ve pratik yoldur.\n\nSulh Hukuk Mahkemesinden: Yabancı uyruklu mirasçı bulunması, nüfus kayıtlarının çelişkili veya eksik olması, evlat edinme ya da soybağı uyuşmazlığı gibi hâllerde mahkemeye başvurulması gerekir.\n\nMirasçılık belgesi kesin hüküm oluşturmaz; aksi her zaman ispatlanabilir ve belgenin iptali istenebilir. Tapu, banka ve SGK işlemlerinde bu belge aranır.",
        keywords: ["veraset ilamı", "noter", "sulh hukuk", "yabancı mirasçı"],
    },

    // ————————————————————————————————— İcra ve Ticaret
    {
        id: "icra-takibine-itiraz",
        category: "İcra ve Ticaret Hukuku",
        question: "İcra takibine nasıl ve ne kadar sürede itiraz edilir?",
        shortAnswer:
            "Ödeme emrini aldığınız günden itibaren 7 gün içinde icra dairesine itiraz edebilirsiniz; itiraz takibi durdurur. Çek ve senede dayalı takiplerde süre 5 gündür ve itiraz mahkemeye yapılır.",
        answer:
            "İlamsız (genel haciz yoluyla) takipte borçluya ödeme emri tebliğ edilir. Borçlu, tebliğ tarihinden itibaren yedi gün içinde icra dairesine itiraz edebilir (İİK m. 62). Süresinde yapılan itiraz takibi kendiliğinden durdurur.\n\nBorca, faize, yetkiye veya imzaya ayrı ayrı itiraz edilebilir. İmzaya itirazın ayrıca ve açıkça yapılması zorunludur; aksi hâlde imza kabul edilmiş sayılır. Borcun yalnızca bir kısmına itiraz ediliyorsa, kabul edilen miktarın açıkça gösterilmesi gerekir.\n\nKambiyo senetlerine (çek, bono, poliçe) özgü takipte ise itiraz süresi beş gündür ve itiraz, icra dairesine değil İcra Hukuk Mahkemesine yapılır; kural olarak takibi kendiliğinden durdurmaz, tedbir kararı alınması gerekir.\n\nİtiraz süresi kaçırılırsa takip kesinleşir ve haciz aşamasına geçilir; bu durumda yalnızca gecikmiş itiraz veya menfi tespit davası gibi istisnaî yollar kalır.",
        keywords: ["7 gün", "5 gün", "ödeme emri", "imzaya itiraz", "iik 62"],
    },
    {
        id: "itirazin-iptali-davasi",
        category: "İcra ve Ticaret Hukuku",
        question: "Borçlu itiraz etti, alacağımı nasıl tahsil ederim?",
        answer:
            "İtirazla duran takibe devam edebilmek için iki yol vardır.\n\nİtirazın iptali davası (İİK m. 67): Genel mahkemede açılır ve itirazın tebliğinden itibaren bir yıl içinde açılmalıdır. Dava kabul edilirse takip kaldığı yerden devam eder. Borçlunun itirazının haksızlığına karar verilirse, alacaklının talebi üzerine reddedilen kısmın yüzde yirmisinden az olmamak üzere icra inkâr tazminatına hükmedilir. Alacaklının haksız takibi hâlinde ise borçlu lehine aynı oranda tazminata karar verilir.\n\nİtirazın kaldırılması (İİK m. 68): Alacak, imzası ikrar edilmiş adi senet, noter senedi, resmî daire kayıtları gibi kanunda sayılan belgelere dayanıyorsa, altı ay içinde İcra Hukuk Mahkemesine başvurulabilir. Bu yol daha hızlıdır ancak yalnızca belgeye dayalı ve sınırlı bir inceleme yapılır.\n\nTicari nitelikteki alacaklarda dava açmadan önce arabulucuya başvurmak dava şartıdır.",
        keywords: ["1 yıl", "icra inkar tazminatı", "%20", "iik 67", "iik 68"],
        relatedPostId: "sirketlerde-alacak-tahsili-ve-icra-takibi",
    },
    {
        id: "ihtiyati-haciz",
        category: "İcra ve Ticaret Hukuku",
        question: "İhtiyati haciz nedir, hangi hâllerde alınır?",
        answer:
            "İhtiyati haciz, para alacağının tahsilini güvence altına almak için borçlunun mallarına geçici olarak el konulmasını sağlayan bir koruma tedbiridir (İİK m. 257).\n\nVadesi gelmiş ve rehinle temin edilmemiş alacaklar için doğrudan istenebilir. Vadesi gelmemiş alacaklarda ise borçlunun belirli bir yerleşim yerinin bulunmaması ya da taahhütlerinden kurtulmak amacıyla mallarını gizlemesi, kaçırması veya kaçmaya hazırlanması gerekir.\n\nMahkeme kararı için alacağın yaklaşık olarak ispatı yeterlidir; kesin ispat aranmaz. Alacaklıdan kural olarak alacağın yüzde on beşi oranında teminat alınır; alacak ilama veya resmî belgeye dayanıyorsa teminat aranmayabilir.\n\nKarar alındıktan sonra on gün içinde icra dairesinden infazının istenmesi, haciz uygulandıktan sonra da yedi gün içinde esas hakkında takip veya dava başlatılması zorunludur. Bu süreler kaçırılırsa ihtiyati haciz kendiliğinden kalkar.",
        keywords: ["iik 257", "teminat", "yaklaşık ispat", "10 gün 7 gün"],
        relatedPostId: "sirketlerde-alacak-tahsili-ve-icra-takibi",
    },
    {
        id: "ticari-davalarda-arabuluculuk",
        category: "İcra ve Ticaret Hukuku",
        question: "Ticari alacak davalarında arabuluculuk zorunlu mu?",
        answer:
            "Evet. 6102 sayılı Türk Ticaret Kanunu m. 5/A uyarınca, konusu bir miktar paranın ödenmesi olan alacak ve tazminat talepleri hakkındaki ticari davalarda dava açılmadan önce arabulucuya başvurulmuş olması dava şartıdır.\n\nArabuluculuk süreci kural olarak altı hafta içinde sonuçlandırılır; zorunlu hâllerde en fazla iki hafta uzatılabilir. Anlaşma sağlanırsa düzenlenen anlaşma belgesi, icra edilebilirlik şerhi alınmasına gerek olmaksızın ilam niteliğinde belge sayılır ve doğrudan icraya konulabilir.\n\nBu şart yalnızca dava açmak için geçerlidir; ilamsız icra takibi başlatmak için arabulucuya gitmek gerekmez. Ancak borçlu takibe itiraz eder ve itirazın iptali davası açılacaksa, bu dava öncesinde arabuluculuk şartı aranır.",
        keywords: ["ttk 5/A", "6 hafta", "dava şartı", "ilam niteliği"],
    },
    {
        id: "cek-karsiliksiz",
        category: "İcra ve Ticaret Hukuku",
        question: "Karşılıksız çek durumunda ne yapılmalı?",
        answer:
            "Çekin ibraz süresi içinde bankaya sunulması ve karşılığının bulunmaması hâlinde, banka çekin arkasına karşılıksızdır işlemi yapar. Bu şerh, hem icra takibi hem de cezai süreç bakımından belirleyicidir.\n\nHukukî yol: Karşılıksız çek, kambiyo senetlerine özgü haciz yoluyla takibe konulabilir. Bu takipte borçlunun itiraz süresi beş gündür ve itiraz İcra Hukuk Mahkemesine yapılır.\n\nCezaî yol: 5941 sayılı Çek Kanunu m. 5 uyarınca, üzerinde yazılı keşide tarihine göre kanunî ibraz süresi içinde ibrazında çekin karşılıksız çıkması hâlinde, hamilin şikâyeti üzerine çek hesabı sahibi hakkında her bir çekle ilgili olarak binbeş yüz güne kadar adlî para cezasına hükmolunur. Şikâyet, fiilin öğrenildiği tarihten itibaren üç ay ve her hâlde fiilin işlendiği tarihten itibaren bir yıl içinde yapılmalıdır.\n\nÇek bedelinin faiziyle birlikte tamamen ödenmesi hâlinde şikâyet hakkı düşer, dava düşer, mahkûmiyet hükmü bütün sonuçlarıyla ortadan kalkar.",
        keywords: ["5941", "3 ay şikayet", "adli para cezası", "kambiyo takibi"],
    },

    // ————————————————————————————————— Genel
    {
        id: "avukatlik-ucreti",
        category: "Genel",
        question: "Avukatlık ücreti neye göre belirlenir?",
        shortAnswer:
            "Ücret; işin türüne, ne kadar emek ve zaman gerektireceğine göre avukatla yapılan sözleşmeyle belirlenir ve barolar birliğinin asgari tarifesinin altında olamaz. İlk görüşmede ücret ve masraflar açıkça konuşulmalıdır.",
        answer:
            "Avukatlık ücreti, Türkiye Barolar Birliği tarafından her yıl yayımlanan Avukatlık Asgarî Ücret Tarifesi ve bağlı bulunulan baronun tavsiye niteliğindeki tarifesi esas alınarak belirlenir. Tarifede öngörülen tutarın altında ücret kararlaştırılması Avukatlık Kanunu uyarınca mümkün değildir.\n\nÜcret; işin niteliği, tahmini süresi, dosyanın kapsamı, uyuşmazlığın değeri ve gerektirdiği emek dikkate alınarak avukatlık sözleşmesiyle serbestçe belirlenebilir. Konusu para olan işlerde dava değerinin yüzde yirmi beşini aşmamak üzere nispi ücret de kararlaştırılabilir.\n\nKarşı taraf vekâlet ücreti, tarifeye göre hesaplanır ve davayı kaybeden tarafa yüklenir; bu ücret müvekkilin avukatına ödediği ücretten ayrıdır ve Avukatlık Kanunu m. 164/son uyarınca avukata aittir.\n\nİlk görüşmede işin kapsamı ve öngörülen tüm masraflar yazılı olarak paylaşılmalıdır.",
        keywords: ["asgari ücret tarifesi", "vekalet ücreti", "nispi ücret"],
    },
    {
        id: "vekaletname-nasil-verilir",
        category: "Genel",
        question: "Avukata vekaletname nasıl verilir?",
        shortAnswer:
            "Herhangi bir notere gidip avukatınız adına vekaletname çıkarırsınız; noter avukatın bilgilerini ister. Boşanma gibi bazı işler için vekaletnamede özel yetki ve fotoğraf gerekir. Yurt dışındaysanız konsolosluktan da verebilirsiniz.",
        answer:
            "Vekaletname herhangi bir noterden düzenlenir; avukatın adı, soyadı, baro sicil numarası ve vergi kimlik numarası ile TC kimlik numarası noter tarafından istenir.\n\nGenel dava vekaletnamesi çoğu iş için yeterlidir. Ancak bazı işler için özel yetki şarttır: boşanma davası açmak, sulh olmak, davadan feragat etmek, davayı kabul etmek, kambiyo taahhüdünde bulunmak, tahkim ve hakem sözleşmesi yapmak, alternatif uyuşmazlık çözüm yollarına başvurmak, ahzukabz (para tahsil etme) yetkisi.\n\nBoşanma davalarında ayrıca vekaletnameye fotoğraf yapıştırılması zorunludur. Yurt dışında bulunanlar, Türk konsolosluklarından vekaletname düzenletebilir.\n\nVekâlet ilişkisi her zaman tek taraflı olarak sona erdirilebilir; azil veya istifa hâlinde bunun karşı tarafa ve dosyanın görüldüğü mercie bildirilmesi gerekir.",
        keywords: ["noter", "özel yetki", "ahzukabz", "boşanma fotoğraf"],
    },
    {
        id: "yargilama-giderleri",
        category: "Genel",
        question: "Dava açarken hangi masraflar ödenir?",
        shortAnswer:
            "Dava açarken harç ve tebligat, bilirkişi gibi giderler için avans ödenir. Bu masraflar sonunda kural olarak davayı kaybeden tarafa yüklenir; kullanılmayan avans size geri ödenir.",
        answer:
            "Dava açılırken ödenen başlıca kalemler şunlardır: başvurma harcı, peşin harç (konusu para olan davalarda dava değerinin binde 68,31'inin dörtte biri), vekâlet harcı ve gider avansı.\n\nGider avansı; tebligat, bilirkişi, keşif, tanık ve müzekkere giderlerini karşılamak üzere alınır ve her yıl Adalet Bakanlığınca belirlenen tarifeye göre hesaplanır. Yargılama sırasında yetmezse tamamlanması için süre verilir; tamamlanmazsa dava usulden reddedilebilir.\n\nYargılama giderleri kural olarak haksız çıkan tarafa yüklenir (HMK m. 326). Davanın kısmen kabulü hâlinde giderler kabul ve ret oranına göre paylaştırılır. Kullanılmayan avans, karar kesinleştikten sonra yatıran tarafa iade edilir.",
        keywords: ["harç", "gider avansı", "bilirkişi", "hmk 326"],
    },
    {
        id: "adli-yardim",
        category: "Genel",
        question: "Avukat tutacak maddi imkânım yok, ne yapabilirim?",
        shortAnswer:
            "Gelirinizin yetmediğini belgelerseniz barodan ücretsiz avukat isteyebilir, mahkemeden de harç ve masraflardan geçici muafiyet talep edebilirsiniz. Ceza davalarında bazı durumlarda avukat zaten ücretsiz atanır.",
        answer:
            "İki ayrı mekanizma bulunur.\n\nBaro adli yardımı: Avukatlık Kanunu m. 176 vd. uyarınca, adli yardım bürosuna başvurularak ücretsiz avukat görevlendirilmesi istenebilir. Başvuruya gelir durumunu gösteren belgeler (muhtarlıktan fakirlik belgesi, tapu ve araç kaydı sorgusu, SGK kaydı) eklenir. Büro, talebin haklılığını ve ihtiyacı değerlendirerek karar verir.\n\nMahkemeden adli yardım: HMK m. 334 vd. uyarınca, yargılama giderlerini kısmen veya tamamen ödeme gücünden yoksun olan taraf, mahkemeden adli yardım talep edebilir. Kabul edilirse harç ve gider avansından geçici olarak muaf tutulur.\n\nCeza yargılamasında ise CMK m. 150 kapsamındaki zorunlu müdafilik hâllerinde, ekonomik durumdan bağımsız olarak barodan ücretsiz müdafi görevlendirilir.",
        keywords: ["adli yardım", "ücretsiz avukat", "hmk 334", "baro"],
    },
    {
        id: "online-danismanlik",
        category: "Genel",
        question: "Şehir dışından veya yurt dışından hukuki destek alabilir miyim?",
        answer:
            "Evet. Dava dosyaları UYAP üzerinden elektronik ortamda takip edilebildiğinden, müvekkilin dosyanın görüldüğü şehirde bulunması gerekmez.\n\nİlk görüşme telefon veya görüntülü görüşme ile yapılabilir; belgeler elektronik ortamda paylaşılabilir. Vekaletname, bulunduğunuz yerdeki herhangi bir noterden, yurt dışında iseniz Türk konsolosluğundan düzenlenerek gönderilebilir.\n\nDuruşmalara kural olarak vekil katılır; tarafın bizzat dinlenmesi gereken hâllerde (anlaşmalı boşanmada tarafların hâkim huzurunda dinlenmesi gibi) ise bizzat katılım zorunludur. Bazı hâllerde SEGBİS üzerinden başka bir adliyeden katılım da mümkündür.",
        keywords: ["UYAP", "online", "yurt dışı", "SEGBİS", "konsolosluk"],
    },
];

/** Kategoriye göre gruplanmış SSS listesi — kategori sırası faqCategories'i izler. */
export function faqsByCategory(): { category: FAQCategory; items: FAQItem[] }[] {
    return faqCategories
        .map((category) => ({
            category,
            items: faqs.filter((faq) => faq.category === category.id),
        }))
        .filter((group) => group.items.length > 0);
}
