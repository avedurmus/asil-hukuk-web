import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe, Briefcase } from "lucide-react";
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
    };
}

export const services: Service[] = [
    {
        id: "bosanma-ve-aile-hukuku",
        title: "Boşanma ve Aile Hukuku",
        shortDescription: "Boşanma, velayet, nafaka, mal paylaşımı ve düğün takıları. Haklarınızı anlatır, davanızı baştan sona takip ederiz.",
        seoTitle: "Kartal Boşanma Avukatı - Aile Hukuku",
        seoDescription: "Kartal ve Anadolu Yakası'nda anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal paylaşımı davalarında Av. Emre Durmuş ile hukuki destek ve dava takibi.",
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
        seoTitle: "Kartal Ceza Avukatı - Ceza Hukuku",
        seoDescription: "Kartal ceza avukatı: soruşturma ve kovuşturma evrelerinde ifade, tutuklamaya itiraz ve savunma; ağır ceza ve asliye ceza davalarında müdafilik hizmeti.",
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
        seoTitle: "Kartal Ticaret ve Şirketler Hukuku Avukatı",
        seoDescription: "Kartal'da şirket kuruluşu, genel kurul ve esas sözleşme işlemleri, ticari sözleşmeler, haksız rekabet, konkordato ve iflas süreçlerinde avukatlık hizmeti.",
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
        id: "gayrimenkul-hukuku",
        title: "Gayrimenkul Hukuku",
        shortDescription: "Kiracı çıkarma, kira artışı, tapu ve ortak mülk sorunları. Ev sahibi ya da kiracı olarak haklarınızı koruruz.",
        seoTitle: "Kartal Gayrimenkul ve Taşınmaz Avukatı",
        seoDescription: "Kartal gayrimenkul avukatı Av. Emre Durmuş: tapu iptal ve tescil, kira tespiti ve tahliye, ortaklığın giderilmesi, önalım ve kat karşılığı inşaat davaları.",
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
        id: "is-ve-sosyal-guvenlik-hukuku",
        title: "İş ve Sosyal Güvenlik Hukuku",
        shortDescription: "İşten mi çıkarıldınız, maaşınız, fazla mesainiz veya tazminatınız mı ödenmedi? İşe iade ve alacak davalarında yanınızdayız.",
        seoTitle: "Kartal İş Avukatı - İşe İade ve Tazminat",
        seoDescription: "Kartal iş avukatı: işe iade, kıdem ve ihbar tazminatı, fazla mesai alacağı, iş kazası ve hizmet tespiti davalarında işçi ve işverenlere hukuki destek.",
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
        seoTitle: "Kartal Arabulucu - Arabuluculuk Hizmeti",
        seoDescription: "Kartal'da arabulucu Av. Emre Durmuş ile iş, ticaret, kira ve tüketici uyuşmazlıklarında zorunlu ve ihtiyari arabuluculuk; dava açmadan hızlı ve ekonomik çözüm.",
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
