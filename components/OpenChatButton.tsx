"use client";

import { openChatAssistant, trackEvent } from "@/lib/contact";

/** Sunucu bileşenlerinden sohbet asistanını açmak için kullanılan düğme. */
export default function OpenChatButton({
    message,
    label,
    className,
    children,
}: {
    message?: string;
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={() => {
                trackEvent("click_chat_cta", label, "Chat");
                openChatAssistant(message);
            }}
            className={className}
        >
            {children}
        </button>
    );
}
