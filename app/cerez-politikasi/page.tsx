import { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { PRIVACY_NOTICE_PATH } from "@/lib/legal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Çerez Politikası",
    description:
        "Asil Hukuk Bürosu internet sitesinde kullanılan tarayıcı depolama alanları ve çerez kullanmayan ziyaret istatistikleri hakkında bilgi.",
    path: "/cerez-politikasi",
});

const breadcrumbLd = breadcrumbJsonLd([{ name: "Çerez Politikası", path: "/cerez-politikasi" }]);

export default function CookiePolicyPage() {
    return (
        <LegalPage
            eyebrow="Kişisel Verilerin Korunması"
            title="Çerez Politikası"
            intro="Sitemiz reklam, profilleme veya ziyaretçi takibi amacıyla çerez kullanmaz. Bu sayfa, sitenin çalışması için tarayıcınızda tutulan küçük kayıtları ve çerez kullanmayan ziyaret istatistiklerini açıklar."
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

            <h2>1. Çerez ve tarayıcı depolama nedir?</h2>
            <p>
                Çerezler ve tarayıcı depolama alanları (localStorage, sessionStorage), bir internet sitesinin
                tarayıcınıza kaydettiği küçük veri parçalarıdır. Bu kayıtlar sitenin tercihlerinizi hatırlamasını veya
                bir işlemi sayfalar arasında sürdürmesini sağlar.
            </p>

            <h2>2. Sitemizde kullanılan kayıtlar</h2>
            <p>
                Sitemizde yalnızca sizin talep ettiğiniz bir işlevin çalışması için zorunlu olan aşağıdaki kayıtlar
                kullanılır. Bu kayıtlar tarayıcınızda kalır, bize veya üçüncü kişilere gönderilmez ve açık rızanızı
                gerektirmez.
            </p>
            <ul>
                <li>
                    <strong>theme</strong> (localStorage): açık veya koyu tema tercihiniz. Temayı değiştirdiğinizde
                    oluşturulur ve tarayıcı verilerinizi silene kadar saklanır.
                </li>
                <li>
                    <strong>asil-chat-v1</strong> (sessionStorage): sohbet asistanındaki konuşmanın sayfalar arasında
                    korunması. Sekmeyi veya tarayıcıyı kapattığınızda otomatik olarak silinir.
                </li>
            </ul>

            <h2>3. Ziyaret istatistikleri</h2>
            <p>
                Sitenin hangi sayfalarının ziyaret edildiğini toplu olarak görmek için Vercel Web Analytics
                kullanıyoruz. Bu araç çerez kullanmaz ve tarayıcınıza bir kayıt bırakmaz; ziyaretler, gün sonunda geçerliliğini
                yitiren bir karma (hash) değeriyle ayırt edilir ve sizi siteler arasında veya günler boyunca takip etmez.
                Elde edilen bilgiler (sayfa görüntülenme sayısı, yönlendiren site, ülke, cihaz ve tarayıcı türü) yalnızca
                toplu istatistik olarak görüntülenir.
            </p>

            <h2>4. Üçüncü taraf çerezleri</h2>
            <p>
                Sitemizde reklam ağı, sosyal medya eklentisi veya üçüncü taraf analiz çerezi bulunmaz. İletişim
                sayfasındaki Google Haritalar haritası, siz &ldquo;Haritayı göster&rdquo; düğmesine basmadıkça yüklenmez;
                bastığınızda Google LLC tarafından sağlanan harita ve Google&apos;ın çerezleri yüklenebilir. Harita,
                WhatsApp ve sosyal medya bağlantılarına tıkladığınızda ilgili hizmetin kendi sitesine yönlendirilirsiniz;
                bu hizmetlerin çerez uygulamaları kendi politikalarına tabidir.
            </p>

            <h2>5. Kayıtları nasıl silebilirsiniz?</h2>
            <p>
                Tarayıcınızın ayarlarındaki &ldquo;site verilerini temizle&rdquo; seçeneğiyle bu kayıtları dilediğiniz
                zaman silebilirsiniz. Bu durumda yalnızca tema tercihiniz ve açık sohbet geçmişiniz sıfırlanır.
            </p>

            <h2>6. Kişisel verileriniz</h2>
            <p>
                Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için{" "}
                <Link href={PRIVACY_NOTICE_PATH}>KVKK Aydınlatma Metni</Link>&apos;ni inceleyebilirsiniz.
            </p>
        </LegalPage>
    );
}
