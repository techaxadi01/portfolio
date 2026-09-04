import { NextResponse } from "next/server";
import { getPortfolioProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getPortfolioProfile();

  return NextResponse.json({
    profile,
    source: "api/profile",
    fetchedAt: new Date().toISOString()
  });
}
