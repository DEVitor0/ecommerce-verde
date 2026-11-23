const ITERATIONS = 100_000;

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

export function generateSalt(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

/** Deriva um hash PBKDF2-SHA256 com a Web Crypto API. Nunca guardamos a senha em texto puro. */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(salt), iterations: ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  return toHex(new Uint8Array(bits));
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const actual = await hashPassword(password, salt);
  // Comparação em tempo constante para não vazar diferenças pelo tempo de resposta.
  if (actual.length !== expectedHash.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  return diff === 0;
}
