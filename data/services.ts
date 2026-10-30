import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe, Briefcase, ScrollText } from "lucide-react";
import type { DecisionRef } from "./blogPosts";
import type { FAQCategoryId } from "./faq";

export interface Service {
    id: string;
    title: string;
    shortDescription: string;
    /** Arama sonuçlarında görünen başlık; yerel arama ifadesini (Kartal) içerir. */
    seoTitle: string;
    /** Arama sonuçlarında görünen açıklama (≈150-160 karakter). */
    seoDescription: string;
    /** Hizmet sayfasında listelenecek ilgili blog kategorileri. */
    blogCategories: string[];
    /** Hizmet sayfasında listelenecek ilgili SSS kategorileri. */
    faqCategories: FAQCategoryId[];
    /** Kategoriden bağımsız olarak eklenecek SSS kimlikleri. */
    faqIds?: string[];
    icon: any;
    detailContent: {
        intro: string;
        features: string[];
        process: string;
        /** Hizmet sayfasında ayrıntılı rehber olarak gösterilen başlıklı bölümler. */
        guide?: { heading: string; body: string }[];
        /** Rehberde dayanılan, tam metni okunmuş Yargıtay kararları. */
        decisions?: DecisionRef[];
    };
}

export const services: Service[] = [
    {
        id: "bosanma-ve-aile-hukuku",
        title: "Boşanma ve Aile Hukuku",
        shortDescription: "Boşanma, velayet, nafaka, mal paylaşımı ve düğün takıları. Haklarınızı anlatır, davanızı baştan sona takip ederiz.",
        seoTitle: "Kartal Boşanma Avukatı: Anlaşmalı ve Çekişmeli Dava",
        seoDescription: "Kartal boşanma avukatı Av. Emre Durmuş: anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal paylaşımı davaları. Anadolu Adliyesi. Randevu: 0530 432 20 25",
        blogCategories: ["Aile Hukuku"],
        faqCategories: ["Aile Hukuku"],
        icon: Users,
        detailContent: {
            intro: "Aile hukuku, bireylerin en hassas süreçlerini kapsayan ve uzmanlık gerektiren bir alandır. Asil Hukuk olarak, boşanma ve aile hukuku kapsamındaki tüm uyuşmazlıklarda müvekkillerimizin haklarını korurken, sürecin psikolojik ve sosyal etkilerini de gözeterek en sağlıklı çözüme ulaşmayı hedefliyoruz.",
            features: [
                "Anlaşmalı ve Çekişmeli Boşanma Davaları",
                "Velayet ve Nafaka Talepleri",
                "Mal Rejimi Tasfiyesi ve Mal Paylaşımı",
                "Nişanın Bozulmasından Kaynaklı Tazminat Davaları",
                "Soybağının Kurulması ve Reddi",
                "Aile İçi Şiddet ve Koruma Tedbirleri"
            ],
            process: "Sürece müvekkilimizle yapılan detaylı bir ön görüşme ile başlıyoruz. Durumun hukuki analizini yaparak, anlaşmalı boşanma şansını değerlendiriyor, mümkün değilse çekişmeli süreç için en güçlü stratejiyi belirliyoruz. Özellikle çocukların üstün yararı ve müvekkilimizin mali hakları önceliğimizdir.",
            guide: [
                {
                    heading: "Anlaşmalı boşanma için hangi şartlar gerekir?",
                    body: "Anlaşmalı boşanma için evliliğin en az bir yıl sürmüş olması, eşlerin birlikte başvurması ya da birinin açtığı davayı diğerinin kabul etmesi gerekir. Hâkim eşleri bizzat dinler ve boşanmanın mali sonuçları ile çocukların durumunu düzenleyen protokolü uygun bulursa, dava çoğu zaman tek duruşmada sonuçlanır. Protokolün nafaka, velayet, kişisel ilişki ve mal paylaşımı yönünden eksiksiz ve dikkatle hazırlanması, ileride yeni davalar açılmasının önüne geçer.",
                },
                {
                    heading: "Çekişmeli boşanma sebepleri nelerdir?",
                    body: "Kanun; zina, hayata kast, pek kötü veya onur kırıcı davranış, suç işleme ve haysiyetsiz hayat sürme, terk ve akıl hastalığını özel boşanma sebepleri olarak sayar. Bunların yanında en sık başvurulan sebep, evlilik birliğinin temelinden sarsılmasıdır. Zina ve hayata kast gibi bazı sebeplerde dava, öğrenmeden itibaren altı ay ve her hâlde olaydan itibaren beş yıl içinde açılmalıdır. Çekişmeli davalarda tanık, yazışma ve belge gibi delillerin baştan doğru kurgulanması sonucu doğrudan etkiler.",
                },
                {
                    heading: "Kartal'da boşanma davası nerede açılır?",
                    body: "Boşanma davaları aile mahkemesinde görülür. Dava, eşlerden birinin yerleşim yeri ya da eşlerin davadan önce son altı aydır birlikte oturdukları yer mahkemesinde açılabilir. Kartal, Pendik, Maltepe ve çevresinde oturanlar için bu mahkemeler İstanbul Anadolu Adliyesi'ndeki aile mahkemeleridir.",
                },
                {
                    heading: "Velayet, nafaka ve tazminat",
                    body: "Velayet kararında belirleyici ölçüt çocuğun üstün yararıdır; şartları varsa ortak velayet de mümkündür. Dava sürerken tedbir nafakası, boşanmadan sonra ise çocuk için iştirak nafakası ve yoksulluğa düşecek eş için yoksulluk nafakası istenebilir. Kusuru daha az olan eş, maddi ve manevi tazminat da talep edebilir. Boşanmaya bağlı nafaka ve tazminat talepleri, boşanma kararının kesinleşmesinden itibaren bir yıl içinde zamanaşımına uğrar; bu nedenle genellikle boşanma davasıyla birlikte ileri sürülmesi önerilir.",
                },
                {
                    heading: "Mal paylaşımı (mal rejiminin tasfiyesi)",
                    body: "1 Ocak 2002'den sonra edinilen mallarda kural olarak edinilmiş mallara katılma rejimi uygulanır ve evlilik süresince edinilen malların değer artışı eşler arasında paylaştırılır. Mal rejimi, boşanma davasının açıldığı tarihte sona erer. Tasfiye davası boşanma davasıyla birlikte açılabileceği gibi, boşanma kesinleştikten sonra on yıl içinde de açılabilir. Tapu, banka ve araç kayıtlarının erken tespit edilmesi, mal kaçırma girişimlerine karşı ihtiyati tedbir istenmesini kolaylaştırır.",
                },
                {
                    heading: "Aile içi şiddette koruma tedbirleri",
                    body: "6284 sayılı Kanun kapsamında şiddete uğrayan veya uğrama tehlikesi bulunan kişi; uzaklaştırma, yaklaşmama ve iletişim yasağı gibi tedbirleri aile mahkemesinden, acil hâllerde kolluk ve mülki amirden talep edebilir. Tedbir kararı için şiddetin ispatı gerekmez; hızlı başvuru, kişinin güvenliğini sağlamanın ilk adımıdır.",
                },
            ],
        }
    },
    {
        id: "ceza-hukuku",
        title: "Ceza Hukuku",
        shortDescription: "İfadeye mi çağrıldınız, hakkınızda dava mı açıldı ya da bir suçun mağduru musunuz? Karakoldan duruşmaya kadar yanınızdayız.",
        seoTitle: "Kartal Ceza Avukatı: İfade, Tutuklama ve Savunma",
        seoDescription: "Kartal ceza avukatı: ifade, gözaltı ve tutuklamaya itiraz, ağır ceza ve asliye ceza davalarında savunma. Anadolu Adliyesi'nde müdafilik. Tel: 0530 432 20 25",
        blogCategories: ["Ceza Hukuku"],
        faqCategories: ["Ceza Hukuku"],
        icon: Shield,
        detailContent: {
            intro: "Ceza soruşturması ve kovuşturması, kişilerin özgürlüğünü ve itibarını doğrudan etkileyen ciddi süreçlerdir. Adil yargılanma hakkının tesisi ve maddi gerçeğin ortaya çıkarılması için titiz bir savunma şarttır.",
            features: [
                "Ağır Ceza Mahkemesi Görev Alanına Giren Suçlar",
                "Asliye Ceza Davaları",
                "Soruşturma Aşamasında İfade ve Sorgu Takibi",
                "Tutuklamaya İtiraz ve Tahliye Talepleri",
                "Bilişim Suçları",
                "Mali ve Ekonomik Suçlar"
            ],
            process: "Müvekkilimizle ilk andan itibaren – karakol veya savcılık ifadesi dahil – yanında yer alıyoruz. Dosyanın her aşamasını titizlikle inceliyor, lehe olan delillerin toplanmasını sağlıyor ve etkin bir savunma stratejisi ile süreci yürütüyoruz.",
            guide: [
                {
                    heading: "İfadeye çağrıldım, ne yapmalıyım?",
                    body: "Şüpheli sıfatıyla ifadeye çağrılan kişinin susma hakkı ve ifadesini avukat eşliğinde verme hakkı vardır. İlk ifade, soruşturmanın ve kovuşturmanın seyrini belirleyen en önemli belgelerden biridir; bu nedenle ifade vermeden önce avukatla görüşmek ve dosya kapsamını öğrenmek büyük önem taşır. On sekiz yaşından küçükler ile alt sınırı beş yıldan fazla hapis cezasını gerektiren suçlarda müdafi görevlendirilmesi zorunludur.",
                },
                {
                    heading: "Gözaltı, tutuklama ve adli kontrol",
                    body: "Gözaltı süresi kural olarak yakalama anından itibaren yirmi dört saati geçemez. Tutuklama, ancak kuvvetli suç şüphesi ve kaçma ya da delil karartma tehlikesi gibi koşulların birlikte bulunması hâlinde başvurulabilecek son çaredir; yurt dışına çıkış yasağı veya imza yükümlülüğü gibi adli kontrol tedbirleri daha hafif alternatiflerdir. Tutuklama kararına karşı yedi gün içinde itiraz edilebilir ve tutukluluğun devamı her aşamada yeniden incelenmesi istenebilir.",
                },
                {
                    heading: "Suç mağduruysanız: şikâyet ve katılma",
                    body: "Şikâyete bağlı suçlarda şikâyet hakkı, fiilin ve failin öğrenilmesinden itibaren altı ay içinde kullanılmalıdır; bu süre kaçırılırsa soruşturma yapılamaz. Suçtan zarar gören kişi, avukatı aracılığıyla delillerin toplanmasını isteyebilir, kovuşturmaya yer olmadığına dair karara itiraz edebilir ve kamu davasına katılarak yargılamada söz sahibi olabilir.",
                },
                {
                    heading: "Uzlaştırma ve hükmün açıklanmasının geri bırakılması",
                    body: "Kanunda sayılan bazı suçlarda dosya, soruşturma veya kovuşturma aşamasında uzlaştırmaya gönderilir; taraflar anlaşırsa dava sona erebilir. Mahkûmiyet hâlinde ise koşulları varsa hükmün açıklanmasının geri bırakılması (HAGB), cezanın ertelenmesi veya adli para cezasına çevrilmesi gibi seçenekler gündeme gelir. Bu kurumların doğru zamanda ve doğru şekilde talep edilmesi, kişinin adli sicili açısından belirleyicidir.",
                },
                {
                    heading: "İstinaf ve temyiz süreleri",
                    body: "Yerel mahkeme kararlarına karşı istinaf, bölge adliye mahkemesi kararlarına karşı ise temyiz yoluna başvurma süresi kararın açıklanmasından veya tebliğinden itibaren iki haftadır. Süre geçirildiğinde karar kesinleşir; bu nedenle karar sonrasında vakit kaybetmeden gerekçeli kararın incelenmesi gerekir. Kartal ve çevresindeki ceza dosyaları İstanbul Anadolu Cumhuriyet Başsavcılığı ve İstanbul Anadolu Adliyesi'ndeki ceza mahkemelerinde yürütülür.",
                },
            ],
        }
    },
    {
        id: "ticaret-ve-sirketler-hukuku",
        title: "Ticaret ve Şirketler Hukuku",
        shortDescription: "Şirket kurarken, sözleşme imzalarken ya da alacağınızı tahsil edemediğinizde işletmenizi hukuki risklere karşı koruruz.",
        seoTitle: "Kartal Ticaret Avukatı: Şirket, Sözleşme ve Alacak",
        seoDescription: "Kartal ticaret avukatı: şirket kuruluşu, genel kurul, ticari sözleşmeler, çek-senet, alacak tahsili, haksız rekabet ve konkordato. Randevu: 0530 432 20 25",
        blogCategories: ["Ticaret Hukuku"],
        faqCategories: ["İcra ve Ticaret Hukuku"],
        icon: Building,
        detailContent: {
            intro: "Ticari hayatın dinamik yapısı, hızlı ve doğru hukuki kararlar almayı gerektirir. Şirketlerin kuruluşundan tasfiyesine kadar olan tüm süreçlerde, ayrıca ticari sözleşmelerin hazırlanmasında önleyici hukuk hizmeti sunuyoruz.",
            features: [
                "Şirket Kuruluşu ve Ana Sözleşme Hazırlanması",
                "Genel Kurul Toplantıları ve Yönetim Kurulu Kararları",
                "Birleşme, Devralma ve Tür Değişikliği",
                "Haksız Rekabet Davaları",
                "Ticari Sözleşmelerin Düzenlenmesi ve İncelenmesi",
                "Konkordato ve İflas Süreçleri"
            ],
            process: "Müvekkil şirketlerimizin ticari hedeflerini anlayarak, onlara en uygun hukuki zemini hazırlıyoruz. Olası riskleri önceden tespit ediyor, sözleşmeleri bu riskleri minimize edecek şekilde düzenliyoruz.",
            guide: [
                {
                    heading: "Ticari alacaklarda zorunlu arabuluculuk",
                    body: "Konusu bir miktar paranın ödenmesi olan ticari alacak ve tazminat taleplerinde, dava açmadan önce arabulucuya başvurmak dava şartıdır. Arabuluculuk süreci çoğu zaman davadan çok daha kısa sürede sonuç verir; anlaşma sağlanırsa, taraflar ve avukatlarınca imzalanan anlaşma belgesi mahkeme ilamı gibi icra edilebilir. Bu aşamaya alacağın dayanağı olan fatura, sözleşme ve yazışmalar eksiksiz hazırlanarak girilmelidir.",
                },
                {
                    heading: "Şirket kuruluşu ve esas sözleşme",
                    body: "Limited veya anonim şirket kurarken esas sözleşmenin şirketin ihtiyaçlarına göre hazırlanması; ortaklar arası pay devri, yönetim ve temsil yetkisi, kâr dağıtımı ve ortaklıktan çıkma gibi konulardaki ileride doğabilecek uyuşmazlıkları baştan önler. Ortaklar arasında ayrıca bir pay sahipleri sözleşmesi yapılması, özellikle aile şirketleri ve girişimlerde önerilir.",
                },
                {
                    heading: "Genel kurul kararlarının iptali",
                    body: "Kanuna, esas sözleşmeye veya dürüstlük kuralına aykırı genel kurul kararlarına karşı iptal davası açılabilir. Anonim şirketlerde bu dava, genel kurul toplantı tarihinden itibaren üç ay içinde açılmalıdır; bu süre hak düşürücüdür. Bazı ağır aykırılıklar ise kararın baştan geçersiz (batıl) olmasına yol açar ve süreye bağlı değildir.",
                },
                {
                    heading: "Ticari sözleşmeler, çek ve senet",
                    body: "Bayilik, distribütörlük, tedarik, kira ve hizmet sözleşmelerinin hazırlanması ve müzakeresi; cezai şart, fesih ve yetki şartlarının şirket lehine düzenlenmesi ticari risklerin en etkili yönetim aracıdır. Çek, bono ve poliçeye dayanan alacaklarda ise kambiyo senetlerine özgü icra takibi hızlı tahsil imkânı sağlar.",
                },
                {
                    heading: "Haksız rekabet, konkordato ve iflas",
                    body: "Ticari itibarın zedelenmesi, müşteri ayartma veya ticari sırların ifşası gibi haksız rekabet hâllerinde tespit, men ve tazminat davaları açılabilir. Mali sıkıntıya düşen şirketler için konkordato, borçları yeniden yapılandırarak faaliyete devam etme imkânı sunar; alacaklı şirketlerin ise bu süreçte haklarını zamanında ileri sürmesi gerekir. Kartal ve çevresindeki ticari davalar İstanbul Anadolu Asliye Ticaret Mahkemelerinde görülür.",
                },
            ],
        }
    },
    {
        id: "icra-hukuku",
        title: "İcra Hukuku",
        shortDescription: "Ödeme emri mi geldi, maaşınıza ya da evinize haciz mi konuldu, alacağınızı mı tahsil edemiyorsunuz? Borçlu veya alacaklı olarak icra sürecinde yanınızdayız.",
        seoTitle: "Kartal İcra Avukatı: Takip, İtiraz ve Haciz",
        seoDescription: "Kartal icra avukatı: icra takibi, ödeme emrine itiraz, maaş ve emekli maaşı haczi, evin haczi (meskeniyet) ve menfi tespit davası. Randevu: 0530 432 20 25",
        blogCategories: ["İcra Hukuku"],
        faqCategories: [],
        faqIds: ["icra-takibine-itiraz", "itirazin-iptali-davasi", "ihtiyati-haciz"],
        icon: Gavel,
        detailContent: {
            intro: "İcra takibinde süreler çoğu zaman yedi gün, hatta beş gün gibi çok kısadır ve bu süreler kaçırıldığında borçlu borcu olmasa bile ödemek zorunda kalabilir; alacaklı ise yanlış yola başvurduğunda aylarca zaman kaybeder. Asil Hukuk olarak hem alacaklılar hem borçlular adına icra takibini, itiraz ve şikâyet süreçlerini, haciz ve satış işlemlerini ve bunlara bağlı davaları takip ediyoruz.",
            features: [
                "İlamlı ve İlamsız İcra Takibi Başlatılması",
                "Ödeme Emrine İtiraz ve Kambiyo Senetlerinde İmzaya İtiraz",
                "İtirazın İptali ve İtirazın Kaldırılması",
                "Maaş, Emekli Maaşı ve Evin Haczine Karşı Şikâyet",
                "Menfi Tespit ve İstirdat Davaları",
                "İhtiyati Haciz ve İcra Mahkemesine Şikâyet"
            ],
            process: "Önce icra dosyasını UYAP üzerinden inceleyip ödeme emrinin ve diğer işlemlerin tebliğ tarihlerini, işlemeye başlamış süreleri ve konulan hacizleri çıkarıyoruz. Borçlu tarafta itiraz, şikâyet ve dava yollarından hangisinin uygun olduğunu; alacaklı tarafta ise takibin türünü, haciz stratejisini ve itiraz hâlinde izlenecek yolu belirliyoruz. Mümkünse ödeme planı veya uzlaşma seçeneklerini de değerlendiriyoruz.",
            guide: [
                {
                    heading: "Ödeme emri geldi, ne yapmalıyım?",
                    body: "Genel haciz yoluyla ilamsız takipte borçlu, ödeme emrinin tebliğinden itibaren yedi gün içinde icra dairesine dilekçeyle veya sözlü olarak itiraz edebilir (İİK m. 62); süresinde yapılan itiraz takibi durdurur. Çek, senet gibi kambiyo senetlerine dayalı takiplerde ise süre beş gündür ve borca veya imzaya itiraz icra mahkemesine yapılır (İİK m. 168). İtiraz edilmeyen takip kesinleşir ve alacaklı haciz isteyebilir. Ödeme emrinde borcun kalemlerini, faiz oranını ve dayanak belgeyi mutlaka kontrol edin; borcun bir kısmına itiraz etmek de mümkündür.",
                },
                {
                    heading: "Borçlu itiraz etti, alacaklı ne yapabilir?",
                    body: "İtirazla duran takibe devam etmek isteyen alacaklı, itirazın tebliğinden itibaren bir yıl içinde genel mahkemede itirazın iptali davası açabilir (İİK m. 67). Bu davada borçlunun itirazı haksız bulunursa, talep üzerine hükmolunan miktarın yüzde yirmisinden az olmamak üzere icra inkâr tazminatına hükmedilir. Alacak resmî veya borçlunun imzasını ikrar ettiği bir belgeye dayanıyorsa, itirazın tebliğinden itibaren altı ay içinde icra mahkemesinden itirazın kaldırılması da istenebilir (İİK m. 68).",
                },
                {
                    heading: "Maaşa ne kadar haciz konulabilir?",
                    body: "Maaş ve ücretler, borçlu ve ailesinin geçimi için gerekli miktar düşüldükten sonra haczedilebilir; ancak haczedilecek miktar dörtte birden az olamaz (İİK m. 83). İşçilerin aylık ücretlerinin ise dörtte birinden fazlası haczedilemez; nafaka alacakları bu sınırın dışındadır (İş Kanunu m. 35). Birden fazla haciz varsa sıraya konur ve öndeki haczin kesintisi bitmeden sonrakine geçilmez. Maaşın haczedilebileceğine dair önceden, örneğin kredi sözleşmesinde yapılan anlaşmalar geçersizdir (İİK m. 83/a).",
                },
                {
                    heading: "Emekli maaşına haciz konulabilir mi?",
                    body: "SGK'dan alınan emekli aylıkları kural olarak haczedilemez; nafaka borçları ile SGK'nın prim ve benzeri alacakları bu yasağın dışındadır. Bunun dışındaki alacaklar için haciz talebi, borçlunun muvafakati yoksa icra müdürünce reddedilir (5510 sayılı Kanun m. 93). Yargıtay 12. Hukuk Dairesi'nin 27.02.2024 tarihli, 2023/4990 E., 2024/1857 K. sayılı kararına göre muvafakatin geçerli olması için takibin kesinleşmiş olması gerekir; borcun kabul edildiği dilekçede aynı anda verilen muvafakat takibin kesinleşmesinden sonra verilmiş sayılmaz ve geçersizdir.",
                },
                {
                    heading: "Evime haciz geldi: haline münasip ev şikâyeti",
                    body: "Borçlunun haline münasip evi haczedilemez (İİK m. 82/1-12); ancak borç bu evin bedelinden doğmuşsa bu koruma uygulanmaz. Ev borçlunun ihtiyacından değerliyse satılır ve satış bedelinden haline münasip bir ev alabileceği miktar borçluya bırakılır. Yargıtay 12. Hukuk Dairesi'nin 10.10.2024 tarihli, 2024/2893 E., 2024/8391 K. sayılı kararına göre hem hacizli evin hem de haline münasip evin değeri haciz tarihine göre belirlenir ve borçlunun aynı semtte oturma zorunluluğu yoktur. Bu şikâyet, haczin öğrenilmesinden itibaren yedi gün içinde yapılmalıdır (Yargıtay 12. HD, 02.05.2024, 2023/7042 E., 2024/4280 K.).",
                },
                {
                    heading: "Borcum yok ama hakkımda takip başlatıldı",
                    body: "Borçlu, takipten önce veya takip sırasında borçlu olmadığının tespiti için menfi tespit davası açabilir (İİK m. 72). Takipten önce açılan davada alacağın en az yüzde on beşi oranında teminatla takibin durdurulması istenebilir; takipten sonra ise yalnızca icra veznesindeki paranın alacaklıya ödenmemesi sağlanabilir. Yargıtay 1. Hukuk Dairesi'nin 25.11.2024 tarihli, 2023/5725 E., 2024/6322 K. sayılı kararında belirtildiği gibi bu davada alacağın varlığını ispat yükü takip alacaklısındadır. Takip haksız ve kötüniyetliyse borçlu lehine alacağın yüzde yirmisinden az olmamak üzere tazminata hükmedilir. Borç ödenmişse, ödemeden itibaren bir yıl içinde istirdat davası açılabilir.",
                },
                {
                    heading: "İcra dairesinin işlemine şikâyet: yedi gün",
                    body: "İcra dairesinin kanuna veya olaya aykırı işlemlerine karşı, işlemin öğrenildiği tarihten itibaren yedi gün içinde icra mahkemesine şikâyet edilebilir; bir hakkın yerine getirilmemesi veya sebepsiz sürüncemede bırakılması ise her zaman şikâyet konusu yapılabilir (İİK m. 16). Ödeme emrinin usulsüz tebliği de bu yolla ileri sürülür. Yargıtay 12. Hukuk Dairesi'nin 04.05.2026 tarihli, 2026/355 E., 2026/3015 K. sayılı kararına göre, borçlu takipten daha önce haberdar olmuş olsa bile, henüz yapılmamış bir tebligata ilişkin şikâyet süresi işlemeye başlamaz.",
                },
                {
                    heading: "Kartal'da icra işlemleri nerede yürütülür?",
                    body: "Kartal, Pendik ve Maltepe'de oturan borçlular hakkındaki takipler genellikle İstanbul Anadolu icra dairelerinde yürütülür. İcra dairesi işlemlerine şikâyetler, kambiyo takiplerindeki itirazlar ve itirazın kaldırılması talepleri İstanbul Anadolu Adliyesi'ndeki icra hukuk mahkemelerinde; itirazın iptali ve menfi tespit davaları ise genel mahkemelerde görülür. Takip dosyaları UYAP üzerinden elektronik ortamda izlenebildiğinden, tebligat ve haciz işlemlerinin düzenli olarak kontrol edilmesi süre kaybını önler.",
                },
            ],
            decisions: [
                {
                    court: "Yargıtay 12. Hukuk Dairesi",
                    esas: "2023/4990",
                    karar: "2024/1857",
                    date: "27.02.2024",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1019776000",
                    principle: "Emekli maaşının haczine muvafakatin geçerli olması için takibin kesinleşmiş olması gerekir; borç kabulüyle aynı dilekçede verilen muvafakat geçersizdir.",
                },
                {
                    court: "Yargıtay 12. Hukuk Dairesi",
                    esas: "2024/2893",
                    karar: "2024/8391",
                    date: "10.10.2024",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1094128200",
                    principle: "Meskeniyet şikâyetinde hacizli taşınmazın ve haline münasip evin değeri haciz tarihine göre belirlenir; borçlunun aynı semtte oturma zorunluluğu yoktur.",
                },
                {
                    court: "Yargıtay 12. Hukuk Dairesi",
                    esas: "2023/7042",
                    karar: "2024/4280",
                    date: "02.05.2024",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1063930000",
                    principle: "Meskeniyet şikâyeti haczin öğrenilmesinden itibaren yedi gün içinde yapılmalıdır; sonradan gönderilen 103 davetiyesi yeni bir şikâyet hakkı doğurmaz.",
                },
                {
                    court: "Yargıtay 1. Hukuk Dairesi",
                    esas: "2023/5725",
                    karar: "2024/6322",
                    date: "25.11.2024",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1114682200",
                    principle: "Menfi tespit davasında alacağın varlığını ispat yükü takip alacaklısındadır; kötüniyet tazminatı için takibin haksız olması yetmez, kötüniyetli olduğu da ispatlanmalıdır.",
                },
                {
                    court: "Yargıtay 11. Hukuk Dairesi",
                    esas: "2024/4787",
                    karar: "2025/4320",
                    date: "19.06.2025",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1164674700",
                    principle: "Taraf olmadığı sözleşmeye dayanılarak, alacaklı olmadığını bilen kişi tarafından başlatılan takipte alacaklı kötüniyetli sayılır ve kötüniyet tazminatına hükmedilir.",
                },
                {
                    court: "Yargıtay 12. Hukuk Dairesi",
                    esas: "2026/355",
                    karar: "2026/3015",
                    date: "04.05.2026",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1229319300",
                    principle: "Usulsüz tebligat şikâyetinde yedi günlük süre öğrenmeyle başlar; ancak henüz yapılmamış bir tebligat için şikâyet süresi işlemeye başlamaz.",
                },
            ],
        }
    },
    {
        id: "gayrimenkul-hukuku",
        title: "Gayrimenkul Hukuku",
        shortDescription: "Kiracı çıkarma, kira artışı, tapu ve ortak mülk sorunları. Ev sahibi ya da kiracı olarak haklarınızı koruruz.",
        seoTitle: "Kartal Kira ve Gayrimenkul Avukatı: Tahliye, Tapu",
        seoDescription: "Kartal kira ve gayrimenkul avukatı: kiracı tahliyesi, kira tespiti ve artışı, tapu iptal ve tescil, ortaklığın giderilmesi, önalım ve kat karşılığı davaları.",
        blogCategories: ["Gayrimenkul Hukuku"],
        faqCategories: ["Gayrimenkul ve Kira Hukuku", "Kentsel Dönüşüm"],
        icon: Globe,
        detailContent: {
            intro: "Gayrimenkul yatırımları ve mülkiyet hakları, büyük ekonomik değer taşıyan konulardır. Tapu süreçlerinden kira uyuşmazlıklarına kadar geniş bir yelpazede hukuki güvenlik sağlıyoruz.",
            features: [
                "Tapu İptal ve Tescil Davaları",
                "Kira Tespit ve Tahliye Davaları",
                "İzaleyi Şuyu (Ortaklığın Giderilmesi) Davaları",
                "Kamulaştırma ve Kamulaştırmasız El Atma",
                "Kat Karşılığı İnşaat Sözleşmeleri",
                "Yabancıların Mülk Edinimi"
            ],
            process: "Uyuşmazlığın kaynağını tespit ederek, gerek dava yoluyla gerekse sulh görüşmeleriyle müvekkilimizin mülkiyet haklarını en hızlı şekilde güvence altına almayı hedefliyoruz.",
            guide: [
                {
                    heading: "Kartal'da taşınmaz uyuşmazlıkları nerede görülür?",
                    body: "Taşınmazın aynına ilişkin davalarda yetkili mahkeme, taşınmazın bulunduğu yer mahkemesidir ve bu yetki kesindir. Kartal, Pendik, Maltepe ve çevresindeki taşınmazlara ilişkin davalar İstanbul Anadolu Adliyesi'nde görülür. Kira ve ortaklığın giderilmesi davalarına sulh hukuk mahkemeleri, tapu iptal ve tescil gibi mülkiyet davalarına ise kural olarak asliye hukuk mahkemeleri bakar. Davanın doğru mahkemede açılması, zaman ve masraf kaybını önlemenin ilk adımıdır.",
                },
                {
                    heading: "Dava açmadan önce arabuluculuk zorunlu mu?",
                    body: "1 Eylül 2023'ten bu yana kira ilişkisinden doğan uyuşmazlıklar, ortaklığın giderilmesi (paylaştırma) davaları, Kat Mülkiyeti Kanunu'ndan ve komşu hakkından kaynaklanan uyuşmazlıklarda dava açmadan önce arabulucuya başvurmak dava şartıdır. Arabuluculuk aşamasında imzalanan anlaşma belgesi ilam niteliğindedir; bu nedenle bu aşamanın bir avukatla planlı şekilde yürütülmesi, çoğu zaman davaya gerek kalmadan sonuç almayı sağlar. Av. Emre Durmuş aynı zamanda Adalet Bakanlığı'na kayıtlı arabulucudur.",
                },
                {
                    heading: "Kira tespiti ve kiracının tahliyesi",
                    body: "Kira bedelinin güncel koşullara uyarlanması için kira tespit davası, kiracının tahliyesi için ise yasal tahliye sebeplerinden birine dayanılması gerekir: kiraya verenin veya yakınlarının konut ya da işyeri ihtiyacı, esaslı onarım ve yeniden inşa, yazılı tahliye taahhüdü, bir kira yılı içinde iki haklı ihtar ve on yıllık uzama süresinin dolması bunların başlıcalarıdır. Her birinin kendine özgü süreleri ve ispat kuralları vardır; sürenin kaçırılması hakkın o dönem için kullanılamamasına yol açabilir.",
                },
                {
                    heading: "Tapu iptal ve tescil davaları",
                    body: "Muris muvazaası (mirasçılardan mal kaçırma), vekâlet görevinin kötüye kullanılması, hile veya hata ile yapılan devirler ve yolsuz tescil gibi durumlarda, tapu kaydının düzeltilmesi için tapu iptal ve tescil davası açılabilir. Bu davalarda delillerin erken toplanması ve dava süresince taşınmazın üçüncü kişilere devrini önlemek için tapuya ihtiyati tedbir şerhi konulması büyük önem taşır.",
                },
                {
                    heading: "Ortaklığın giderilmesi ve önalım (şufa) hakkı",
                    body: "Paylı veya elbirliği mülkiyetindeki bir taşınmazda ortaklar anlaşamazsa, ortaklığın giderilmesi (izale-i şuyu) davasıyla taşınmaz aynen bölünür ya da satılarak bedeli paylaştırılır. Paydaşlardan biri payını üçüncü bir kişiye sattığında ise diğer paydaşlar önalım hakkını kullanabilir; bu dava satışın öğrenilmesinden itibaren üç ay ve her hâlde satıştan itibaren iki yıl içinde açılmalıdır.",
                },
                {
                    heading: "Kat karşılığı inşaat ve kentsel dönüşüm",
                    body: "Kartal ve çevresinde yoğun olarak yaşanan kentsel dönüşüm sürecinde, kat karşılığı inşaat sözleşmesinin kurulması, müteahhidin temerrüdü, eksik veya ayıplı iş ve bağımsız bölümlerin devri en sık karşılaşılan uyuşmazlıklardır. Sözleşme imzalanmadan önce yapılacak hukuki inceleme, ileride doğabilecek uzun ve masraflı davaların önüne geçer. Ayrıntılar için Kentsel Dönüşüm Rehberimize göz atabilirsiniz.",
                },
            ],
        }
    },
    {
        id: "miras-hukuku",
        title: "Miras Hukuku",
        shortDescription: "Veraset ilamı, mirasın reddi, miras paylaşımı, vasiyetname ve mirastan mal kaçırma davaları. Mirasçı olarak haklarınızı anlatır, süreci baştan sona takip ederiz.",
        seoTitle: "Kartal Miras Avukatı: Miras Paylaşımı ve Davaları",
        seoDescription: "Kartal miras avukatı: veraset ilamı, mirasın reddi, miras paylaşımı, tenkis, muris muvazaası ve vasiyetname iptali davaları. Randevu: 0530 432 20 25",
        blogCategories: ["Miras Hukuku"],
        faqCategories: ["Miras Hukuku"],
        icon: ScrollText,
        detailContent: {
            intro: "Bir yakının ölümünün ardından mirasçılar, çoğu zaman yas sürecindeyken kısa sürelere bağlı önemli kararlar vermek zorunda kalır: Miras kabul mü edilecek, reddedilecek mi? Mallar nasıl paylaşılacak? Mirasbırakan sağlığında bir mirasçıya mal kaçırdıysa ne yapılabilir? Asil Hukuk olarak miras uyuşmazlıklarında hem mirasçıların haklarını koruyor hem de aile içi ilişkileri gözeterek mümkün olduğunca anlaşmayla çözüm arıyoruz.",
            features: [
                "Mirasçılık Belgesi (Veraset İlamı) ve İptali",
                "Mirasın Reddi ve Borca Batık Terekede Hükmen Ret",
                "Muris Muvazaası (Mirastan Mal Kaçırma) Davaları",
                "Saklı Pay ve Tenkis Davaları",
                "Vasiyetnamenin Hazırlanması ve İptali",
                "Miras Paylaşımı ve Ortaklığın Giderilmesi"
            ],
            process: "İlk görüşmede mirasbırakanın ölüm tarihini, mirasçıları ve terekeyi (tapu, banka, araç ve borç kayıtları) birlikte çıkarıyoruz. Miras hukukunda bazı süreler üç ay gibi çok kısa olduğundan, işlemeye başlamış hak düşürücü süreleri baştan belirliyoruz. Ardından uyuşmazlığın paylaşım sözleşmesi veya arabuluculukla çözülüp çözülemeyeceğini değerlendiriyor, gerekirse dava sürecini sonuna kadar takip ediyoruz.",
            guide: [
                {
                    heading: "Kimler mirasçı olur, paylar nasıl belirlenir?",
                    body: "Yasal mirasçılar mirasbırakanın altsoyu (çocukları, onlar ölmüşse torunları), ana-babası ve onların altsoyu, büyükanne ve büyükbabaları ile sağ kalan eşidir. Eşin payı, birlikte mirasçı olduğu zümreye göre değişir: Çocuklarla birlikte mirasın dörtte biri, ana-baba zümresiyle birlikte yarısı, büyükanne-büyükbaba zümresiyle birlikte dörtte üçü eşe kalır; bunlar da yoksa mirasın tamamı eşindir (TMK m. 499). Mirasçılık ve paylar, mirasbırakanın ölüm tarihinde yürürlükte olan kanuna göre belirlenir.",
                },
                {
                    heading: "Veraset ilamı (mirasçılık belgesi) nasıl alınır?",
                    body: "Mirasçılık belgesi noterden veya sulh hukuk mahkemesinden alınabilir (TMK m. 598). Nüfus kayıtlarında sorun yoksa noter yolu çok daha hızlıdır. Belgede bir mirasçı eksik gösterilmiş ya da paylar yanlış yazılmışsa, belgenin geçersizliği her zaman ileri sürülebilir. Yargıtay 7. Hukuk Dairesi'nin 18.05.2023 tarihli, 2022/1702 E., 2023/2672 K. sayılı kararında belirtildiği gibi mirasçılık belgesi çekişmesiz yargı kararıdır, kesin hüküm oluşturmaz ve açılacak iptal davasıyla değiştirilebilir; yeni belgede mahkeme tüm mirasçıları ve paylarını eksiksiz göstermek zorundadır.",
                },
                {
                    heading: "Mirası reddetmek: üç aylık süre ve hükmen ret",
                    body: "Miras, ölümü ve mirasçı olduğunuzu öğrendiğiniz tarihten başlayarak üç ay içinde, mirasın açıldığı yerin sulh hukuk mahkemesine yapılacak kayıtsız şartsız bir beyanla reddedilebilir (TMK m. 606, 609). Bu süre içinde terekeyi olağan yönetimin dışında kullanan, mal gizleyen veya kendine mal eden mirasçı artık mirası reddedemez (TMK m. 610). Süre kaçırılmış olsa bile, mirasbırakanın ölüm tarihinde ödemeden aczi açıkça belliyse miras reddedilmiş sayılır. Yargıtay 7. Hukuk Dairesi'nin 15.01.2024 tarihli, 2023/388 E., 2024/181 K. sayılı kararına göre bu hükmen ret davası süreye bağlı değildir; terekenin borca batık olup olmadığı ise ölüm tarihine göre, tüm mal ve borçlar araştırılarak belirlenir.",
                },
                {
                    heading: "Mirastan mal kaçırma: muris muvazaası",
                    body: "Mirasbırakan, gerçekte bağışlamak istediği tapulu taşınmazını mirasçılarından mal kaçırmak amacıyla tapuda satış gibi gösterdiyse, saklı payı olsun olmasın miras hakkı zedelenen her mirasçı tapu iptali ve tescil davası açabilir (01.04.1974 tarihli, 1974/1 E., 1974/2 K. sayılı İçtihadı Birleştirme Kararı). Yargıtay Hukuk Genel Kurulu'nun 22.10.2025 tarihli, 2024/562 E., 2025/644 K. sayılı kararına göre mal kaçırma amacını ispat yükü davacı mirasçıdadır; mirasçılar sözleşmenin dışında kaldığından tanık dahil her türlü delile dayanabilir. Mahkeme; mirasbırakanın satış için makul bir nedeni olup olmadığına, alıcının alım gücüne, satış bedeli ile gerçek değer arasındaki farka ve aile içi ilişkilere bakar.",
                },
                {
                    heading: "Saklı pay ve tenkis davası",
                    body: "Mirasbırakan, malvarlığının saklı paylar dışında kalan kısmında serbestçe tasarruf edebilir. Saklı pay, çocuklar için yasal miras payının yarısı, ana ve babadan her biri için dörtte biri, sağ kalan eş için çocuklarla veya ana-baba zümresiyle birlikte mirasçıysa yasal payının tamamı, diğer hâllerde dörtte üçüdür (TMK m. 506); kardeşlerin saklı payı 2007'de kaldırılmıştır. Saklı payı zedelenen mirasçı, bunu öğrendiği tarihten itibaren bir yıl ve her hâlde on yıl içinde tenkis davası açabilir (TMK m. 571). Ölümden önceki bir yıl içinde yapılan bağışlar, âdet üzere verilen hediyeler dışında koşulsuz tenkise tabidir; daha eski bağışlarda ise mirasbırakanın saklı payları etkisiz kılma amacı aranır (TMK m. 565). Yargıtay Hukuk Genel Kurulu'nun 13.12.2023 tarihli, 2022/1177 E., 2023/1237 K. sayılı kararına göre burada yalnızca mirasbırakanın amacı önemlidir; bağış yapılanın bunu bilmesi gerekmez ve bu amaç tanık ve yemin dahil her delille ispatlanabilir.",
                },
                {
                    heading: "Vasiyetname: hazırlanması ve iptali",
                    body: "Vasiyet, noterde resmî şekilde, baştan sona el yazısıyla ya da yalnızca olağanüstü durumlarda sözlü olarak yapılabilir (TMK m. 531, 538, 539). Vasiyetname; ehliyetsizlik, yanılma, aldatma veya korkutma, hukuka ya da ahlaka aykırı içerik veya şekil eksikliği sebebiyle iptal ettirilebilir (TMK m. 557). Dava, iptal sebebini öğrenmeden itibaren bir yıl ve her hâlde vasiyetnamenin açılmasından itibaren iyiniyetli davalılara karşı on yıl içinde açılmalıdır (TMK m. 559). Yargıtay Hukuk Genel Kurulu'nun 06.05.2026 tarihli, 2025/218 E., 2026/290 K. sayılı kararı, okuma yazma bilmeyenin resmî vasiyetnamesindeki tanık beyanı eksikliğinin, işlemin bütününden anlaşılıyorsa vasiyetname lehine yorumla giderilebileceğini kabul etmiştir. Buna karşılık Yargıtay 7. Hukuk Dairesi'nin 24.05.2023 tarihli, 2022/1481 E., 2023/2792 K. sayılı kararında, noterin hastaneye gelebileceği bir durumda yapılan sözlü vasiyet olağanüstü hâl şartı gerçekleşmediği için geçersiz sayılmıştır.",
                },
                {
                    heading: "Miras paylaşımı ve ortaklığın giderilmesi",
                    body: "Miras kalan mallar, kesin paylaşıma kadar tüm mirasçılara elbirliğiyle aittir; mirasçılardan biri tek başına satış yapamaz. Mirasçılar yazılı bir paylaşma sözleşmesiyle anlaşabilir. Anlaşma olmazsa ortaklığın giderilmesi davası açılır; bu davadan önce arabulucuya başvurmak dava şartıdır (6325 sayılı Kanun m. 18/B). Yargıtay 7. Hukuk Dairesi'nin 14.05.2024 tarihli, 2023/2262 E., 2024/2585 K. sayılı kararında vurgulandığı gibi davada bütün paydaşların, ölen paydaşların da mirasçılık belgesine göre tüm mirasçılarının yer alması zorunludur; taşınmaz üzerindeki bina ve ağaç gibi eklentiler bir mirasçıya aitse satış bedeli bu oranda paylaştırılır.",
                },
                {
                    heading: "Kartal'da miras davaları nerede açılır?",
                    body: "Mirasın reddi ve mirasçılık belgesi işlemleri ile ortaklığın giderilmesi davaları sulh hukuk mahkemesinde; tenkis, muris muvazaası ve vasiyetnamenin iptali davaları asliye hukuk mahkemesinde görülür. Mirasın paylaşılması, tenkis ve ölüme bağlı tasarrufların iptali gibi davalar mirasbırakanın son yerleşim yeri mahkemesinde açılır (HMK m. 11); tapu iptali gibi taşınmazın aynına ilişkin davalar ise taşınmazın bulunduğu yerde görülür. Mirasbırakanın son yerleşim yeri Kartal, Pendik veya Maltepe ise bu davalar İstanbul Anadolu Adliyesi'nde açılır.",
                },
            ],
            decisions: [
                {
                    court: "Yargıtay Hukuk Genel Kurulu",
                    esas: "2024/562",
                    karar: "2025/644",
                    date: "22.10.2025",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1196569800",
                    principle: "Muris muvazaasında mal kaçırma amacını ispat yükü davacı mirasçıdadır; ekonomik durumu iyi mirasbırakanın tüm malvarlığını, ilişkisi olmayan çocuğunu dışarıda bırakacak biçimde satış göstererek devretmesi mal kaçırma amacını gösterir.",
                },
                {
                    court: "Yargıtay Hukuk Genel Kurulu",
                    esas: "2022/1177",
                    karar: "2023/1237",
                    date: "13.12.2023",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/985743800",
                    principle: "TMK m. 565/4 uyarınca tenkiste yalnızca kazandırmayı yapan mirasbırakanın saklı payları etkisiz kılma amacı aranır; bu amaç tanık ve yemin dahil her türlü delille ispatlanabilir.",
                },
                {
                    court: "Yargıtay Hukuk Genel Kurulu",
                    esas: "2025/218",
                    karar: "2026/290",
                    date: "06.05.2026",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1212520100",
                    principle: "İşlemde birlik ilkesine uygun düzenlenen resmî vasiyetnamede, beyanın tanıklar önünde yapıldığı vasiyetnamenin bütününden anlaşılıyorsa, tanık beyanındaki eksiklik vasiyetname lehine yorumla giderilir.",
                },
                {
                    court: "Yargıtay 7. Hukuk Dairesi",
                    esas: "2023/388",
                    karar: "2024/181",
                    date: "15.01.2024",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1001019800",
                    principle: "TMK m. 605/2'ye dayanan hükmen ret istemi süreye tabi değildir; mirasbırakanın ödemeden aczi ölüm tarihindeki aktif ve pasife göre belirlenir.",
                },
                {
                    court: "Yargıtay 7. Hukuk Dairesi",
                    esas: "2023/2262",
                    karar: "2024/2585",
                    date: "14.05.2024",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/1052789600",
                    principle: "Ortaklığın giderilmesi davasında bütün paydaşların, ölen paydaşın ise tüm mirasçılarının davada yer alması zorunludur; muhdesat varsa satış bedeli arz ve muhdesat oranına göre paylaştırılır.",
                },
                {
                    court: "Yargıtay 7. Hukuk Dairesi",
                    esas: "2022/1702",
                    karar: "2023/2672",
                    date: "18.05.2023",
                    url: "https://mevzuat.adalet.gov.tr/ictihat/915894600",
                    principle: "Mirasçılık belgesi kesin hüküm oluşturmaz, iptal davasıyla değiştirilebilir; yeni belgede tüm mirasçılar ve payları eksiksiz gösterilmelidir.",
                },
            ],
        }
    },
    {
        id: "is-ve-sosyal-guvenlik-hukuku",
        title: "İş ve Sosyal Güvenlik Hukuku",
        shortDescription: "İşten mi çıkarıldınız, maaşınız, fazla mesainiz veya tazminatınız mı ödenmedi? İşe iade ve alacak davalarında yanınızdayız.",
        seoTitle: "Kartal İş Avukatı: İşe İade ve Kıdem Tazminatı",
        seoDescription: "Kartal iş avukatı: işe iade, kıdem ve ihbar tazminatı, fazla mesai, yıllık izin, iş kazası ve hizmet tespiti davaları; işçi ve işverene destek. 0530 432 20 25",
        blogCategories: ["İş Hukuku"],
        faqCategories: ["İş Hukuku"],
        icon: FileText,
        detailContent: {
            intro: "İş hayatında işçi ve işveren arasındaki ilişkilerin yasal zeminde yürütülmesi, her iki taraf için de önemlidir. İş hukukundan kaynaklanan uyuşmazlıklarda güncel Yargıtay kararları ışığında hizmet veriyoruz.",
            features: [
                "İşe İade Davaları",
                "Kıdem, İhbar Tazminatı ve Fazla Mesai Alacakları",
                "İş Kazası ve Meslek Hastalığı Tazminatları",
                "Hizmet Tespiti Davaları",
                "Mobbing (Psikolojik Taciz) Davaları",
                "İş Sözleşmelerinin Hazırlanması ve Feshi"
            ],
            process: "İşçi müvekkillerimiz için hak ettikleri alacakların tam ve zamanında ödenmesini sağlarken, işveren müvekkillerimiz için mevzuata uygun işyeri uygulamaları oluşturarak dava risklerini minimize ediyoruz.",
            guide: [
                {
                    heading: "İş davalarında zorunlu arabuluculuk",
                    body: "Kanuna, bireysel veya toplu iş sözleşmesine dayanan işçi ve işveren alacağı ve tazminatı ile işe iade taleplerinde, dava açmadan önce arabulucuya başvurmak zorunludur. İş kazası ve meslek hastalığından doğan maddi ve manevi tazminat davaları ile hizmet tespiti davaları ise bu zorunluluğun dışındadır. Arabuluculukta anlaşma sağlanırsa, anlaşma konusu hususlarda artık dava açılamaz; bu yüzden hangi alacakların anlaşmaya dahil edildiği dikkatle belirlenmelidir.",
                },
                {
                    heading: "İşe iade: süreler çok kısa",
                    body: "İş güvencesinden yararlanabilmek için kural olarak işyerinde otuz veya daha fazla işçi çalışması, işçinin en az altı aylık kıdeminin bulunması ve belirsiz süreli iş sözleşmesiyle çalışıyor olması gerekir. Feshin geçersizliği iddiasıyla, fesih bildiriminin tebliğinden itibaren bir ay içinde arabulucuya başvurulmalı; anlaşma sağlanamazsa son tutanağın düzenlendiği tarihten itibaren iki hafta içinde işe iade davası açılmalıdır. Bu süreler kaçırılırsa işe iade hakkı kaybedilir.",
                },
                {
                    heading: "Kıdem, ihbar ve diğer işçilik alacakları",
                    body: "En az bir yıl çalışmış ve iş sözleşmesi kanunda sayılan sebeplerden biriyle sona ermiş işçi kıdem tazminatına hak kazanır; bildirim sürelerine uyulmadan yapılan fesihlerde ihbar tazminatı da gündeme gelir. Kıdem ve ihbar tazminatı, kullanılmayan yıllık izin ücreti, fazla mesai, hafta tatili ve bayram çalışması alacakları için zamanaşımı süresi beş yıldır. Bordro, banka kayıtları, puantaj ve tanık beyanları bu davalarda temel delillerdir.",
                },
                {
                    heading: "Sigortasız çalışma ve hizmet tespiti",
                    body: "Çalıştığı dönemde sigortası hiç yapılmamış ya da eksik gün veya düşük ücretle bildirilmiş işçi, hizmet tespiti davası açarak bu sürelerin sigortalılık süresine eklenmesini sağlayabilir. Bu dava, hizmetin geçtiği yılın sonundan itibaren beş yıl içinde açılmalıdır; süre hak düşürücüdür ve emeklilik hakkını doğrudan etkiler.",
                },
                {
                    heading: "İş kazası ve meslek hastalığı",
                    body: "İş kazası veya meslek hastalığı sonucu zarar gören işçi ya da hayatını kaybeden işçinin yakınları, işverene karşı maddi ve manevi tazminat davası açabilir. Kazanın hemen ardından tutanakların, sağlık raporlarının ve SGK bildiriminin temin edilmesi; kusur oranının bilirkişi incelemesiyle doğru belirlenmesi tazminat miktarını belirleyen başlıca unsurlardır. Kartal ve çevresindeki iş davaları İstanbul Anadolu Adliyesi'ndeki iş mahkemelerinde görülür.",
                },
            ],
        }
    },
    {
        id: "arabuluculuk",
        title: "Arabuluculuk",
        shortDescription: "Mahkemeye gitmeden, daha kısa sürede ve daha az masrafla anlaşmanın yolu. İş, kira ve ticari anlaşmazlıklarda kayıtlı arabulucu olarak görev yapıyoruz.",
        seoTitle: "Kartal Arabulucu: İş, Kira ve Ticari Arabuluculuk",
        seoDescription: "Kartal'da kayıtlı arabulucu Av. Emre Durmuş: iş, kira, ticari ve tüketici uyuşmazlıklarında zorunlu ve ihtiyari arabuluculuk. Randevu: 0530 432 20 25",
        blogCategories: ["Arabuluculuk"],
        faqCategories: [],
        faqIds: ["is-davasinda-arabuluculuk", "ticari-davalarda-arabuluculuk"],
        icon: Scale,
        detailContent: {
            intro: "Yargı süreçlerinin uzunluğu ve masrafı karşısında, arabuluculuk modern, hızlı ve ekonomik bir alternatif çözüm yoludur. Tarafların kendi çözümlerini üretebildiği bu süreçte etkin rol alıyoruz.",
            features: [
                "İş Hukuku Arabuluculuğu",
                "Ticaret Hukuku Arabuluculuğu",
                "Tüketici Hukuku Arabuluculuğu",
                "Kira Hukuku Arabuluculuğu",
                "İhtiyari Arabuluculuk Hizmetleri"
            ],
            process: "Tarafları bir araya getirerek, iletişimi kolaylaştırıyor ve her iki tarafın da menfaatine uygun, sürdürülebilir bir anlaşma zemini oluşturulmasına katkı sağlıyoruz.",
            guide: [
                {
                    heading: "Hangi uyuşmazlıklarda arabuluculuk zorunlu?",
                    body: "Bugün birçok alanda dava açmadan önce arabulucuya başvurmak dava şartıdır: işçi–işveren alacak ve tazminatları ile işe iade talepleri; konusu bir miktar para olan ticari alacaklar; tüketici hakem heyetinin parasal sınırını aşan tüketici uyuşmazlıkları; kira ilişkisinden doğan uyuşmazlıklar, ortaklığın giderilmesi, kat mülkiyeti ve komşu hakkı uyuşmazlıkları bunların başlıcalarıdır. Arabulucuya başvurmadan açılan dava, usulden reddedilir.",
                },
                {
                    heading: "Süreç nasıl işler, ne kadar sürer?",
                    body: "Başvuru, adliyedeki arabuluculuk bürosuna yapılır ve dosyaya bir arabulucu atanır. Arabulucu tarafları toplantıya davet eder; görüşmeler gizlidir ve burada yapılan teklifler sonradan delil olarak kullanılamaz. Kanun, iş, tüketici ve kira uyuşmazlıkları için üç hafta, ticari uyuşmazlıklar için altı haftalık süre öngörür; zorunlu hâllerde bu süreler sınırlı ölçüde uzatılabilir. Kartal ve çevresindeki başvurular İstanbul Anadolu Adliyesi arabuluculuk bürosuna yapılır.",
                },
                {
                    heading: "Anlaşma belgesinin gücü",
                    body: "Arabuluculuk sonunda taraflar anlaşırsa bir anlaşma belgesi düzenlenir. Taraflar ve avukatları ile arabulucunun birlikte imzaladığı anlaşma belgesi, ayrıca bir mahkeme kararına gerek olmaksızın ilam niteliğindedir ve doğrudan icraya konulabilir. Anlaşılan konular hakkında artık dava açılamayacağından, belgenin kapsamı ve ifadeleri büyük özen gerektirir.",
                },
                {
                    heading: "İlk toplantıya katılmamanın sonucu",
                    body: "Zorunlu arabuluculukta geçerli bir mazereti olmaksızın ilk toplantıya katılmayan taraf, son tutanakta belirtilir ve sonradan açılan davada kısmen veya tamamen haklı çıksa bile karşı tarafın ödemekle yükümlü olduğu yargılama giderlerinin yarısından sorumlu tutulur; ayrıca bu taraf lehine Avukatlık Asgari Ücret Tarifesine göre belirlenen vekâlet ücretinin yalnızca yarısına hükmedilir. Her iki taraf da ilk toplantıya katılmazsa, açılacak davada tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır. Vekâlet ücretine ilişkin bu kural 7 Kasım 2024 tarihli 7531 sayılı Kanun'la getirilmiştir; düzenleme iş uyuşmazlıkları (7036 sayılı Kanun m. 3) ile kira, ticari ve diğer zorunlu arabuluculuk alanları (6325 sayılı Kanun m. 18/A) için aynıdır. Bu nedenle davetin ciddiye alınması ve toplantıya hazırlıklı katılınması önemlidir.",
                },
                {
                    heading: "İhtiyari arabuluculuk: dava açmadan önce veya dava sırasında",
                    body: "Zorunlu olmayan alanlarda da taraflar, üzerinde serbestçe tasarruf edebilecekleri her uyuşmazlık için arabulucuya başvurabilir; hatta görülmekte olan bir dava sırasında bile arabuluculuk yoluyla anlaşmaya varılabilir. Av. Emre Durmuş, Adalet Bakanlığı Arabulucular Siciline kayıtlı arabulucu olarak tarafsız arabuluculuk hizmeti vermekte; avukat olarak da müvekkillerini arabuluculuk görüşmelerinde temsil etmektedir. Aynı uyuşmazlıkta bu iki görev birlikte üstlenilmez.",
                },
            ],
        }
    }
];
