#!/usr/bin/env node
/**
 * LinkedIn veri arşivindeki Shares.csv dosyasını blog yazılarına dönüştürür.
 *
 * LinkedIn'in kişisel profil gönderilerini OKUYAN herkese açık bir API'si yok
 * (ayrıntı için docs/linkedin-blog-senkronizasyonu.md). Resmî ve sözleşmeye
 * uygun yol, "Ayarlar ve Gizlilik → Veri gizliliği → Verilerinizin bir kopyasını
 * alın" adımıyla indirilen arşivi kullanmaktır.
 *
 * Kullanım:
 *   node scripts/import-linkedin-shares.mjs <Shares.csv> [seçenekler]
 *
 * Seçenekler:
 *   --dry-run      Dosyaya yazmaz, ne üretileceğini ekrana basar.
 *   --all          Yalnızca içtihat içerenleri değil, tüm paylaşımları alır.
 *   --min <sayı>   Bu karakter sayısının altındaki paylaşımları atlar (varsayılan 400).
 *   --out <yol>    Çıktı dosyası (varsayılan data/linkedinPosts.generated.ts).
 *
 * Çıktı doğrudan yayına girmez: üretilen dosya gözden geçirildikten sonra
 * data/blogPosts.ts içinde birleştirilmelidir.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

// ————————————————————————————————————————— CSV

/**
 * RFC 4180 uyumlu ayrıştırıcı: alan içi virgül, satır sonu ve çiftlenmiş
 * tırnak ("") karakterlerini doğru işler. LinkedIn arşivindeki gönderi
 * metinleri çok satırlı olduğundan satır bazlı bölme yeterli değildir.
 */
function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    const input = text.replace(/^﻿/, "").replace(/\r\n/g, "\n");

    for (let i = 0; i < input.length; i += 1) {
        const char = input[i];

        if (inQuotes) {
            if (char === '"') {
                if (input[i + 1] === '"') {
                    field += '"';
                    i += 1;
                } else {
                    inQuotes = false;
                }
            } else {
                field += char;
            }
            continue;
        }

        if (char === '"') {
            inQuotes = true;
        } else if (char === ",") {
            row.push(field);
            field = "";
        } else if (char === "\n") {
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
        } else {
            field += char;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows.filter((entry) => entry.some((cell) => cell.trim().length > 0));
}

/** Başlık satırını kullanarak satırları nesneye çevirir. */
function toRecords(rows) {
    if (rows.length === 0) return [];
    const headers = rows[0].map((header) => header.trim());
    return rows.slice(1).map((row) => {
        const record = {};
        headers.forEach((header, index) => {
            record[header] = (row[index] ?? "").trim();
        });
        return record;
    });
}

/** Sütun adları arşiv sürümüne göre değişebildiği için esnek eşleme yapılır. */
function pick(record, candidates) {
    for (const candidate of candidates) {
        const key = Object.keys(record).find(
            (name) => name.toLowerCase() === candidate.toLowerCase()
        );
        if (key && record[key]) return record[key];
    }
    return "";
}

// ————————————————————————————————————————— Metin araçları

const TR_MAP = { ı: "i", İ: "i", ğ: "g", Ğ: "g", ü: "u", Ü: "u", ş: "s", Ş: "s", ö: "o", Ö: "o", ç: "c", Ç: "c" };

function slugify(value) {
    return value
        .replace(/[ıİğĞüÜşŞöÖçÇ]/g, (char) => TR_MAP[char])
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80)
        .replace(/-$/, "");
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/** TS template literal içine güvenle gömülebilmesi için kaçışlar. */
function escapeTemplate(value) {
    return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function escapeString(value) {
    return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

// ————————————————————————————————————————— İçtihat tespiti

const COURT_PATTERNS = [
    /yarg[ıi]tay/i,
    /dan[ıi][şs]tay/i,
    /anayasa\s+mahkemesi/i,
    /\bAYM\b/,
    /b[öo]lge\s+adliye/i,
    /hukuk\s+genel\s+kurulu/i,
    /\bHGK\b/,
    /i[çc]tihad[ıi]\s+birle[şs]tirme/i,
    /\bAİHM\b/,
];

const CITATION_PATTERNS = [
    /\bE\.?\s*\d{4}\s*\/\s*\d+/i,
    /\besas\s*(?:no)?\.?\s*:?\s*\d{4}\s*\/\s*\d+/i,
    /\bK\.?\s*\d{4}\s*\/\s*\d+/i,
    /\bkarar\s*(?:no)?\.?\s*:?\s*\d{4}\s*\/\s*\d+/i,
    /\bB\.?\s*No\s*:?\s*\d{4}\s*\/\s*\d+/i,
];

function looksLikeCaseLaw(text) {
    const hasCourt = COURT_PATTERNS.some((pattern) => pattern.test(text));
    const hasCitation = CITATION_PATTERNS.some((pattern) => pattern.test(text));
    return hasCourt || hasCitation;
}

/**
 * Künyeden hemen önce gelen mahkeme/daire adını arar.
 * Daire adları "6. Hukuk Dairesi" gibi nokta içerdiğinden, künyeden geriye
 * doğru sınırlı bir pencerede arama yapmak nokta temelli bölmeden daha güvenli.
 */
function findCourtBefore(text, index) {
    const window = text.slice(Math.max(0, index - 120), index);
    const courtRegex =
        /(Yarg[ıi]tay|Dan[ıi][şs]tay|Anayasa\s+Mahkemesi)((?:\s+\d+\.)?(?:\s+(?:Hukuk|Ceza|İdari|Vergi|Daire)[^\n,;]{0,30})?(?:\s+(?:Genel\s+)?Kurulu)?)/gi;

    let found = "";
    let match;
    while ((match = courtRegex.exec(window)) !== null) {
        found = `${match[1]}${match[2] ?? ""}`.replace(/\s+/g, " ").trim().replace(/[,;]$/, "");
    }
    return found;
}

/** Metinden karar künyelerini (daire + esas + karar) ayıklar. */
function extractDecisions(text) {
    const decisions = [];
    const seen = new Set();

    const pairRegex =
        /E(?:sas)?\.?\s*(?:No\.?\s*:?\s*)?(\d{4}\s*\/\s*\d+)[^\n]{0,30}?K(?:arar)?\.?\s*(?:No\.?\s*:?\s*)?(\d{4}\s*\/\s*\d+)/gi;

    let match;
    while ((match = pairRegex.exec(text)) !== null) {
        const esas = match[1].replace(/\s+/g, "");
        const karar = match[2].replace(/\s+/g, "");
        const key = `${esas}|${karar}`;
        if (seen.has(key)) continue;
        seen.add(key);

        decisions.push({
            court: findCourtBefore(text, match.index) || "Mahkeme bilgisi doğrulanmalı",
            esas,
            karar,
            date: "",
        });
    }

    const basvuruRegex = /B\.?\s*No\s*:?\s*(\d{4}\s*\/\s*\d+)/gi;
    while ((match = basvuruRegex.exec(text)) !== null) {
        const basvuruNo = match[1].replace(/\s+/g, "");
        if (seen.has(basvuruNo)) continue;
        seen.add(basvuruNo);
        decisions.push({ court: "Anayasa Mahkemesi", basvuruNo, date: "" });
    }

    return decisions;
}

// ————————————————————————————————————————— Dönüştürme

const TR_MONTHS = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function formatTurkishDate(date) {
    return `${date.getUTCDate()} ${TR_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** Paylaşımın ilk anlamlı satırından başlık üretir. */
function deriveTitle(text) {
    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !/^[#*\-—–·•]+$/.test(line));

    let candidate = lines[0] ?? "LinkedIn Paylaşımı";
    candidate = candidate.replace(/^[#*\-—–·•\s]+/, "").replace(/[#*]+$/, "").trim();

    // Tek satır uzun bir paragrafsa ilk cümleyle sınırla.
    if (candidate.length > 90) {
        const sentenceEnd = candidate.slice(0, 120).lastIndexOf(". ");
        candidate = sentenceEnd > 30 ? candidate.slice(0, sentenceEnd) : candidate.slice(0, 90).trim();
    }

    return candidate.replace(/[.:;,]+$/, "");
}

function deriveExcerpt(text, title) {
    const body = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .filter((line) => !line.startsWith(title.slice(0, 30)))
        .join(" ")
        .replace(/#\S+/g, "")
        .replace(/\s+/g, " ")
        .trim();

    if (body.length <= 200) return body;
    const cut = body.slice(0, 200);
    const lastSpace = cut.lastIndexOf(" ");
    return `${cut.slice(0, lastSpace > 0 ? lastSpace : 200).trim()}…`;
}

function extractHashtags(text) {
    return Array.from(new Set(Array.from(text.matchAll(/#(\p{L}[\p{L}\p{N}_]*)/gu), (m) => m[1])));
}

/** Düz metni paragraf ve madde işaretli listelere dönüştürür. */
function toHtml(text, title) {
    const lines = text.split("\n").map((line) => line.trim());
    const blocks = [];
    let paragraph = [];
    let list = [];

    const flushParagraph = () => {
        if (paragraph.length === 0) return;
        blocks.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
        paragraph = [];
    };

    const flushList = () => {
        if (list.length === 0) return;
        blocks.push(
            `<ul>\n${list.map((item) => `                <li>${escapeHtml(item)}</li>`).join("\n")}\n            </ul>`
        );
        list = [];
    };

    let skippedTitle = false;

    for (const line of lines) {
        if (line.length === 0) {
            flushParagraph();
            flushList();
            continue;
        }

        // Başlık olarak kullanılan ilk satırı gövdede tekrarlamayalım.
        if (!skippedTitle && line.replace(/^[#*\-—–·•\s]+/, "").startsWith(title.slice(0, 25))) {
            skippedTitle = true;
            continue;
        }

        const bullet = line.match(/^(?:[-—–*•·]|\d+[.)])\s+(.*)$/);
        if (bullet) {
            flushParagraph();
            list.push(bullet[1]);
            continue;
        }

        flushList();
        paragraph.push(line);
    }

    flushParagraph();
    flushList();

    return blocks.join("\n\n            ");
}

function estimateReadTime(text) {
    // Türkçe metinlerde ortalama 200 kelime/dk kabul edilir.
    const words = text.split(/\s+/).filter(Boolean).length;
    return `${Math.max(2, Math.round(words / 200))} dk okuma`;
}

/** Anahtar kelimelere göre kaba bir kategori tahmini yapar. */
function guessCategory(text) {
    const lowered = text.toLocaleLowerCase("tr-TR");
    const rules = [
        ["Aile Hukuku", ["boşanma", "velayet", "nafaka", "mal rejimi", "katılma alacağı", "ziynet"]],
        ["İş Hukuku", ["işçi", "işveren", "kıdem", "ihbar tazminat", "fazla mesai", "işe iade"]],
        ["Ceza Hukuku", ["sanık", "şüpheli", "hagb", "ceza muhakemesi", "tutukl", "beraat", "uzlaştırma"]],
        ["Gayrimenkul Hukuku", ["kira", "tahliye", "tapu", "taşınmaz", "ecrimisil", "önalım", "kentsel dönüşüm"]],
        ["Ticaret Hukuku", ["şirket", "çek", "bono", "ticari", "icra takibi", "iflas", "haciz"]],
        ["Anayasa Hukuku", ["anayasa mahkemesi", "bireysel başvuru", "ihlal", "aihm", "temel hak"]],
    ];

    for (const [category, keywords] of rules) {
        if (keywords.some((keyword) => lowered.includes(keyword))) return category;
    }
    return "Genel";
}

// ————————————————————————————————————————— Ana akış

function parseArgs(argv) {
    const options = { dryRun: false, all: false, min: 400, out: "data/linkedinPosts.generated.ts", file: "" };

    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === "--dry-run") options.dryRun = true;
        else if (arg === "--all") options.all = true;
        else if (arg === "--min") options.min = Number(argv[++i]);
        else if (arg === "--out") options.out = argv[++i];
        else if (!arg.startsWith("--")) options.file = arg;
    }

    return options;
}

function usage() {
    console.log(`
Kullanım: node scripts/import-linkedin-shares.mjs <Shares.csv> [seçenekler]

  --dry-run      Dosyaya yazmaz, özeti ekrana basar
  --all          İçtihat filtresini kapatır, tüm paylaşımları alır
  --min <sayı>   Asgari karakter sayısı (varsayılan 400)
  --out <yol>    Çıktı dosyası (varsayılan data/linkedinPosts.generated.ts)

LinkedIn arşivi nasıl alınır:
  Ayarlar ve Gizlilik → Veri gizliliği → Verilerinizin bir kopyasını alın
  Gelen zip içindeki Shares.csv dosyasını bu script'e verin.
`);
}

function main() {
    const options = parseArgs(process.argv.slice(2));

    if (!options.file) {
        usage();
        process.exit(1);
    }

    let raw;
    try {
        raw = readFileSync(options.file, "utf8");
    } catch (error) {
        console.error(`Dosya okunamadı: ${options.file}\n${error.message}`);
        process.exit(1);
    }

    const records = toRecords(parseCsv(raw));
    if (records.length === 0) {
        console.error("Shares.csv içinde satır bulunamadı.");
        process.exit(1);
    }

    console.log(`${basename(options.file)}: ${records.length} paylaşım okundu.`);

    const usedSlugs = new Set();
    const posts = [];
    const skipped = { short: 0, notCaseLaw: 0, empty: 0 };

    for (const record of records) {
        const text = pick(record, ["ShareCommentary", "Commentary", "Text", "ShareText"]);
        if (!text) {
            skipped.empty += 1;
            continue;
        }

        if (text.length < options.min) {
            skipped.short += 1;
            continue;
        }

        if (!options.all && !looksLikeCaseLaw(text)) {
            skipped.notCaseLaw += 1;
            continue;
        }

        const rawDate = pick(record, ["Date", "ShareDate", "CreatedAt"]);
        const parsed = new Date(rawDate.replace(" UTC", "Z").replace(" ", "T"));
        const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;

        const title = deriveTitle(text);
        let slug = slugify(title) || `linkedin-paylasimi-${date.toISOString().slice(0, 10)}`;
        while (usedSlugs.has(slug)) slug = `${slug}-2`;
        usedSlugs.add(slug);

        posts.push({
            id: slug,
            title,
            excerpt: deriveExcerpt(text, title),
            date: formatTurkishDate(date),
            dateISO: date.toISOString().slice(0, 10),
            readTime: estimateReadTime(text),
            category: guessCategory(text),
            kind: looksLikeCaseLaw(text) ? "ictihat" : "makale",
            tags: extractHashtags(text),
            decisions: extractDecisions(text),
            content: toHtml(text, title),
            source: {
                platform: "linkedin",
                url: pick(record, ["ShareLink", "ShareUrl", "Link"]),
                postedAt: date.toISOString(),
            },
        });
    }

    console.log(
        `Seçilen: ${posts.length} · atlanan — kısa: ${skipped.short}, içtihat değil: ${skipped.notCaseLaw}, boş: ${skipped.empty}`
    );

    if (posts.length === 0) {
        console.log("Üretilecek yazı yok. --all veya --min ile filtreyi gevşetmeyi deneyin.");
        return;
    }

    const output = renderModule(posts);

    if (options.dryRun) {
        console.log("\n— ÖN İZLEME (dosyaya yazılmadı) —\n");
        posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
            console.log(`   slug: ${post.id} · ${post.date} · ${post.category} · ${post.readTime}`);
            if (post.decisions.length > 0) {
                post.decisions.forEach((decision) => {
                    const label = decision.basvuruNo
                        ? `B. No: ${decision.basvuruNo}`
                        : `E. ${decision.esas}, K. ${decision.karar}`;
                    console.log(`   karar: ${decision.court} — ${label}`);
                });
            }
            console.log("");
        });
        return;
    }

    writeFileSync(options.out, output, "utf8");
    console.log(`\n${options.out} yazıldı (${posts.length} yazı).`);
    console.log(
        [
            "",
            "Sonraki adımlar:",
            "  1. Üretilen dosyayı okuyun; başlık, özet ve kategori tahminlerini düzeltin.",
            "  2. Karar künyelerini ve tarihlerini doğrulayın, decisions[].url alanlarını doldurun.",
            "  3. Gerekirse imageUrl atayın (boş bırakılırsa tipografik kapak üretilir).",
            "  4. Yazıları data/blogPosts.ts içindeki blogPosts dizisine taşıyın.",
        ].join("\n")
    );
}

function renderModule(posts) {
    const body = posts
        .map((post) => {
            const lines = [
                "    {",
                `        id: "${escapeString(post.id)}",`,
                `        title: "${escapeString(post.title)}",`,
                `        excerpt: "${escapeString(post.excerpt)}",`,
                `        date: "${escapeString(post.date)}",`,
                `        dateISO: "${post.dateISO}",`,
                `        readTime: "${post.readTime}",`,
                `        category: "${escapeString(post.category)}",`,
                `        kind: "${post.kind}",`,
            ];

            if (post.tags.length > 0) {
                lines.push(
                    `        tags: [${post.tags.map((tag) => `"${escapeString(tag)}"`).join(", ")}],`
                );
            }

            if (post.decisions.length > 0) {
                lines.push("        decisions: [");
                post.decisions.forEach((decision) => {
                    lines.push("            {");
                    lines.push(`                court: "${escapeString(decision.court)}",`);
                    if (decision.esas) lines.push(`                esas: "${decision.esas}",`);
                    if (decision.karar) lines.push(`                karar: "${decision.karar}",`);
                    if (decision.basvuruNo)
                        lines.push(`                basvuruNo: "${decision.basvuruNo}",`);
                    lines.push(`                date: "${escapeString(decision.date)}", // DOĞRULA`);
                    lines.push("            },");
                });
                lines.push("        ],");
            }

            lines.push("        source: {");
            lines.push('            platform: "linkedin",');
            if (post.source.url) lines.push(`            url: "${escapeString(post.source.url)}",`);
            lines.push(`            postedAt: "${post.source.postedAt}",`);
            lines.push("        },");

            lines.push("        content: `");
            lines.push(`            ${escapeTemplate(post.content)}`);
            lines.push("        `,");
            lines.push("    },");

            return lines.join("\n");
        })
        .join("\n");

    return `// Bu dosya scripts/import-linkedin-shares.mjs tarafından üretildi.
// Üretim tarihi: ${new Date().toISOString()}
//
// ELDEN GEÇİRİLMEDEN YAYINA ALMAYIN.
// Başlıklar ve kategoriler paylaşım metninden tahmin edilmiştir; karar künyeleri
// ve tarihleri kaynağından doğrulanmalıdır. Gözden geçirdikten sonra yazıları
// data/blogPosts.ts içindeki blogPosts dizisine taşıyın.

import type { BlogPost } from "./blogPosts";

export const linkedinPosts: BlogPost[] = [
${body}
];
`;
}

main();
