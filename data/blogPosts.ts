export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    imageUrl: string;
    content: string; // HTML string or Markdown
}

export const blogPosts: BlogPost[] = [
    {
        id: "anlasmali-bosanma-davasi-ne-kadar-surer",
        title: "Anlaşmalı Boşanma Davası Ne Kadar Sürer? 2025 Güncel Süreç",
        excerpt: "Anlaşmalı boşanma davası şartları, süreci ve gerekli belgeler hakkında detaylı rehber. Tek celsede boşanmak mümkün mü?",
        date: "27 Aralık 2024",
        readTime: "4 dk okuma",
        category: "Aile Hukuku",
        imageUrl: "https://images.unsplash.com/photo-1590081874249-14a514d2e1c9?auto=format&fit=crop&q=80&w=800", // Placeholder generic legal image
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
        readTime: "5 dk okuma",
        category: "İş Hukuku",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
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
    }
];
