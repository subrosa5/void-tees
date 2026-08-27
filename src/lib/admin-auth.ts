/**
 * Single shared-password admin auth. Uses Web Crypto (`crypto.subtle`) so the
 * same hashing works both here (Node route handlers/Server Actions) and in
 * `middleware.ts` (Edge runtime, no `node:crypto`).
 */
export const ADMIN_COOKIE = "void_admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The value a valid session cookie must hold. Depends only on the server secret. */
export async function expectedSessionToken(): Promise<string | null> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return sha256Hex(`void-admin-session:${secret}`);
}

export async function checkPassword(password: string): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  return Boolean(secret) && password === secret;
}
