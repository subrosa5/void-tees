import { NextResponse } from "next/server";
import { getStoreData } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

/** Public read-only endpoint the client uses to pick up live catalog/settings. */
export async function GET() {
  const data = await getStoreData();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
