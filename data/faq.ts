export interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export const faqs: FAQItem[] = [
    {
        category: "Aile Hukuku",
        question: "Anlaşmalı boşanma davası ne kadar sürer?",
        answer: "Anlaşmalı boşanma davaları, tarafların boşanma ve fer'ileri (nafaka, tazminat, velayet vb.) konusunda tam bir mutabakata varması ve hakimin de bu protokolü uygun bulması halinde genellikle tek celsede sonuçlanır. Mahkemenin iş yoğunluğuna göre dava açıldıktan sonra 1 hafta ile 1 ay arasında duruşma günü verilebilir."
    },
    {
        category: "Aile Hukuku",
        question: "Çekişmeli boşanma davası ne kadar sürer?",
        answer: "Çekişmeli boşanma davaları, toplanacak delillerin durumu, tanıkların dinlenmesi ve dosyanın bilirkişiye gidip gitmeyeceğine göre değişiklik gösterir. Ortalama olarak ilk derece mahkemesi süreci 1.5 - 2 yıl kadar sürebilmektedir. İstinaf ve Yargıtay süreçleri bu süreye dahil değildir."
    },
    {
        category: "Aile Hukuku",
        question: "Boşanmada velayet kime verilir?",
        answer: "Velayet düzenlemesinde temel kriter 'çocuğun üstün yararı'dır. Hakim; çocuğun yaşı, gelişimi, ebeveynlerin yaşam koşulları ve çocukla kurdukları ilişkiyi değerlendirerek karar verir. Küçük yaşta (anne bakımına muhtaç) çocukların velayeti genellikle anneye verilirken, ilerleyen yaşlarda çocuğun görüşü de dikkate alınır."
    },
    {
        category: "İş Hukuku",
        question: "İşe iade davası açma süresi nedir?",
        answer: "İş sözleşmesi feshedilen işçi, fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurmak zorundadır. Arabuluculukta anlaşma sağlanamazsa, son tutanağın düzenlendiği tarihten itibaren 2 hafta içinde İş Mahkemesinde dava açılmalıdır."
    },
    {
        category: "İş Hukuku",
        question: "Kıdem tazminatı alma şartları nelerdir?",
        answer: "Kıdem tazminatına hak kazanabilmek için aynı işyerinde en az 1 yıl çalışmış olmak ve iş sözleşmesinin işveren tarafından haksız yere feshedilmesi veya işçi tarafından haklı nedenle (örneğin maaşın ödenmemesi, mobbing) feshedilmesi gerekir. Emeklilik, evlilik (kadın işçi için 1 yıl içinde) ve askerlik nedenleriyle fesihlerde de kıdem tazminatı alınabilir."
    },
    {
        category: "Ceza Hukuku",
        question: "Hükmün Açıklanmasının Geri Bırakılması (HAGB) nedir?",
        answer: "HAGB, sanık hakkında hükmolunan cezanın, belirli bir denetim süresi (5 yıl) içinde kasten yeni bir suç işlememek koşuluyla açıklanmaması ve sanığın hiç suç işlememiş gibi kabul edilmesidir. HAGB kararı, adli sicil kaydında (sabıka kaydı) görünmez."
    },
    {
        category: "Ceza Hukuku",
        question: "İfade verirken avukat bulundurmak zorunlu mudur?",
        answer: "Bazı durumlarda (çocuklar, kendini savunamayacak durumda olanlar ve alt sınırı 5 yıldan fazla hapis cezasını gerektiren suçlar) avukat bulundurmak zorunludur. Diğer hallerde zorunlu olmasa da, hukuki güvenliğiniz için soruşturmanın başından (ifade aşamasından) itibaren bir ceza avukatı ile temsil edilmeniz şiddetle önerilir."
    },
    {
        category: "Gayrimenkul Hukuku",
        question: "Kiracı tahliyesi ne kadar sürer?",
        answer: "Kiracı tahliye davaları, tahliye sebebine (ihtiyaç, kira ödenmemesi, tahliye taahhütnamesi vb.) göre değişir. Sulh Hukuk Mahkemelerinde görülen bu davalar, mahkemenin yoğunluğuna göre ortalama 1 - 1.5 yıl sürebilmektedir."
    },
    {
        category: "Genel",
        question: "Avukatlık ücreti neye göre belirlenir?",
        answer: "Avukatlık ücreti, Türkiye Barolar Birliği'nin belirlediği 'Avukatlık Asgari Ücret Tarifesi'nden az olmamak üzere, davanın türüne, karmaşıklığına ve harcanacak mesaiye göre avukat ile müvekkil arasında serbestçe kararlaştırılır."
    }
];
