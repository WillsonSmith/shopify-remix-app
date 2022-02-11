import crypto from "crypto";
import { getUserSession } from "./session.server";

export function nonce(): string {
  const length = 15;
  const bytes = crypto.randomBytes(length);

  const nonce = bytes
    .map((byte) => {
      return byte % 10;
    })
    .join("");

  return nonce;
}

export async function passesSecurityCheck(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const session = await getUserSession(request);
  const storedState = session.get("state");

  // 1. Verify that the state matches the one we stored in the session
  if (state !== storedState) return false;

  // 2. Verify that the hmac is signed
  const searchParams = new URLSearchParams();
  for (const [key, value] of url.searchParams) {
    if (key !== "hmac") searchParams.append(key, value);
  }
  const localHmac = crypto
    .createHmac("sha256", process.env.API_SECRET_KEY!)
    .update(searchParams.toString())
    .digest("hex");

  const hmac = url.searchParams.get("hmac");
  if (localHmac !== hmac) return false;
  return true;
}
