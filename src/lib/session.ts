/**
 * Admin session tokens: "<expiry>.<HMAC-SHA256(expiry)>", signed with ADMIN_SECRET.
 * Uses Web Crypto only, so it runs in middleware and in server code alike.
 * Rotating ADMIN_SECRET signs everyone out.
 */
export const SESSION_COOKIE = "mg_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

const enc = new TextEncoder();

function secret() {
  const s = process.env.ADMIN_SECRET || "";
  return s.length >= 32 ? s : null;
}

export function adminConfigured() {
  return Boolean(secret() && process.env.ADMIN_PASSWORD);
}

async function hmacKey(s: string) {
  return crypto.subtle.importKey("raw", enc.encode(s), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toB64url(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export async function createSessionToken() {
  const s = secret();
  if (!s) throw new Error("ADMIN_SECRET is not set (needs 32+ characters).");
  const payload = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(s), enc.encode(payload));
  return `${payload}.${toB64url(sig)}`;
}

export async function verifySessionToken(token: string | undefined) {
  const s = secret();
  if (!s || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !/^\d+$/.test(payload)) return false;
  if (Number(payload) < Date.now() / 1000) return false;
  try {
    return await crypto.subtle.verify("HMAC", await hmacKey(s), fromB64url(sig), enc.encode(payload));
  } catch {
    return false;
  }
}
