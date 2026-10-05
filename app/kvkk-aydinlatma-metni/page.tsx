import { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteContent } from "@/data/siteContent";
import { COOKIE_POLICY_PATH } from "@/lib/legal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "KVKK Aydınlatma Metni",
    description:
        "Asil Hukuk Bürosu internet sitesi, iletişim formu, sohbet asistanı ve randevu süreçlerinde kişisel verilerin 6698 sayılı KVKK kapsamında işlenmesine ilişkin aydınlatma metni.",
    path: "/kvkk-aydinlatma-metni",
});

const breadcrumbLd = breadcrumbJsonLd([{ name: "KVKK Aydınlatma Metni", path: "/kvkk-aydinlatma-metni" }]);

const { contact } = siteContent;

export default function PrivacyNoticePage() {
    return (
        <LegalPage
            eyebrow="Kişisel Verilerin Korunması"
            title="KVKK Aydınlatma Metni"
            intro="Bu metin, asilhukuk.net internet sitesi ile iletişim formu, sohbet asistanı, telefon, WhatsApp ve e-posta üzerinden bize ulaştığınızda kişisel verilerinizin nasıl işlendiğini 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) 10. maddesi uyarınca açıklar."
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

            <h2>1. Veri sorumlusu</h2>
            <p>
                Kişisel verileriniz, veri sorumlusu sıfatıyla <strong>Av. Emre Durmuş</strong> (Asil Hukuk Bürosu,
                İstanbul Barosu) tarafından işlenmektedir.
            </p>
            <ul>
                <li>Adres: {contact.address}</li>
                <li>
                    E-posta: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>Telefon: {contact.phone}</li>
            </ul>

            <h2>2. Hangi kişisel verilerinizi işliyoruz?</h2>
            <ul>
                <li>
                    <strong>İletişim ve randevu formu:</strong> adınız soyadınız, telefon numaranız, (verirseniz) e-posta
                    adresiniz, seçtiğiniz konu, durumunuza ilişkin kısa açıklamanız ve tercih ettiğiniz iletişim yolu.
                </li>
                <li>
                    <strong>Sohbet asistanı:</strong> sohbete yazdığınız mesajlar; randevu oluşturmanız hâlinde ayrıca
                    adınız soyadınız, telefon numaranız, (verirseniz) e-posta adresiniz, konu, kısa konu özeti, görüşme
                    şekli ve randevu saati.
                </li>
                <li>
                    <strong>Telefon, WhatsApp ve e-posta:</strong> bize ilettiğiniz iletişim bilgileri ve yazışma içeriği.
                </li>
                <li>
                    <strong>Site kullanımı:</strong> IP adresi, tarayıcı ve cihaz bilgisi, ziyaret edilen sayfalar ve
                    erişim zamanı gibi sunucu kayıtları ile çerez kullanılmadan üretilen toplu ziyaret istatistikleri.
                    Ayrıntılar için <Link href={COOKIE_POLICY_PATH}>Çerez Politikası</Link>&apos;na bakabilirsiniz.
                </li>
            </ul>
            <p>
                <strong>Özel nitelikli kişisel veri talep etmiyoruz.</strong> Sağlık bilgisi, ceza mahkûmiyeti, dinî
                inanç veya cinsel hayata ilişkin bilgiler ile T.C. kimlik numarası gibi verileri form ya da sohbet
                asistanı üzerinden paylaşmamanızı rica ederiz; bu bilgileri gerekirse görüşmede doğrudan avukatınıza
                iletebilirsiniz. Buna rağmen paylaşılması hâlinde bu veriler yalnızca talebinizin değerlendirilmesi için
                ve KVKK m. 6/3-(d) uyarınca bir hakkın tesisi, kullanılması veya korunması için zorunlu olduğu ölçüde
                işlenir.
            </p>

            <h2>3. Kişisel verilerinizi hangi amaçlarla işliyoruz?</h2>
            <ul>
                <li>Talebinize dönüş yapılması ve sizinle iletişime geçilmesi,</li>
                <li>Ön görüşme randevusunun planlanması, takvime işlenmesi ve teyit edilmesi,</li>
                <li>Sohbet asistanı aracılığıyla büro ve çalışma alanları hakkında genel bilgi verilmesi,</li>
                <li>Avukatlık hizmeti sözleşmesi kurulmadan önce talebinizin ön değerlendirmesinin yapılması,</li>
                <li>Sitenin güvenliğinin sağlanması ve kötüye kullanımın (ör. otomatik toplu mesaj) önlenmesi,</li>
                <li>Sitenin işleyişinin ve performansının toplu istatistiklerle izlenmesi,</li>
                <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi ve yetkili makamların taleplerinin karşılanması.</li>
            </ul>

            <h2>4. Hukuki sebepler</h2>
            <ul>
                <li>
                    İletişim ve randevu taleplerinize ilişkin veriler: talebiniz üzerine bir sözleşmenin kurulmasıyla
                    doğrudan ilgili olması (KVKK m. 5/2-c).
                </li>
                <li>
                    Sunucu kayıtları, kötüye kullanımın önlenmesi ve toplu ziyaret istatistikleri: temel hak ve
                    özgürlüklerinize zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (KVKK m. 5/2-f).
                </li>
                <li>
                    Yasal yükümlülükler ve olası uyuşmazlıklar: hukuki yükümlülüğün yerine getirilmesi ile bir hakkın
                    tesisi, kullanılması veya korunması (KVKK m. 5/2-ç ve 5/2-e).
                </li>
            </ul>
            <p>
                Bu kanallar üzerinden kişisel verilerinizi açık rızanıza dayanarak işlemiyoruz. Formdaki onay kutusu,
                yalnızca bu aydınlatma metnini okuduğunuzu teyit etmeniz içindir.
            </p>

            <h2>5. Toplama yöntemi</h2>
            <p>
                Kişisel verileriniz; iletişim formu, sohbet asistanı, WhatsApp, e-posta ve telefon aracılığıyla
                doğrudan sizden, site kullanımına ilişkin veriler ise sunucu kayıtları ve çerez kullanmayan analiz aracı
                üzerinden otomatik yollarla elektronik ortamda toplanır.
            </p>

            <h2>6. Kişisel verilerinizi kimlere aktarıyoruz?</h2>
            <p>
                Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak ve bizim adımıza veri işleyen sıfatıyla hizmet
                veren aşağıdaki sağlayıcılara aktarılır:
            </p>
            <ul>
                <li>
                    <strong>Vercel Inc. (ABD):</strong> sitenin barındırılması, sunucu kayıtları ve çerez kullanmayan
                    toplu ziyaret istatistikleri.
                </li>
                <li>
                    <strong>Anthropic PBC (ABD):</strong> sohbet asistanının yapay zekâ altyapısı. Sohbet mesajlarınız
                    yanıt üretilmesi için bu sağlayıcıya iletilir; sağlayıcının ticari kullanım koşulları gereği model
                    eğitiminde kullanılmaz.
                </li>
                <li>
                    <strong>Formspree, Inc. (ABD):</strong> iletişim formu ve randevu bildirimlerinin büroya e-posta ile
                    iletilmesi.
                </li>
                <li>
                    <strong>Google LLC (ABD):</strong> randevunuzun avukatın Google Takvim&apos;ine işlenmesi.
                </li>
            </ul>
            <p>
                Bu sağlayıcıların sunucuları yurt dışında bulunduğundan söz konusu aktarımlar yurt dışına aktarım
                niteliğindedir ve KVKK m. 9/4-(c) uyarınca Kişisel Verileri Koruma Kurulu tarafından ilan edilen
                standart sözleşmeler çerçevesinde gerçekleştirilir.
            </p>
            <p>
                WhatsApp üzerinden yazmayı tercih etmeniz hâlinde mesajlarınız WhatsApp (Meta Platforms) altyapısı
                üzerinden iletilir ve bu hizmetin kendi gizlilik koşullarına tabidir. Kişisel verileriniz ayrıca, kanunen
                yetkili kamu kurum ve kuruluşlarına talep hâlinde ve mevzuatın izin verdiği ölçüde aktarılabilir.
            </p>

            <h2>7. Saklama süresi</h2>
            <ul>
                <li>
                    Form ve randevu talepleri, avukatlık hizmeti ilişkisi kurulmazsa talebin sonuçlanmasından itibaren
                    en geç 1 yıl içinde silinir. Hizmet ilişkisi kurulması hâlinde veriler müvekkil dosyası kapsamında
                    ilgili mevzuatta öngörülen süreler boyunca saklanır.
                </li>
                <li>
                    Sohbet mesajlarının içeriği sunucularımızda kaydedilmez; sohbet geçmişi yalnızca tarayıcınızda
                    tutulur ve sekmeyi kapattığınızda silinir. Yapay zekâ sağlayıcısı, kendi saklama politikası
                    çerçevesinde mesajları sınırlı bir süre güvenlik amacıyla tutabilir.
                </li>
                <li>Sunucu kayıtları, barındırma sağlayıcısının sınırlı kayıt saklama süresi sonunda silinir.</li>
            </ul>

            <h2>8. KVKK m. 11 kapsamındaki haklarınız</h2>
            <p>Veri sorumlusuna başvurarak;</p>
            <ul>
                <li>kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                <li>işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                <li>eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                <li>KVKK m. 7&apos;de öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
                <li>düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                <li>
                    işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir
                    sonucun ortaya çıkmasına itiraz etme,
                </li>
                <li>kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
            <p>haklarına sahipsiniz.</p>

            <h2>9. Başvuru yöntemi</h2>
            <p>
                Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ&apos;e uygun
                olarak; kimliğinizi tespit edici bilgileri içeren ıslak imzalı bir dilekçeyle {contact.address} adresine
                şahsen veya noter aracılığıyla ya da güvenli elektronik imza veya mobil imza ile imzalayarak{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine iletebilirsiniz.
            </p>
            <p>
                Başvurunuz, niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir
                maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret
                alınabilir (KVKK m. 13).
            </p>
        </LegalPage>
    );
}
