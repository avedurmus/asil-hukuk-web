import { CaseFile, Decision, Message } from '../types';

// Helper to make the API call to Gemini
async function callGeminiAPI(apiKey: string, model: string = "gemini-1.5-flash", prompt: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `HTTP Error ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("API'den geçerli bir yanıt alınamadı.");
  }
  return text;
}

// Check if API key exists
export function hasApiKey(): boolean {
  if (typeof window === 'undefined') return false;
  const key = localStorage.getItem("yargi_asistan_gemini_key");
  return !!key && key.trim().length > 0;
}

export function getApiKey(): string {
  if (typeof window === 'undefined') return "";
  return localStorage.getItem("yargi_asistan_gemini_key") || "";
}

export function saveApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem("yargi_asistan_gemini_key", key);
}

export function getPreferredModel(): string {
  if (typeof window === 'undefined') return "gemini-1.5-flash";
  return localStorage.getItem("yargi_asistan_gemini_model") || "gemini-1.5-flash";
}

export function savePreferredModel(model: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem("yargi_asistan_gemini_model", model);
}

/**
 * 1. Analyze Case File
 */
export async function analyzeCase(caseData: CaseFile): Promise<string> {
  const key = getApiKey();
  const model = getPreferredModel();

  const prompt = `Sen uzman bir Türk hukukçusun. Aşağıdaki dava dosyasını detaylıca analiz et.
  
  DAVA BİLGİLERİ:
  - Başlık: ${caseData.title}
  - Mahkeme: ${caseData.court}
  - Dosya/Esas No: ${caseData.caseNumber || 'Belirtilmedi'}
  - Müvekkil / Taraf: ${caseData.client || 'Belirtilmedi'}
  - Dava Konusu: ${caseData.subject}
  - Olaylar ve Detaylar:
  ${caseData.details}

  Lütfen analizi aşağıdaki başlıklar altında Markdown formatında ve profesyonel hukuki dille yap:
  1. **Olay Özeti (Maddi Vakıalar)**: Olayları kronolojik ve hukuki açıdan özetle.
  2. **Hukuki Sorunlar ve İlgili Kanun Maddeleri**: Davanın temelini oluşturan hukuki uyuşmazlıkları ve uygulanacak kanun maddelerini (TMK, TBK, HMK vb.) belirt.
  3. **Güçlü Yönlerimiz**: Müvekkil lehine olan hukuki argümanlar, deliller ve savunma temelleri.
  4. **Zayıf Yönlerimiz ve Riskler**: Karşı tarafın öne sürebileceği iddialar ve davanın zayıf halkaları.
  5. **Hukuki Strateji ve Öneriler**: Davanın kazanılması için atılması gereken somut adımlar (hangi deliller sunulmalı, ne tür savunma yapılmalı).
  
  Yanıtını Türkçe ver.`;

  if (!key) {
    return getMockAnalysis(caseData);
  }

  try {
    return await callGeminiAPI(key, model, prompt);
  } catch (error: any) {
    console.error("Gemini API Error, falling back to mock:", error);
    throw new Error(`Yapay zeka analizi başarısız oldu: ${error.message}. Lütfen Ayarlar sayfasından API Anahtarınızı kontrol edin.`);
  }
}

/**
 * 2. Chat with Case context
 */
export async function chatWithCase(caseData: CaseFile, chatHistory: Message[], userMessage: string): Promise<string> {
  const key = getApiKey();
  const model = getPreferredModel();

  const formattedHistory = chatHistory
    .map(msg => `${msg.sender === "user" ? "Kullanıcı" : "Asistan"}: ${msg.text}`)
    .join("\n");

  const prompt = `Sen YargıAsistan isimli hukuk danışmanı yapay zekasın. Aşağıda detayları verilen dava dosyası hakkında kullanıcının sorularını yanıtla. Yanıtların Türk hukuk sistemine uygun, profesyonel, yapıcı ve gerekçeli olmalıdır.

  DAVA BİLGİLERİ:
  - Başlık: ${caseData.title}
  - Mahkeme: ${caseData.court}
  - Dosya/Esas No: ${caseData.caseNumber || 'Belirtilmedi'}
  - Müvekkil: ${caseData.client || 'Belirtilmedi'}
  - Dava Konusu: ${caseData.subject}
  - Olaylar: ${caseData.details}

  Önceki Konuşma Geçmişi:
  ${formattedHistory}

  Kullanıcı Sorusu:
  ${userMessage}

  Lütfen bu soruya profesyonel bir avukat bakış açısıyla, somut gerekçeler sunarak cevap ver.`;

  if (!key) {
    return getMockChatResponse(caseData, userMessage);
  }

  try {
    return await callGeminiAPI(key, model, prompt);
  } catch (error: any) {
    throw new Error(`Gemini API hatası: ${error.message}`);
  }
}

/**
 * 3. Draft a Legal Petition
 */
export async function generatePetition(
  caseData: CaseFile, 
  matchedDecisions: Decision[], 
  petitionType: string, 
  customNotes: string
): Promise<string> {
  const key = getApiKey();
  const model = getPreferredModel();

  const decisionsText = matchedDecisions && matchedDecisions.length > 0 
    ? matchedDecisions.map(dec => `- ${dec.daire} (${dec.esasNo} E., ${dec.kararNo} K. sayılı ve ${dec.kararTarihi} tarihli kararı):\nGerekçe: ${dec.justification}\nÖzet: ${dec.özet}`).join("\n\n")
    : "Eşleştirilmiş emsal karar bulunmuyor.";

  const prompt = `Sen uzman bir avukatsın. Aşağıdaki bilgilere ve emsal kararlara dayanarak, resmi Türk yargı formatına uygun mükemmel bir dilekçe hazırla.

  DAVA BİLGİLERİ:
  - Başlık: ${caseData.title}
  - Yetkili Mahkeme: ${caseData.court}
  - Esas/Dosya No: ${caseData.caseNumber || "Tevzi Aşamasında"}
  - Müvekkil Adı/Taraf: ${caseData.client || "[Davacı Adı]"}
  - Dava Konusu: ${caseData.subject}
  - Olay Detayları: ${caseData.details}

  HAZIRLANACAK DİLEKÇE TÜRÜ: ${petitionType} (Örn: Dava Dilekçesi, Cevap Dilekçesi, Beyan Dilekçesi)
  DİLEKÇE İÇİN ÖZEL NOTLAR/İSTEKLER: ${customNotes || "Belirtilmemiş."}

  KULLANILACAK EMSAL KARARLAR:
  ${decisionsText}

  DİLEKÇE ŞABLONU:
  1. Başlık: T.C. [MAHKEME ADI] HAKİMLİĞİ'NE / BAŞKANLIĞI'NA
  2. Dosya No: (Eğer varsa Esas No)
  3. Taraflar: Davacı (Ad-Soyad, TC, Adres), Davalı (Ad-Soyad/Unvan, Adres), Vekilleri (Varsa)
  4. Konu: Dilekçenin konusu (Özet)
  5. Açıklamalar: Maddeler halinde olayların açıklaması, hukuki iddialar ve yukarıdaki EMSAL KARARLARA açık atıflar (karar numaraları belirtilerek olaya uygulanması).
  6. Hukuki Nedenler: İlgili Kanun maddeleri (HMK, TBK vb.)
  7. Hukuki Deliller: Sunulan veya celbi talep edilen deliller.
  8. Netice-i Talep: Somut taleplerimizin yer aldığı sonuç kısmı.
  9. Ekler: (Varsa)
  10. Davacı Vekili / İmza imzası bloğu.

  Dilekçeyi tamamen hazır bir taslak olarak ver, yer tutucu olarak kullanılacak kısımları köşeli parantez [ ] içinde belirt. Profesyonel, resmi, ikna edici ve ağırbaşlı bir hukuki üslup kullan.`;

  if (!key) {
    return getMockPetition(caseData, matchedDecisions, petitionType, customNotes);
  }

  try {
    return await callGeminiAPI(key, model, prompt);
  } catch (error: any) {
    throw new Error(`Gemini API hatası: ${error.message}`);
  }
}

/**
 * ----------------------------------------------------
 * MOCK FALLBACKS
 * ----------------------------------------------------
 */

function getMockAnalysis(caseData: CaseFile): string {
  const isValueLoss = caseData.subject.toLowerCase().includes("değer") || caseData.details.toLowerCase().includes("hasar") || caseData.details.toLowerCase().includes("kaza");
  const isLabor = caseData.subject.toLowerCase().includes("işçi") || caseData.details.toLowerCase().includes("kıdem") || caseData.details.toLowerCase().includes("mesai");

  if (isValueLoss) {
    return `### YargıAsistan Dava Analiz Raporu (Demo Görünümü)
> ⚠️ **NOT:** Bu analiz yerel şablonla oluşturulmuştur. Gerçek zamanlı yapay zeka analizi için lütfen **Ayarlar** sayfasından **Gemini API Anahtarınızı** girin.

#### 1. Olay Özeti (Maddi Vakıalar)
Davacıya ait araç ile karşı tarafın aracının karıştığı trafik kazasında davacı aracında hasar meydana gelmiş, onarım sonrasında araçta değer kaybı oluşmuştur. Davacı, bu değer kaybının tazminini talep etmektedir. Davalı sigorta şirketi sorumluluktan kurtulmaya veya limitleri gerekçe göstermeye çalışmaktadır.

#### 2. Hukuki Sorunlar ve İlgili Kanun Maddeleri
- **Uyuşmazlık:** Trafik kazası kaynaklı araç değer kaybının kapsamı ve tazmin yükümlülüğü.
- **Kanun Maddeleri:** 2918 Sayılı Karayolları Trafik Kanunu (KTK) Md. 85, 90, 91 ve 97; 6098 Sayılı Türk Borçlar Kanunu (TBK) Md. 49 (Haksız fiil sorumluluğu).

#### 3. Güçlü Yönlerimiz
- KTK Md. 91 gereğince sigortacının araçta oluşan değer kaybı dahil tüm maddi zararları poliçe limiti dahilinde tazmin etmek zorunda olması.
- Yargıtay'ın değer kaybı hesaplamasında emsal/piyasa fiyat araştırmasını şart koşan yerleşik içtihatları.

#### 4. Zayıf Yönlerimiz ve Riskler
- Aracın kaza öncesinde başka bir kazadan ötürü hasarlı veya pert olması durumu.
- Ekspertiz raporundaki değer kaybı hesabı ile mahkemenin bilirkişisinin hesabı arasındaki farklar.

#### 5. Hukuki Strateji ve Öneriler
- **Emsal Karar İlişkisi:** Adana BAM 3. HD'nin 2026/1018 E. - 2026/1642 K. sayılı kararını dilekçede kullanın. Bu karar sigorta şirketine başvuru usulünü ve değer kaybının belirsiz alacak davası olarak açılabileceğini netleştirmektedir.`;
  } else if (isLabor) {
    return `### YargıAsistan Dava Analiz Raporu (Demo Görünümü)
> ⚠️ **NOT:** Bu analiz yerel şablonla oluşturulmuştur. Gerçek zamanlı yapay zeka analizi için lütfen **Ayarlar** sayfasından **Gemini API Anahtarınızı** girin.

#### 1. Olay Özeti (Maddi Vakıalar)
İş sözleşmesi haklı veya haksız olarak feshedilen işçi, çalışmış olduğu dönemdeki hak edişlerini (kıdem tazminatı, ihbar tazminatı, fazla mesai, hafta tatili vb.) talep etmektedir. Davalı işveren ise fazla mesailerin ödendiğini veya yapılmadığını, feshin haklı olduğunu savunmaktadır.

#### 2. Hukuki Sorunlar ve İlgili Kanun Maddeleri
- **Uyuşmazlık:** İş akdinin feshinin niteliği (haklı/haksız fesih) ve fazla mesai alacaklarının ispatı.
- **Kanun Maddeleri:** 4857 Sayılı İş Kanunu Md. 17, 24, 25, 32, 41.

#### 3. Güçlü Yönlerimiz
- İş hukukunda "işçinin korunması" ve "işçi lehine yorum" ilkeleri.
- Fazla mesai alacaklarında imzasız bordrolar söz konusu ise tanık beyanlarıyla iddianın ispatlanabilmesi.

#### 4. Zayıf Yönlerimiz ve Riskler
- İşçinin imzaladığı ve ihtirazi kayıt koymadığı bordroların bulunması.
- Fazla mesai hesaplamalarında yapılacak hakkaniyet indirimi (%30 oranında indirim riski).

#### 5. Hukuki Strateji ve Öneriler
- **Emsal Karar İlişkisi:** Yargıtay 9. HD'nin 2025/3412 E. - 2025/8920 K. sayılı kararını ekleyin. Bu karar imzasız bordro varlığında tanık beyanlarına göre fazla mesai hesabı yapılmasını onaylarken, takdiri hakkaniyet indiriminin mutlaka yapılması gerektiğini hatırlatır.`;
  } else {
    return `### YargıAsistan Dava Analiz Raporu (Demo Görünümü)
> ⚠️ **NOT:** Bu analiz yerel şablonla oluşturulmuştur. Gerçek zamanlı yapay zeka analizi için lütfen **Ayarlar** sayfasından **Gemini API Anahtarınızı** girin.

#### 1. Olay Özeti (Maddi Vakıalar)
Söz konusu hukuki olayda müvekkil ${caseData.client || "taraf"}, "${caseData.subject || "genel uyuşmazlık"}" hakkında hukuki bir süreç yürütmektedir.

#### 2. Hukuki Sorunlar ve İlgili Kanun Maddeleri
- Konunun niteliğine göre Türk Borçlar Kanunu veya Türk Ticaret Kanunu hükümleri uygulama alanı bulacaktır.

#### 3. Güçlü Yönlerimiz
- İddiaların somut vakıalara dayanması ve yasal mevzuat hükümlerinin lehimize olması.

#### 4. Zayıf Yönlerimiz ve Riskler
- İspat yükünün müvekkil üzerinde olduğu durumlarda yazılı delil eksikliği.

#### 5. Hukuki Strateji ve Öneriler
- Konuya uygun Yargıtay/BAM emsal kararlarını "Karar Arama" bölümünden bularak dava dosyasıyla eşleştirin.`;
  }
}

function getMockChatResponse(caseData: CaseFile, userMessage: string): string {
  return `### YargıAsistan Hukuki Danışman (Demo)
> ⚠️ **Not:** Gemini API anahtarınız girilmediği için bu yanıt yerel akıllı modül tarafından üretilmiştir.

Davanız ("${caseData.title}") ve sorduğunuz soru ("*${userMessage}*") incelendi:

1. **Hukuki Durum:** Konuyla ilgili Türk Hukukunda geçerli kanun hükümleri çerçevesinde hareket edilmesi gerekmektedir. Eğer dava bir araç değer kaybı davası ise, Karayolları Trafik Kanunu hükümleri gereğince zararınızı sigorta şirketinden tahsil etme hakkınız saklıdır.
2. **Emsal Karar Önerisi:** Davanızdaki iddiaları desteklemek amacıyla arşivimizde kayıtlı olan **Adana BAM 3. H.D. 2026/1018 E.** veya **Yargıtay 9. H.D. 2025/3412 E.** sayılı kararları inceleyerek dava dilekçenize eklemenizi tavsiye ederiz.
3. **Gerçek AI Deneyimi:** Bu dava dosyasına özel derinlemesine hukuki yorumlar, dilekçe paragrafları ve stratejik soru-cevaplar üretmek için lütfen **Ayarlar** sayfasından bir **Gemini API Anahtarı** tanımlayın.`;
}

function getMockPetition(
  caseData: CaseFile, 
  matchedDecisions: Decision[], 
  petitionType: string, 
  customNotes: string
): string {
  const decisionsSection = matchedDecisions && matchedDecisions.length > 0
    ? matchedDecisions.map(dec => `\n- **${dec.daire} ${dec.esasNo} E. ${dec.kararNo} K. Sayılı İlamı:** \n  *"${dec.özet}"* \n  (Söz konusu karar gereğince iddialarımızın haklılığı ispatlanmıştır.)`).join("\n")
    : "\n- [OLAYLA İLGİLİ DİĞER YARGITAY EMSAL KARARLARI BURAYA EKLENECEKTİR]";

  return `T.C.
[YETKİLİ MAHKEME ADINI YAZINIZ] MAHKEMESİ HAKİMLİĞİ'NE
${caseData.court ? `(${caseData.court})` : ""}

DOSYA NO: ${caseData.caseNumber || "[DOSYA ESAS NO YAZINIZ]"}

DAVACI / TALEP EDEN: ${caseData.client || "[MÜVEKKİL ADI SOYADI, TC NO VE ADRES]"}

VEKİLİ: Av. [ADINIZ SOYADINIZ, ADRES]

DAVALI: [KARŞI TARAF ADI SOYADI/UNVANI VE ADRES]

KONU: ${petitionType} (${caseData.subject || "Genel Hak Talebi"})

AÇIKLAMALAR:

1- Müvekkil, davalı taraf ile yaşanan uyuşmazlık kapsamında mağdur edilmiş olup, hak kaybına uğramıştır. Şöyle ki; ${caseData.details || "[Olayların gelişimini detaylıca buraya yazınız]"}

2- Uyuşmazlığa konu olayda davalı taraf tam kusurlu olup, müvekkilin zararını gidermekle mükelleftir. Bu hususta sunmuş olduğumuz deliller iddialarımızı açıkça doğrulamaktadır.

3- Ayrıca konuya ilişkin yerleşik Yargıtay ve Bölge Adliye Mahkemesi kararları da iddialarimizi destekler niteliktedir. Şöyle ki;
${decisionsSection}

4- Yukarıda arz edilen gerekçeler doğrultusunda, müvekkilin zararının davalıdan tazmini amacıyla işbu dilekçeyi yazma zarureti hasıl olmuştur.
${customNotes ? `\n[Ekstra Notlara İstinaden]: ${customNotes}\n` : ""}

HUKUKİ NEDENLER: 6098 Sayılı TBK, 6100 Sayılı HMK, 2918 Sayılı KTK ve ilgili diğer yasal mevzuat.

HUKUKİ DELİLLER: Kaza tespit tutanağı, faturalar, bilirkişi incelemesi, tanık beyanları, emsal mahkeme kararları ve her türlü yasal delil.

NETİCE-İ TALEP:
Yukarıda arz ve izah edilen nedenlerle;
1- Davamızın ve taleplerimizin KABULÜNE,
2- Yargılama giderleri ile vekalet ücretinin davalı taraf üzerinde bırakılmasına karar verilmesini müvekkil adına saygıyla talep ederiz.

Davacı Vekili
Av. [ADINIZ SOYADINIZ]
[İmza]`;
}
