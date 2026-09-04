import { headers } from "next/headers";

export function getBaseUrl(): string {
  const headerStore = headers();
  const host = headerStore.get("host") ?? "localhost:3000";
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}
