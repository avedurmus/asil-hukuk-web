"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sun, Sunset } from "lucide-react";
import type { DaySlots, SlotOption } from "@/lib/booking/types";

const WEEKDAY_SHORT: Record<string, string> = {
    Pazartesi: "Pzt",
    Salı: "Sal",
    Çarşamba: "Çar",
    Perşembe: "Per",
    Cuma: "Cum",
    Cumartesi: "Cmt",
    Pazar: "Paz",
};

interface SlotPickerProps {
    days: DaySlots[];
    selectedId: string | null;
    onSelect: (slot: SlotOption) => void;
}

/** Gün şeridi ve seçilen günün boş saatleri. Randevu sayfası ve erteleme akışı ortak kullanır. */
export default function SlotPicker({ days, selectedId, onSelect }: SlotPickerProps) {
    const selectedDay = useMemo(() => days.find((d) => d.slots.some((s) => s.id === selectedId))?.date, [days, selectedId]);
    const [activeDate, setActiveDate] = useState<string | null>(selectedDay ?? days[0]?.date ?? null);
    const stripRef = useRef<HTMLDivElement>(null);

    // Saatler yenilendiğinde seçili gün listeden düşmüşse ilk güne dön.
    useEffect(() => {
        if (!days.some((d) => d.date === activeDate)) setActiveDate(selectedDay ?? days[0]?.date ?? null);
    }, [days, activeDate, selectedDay]);

    const day = days.find((d) => d.date === activeDate) ?? days[0];
    if (!day) return null;

    const morning = day.slots.filter((s) => Number(s.time.slice(0, 2)) < 13);
    const afternoon = day.slots.filter((s) => Number(s.time.slice(0, 2)) >= 13);
    const scroll = (direction: 1 | -1) => stripRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });

    return (
        <div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => scroll(-1)}
                    aria-label="Önceki günler"
                    className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-gold-500 hover:text-primary-900 dark:border-slate-700 dark:text-slate-300 sm:flex"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div
                    ref={stripRef}
                    role="tablist"
                    aria-label="Randevu günü"
                    className="flex min-w-0 flex-grow snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
                >
                    {days.map((d) => {
                        const [number, month] = d.dayLabel.split(" ");
                        const active = d.date === day.date;
                        return (
                            <button
                                key={d.date}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                aria-label={`${d.dayLabel} ${d.weekday}, ${d.slots.length} boş saat`}
                                onClick={() => setActiveDate(d.date)}
                                className={`flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border px-2 py-3 transition-all duration-200 ${
                                    active
                                        ? "border-primary-900 bg-primary-900 text-white shadow-card-hover dark:border-gold-500 dark:bg-gold-500 dark:text-slate-950"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-gold-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                                }`}
                            >
                                <span className={`text-[11px] font-semibold uppercase tracking-wider ${active ? "opacity-80" : "text-slate-500 dark:text-slate-400"}`}>
                                    {WEEKDAY_SHORT[d.weekday] ?? d.weekday.slice(0, 3)}
                                </span>
                                <span className="mt-0.5 font-serif text-2xl leading-none">{number}</span>
                                <span className={`mt-1 text-[11px] ${active ? "opacity-80" : "text-slate-500 dark:text-slate-400"}`}>{month}</span>
                            </button>
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={() => scroll(1)}
                    aria-label="Sonraki günler"
                    className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-gold-500 hover:text-primary-900 dark:border-slate-700 dark:text-slate-300 sm:flex"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <p className="mt-5 font-serif text-xl text-slate-900 dark:text-slate-100">
                {day.dayLabel} {day.weekday}
            </p>

            <div className="mt-4 space-y-5">
                {[
                    { title: "Sabah", icon: Sun, slots: morning },
                    { title: "Öğleden sonra", icon: Sunset, slots: afternoon },
                ]
                    .filter((group) => group.slots.length > 0)
                    .map((group) => (
                        <div key={group.title}>
                            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                <group.icon className="h-4 w-4 text-gold-600" /> {group.title}
                            </p>
                            <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {group.slots.map((slot) => {
                                    const selected = slot.id === selectedId;
                                    return (
                                        <button
                                            key={slot.id}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => onSelect(slot)}
                                            className={`rounded-xl border py-3 text-sm font-semibold transition-all duration-200 ${
                                                selected
                                                    ? "border-gold-500 bg-gold-500 text-slate-950 shadow-gold-glow"
                                                    : "border-slate-200 bg-ivory-50 text-slate-800 hover:-translate-y-0.5 hover:border-gold-500 hover:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                                            }`}
                                        >
                                            {slot.time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
