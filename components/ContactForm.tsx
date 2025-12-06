"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");

    // Formspree Form ID
    const FORMSPREE_ID = "mblnkeke";

    useEffect(() => {
        const konu = searchParams.get("konu");
        if (konu) {
            setSubject(`${konu} Hakkında Danışmanlık Talebi`);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Custom config for Formspree
        const finalData = {
            ...data,
            _subject: subject || "Yeni İletişim Formu Mesajı",
        };

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                body: JSON.stringify(finalData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("success");
                setMessage("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
                form.reset();
            } else {
                const result = await response.json();
                setStatus("error");
                // Formspree error handling
                if (result.errors) {
                    setMessage(result.errors.map((err: any) => err.message).join(", "));
                } else {
                    setMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                }
            }
        } catch (error) {
            setStatus("error");
            setMessage("Bir bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol ediniz.");
        }
    };

    return (
        <>
            <h2 className="text-2xl font-serif font-bold mb-6">Bize Yazın</h2>

            {status === "success" ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                    <p className="text-lg font-medium mb-2">Teşekkürler!</p>
                    <p>{message}</p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-4 text-green-700 underline text-sm hover:text-green-800"
                    >
                        Yeni mesaj gönder
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden input for bot protection (Honeypot) */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Adınız</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Adınız"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Soyadınız</label>
                            <input
                                type="text"
                                name="surname"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Soyadınız"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta Adresiniz</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="ornek@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Telefon Numaranız</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="05XX XXX XX XX"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mesajınız</label>
                        <textarea
                            name="message"
                            required
                            rows={5}
                            defaultValue={subject ? `${subject} konusunda bilgi almak istiyorum.` : ""}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="Konu hakkında detaylı bilgi..."
                        ></textarea>
                    </div>

                    {status === "error" && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === "submitting" ? "Gönderiliyor..." : "Mesajı Gönder"}
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                        Bu form üzerinden gönderilen bilgiler KVKK kapsamında korunmaktadır.
                    </p>
                </form>
            )}
        </>
    );
}
