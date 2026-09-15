"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    /** Görünür olduktan sonra animasyonun başlaması için gecikme (ms) */
    delay?: number;
    className?: string;
    /** Sarmalayıcı etiket; varsayılan div */
    as?: "div" | "section" | "li";
}

/**
 * Bölüm içeriğini, görünüm alanına girdiğinde yumuşakça belirtir.
 * IntersectionObserver desteklenmiyorsa veya kullanıcı hareketi azaltmayı
 * tercih ediyorsa içerik doğrudan görünür kalır.
 */
export default function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReducedMotion =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const Tag = as as any;

    return (
        <Tag
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
        >
            {children}
        </Tag>
    );
}
