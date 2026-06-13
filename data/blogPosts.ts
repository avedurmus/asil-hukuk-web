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
    },
    {
        id: "kiraci-tahliye-davasi-sartlari-suresi",
        title: "Kiracı Tahliye Davası Nasıl Açılır? Şartları ve Süresi 2026",
        excerpt: "Kiracı tahliye davası şartları, tahliye taahhütnamesi ile tahliye, kiranın ödenmemesi nedeniyle tahliye ve zorunlu arabuluculuk süreci hakkında güncel hukuki rehber.",
        date: "13 Haziran 2026",
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
    }
];

