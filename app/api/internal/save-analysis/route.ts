import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { journal_id, analysis } = await req.json();

    const result = await prisma.journal.update({
      where: { id: Number(journal_id) },
      data: {
        analysis: analysis, // you already added this field in migration
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("SAVE ANALYSIS ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save analysis" },
      { status: 500 },
    );
  }
}
