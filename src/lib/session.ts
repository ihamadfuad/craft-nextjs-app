import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "crypto";
import nookies from "nookies";

const SECRET = process.env.NEXT_PUBLIC_SESSION_SECRET || "default_secret_key";
const IV_LENGTH = 16;

function getKey() {
  return scryptSync(SECRET, "salt", 32);
}

export async function encrypt(data: any): Promise<string> {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-ctr", getKey(), iv);
  const json = JSON.stringify(data);
  const encrypted = Buffer.concat([
    cipher.update(json, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export async function decrypt(token: string | undefined): Promise<any | null> {
  if (!token) return null;
  const [ivHex, encryptedHex] = token.split(":");
  if (!ivHex || !encryptedHex) return null;
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = createDecipheriv("aes-256-ctr", getKey(), iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  try {
    return JSON.parse(decrypted.toString("utf8"));
  } catch {
    return null;
  }
}

export async function createSession(ctx: any, userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  nookies.set(ctx, "session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession(ctx: any) {
  nookies.destroy(ctx, "session");
}
