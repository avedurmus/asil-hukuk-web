"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, CalendarCheck, CalendarPlus, MessageCircle, Phone, RotateCcw, Scale, ShieldCheck, X } from "lucide-react";
import { appointmentSettings } from "@/data/appointmentSettings";
import { CHAT_OPEN_EVENT, PHONE_HREF, trackEvent, whatsappHref } from "@/lib/contact";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    /** Bu yanıtta oluşturulan randevu; kartı ilgili mesajın altında gösterilir. */
    booking?: Booking;
}

interface Booking {
    reference: string;
    status: "confirmed" | "requested";
    slotLabel: string;
    slotId: string;
    meetingTypeLabel: string;
    name: string;
    practiceArea: string;
}

const STORAGE_KEY = "asil-chat-v1";

const GREETING =
    "Merhaba, Asil Hukuk Bürosu'na hoş geldiniz. Ben Asil Asistan. Hukuki sorununuzu kısaca anlatırsanız sizi doğru alana yönlendirebilir, Av. Emre Durmuş ile ön görüşme randevusu oluşturabilirim.";

const QUICK_REPLIES = [
    "Randevu almak istiyorum",
    "Boşanma süreci hakkında bilgi",
    "Kira / tahliye sorunum var",
    "İşten çıkarıldım",
    "Ücretlendirme nasıl?",
];

function readStored(): ChatMessage[] | null {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function writeStored(value: ChatMessage[]) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
        /* gizli sekme vb. — sohbet yine çalışır */
    }
}

/** **kalın**, http(s) bağlantıları ve site içi yolları (örn. /sss) işler. */
function renderInline(text: string, onNavigate: () => void) {
    // Site içi yol yalnızca satır başında veya boşluk/parantezden sonra eşleşir ("3/4" gibi ifadeler bağlantı olmaz).
    const pattern = /(\*\*[^*\n]+\*\*|https?:\/\/[^\s)]+|(?:^|[\s(])\/[a-z0-9-]+(?:\/[a-z0-9-]+)*(?:#[a-z0-9-]+)?)/gi;
    const parts: React.ReactNode[] = [];
    let last = 0;
    for (const match of Array.from(text.matchAll(pattern))) {
        let token = match[0];
        let index = match.index ?? 0;
        if (/^[\s(]/.test(token)) {
            index += 1;
            token = token.slice(1);
        }
        if (index > last) parts.push(text.slice(last, index));
        if (token.startsWith("**")) {
            parts.push(<strong key={index} className="font-semibold">{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("/")) {
            parts.push(
                <Link key={index} href={token} onClick={onNavigate} className="font-medium text-gold-700 underline underline-offset-2 dark:text-gold-400">
                    {token}
                </Link>,
            );
        } else {
            const url = token.replace(/[.,;:]+$/, "");
            parts.push(
                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-gold-700 underline underline-offset-2 dark:text-gold-400">
                    {url}
                </a>,
            );
            if (url.length < token.length) parts.push(token.slice(url.length));
        }
        last = index + token.length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
}

function MessageText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
    const lines = text.split("\n");
    return (
        <>
            {lines.map((line, i) => (
                <Fragment key={i}>
                    {renderInline(line, onNavigate)}
                    {i < lines.length - 1 && <br />}
                </Fragment>
            ))}
        </>
    );
}

/** Randevuyu takvime eklemek için .ics dosyası bağlantısı üretir. */
function icsHref(booking: Booking): string {
    const start = new Date(booking.slotId);
    const end = new Date(start.getTime() + appointmentSettings.durationMinutes * 60_000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Asil Hukuk//Sohbet Asistani//TR",
        "BEGIN:VEVENT",
        `UID:${booking.reference}@asilhukuk.net`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:Asil Hukuk – Ön görüşme (${booking.meetingTypeLabel})`,
        "LOCATION:Yalı Mah. Topselvi Cad. No:100 Mai Residence K:14 D:124 Kartal\\, İstanbul",
        `DESCRIPTION:Referans: ${booking.reference}. Değişiklik için: 0530 432 20 25`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function BookingCard({ booking }: { booking: Booking }) {
    const confirmed = booking.status === "confirmed";
    return (
        <div className="rounded-2xl border border-gold-500/50 bg-gradient-to-br from-gold-50 to-white p-4 shadow-card dark:from-gold-950/40 dark:to-slate-900">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-900 dark:text-gold-300">
                <CalendarCheck className="h-4 w-4 text-gold-600" />
                {confirmed ? "Randevunuz oluşturuldu" : "Randevu talebiniz alındı"}
            </div>
            <dl className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-slate-500">Tarih</dt>
                    <dd className="font-medium">{booking.slotLabel}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-slate-500">Görüşme</dt>
                    <dd>{booking.meetingTypeLabel}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-slate-500">Referans</dt>
                    <dd className="font-mono">{booking.reference}</dd>
                </div>
            </dl>
            {!confirmed && (
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    Büromuz mesai saatleri içinde sizi arayarak saati teyit edecektir.
                </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
                <a
                    href={icsHref(booking)}
                    download={`asil-hukuk-randevu-${booking.reference}.ics`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                >
                    <CalendarPlus className="h-3.5 w-3.5" /> Takvime ekle
                </a>
                <a
                    href={whatsappHref(`Merhaba, ${booking.slotLabel} için ${booking.reference} referanslı randevum hakkında yazıyorum.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-gold-500 dark:border-slate-700 dark:text-slate-200"
                >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp ile yazın
                </a>
            </div>
        </div>
    );
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [pending, setPending] = useState(false);
    const [unavailable, setUnavailable] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesRef = useRef<ChatMessage[]>([]);
    messagesRef.current = messages;

    useEffect(() => {
        const stored = readStored();
        if (stored) setMessages(stored);
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) writeStored(messages);
    }, [messages, hydrated]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, pending, open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        // Mobilde tam ekran açıldığında arka sayfanın kaymasını engelle.
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        if (mobile) document.body.style.overflow = "hidden";
        if (!mobile) inputRef.current?.focus();
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    const send = useCallback(
        async (text: string) => {
            const content = text.trim();
            if (!content || pending) return;
            const next: ChatMessage[] = [...messagesRef.current, { role: "user", content }];
            setMessages(next);
            setInput("");
            setPending(true);
            if (next.filter((m) => m.role === "user").length === 1) trackEvent("chat_first_message", "Chat Assistant", "Chat");

            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
                });
                const data = (await res.json().catch(() => ({}))) as { reply?: string; booking?: Booking | null; error?: string };
                if (data.error === "unavailable") setUnavailable(true);
                const reply =
                    data.reply ||
                    "Bağlantıda bir sorun oluştu. Lütfen tekrar deneyin ya da 0530 432 20 25 numarasından bize ulaşın.";
                setMessages((prev) => [...prev, { role: "assistant", content: reply, booking: data.booking ?? undefined }]);
                if (data.booking) {
                    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
                    gtag?.("event", "generate_lead", {
                        event_category: "Chat",
                        event_label: data.booking.status === "confirmed" ? "Chat Booking Confirmed" : "Chat Booking Requested",
                        value: 1.0,
                        currency: "TRY",
                    });
                }
            } catch {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "İnternet bağlantınızda bir sorun var gibi görünüyor. Lütfen tekrar deneyin." },
                ]);
            } finally {
                setPending(false);
            }
        },
        [pending],
    );

    // Sitenin başka yerlerindeki "asistanla konuş" düğmeleri bu olayla sohbeti açar.
    useEffect(() => {
        const onOpen = (e: Event) => {
            setOpen(true);
            trackEvent("chat_open", "Chat Assistant - CTA", "Chat");
            const message = (e as CustomEvent<{ message?: string }>).detail?.message;
            if (message) void send(message);
        };
        window.addEventListener(CHAT_OPEN_EVENT, onOpen);
        return () => window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
    }, [send]);

    const reset = () => {
        setMessages([]);
        setInput("");
    };

    const showQuickReplies = messages.length === 0 && !pending;

    return (
        <>
            {/* Açma düğmesi */}
            <button
                type="button"
                onClick={() => {
                    setOpen((v) => !v);
                    if (!open) trackEvent("chat_open", "Chat Assistant - Launcher", "Chat");
                }}
                aria-label={open ? "Sohbeti kapat" : "Asil Asistan ile sohbet edin"}
                aria-expanded={open}
                className={`group fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-3 rounded-full bg-primary-900 p-1.5 text-white shadow-elegant ring-1 ring-gold-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-800 md:bottom-6 md:right-6 md:pr-5 dark:bg-slate-800 ${
                    open ? "max-md:hidden" : ""
                }`}
            >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950">
                    {open ? <X className="h-5 w-5" /> : <Scale className="h-5 w-5" strokeWidth={1.75} />}
                    {!open && (
                        <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-primary-900 bg-emerald-400 dark:border-slate-800" />
                    )}
                </span>
                <span className="hidden text-left text-sm font-semibold leading-tight md:block">
                    {open ? "Sohbeti kapat" : "Asil Asistan"}
                    {!open && <span className="block text-[11px] font-normal text-gold-200/90">Soru sorun · Randevu alın</span>}
                </span>
            </button>

            {/* Sohbet penceresi */}
            {open && (
                <section
                    role="dialog"
                    aria-label="Asil Asistan sohbet penceresi"
                    className="fixed inset-0 z-[60] flex animate-fade-up flex-col overflow-hidden bg-ivory-50 dark:bg-slate-950 md:inset-auto md:bottom-28 md:right-6 md:h-[min(660px,calc(100vh-9rem))] md:w-[400px] md:rounded-3xl md:border md:border-slate-200/80 md:shadow-elegant md:dark:border-slate-800"
                >
                    {/* Başlık */}
                    <header className="relative isolate flex items-center gap-3 overflow-hidden bg-primary-950 px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] text-white md:pt-4">
                        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_120%_at_100%_0%,rgb(192_150_82/0.25),transparent_60%)]" />
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950">
                            <Scale className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0 flex-grow">
                            <p className="font-serif text-lg leading-tight">Asil Asistan</p>
                            <p className="flex items-center gap-1.5 truncate text-xs text-slate-300">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" /> Ön görüşme ve randevu
                            </p>
                        </div>
                        {messages.length > 0 && (
                            <button
                                type="button"
                                onClick={reset}
                                aria-label="Yeni sohbet başlat"
                                title="Yeni sohbet"
                                className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Sohbeti kapat"
                            className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </header>

                    {/* Mesajlar */}
                    <div ref={scrollRef} className="flex-grow space-y-3 overflow-y-auto px-4 py-5" aria-live="polite">
                        <p className="flex items-start gap-2 rounded-xl bg-slate-100 px-3 py-2 text-[11px] leading-relaxed text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                            Yapay zekâ destekli bir asistandır; genel bilgi verir, hukuki danışmanlık yerine geçmez. Lütfen T.C. kimlik
                            numarası gibi hassas bilgilerinizi paylaşmayın.
                        </p>

                        <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-card dark:bg-slate-900 dark:text-slate-200">
                            {GREETING}
                        </div>

                        {messages.map((m, i) => (
                            <Fragment key={i}>
                                <div
                                    className={
                                        m.role === "user"
                                            ? "ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-md bg-primary-900 px-4 py-3 text-sm leading-relaxed text-white dark:bg-gold-500 dark:text-slate-950"
                                            : "max-w-[88%] break-words rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-card dark:bg-slate-900 dark:text-slate-200"
                                    }
                                >
                                    {m.role === "assistant" ? <MessageText text={m.content} onNavigate={() => setOpen(false)} /> : m.content}
                                </div>
                                {m.booking && <BookingCard booking={m.booking} />}
                            </Fragment>
                        ))}

                        {pending && (
                            <div className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-tl-md bg-white px-4 py-4 shadow-card dark:bg-slate-900" aria-label="Asistan yazıyor">
                                {[0, 150, 300].map((delay) => (
                                    <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-500" style={{ animationDelay: `${delay}ms` }} />
                                ))}
                            </div>
                        )}

                        {showQuickReplies && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {QUICK_REPLIES.map((q) => (
                                    <button
                                        key={q}
                                        type="button"
                                        onClick={() => void send(q)}
                                        className="rounded-full border border-gold-500/50 bg-white px-3.5 py-1.5 text-xs font-medium text-primary-900 transition-colors hover:border-gold-500 hover:bg-gold-50 dark:bg-slate-900 dark:text-gold-300 dark:hover:bg-slate-800"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {unavailable && (
                            <div className="flex gap-2">
                                <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 rounded-full bg-primary-900 px-3.5 py-2 text-xs font-semibold text-white">
                                    <Phone className="h-3.5 w-3.5" /> Hemen arayın
                                </a>
                                <a
                                    href={whatsappHref()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1f9d55] px-3.5 py-2 text-xs font-semibold text-white"
                                >
                                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Mesaj yazma alanı */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            void send(input);
                        }}
                        className="border-t border-slate-200/80 bg-white px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 dark:border-slate-800 dark:bg-slate-900 md:pb-3"
                    >
                        <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-ivory-50 p-1.5 pl-3 transition-colors focus-within:border-gold-500 dark:border-slate-700 dark:bg-slate-950">
                            <label htmlFor="chat-input" className="sr-only">
                                Mesajınız
                            </label>
                            <textarea
                                id="chat-input"
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                                        e.preventDefault();
                                        void send(input);
                                    }
                                }}
                                rows={1}
                                maxLength={2000}
                                placeholder="Sorunuzu yazın…"
                                className="max-h-32 min-h-[2.25rem] flex-grow resize-none bg-transparent py-2 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 md:text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || pending}
                                aria-label="Gönder"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-900 text-white transition-all hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gold-500 dark:text-slate-950"
                            >
                                <ArrowUp className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="mt-2 text-center text-[10px] text-slate-400">
                            Acil durumlarda: <a href={PHONE_HREF} className="font-semibold text-slate-500 underline dark:text-slate-300">0530 432 20 25</a>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
}
