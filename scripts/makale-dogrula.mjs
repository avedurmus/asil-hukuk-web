#!/usr/bin/env node
/**
 * content/makaleler/*.json dosyalarındaki günlük makaleleri yayın öncesi denetler.
 * Kullanım: npm run makale:dogrula            (tüm makaleler)
 *           npm run makale:dogrula -- <dosya>  (yalnızca verilen dosyalar)
 *
 * Kurallar docs/otomatik-makaleler.md ile uyumludur; hata varsa çıkış kodu 1'dir.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "content", "makaleler");
const STATIC_FILE = path.join(ROOT, "data", "blogPosts.ts");

const staticSource = fs.readFileSync(STATIC_FILE, "utf8");
const staticIds = new Set([...staticSource.matchAll(/^\s{8}id:\s*"([^"]+)"/gm)].map((m) => m[1]));
const categoryBlock = staticSource.match(/export const blogCategories = \[([\s\S]*?)\]/);
const CATEGORIES = categoryBlock ? [...categoryBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];

const ALLOWED_TAGS = new Set(["p", "h2", "h3", "ul", "ol", "li", "strong", "em", "a", "blockquote", "div", "br", "table", "thead", "tbody", "tr", "th", "td"]);
const VOID_TAGS = new Set(["br"]);
const FORBIDDEN_PHRASES = [/yarg[ıi] ?pro/i, /en iyi avukat/i, /kesin(likle)? kazan/i, /garanti(li|siyle)? (kazan|sonuç)/i, /%\s?100 başarı/i];
const MIN_WORDS = 1200;
const SEO_TITLE_MAX = 52;
const SEO_DESC_MAX = 158;
// Sosyal medya metinleri bu tarihten itibaren yayımlanan makalelerde zorunludur (bkz. docs/sosyal-medya.md).
const SOCIAL_REQUIRED_FROM = "2026-11-09";
const SOCIAL_FORBIDDEN = [/(bizi|büromuzu|beni) (hemen )?ara(yın|yabilirsiniz)/i, /randevu (al|için)/i, /(dm|özelden) (at|yaz)/i, /ücretsiz (danışma|görüşme)/i];
const X_MAX = 270; // X sınırı 280; bağlantı her uzunlukta 23 karakter sayılır, pay bırakılır.

/** Sosyal medya metinlerinin biçim ve uzunluk denetimi. */
function checkSocial(post) {
    const errors = [];
    const social = post.social;
    if (social === undefined) {
        if (post.dateISO >= SOCIAL_REQUIRED_FROM) errors.push('"social" alanı (linkedin, x, facebook) zorunlu');
        return errors;
    }
    const url = `https://asilhukuk.net/blog/${post.id}`;
    for (const key of ["linkedin", "x", "facebook"]) {
        const text = social[key];
        if (typeof text !== "string" || !text.trim()) {
            errors.push(`social.${key} eksik`);
            continue;
        }
        if (!text.includes(url)) errors.push(`social.${key} yazının bağlantısını içermeli: ${url}`);
        if (/<[a-z/][^>]*>/i.test(text) || /\*\*|__/.test(text)) errors.push(`social.${key} düz metin olmalı (HTML/Markdown yok)`);
        for (const re of SOCIAL_FORBIDDEN) if (re.test(text)) errors.push(`social.${key} reklam/çağrı ifadesi içeriyor: ${re}`);
    }
    if (typeof social.linkedin === "string" && (social.linkedin.length < 400 || social.linkedin.length > 2000)) errors.push(`social.linkedin 400–2000 karakter olmalı (${social.linkedin.length})`);
    if (typeof social.facebook === "string" && (social.facebook.length < 200 || social.facebook.length > 1500)) errors.push(`social.facebook 200–1500 karakter olmalı (${social.facebook.length})`);
    if (typeof social.x === "string") {
        const xLength = [...social.x.replace(/https?:\/\/\S+/g, "x".repeat(23))].length;
        if (xLength > X_MAX) errors.push(`social.x en fazla ${X_MAX} karakter olmalı (bağlantı 23 sayılarak ${xLength})`);
        if ((social.x.match(/https?:\/\//g) ?? []).length !== 1) errors.push("social.x yalnızca bir bağlantı içermeli");
    }
    const extra = Object.keys(social).filter((k) => !["linkedin", "x", "facebook"].includes(k));
    if (extra.length) errors.push(`social içinde bilinmeyen alan: ${extra.join(", ")}`);
    return errors;
}

const args = process.argv.slice(2);
const files = (args.length ? args.map((f) => path.resolve(f)) : fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => path.join(DIR, f)) : []).sort();

const seenIds = new Map();
let errorCount = 0;

function check(file) {
    const errors = [];
    const name = path.basename(file);
    let post;
    try {
        post = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
        return [`JSON okunamadı: ${e.message}`];
    }

    const req = (key, type = "string") => {
        if (typeof post[key] !== type || (type === "string" && !post[key].trim())) errors.push(`"${key}" alanı eksik veya hatalı`);
    };
    ["id", "title", "excerpt", "dateISO", "category", "content"].forEach((k) => req(k));
    if (errors.length) return errors;

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.id) || post.id.length > 90) errors.push(`id yalnızca küçük harf, rakam ve tire içermeli (≤90): ${post.id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.dateISO)) errors.push(`dateISO YYYY-MM-DD olmalı: ${post.dateISO}`);
    if (name !== `${post.dateISO}-${post.id}.json`) errors.push(`dosya adı "${post.dateISO}-${post.id}.json" olmalı`);
    if (staticIds.has(post.id)) errors.push(`id data/blogPosts.ts içindeki bir yazıyla çakışıyor: ${post.id}`);
    if (seenIds.has(post.id)) errors.push(`id başka bir makaleyle çakışıyor: ${seenIds.get(post.id)}`);
    seenIds.set(post.id, name);

    if (post.title.length < 20 || post.title.length > 110) errors.push(`başlık 20–110 karakter olmalı (${post.title.length})`);
    if (post.excerpt.length < 80 || post.excerpt.length > 320) errors.push(`özet 80–320 karakter olmalı (${post.excerpt.length})`);
    // Arama sonucu görünümü: "<başlık> | Asil Hukuk" ~65, açıklama ~158 karakteri aşınca Google keser.
    if (post.title.length > SEO_TITLE_MAX && !post.seoTitle) errors.push(`başlık ${SEO_TITLE_MAX} karakteri aştığı için kısa "seoTitle" gerekli`);
    if (post.seoTitle !== undefined && (typeof post.seoTitle !== "string" || post.seoTitle.length < 15 || post.seoTitle.length > SEO_TITLE_MAX)) errors.push(`seoTitle 15–${SEO_TITLE_MAX} karakter olmalı`);
    if (post.excerpt.length > SEO_DESC_MAX && !post.seoDescription) errors.push(`özet ${SEO_DESC_MAX} karakteri aştığı için "seoDescription" gerekli`);
    if (post.seoDescription !== undefined && (typeof post.seoDescription !== "string" || post.seoDescription.length < 110 || post.seoDescription.length > SEO_DESC_MAX)) errors.push(`seoDescription 110–${SEO_DESC_MAX} karakter olmalı`);
    if (!CATEGORIES.includes(post.category)) errors.push(`kategori şunlardan biri olmalı: ${CATEGORIES.join(", ")}`);
    if (post.kind && !["makale", "ictihat"].includes(post.kind)) errors.push(`kind "makale" veya "ictihat" olmalı`);
    if (!Array.isArray(post.tags) || post.tags.length < 3 || post.tags.length > 8) errors.push("3–8 etiket (tags) olmalı");
    if ("date" in post || "readTime" in post || "daily" in post) errors.push("date, readTime ve daily alanları yazılmaz; otomatik hesaplanır");

    // Kararlar: künye ve kaynak bağlantısı zorunlu
    const decisions = post.decisions ?? [];
    if (!Array.isArray(decisions)) errors.push("decisions bir dizi olmalı");
    if (post.kind === "ictihat" && decisions.length < 2) errors.push("içtihat notunda en az 2 karar künyesi olmalı");
    decisions.forEach((d, i) => {
        if (!d.court) errors.push(`decisions[${i}].court eksik`);
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(d.date ?? "")) errors.push(`decisions[${i}].date GG.AA.YYYY olmalı`);
        if (!d.basvuruNo && !(d.esas && d.karar)) errors.push(`decisions[${i}] için esas ve karar no (ya da başvuru no) gerekli`);
        if (!/^https:\/\//.test(d.url ?? "")) errors.push(`decisions[${i}].url kararın https bağlantısı olmalı`);
    });
    if (!Array.isArray(post.sources) || post.sources.length < 1) errors.push("en az 1 mevzuat kaynağı (sources) olmalı");
    (post.sources ?? []).forEach((s, i) => {
        if (!s.label) errors.push(`sources[${i}].label eksik`);
        if (s.url && !/^https:\/\//.test(s.url)) errors.push(`sources[${i}].url https olmalı`);
    });

    // İçerik
    const html = post.content;
    const stack = [];
    for (const m of html.matchAll(/<\/?([a-zA-Z0-9]+)([^>]*)>/g)) {
        const [tag, rawName, attrs] = m;
        const tagName = rawName.toLowerCase();
        if (!ALLOWED_TAGS.has(tagName)) errors.push(`izin verilmeyen etiket: <${tagName}>`);
        if (/\son\w+\s*=/i.test(attrs) || /javascript:/i.test(attrs) || /\sstyle\s*=/i.test(attrs)) errors.push(`izin verilmeyen öznitelik: ${tag.slice(0, 60)}`);
        if (tagName === "a" && !tag.startsWith("</") && !/href="(https:\/\/|\/)[^"]*"/.test(attrs)) errors.push(`bağlantı https:// veya / ile başlamalı: ${tag.slice(0, 80)}`);
        if (tagName === "div" && !tag.startsWith("</") && !/class="ictihat-ilke"/.test(attrs)) errors.push(`<div> yalnızca class="ictihat-ilke" ile kullanılabilir`);
        if (VOID_TAGS.has(tagName)) continue;
        if (tag.startsWith("</")) {
            if (stack.pop() !== tagName) errors.push(`etiketler dengesiz: </${tagName}>`);
        } else {
            stack.push(tagName);
        }
    }
    if (stack.length) errors.push(`kapatılmamış etiket(ler): ${stack.join(", ")}`);

    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words < MIN_WORDS) errors.push(`içerik en az ${MIN_WORDS} kelime olmalı (${words})`);
    if ((html.match(/<h2>/g) ?? []).length < 3) errors.push("en az 3 ara başlık (<h2>) olmalı");
    if (!/bilgilendirme amaçlıdır/i.test(text)) errors.push('sonda "bilgilendirme amaçlıdır" uyarısı olmalı');
    for (const re of FORBIDDEN_PHRASES) if (re.test(JSON.stringify(post))) errors.push(`yasaklı ifade: ${re}`);
    errors.push(...checkSocial(post));

    return errors;
}

for (const file of files) {
    const errors = check(file);
    const rel = path.relative(ROOT, file);
    if (errors.length) {
        errorCount += errors.length;
        console.error(`✗ ${rel}`);
        errors.forEach((e) => console.error(`    - ${e}`));
    } else {
        console.log(`✓ ${rel}`);
    }
}

if (!files.length) console.log("Denetlenecek makale yok.");
process.exit(errorCount ? 1 : 0);
