import { NextResponse } from "next/server";
import { searchDramas } from "@/data/dramas";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const result = searchDramas(q);

  return NextResponse.json({
    status: true,
    code: 200,
    query: q,
    total: result.length,
    result
  });
}
