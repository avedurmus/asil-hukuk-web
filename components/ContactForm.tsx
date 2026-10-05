"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Loader2 } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { trackEvent } from "@/lib/contact";
import { PRIVACY_NOTICE_PATH } from "@/lib/legal";

// Formspree Form ID
const FORMSPREE_ID = "mblnkeke";

const OTHER_TOPIC = "Diğer / Emin değilim";
const topics = [...siteContent.services.map((s) => s.title), OTHER_TOPIC];
const contactMethods = ["Telefon", "WhatsApp", "E-posta"] as const;

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-ivory-50 px-4 py-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-900";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function ContactForm() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [topic, setTopic] = useState("");
    const [method, setMethod] = useState<(typeof contactMethods)[number]>("Telefon");

    useEffect(() => {
        const konu = searchParams.get("konu");
        if (!konu) return;
        const match = topics.find((t) => t.toLocaleLowerCase("tr-TR") === konu.toLocaleLowerCase("tr-TR"));
        setTopic(match ?? OTHER_TOPIC);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Formspree uses _subject for subject line
        formData.append("_subject", topic ? `${topic} Hakkında Danışmanlık Talebi` : "Yeni İletişim Formu Mesajı");

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                setMessage("Talebiniz bize ulaştı. Mesai saatleri içinde en kısa sürede sizinle iletişime geçeceğiz.");

                trackEvent("generate_lead", "Contact Form Submission Success");

                form.reset();
                setTopic("");
            } else {
                const result = await response.json().catch(() => ({}));
                setStatus("error");
                // Formspree error handling
                if (result.errors) {
                    setMessage(result.errors.map((err: { message: string }) => err.message).join(", "));
                } else {
                    setMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                }
            }
        } catch (error) {
            setStatus("error");
            setMessage("Bir bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol ediniz.");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-slate-900 dark:text-slate-100">Teşekkür ederiz</h3>
                <p className="mt-3 max-w-sm text-slate-600 dark:text-slate-400">{message}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/blog"
                        className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-gold-500 dark:border-slate-700 dark:text-slate-200"
                    >
                        Bu arada blogumuza göz atın
                    </Link>
                    <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-primary-800 underline underline-offset-4 dark:text-gold-400"
                    >
                        Yeni mesaj gönder
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hidden input for bot protection (Honeypot) - Formspree expects _gotcha */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" style={{ display: "none" }} />
            <input type="hidden" name="preferred_contact" value={method} />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="cf-name" className={labelClass}>
                        Adınız Soyadınız
                    </label>
                    <input id="cf-name" type="text" name="name" required autoComplete="name" className={inputClass} placeholder="Adınız Soyadınız" />
                </div>
                <div>
                    <label htmlFor="cf-phone" className={labelClass}>
                        Telefon Numaranız
                    </label>
                    <input
                        id="cf-phone"
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        className={inputClass}
                        placeholder="05XX XXX XX XX"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="cf-email" className={labelClass}>
                        E-posta <span className="font-normal text-slate-500 dark:text-slate-400">(isteğe bağlı)</span>
                    </label>
                    <input id="cf-email" type="email" name="email" autoComplete="email" className={inputClass} placeholder="ornek@email.com" />
                </div>
                <div>
                    <label htmlFor="cf-topic" className={labelClass}>
                        Konu
                    </label>
                    <select
                        id="cf-topic"
                        name="topic"
                        required
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a67c3e' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    >
                        <option value="" disabled>
                            Seçiniz
                        </option>
                        {topics.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="cf-message" className={labelClass}>
                    Kısaca durumunuz
                </label>
                <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={5}
                    className={inputClass}
                    placeholder="Yaşadığınız hukuki sorunu birkaç cümleyle anlatabilirsiniz..."
                    aria-describedby="cf-message-hint"
                ></textarea>
                <p id="cf-message-hint" className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    Lütfen sağlık bilgisi, sabıka kaydı veya T.C. kimlik numarası gibi hassas bilgileri burada
                    paylaşmayın; bunları görüşmede konuşabiliriz.
                </p>
            </div>

            <fieldset>
                <legend className={labelClass}>Size nasıl ulaşalım?</legend>
                <div className="flex flex-wrap gap-2">
                    {contactMethods.map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMethod(m)}
                            aria-pressed={method === m}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                                method === m
                                    ? "border-primary-900 bg-primary-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-slate-950"
                                    : "border-slate-200 text-slate-600 hover:border-gold-500 dark:border-slate-700 dark:text-slate-300"
                            }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </fieldset>

            <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <input
                    type="checkbox"
                    name="aydinlatma_metni"
                    value="Okundu"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-primary-900"
                />
                <span>
                    Kişisel verilerimin talebime dönüş yapılması amacıyla işlenmesine ilişkin{" "}
                    <Link
                        href={PRIVACY_NOTICE_PATH}
                        target="_blank"
                        className="font-medium text-primary-800 underline underline-offset-2 dark:text-gold-400"
                    >
                        KVKK Aydınlatma Metni
                    </Link>
                    &apos;ni okudum.
                </span>
            </label>

            {status === "error" && (
                <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/30 dark:bg-red-950/30 dark:text-red-400">
                    {message}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                onClick={() => trackEvent("click_form_submit", "Contact Form - Submit")}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary-900 py-4 font-semibold text-white shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Gönderiliyor...
                    </>
                ) : (
                    <>
                        Randevu Talebini Gönder
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                Bilgileriniz gizli tutulur ve yalnızca talebinize dönüş için kullanılır.
            </p>
        </form>
    );
}
