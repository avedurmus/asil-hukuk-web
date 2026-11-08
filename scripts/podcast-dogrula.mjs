#!/usr/bin/env node
/**
 * content/podcast/<YYYY-MM-DD>.json bölüm dosyalarını seslendirme ve yayın öncesi denetler.
 * Kullanım: npm run podcast:dogrula            (tüm bölümler)
 *           npm run podcast:dogrula -- <dosya>  (yalnızca verilen dosyalar)
 *
 * Kurallar docs/podcast.md ile uyumludur; hata varsa çıkış kodu 1'dir.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "content", "podcast");
const ARTICLE_DIR = path.join(ROOT, "content", "makaleler");
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "podcast.json"), "utf8"));

// Türkçe seslendirmede dakikada ~115–125 kelime: 5–8 dakika ≈ 650–1050 kelime.
const MIN_WORDS = 650;
const MAX_WORDS = 1050;
const DESC_MAX = 4000; // Spotify bölüm açıklaması sınırı
const FORBIDDEN_PHRASES = [
    /yarg[ıi] ?pro/i,
    /yarg[ıi] ?mcp/i,
    /en iyi avukat/i,
    /kesin(likle)? kazan/i,
    /garanti(li|siyle)? (kazan|sonuç)/i,
    /%\s?100 başarı/i,
    /(bizi|büromuzu|beni) (hemen )?ara(yın|yabilirsiniz)/i,
];

const EPISODE_FILE = /^\d{4}-\d{2}-\d{2}\.json$/;
const args = process.argv.slice(2);
const files = (
    args.length
        ? args.map((f) => path.resolve(f))
        : fs.existsSync(DIR)
          ? fs.readdirSync(DIR).filter((f) => EPISODE_FILE.test(f)).map((f) => path.join(DIR, f))
          : []
).sort();

function check(file) {
    const errors = [];
    const warnings = [];
    const name = path.basename(file);
    let ep;
    try {
        ep = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
        return { errors: [`JSON okunamadı: ${e.message}`], warnings };
    }

    for (const key of ["dateISO", "title", "description", "script"]) {
        if (typeof ep[key] !== "string" || !ep[key].trim()) errors.push(`"${key}" alanı eksik veya hatalı`);
    }
    if (!Array.isArray(ep.articles) || ep.articles.length === 0) errors.push(`"articles" en az bir makale kimliği içermeli`);
    if (errors.length) return { errors, warnings };

    if (!/^\d{4}-\d{2}-\d{2}$/.test(ep.dateISO)) errors.push(`dateISO YYYY-MM-DD olmalı: ${ep.dateISO}`);
    if (name !== `${ep.dateISO}.json`) errors.push(`dosya adı "${ep.dateISO}.json" olmalı`);

    // Günün bütün makaleleri bölümde anlatılmalı.
    const dayArticles = fs.existsSync(ARTICLE_DIR)
        ? fs
              .readdirSync(ARTICLE_DIR)
              .filter((f) => f.startsWith(`${ep.dateISO}-`) && f.endsWith(".json"))
              .map((f) => f.slice(ep.dateISO.length + 1, -5))
        : [];
    for (const id of ep.articles) {
        if (!dayArticles.includes(id)) errors.push(`makale bulunamadı: content/makaleler/${ep.dateISO}-${id}.json`);
    }
    for (const id of dayArticles) {
        if (!ep.articles.includes(id)) errors.push(`günün makalesi bölüme eklenmemiş: ${id}`);
    }

    if (ep.title.length < 10 || ep.title.length > 120) errors.push(`başlık 10–120 karakter olmalı (${ep.title.length})`);

    if (ep.description.length > DESC_MAX) errors.push(`açıklama en fazla ${DESC_MAX} karakter olmalı (${ep.description.length})`);
    if (/<[a-z/][^>]*>/i.test(ep.description)) errors.push("açıklama düz metin olmalı (HTML etiketi var)");
    for (const id of ep.articles) {
        if (!ep.description.includes(`https://asilhukuk.net/blog/${id}`)) errors.push(`açıklamada makale bağlantısı yok: https://asilhukuk.net/blog/${id}`);
    }
    if (CONFIG.aiDisclosure && !ep.description.includes(CONFIG.aiDisclosure)) errors.push("açıklamada data/podcast.json'daki yapay zekâ beyanı birebir yer almalı");

    // Konuşma metni: seslendirme motoru için düz, kısaltmasız, rakamsız metin.
    const script = ep.script;
    const words = script.split(/\s+/).filter(Boolean).length;
    if (words < MIN_WORDS || words > MAX_WORDS) errors.push(`konuşma metni ${MIN_WORDS}–${MAX_WORDS} kelime olmalı (${words})`);
    if (/<[a-z/][^>]*>/i.test(script)) errors.push("konuşma metninde HTML etiketi var");
    if (/[#*|_`]|^\s*[-•]\s/m.test(script)) errors.push("konuşma metninde Markdown/liste işareti var (# * | _ ` - •)");
    if (/\d/.test(script)) {
        const sample = script.match(/.{0,20}\d+.{0,20}/)?.[0];
        errors.push(`konuşma metninde rakam var; sayıları yazıyla yazın (ör. "${sample?.trim()}")`);
    }
    if (/(?<!\p{L})(m|E|K|vb|vs|ör|bkz|md)\.(?=\s|,|$)/u.test(script)) errors.push('konuşma metninde kısaltma var ("m.", "E.", "K.", "vb." gibi); açık yazın');
    if (/\([^)]*\)/.test(script)) warnings.push("konuşma metninde parantez var; sesli okumada parantez içi genellikle kötü duyulur");
    const acronyms = [...new Set(script.match(/(?<!\p{L})\p{Lu}{2,6}(?!\p{L})/gu) ?? [])];
    if (acronyms.length) warnings.push(`büyük harfli kısaltmalar: ${acronyms.join(", ")}; kanun adlarını açık yazmayı düşünün`);
    if (CONFIG.podcastName && !script.includes(CONFIG.podcastName)) errors.push(`konuşma metni podcast adını ("${CONFIG.podcastName}") içermeli`);
    if (!/bilgilendirme amaçlı/i.test(script.slice(-600))) errors.push('konuşma metni "bilgilendirme amaçlı" notuyla bitmeli');
    for (const re of FORBIDDEN_PHRASES) {
        if (re.test(script) || re.test(ep.description)) errors.push(`yasaklı ifade: ${re}`);
    }

    if (ep.audio !== undefined) {
        if (ep.audio !== `/podcast/${ep.dateISO}.mp3`) errors.push(`audio "/podcast/${ep.dateISO}.mp3" olmalı`);
        else if (!fs.existsSync(path.join(ROOT, "public", ep.audio))) errors.push(`ses dosyası yok: public${ep.audio}`);
        if (typeof ep.durationSec !== "number" || ep.durationSec <= 0) errors.push("audio varken durationSec sayı olmalı");
    }

    return { errors, warnings, words };
}

let errorCount = 0;
for (const file of files) {
    const { errors, warnings, words } = check(file);
    const rel = path.relative(ROOT, file);
    for (const w of warnings) console.warn(`! ${rel}: ${w}`);
    if (errors.length) {
        errorCount += errors.length;
        console.error(`✗ ${rel}`);
        for (const e of errors) console.error(`   - ${e}`);
    } else {
        console.log(`✓ ${rel}${words ? ` (${words} kelime, ~${Math.round(words / 120)} dk)` : ""}`);
    }
}
if (!files.length) console.log("Denetlenecek bölüm yok.");
if (errorCount) {
    console.error(`\n${errorCount} hata bulundu.`);
    process.exit(1);
}
