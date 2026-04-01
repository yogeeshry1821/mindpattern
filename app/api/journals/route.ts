// app/api/journals/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return new NextResponse("Unauthorized", { status: 401 });

  const { content } = await req.json();
  if (!content || content.length < 10)
    return new NextResponse("Content too short", { status: 400 });

  const journal = await prisma.journal.create({
    data: {
      content,
      userId: session.user.id,
    },
  });
  try {
    // We don't 'await' this because we want the user to get their response FAST
    fetch(`http://127.0.0.1:8000/intelligence/analyze/${journal.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: journal.content }),
    }).catch((err) => console.error("Neural Engine Trigger Failed:", err));

    console.log(`[Next.js] Triggered analysis for Journal ID: ${journal.id}`);
  } catch (error) {
    console.error("Failed to contact FastAPI:", error);
  }
  return NextResponse.json(journal);
}
