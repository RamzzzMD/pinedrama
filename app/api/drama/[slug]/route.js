import { NextResponse } from "next/server";
import { getDrama } from "@/data/dramas";

export async function GET(req, { params }) {
  const drama = getDrama(params.slug);

  if (!drama) {
    return NextResponse.json(
      {
        status: false,
        code: 404,
        message: "Drama tidak ditemukan"
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: true,
    code: 200,
    result: drama
  });
}
