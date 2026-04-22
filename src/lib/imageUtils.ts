// Resize an image file to fit within maxDim (longest side), return base64 data URL.
export async function resizeImageToBase64(file: File, maxDim = 1024, quality = 0.85): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("Failed to load image"));
    i.src = dataUrl;
  });

  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality);
}

// SHA-256 hash of a string -> hex
export async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Simple device rate limit via localStorage. Returns true if allowed.
const RATE_KEY = "prmorph_rate_v1";
export function checkRateLimit(maxPerDay = 3): { allowed: boolean; remaining: number } {
  if (typeof window === "undefined") return { allowed: true, remaining: maxPerDay };
  const today = new Date().toISOString().slice(0, 10);
  let raw: { date: string; count: number } = { date: today, count: 0 };
  try {
    const stored = localStorage.getItem(RATE_KEY);
    if (stored) raw = JSON.parse(stored);
  } catch {
    /* ignore */
  }
  if (raw.date !== today) raw = { date: today, count: 0 };
  return { allowed: raw.count < maxPerDay, remaining: Math.max(0, maxPerDay - raw.count) };
}

export function recordGeneration() {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  let raw: { date: string; count: number } = { date: today, count: 0 };
  try {
    const stored = localStorage.getItem(RATE_KEY);
    if (stored) raw = JSON.parse(stored);
  } catch {
    /* ignore */
  }
  if (raw.date !== today) raw = { date: today, count: 0 };
  raw.count += 1;
  localStorage.setItem(RATE_KEY, JSON.stringify(raw));
}

// In-memory + localStorage cache of (image+template) -> result data URL
const CACHE_KEY = "prmorph_cache_v1";
const MAX_CACHE = 12;

type CacheEntry = { hash: string; url: string; ts: number };

function readCache(): CacheEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getCached(hash: string): string | null {
  const entries = readCache();
  return entries.find((e) => e.hash === hash)?.url ?? null;
}

export function putCached(hash: string, url: string) {
  if (typeof window === "undefined") return;
  let entries = readCache().filter((e) => e.hash !== hash);
  entries.unshift({ hash, url, ts: Date.now() });
  entries = entries.slice(0, MAX_CACHE);
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
  } catch {
    // quota exceeded — drop oldest until it fits
    while (entries.length > 1) {
      entries.pop();
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
        break;
      } catch {
        /* keep trimming */
      }
    }
  }
}

export function listCached(): CacheEntry[] {
  return readCache();
}
