#!/usr/bin/env node
/**
 * content/podcast/<YYYY-MM-DD>.json bölümünün konuşma metnini ElevenLabs ile
 * Av. Emre Durmuş'un klonlanmış sesiyle seslendirir ve public/podcast/<tarih>.mp3
 * dosyasını üretir. Ardından bölüm dosyasına "audio" ve "durationSec" alanlarını yazar.
 *
 * Kullanım: npm run podcast:seslendir                 (bugün, İstanbul saatiyle)
 *           npm run podcast:seslendir -- 2026-11-08    (belirli bir gün)
 *           npm run podcast:seslendir -- 2026-11-08 --force    (var olan sesi yeniden üret)
 *           npm run podcast:seslendir -- 2026-11-08 --dry-run  (API'yi çağırmadan parçaları göster)
 *
 * Ayarlar: data/podcast.json → elevenlabs (voiceId, modelId, outputFormat, voiceSettings).
 * API anahtarı: ELEVENLABS_API_KEY ortam değişkeni. Bulut oturumlarında anahtar ağ
 * vekili tarafından isteğe eklenir (xi-api-key başlığı); bu durumda değişken gerekmez.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Node'un yerleşik fetch'i HTTPS_PROXY'yi ancak NODE_USE_ENV_PROXY=1 ile kullanır.
if (process.env.HTTPS_PROXY && !process.env.NODE_USE_ENV_PROXY) {
    const child = spawnSync(process.execPath, ["--disable-warning=UNDICI-EHPA", ...process.argv.slice(1)], {
        stdio: "inherit",
        env: { ...process.env, NODE_USE_ENV_PROXY: "1" },
    });
    process.exit(child.status ?? 1);
}

const ROOT = process.cwd();
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "podcast.json"), "utf8"));
const EL = CONFIG.elevenlabs ?? {};
const API = process.env.ELEVENLABS_API_URL || "https://api.elevenlabs.io/v1";
const CHUNK_CHARS = 2500;

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const date =
    args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) ??
    new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());

const episodeFile = path.join(ROOT, "content", "podcast", `${date}.json`);
const audioPath = `/podcast/${date}.mp3`;
const audioFile = path.join(ROOT, "public", audioPath);

function fail(message) {
    console.error(`✗ ${message}`);
    process.exit(1);
}

if (!fs.existsSync(episodeFile)) fail(`bölüm dosyası yok: ${path.relative(ROOT, episodeFile)}`);
const episode = JSON.parse(fs.readFileSync(episodeFile, "utf8"));
if (fs.existsSync(audioFile) && !force && !dryRun) fail(`ses dosyası zaten var: public${audioPath} (yeniden üretmek için --force)`);

/** Metni paragraf (gerekirse cümle) sınırlarından ~CHUNK_CHARS karakterlik parçalara böler. */
function chunk(text) {
    const units = text
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .flatMap((p) => (p.length <= CHUNK_CHARS ? [p] : p.match(/[^.!?…]+[.!?…]+["'’”]?\s*|.+$/g).map((s) => s.trim())));
    const chunks = [];
    let current = "";
    for (const unit of units) {
        if (current && current.length + unit.length + 2 > CHUNK_CHARS) {
            chunks.push(current);
            current = unit;
        } else {
            current = current ? `${current}\n\n${unit}` : unit;
        }
    }
    if (current) chunks.push(current);
    return chunks;
}

/** Parçaların başındaki ID3 etiketini atar; böylece MP3 parçaları uç uca eklenebilir. */
function stripId3(buf) {
    if (buf.length > 10 && buf.toString("latin1", 0, 3) === "ID3") {
        const size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
        return buf.subarray(10 + size);
    }
    return buf;
}

const chunks = chunk(episode.script);
const totalChars = chunks.reduce((n, c) => n + c.length, 0);
console.log(`Bölüm ${date}: ${chunks.length} parça, ${totalChars} karakter`);

if (dryRun) {
    chunks.forEach((c, i) => console.log(`\n— Parça ${i + 1} (${c.length} karakter) —\n${c.slice(0, 160)}…`));
    process.exit(0);
}

if (!EL.voiceId) fail("data/podcast.json içinde elevenlabs.voiceId boş. ElevenLabs'taki ses kimliğinizi (Voice ID) buraya yazın.");

const headers = {
    "Content-Type": "application/json",
    Accept: "audio/mpeg",
    // Bulut oturumunda gerçek anahtar ağ vekili tarafından bu başlığın yerine konur.
    "xi-api-key": process.env.ELEVENLABS_API_KEY || "vekil-tarafindan-eklenir",
};

const parts = [];
const requestIds = [];
for (const [i, text] of chunks.entries()) {
    const body = {
        text,
        model_id: EL.modelId || "eleven_multilingual_v2",
        voice_settings: EL.voiceSettings,
        apply_text_normalization: "auto",
        // Önceki parçaların kimlikleri, tonlamanın parçalar arasında kesintisiz sürmesini sağlar.
        previous_request_ids: requestIds.slice(-3),
        ...(EL.languageCode ? { language_code: EL.languageCode } : {}),
    };
    const url = `${API}/text-to-speech/${encodeURIComponent(EL.voiceId)}?output_format=${encodeURIComponent(EL.outputFormat || "mp3_44100_64")}`;

    let res;
    for (let attempt = 1; ; attempt++) {
        try {
            res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
        } catch (error) {
            if (attempt < 3) continue;
            fail(`ElevenLabs'a bağlanılamadı (${error.cause?.code ?? error.message}). Ağ ayarlarında api.elevenlabs.io izinli olmalı.`);
        }
        if ((res.status === 429 || res.status >= 500) && attempt < 3) {
            await new Promise((r) => setTimeout(r, attempt * 5000));
            continue;
        }
        break;
    }
    if (!res.ok) {
        const detail = (await res.text()).slice(0, 500);
        if (res.status === 401) fail(`ElevenLabs API anahtarı eksik veya geçersiz (401). ${detail}`);
        if (res.status === 403 && /proxy|host/i.test(detail)) fail(`Ağ vekili api.elevenlabs.io'ya izin vermiyor (403). ${detail}`);
        fail(`ElevenLabs hatası ${res.status}: ${detail}`);
    }
    const id = res.headers.get("request-id");
    if (id) requestIds.push(id);
    const buf = Buffer.from(await res.arrayBuffer());
    parts.push(i === 0 ? buf : stripId3(buf));
    console.log(`  ✓ parça ${i + 1}/${chunks.length} (${Math.round(buf.length / 1024)} KB)`);
}

const audio = Buffer.concat(parts);
fs.mkdirSync(path.dirname(audioFile), { recursive: true });
fs.writeFileSync(audioFile, audio);

// Sabit bit hızlı MP3 (ör. mp3_44100_64 → 64 kbps) için süre = bayt × 8 / bit hızı.
const kbps = Number((EL.outputFormat || "mp3_44100_64").split("_")[2]) || 64;
const durationSec = Math.round((audio.length * 8) / (kbps * 1000));

const updated = { ...episode, audio: audioPath, durationSec };
fs.writeFileSync(episodeFile, `${JSON.stringify(updated, null, 4)}\n`);

const min = Math.floor(durationSec / 60);
const sec = String(durationSec % 60).padStart(2, "0");
console.log(`✓ public${audioPath} yazıldı: ${min}:${sec} dk, ${(audio.length / 1048576).toFixed(1)} MB`);
if (durationSec < 270 || durationSec > 540) console.warn(`! Süre 5–8 dakika hedefinin dışında (${min}:${sec}); konuşma metnini kısaltın veya uzatın.`);
