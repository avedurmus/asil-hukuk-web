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
    }
];
