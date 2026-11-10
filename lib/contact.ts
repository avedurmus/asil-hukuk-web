import { siteContent } from "@/data/siteContent";

/** tel: bağlantısı için boşluksuz numara, örn. "tel:05304322025". */
export const PHONE_HREF = `tel:${siteContent.contact.phone.replace(/\s/g, "")}`;

/**
 * Sitedeki WhatsApp düğmelerinin açacağı numara, uluslararası biçimde
 * (örn. 905304322025). NEXT_PUBLIC_WHATSAPP_NUMBER tanımlıysa (ör. WhatsApp
 * asistanının çalıştığı büro sabit hattı) o kullanılır; yoksa büro cep telefonu.
 */
const WHATSAPP_NUMBER = toInternational(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteContent.contact.phone);

function toInternational(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    if (digits.startsWith("90")) return digits;
    return `90${digits.replace(/^0/, "")}`;
}

export function whatsappHref(text = "Merhaba, hukuki destek almak istiyorum.") {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const OFFICE_HOURS = "Hafta içi 09:00 – 18:00";

export const CHAT_OPEN_EVENT = "asil-chat:open";

/** Sohbet asistanını açar; isteğe bağlı mesaj, kullanıcı adına hemen gönderilir. */
export function openChatAssistant(message?: string) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail: { message } }));
}

/** Google Analytics olayı; gtag yüklenmemişse sessizce yok sayılır. */
export function trackEvent(action: string, label: string, category = "Contact") {
    if (typeof window === "undefined") return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", action, { event_category: category, event_label: label });
}
