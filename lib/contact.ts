import { track } from "@vercel/analytics";
import { siteContent } from "@/data/siteContent";

/** tel: bağlantısı için boşluksuz numara, örn. "tel:05304322025". */
export const PHONE_HREF = `tel:${siteContent.contact.phone.replace(/\s/g, "")}`;

/** Uluslararası biçimde WhatsApp numarası (başındaki 0 atılır, 90 eklenir). */
const WHATSAPP_NUMBER = `90${siteContent.contact.phone.replace(/\s+|^0/g, "")}`;

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

/**
 * Vercel Web Analytics özel olayı. Araç çerez kullanmadığı için onay
 * gerektirmez; özel olaylar desteklenmeyen planlarda sessizce yok sayılır.
 */
export function trackEvent(action: string, label: string, category = "Contact") {
    if (typeof window === "undefined") return;
    track(action, { category, label });
}
