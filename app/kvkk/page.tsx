import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { siteContent } from "@/data/siteContent";
import { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "KVKK Aydınlatma Metni ve Gizlilik Politikası",
    description:
        "Asil Hukuk Bürosu'nun web sitesi, iletişim formu, sohbet asistanı ve WhatsApp hattı üzerinden işlenen kişisel veriler hakkında 6698 sayılı KVKK kapsamında aydınlatma metni.",
    path: "/kvkk",
});

const LAST_UPDATED = "10 Kasım 2026";
const { contact } = siteContent;

/** Kişisel verilerin aktarıldığı hizmet sağlayıcılar ve amaçları. */
const processors = [
    { name: "Vercel Inc. (ABD)", purpose: "Web sitesinin barındırılması ve anonim ziyaret istatistikleri (Vercel Analytics)." },
    { name: "Google LLC (ABD)", purpose: "Ziyaret istatistikleri (Google Analytics) ve randevuların avukatın takvimine işlenmesi (Google Takvim)." },
    { name: "Formspree Inc. (ABD)", purpose: "İletişim formu ve randevu taleplerinin büroya e-posta ile iletilmesi." },
    { name: "Anthropic PBC (ABD)", purpose: "Sohbet asistanı ve WhatsApp asistanının yanıtlarının yapay zekâ ile üretilmesi." },
    { name: "Meta Platforms / WhatsApp (ABD, İrlanda)", purpose: "WhatsApp üzerinden yapılan yazışmaların iletilmesi." },
    { name: "Upstash Inc. (sunucular Almanya'da)", purpose: "WhatsApp asistanındaki sohbet geçmişinin kısa süreli saklanması." },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-10 first:mt-0">
            <h2 className="font-serif text-2xl font-medium text-slate-900 dark:text-slate-100">{title}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">{children}</div>
        </section>
    );
}

export default function KvkkPage() {
    const breadcrumbLd = breadcrumbJsonLd([{ name: "KVKK Aydınlatma Metni", path: "/kvkk" }]);

    return (
        <div className="min-h-screen bg-ivory-100 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

                <PageHero
                    eyebrow="Kişisel Verilerin Korunması"
                    title="KVKK Aydınlatma Metni ve Gizlilik Politikası"
                    description={<>Son güncelleme: {LAST_UPDATED}</>}
                />

                <article className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <Section title="1. Veri sorumlusu">
                        <p>
                            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu, Asil
                            Hukuk ve Danışmanlık Bürosu adına Av. Emre Durmuş&apos;tur.
                        </p>
                        <p>
                            Adres: {contact.address}
                            <br />
                            E-posta: <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>
                            <br />
                            Telefon: {contact.phone}
                        </p>
                    </Section>

                    <Section title="2. Hangi kişisel verileri işliyoruz?">
                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                <strong>Kimlik ve iletişim bilgileri:</strong> İletişim formu, sohbet asistanı veya WhatsApp
                                üzerinden paylaştığınız ad soyad, telefon numarası ve e-posta adresi; WhatsApp profil adınız.
                            </li>
                            <li>
                                <strong>Talep bilgileri:</strong> Hukuki sorununuza ilişkin paylaştığınız açıklamalar, tercih
                                ettiğiniz randevu tarihi ve görüşme şekli.
                            </li>
                            <li>
                                <strong>Yazışma içerikleri:</strong> Sohbet asistanı ve WhatsApp asistanı ile yaptığınız
                                yazışmalar.
                            </li>
                            <li>
                                <strong>Kullanım verileri:</strong> Siteyi ziyaretinize ilişkin teknik bilgiler (ziyaret edilen
                                sayfalar, tarayıcı türü, yaklaşık konum gibi) ve çerezler aracılığıyla toplanan istatistikler.
                            </li>
                        </ul>
                        <p>
                            Lütfen yazışmalarda kimlik numarası, sağlık bilgisi, ceza mahkûmiyeti gibi özel nitelikli kişisel
                            verilerinizi paylaşmayınız; bu bilgileri gerekirse ön görüşmede doğrudan avukata iletebilirsiniz.
                        </p>
                    </Section>

                    <Section title="3. Kişisel verilerinizi hangi amaçlarla ve hangi hukuki sebeplere dayanarak işliyoruz?">
                        <ul className="list-disc space-y-2 pl-6">
                            <li>Talebinize dönüş yapılması, ön görüşme randevusunun planlanması ve hatırlatılması,</li>
                            <li>Sorularınıza genel bilgi niteliğinde yanıt verilmesi ve sizi ilgili çalışma alanına yönlendirmek,</li>
                            <li>Avukatlık hizmeti ilişkisinin kurulmasına yönelik ön değerlendirmenin yapılması,</li>
                            <li>Sitenin güvenliğinin sağlanması, kötüye kullanımın önlenmesi ve hizmetin iyileştirilmesi.</li>
                        </ul>
                        <p>
                            Bu veriler KVKK m. 5/2-c (bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması), m. 5/2-ç
                            (hukuki yükümlülüğün yerine getirilmesi), m. 5/2-f (temel hak ve özgürlüklerinize zarar vermemek
                            kaydıyla meşru menfaat) hukuki sebeplerine ve gerekli hâllerde açık rızanıza (m. 5/1) dayanılarak
                            işlenir. Randevu taleplerinde açık rızanız ayrıca alınır.
                        </p>
                    </Section>

                    <Section title="4. Sohbet asistanı ve WhatsApp asistanı">
                        <p>
                            Sitedeki sohbet asistanı ve büronun WhatsApp hattındaki asistan, yapay zekâ destekli otomatik
                            sistemlerdir. Verdikleri bilgiler genel niteliktedir ve hukuki danışmanlık yerine geçmez.
                            Yazışmalarınız, yanıt üretilmesi amacıyla yapay zekâ hizmet sağlayıcımıza iletilir.
                        </p>
                        <p>
                            Sitedeki sohbet geçmişi sunucularımızda saklanmaz; yalnızca tarayıcınızın ilgili sekmesinde tutulur
                            ve sekme kapatıldığında silinir. WhatsApp asistanındaki sohbet geçmişi, sohbetin sürdürülebilmesi
                            için en fazla 7 gün saklanır ve ardından kendiliğinden silinir. Avukata iletilmesini istediğiniz veya
                            randevu için paylaştığınız bilgiler büroya e-posta ile iletilir.
                        </p>
                    </Section>

                    <Section title="5. Kişisel verilerinizi kimlere aktarıyoruz?">
                        <p>
                            Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak ve hizmet aldığımız aşağıdaki hizmet
                            sağlayıcılara aktarılır. Bu sağlayıcıların bir kısmı yurt dışında bulunduğundan aktarım, KVKK m. 9
                            kapsamında öngörülen uygun güvencelere ya da açık rızanıza dayanılarak yapılır.
                        </p>
                        <ul className="list-disc space-y-2 pl-6">
                            {processors.map((p) => (
                                <li key={p.name}>
                                    <strong>{p.name}:</strong> {p.purpose}
                                </li>
                            ))}
                        </ul>
                        <p>
                            Bunların dışında kişisel verileriniz, yalnızca kanunen yetkili kamu kurum ve kuruluşlarına, yasal
                            yükümlülükler çerçevesinde aktarılabilir.
                        </p>
                    </Section>

                    <Section title="6. Ne kadar süre saklıyoruz?">
                        <p>
                            Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta (avukatlık
                            mevzuatı dâhil) öngörülen saklama süreleri kadar saklanır; sürenin sona ermesiyle silinir, yok
                            edilir veya anonim hâle getirilir. Avukatlık hizmeti ilişkisi kurulmayan başvurulara ait bilgiler
                            makul süre sonunda silinir.
                        </p>
                    </Section>

                    <Section title="7. Haklarınız">
                        <p>KVKK m. 11 uyarınca; kişisel verilerinizin</p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme,</li>
                            <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                            <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                            <li>eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                            <li>KVKK m. 7&apos;deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
                            <li>düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                            <li>münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
                            <li>kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
                        </ul>
                        <p>haklarına sahipsiniz.</p>
                        <p>
                            Başvurularınızı{" "}
                            <a href={`mailto:${contact.email}`} className="underline">
                                {contact.email}
                            </a>{" "}
                            adresine e-posta ile veya yukarıdaki adrese yazılı olarak iletebilirsiniz. Başvurunuz, talebin
                            niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandırılır.
                        </p>
                    </Section>

                    <Section title="8. Çerezler">
                        <p>
                            Sitede, ziyaret istatistiklerini ölçmek amacıyla Google Analytics ve Vercel Analytics kullanılır.
                            Tema tercihiniz gibi bilgiler yalnızca tarayıcınızda saklanır. Tarayıcı ayarlarınızdan çerezleri
                            silebilir veya engelleyebilirsiniz.
                        </p>
                    </Section>
                </article>
            </main>
            <Footer />
        </div>
    );
}
