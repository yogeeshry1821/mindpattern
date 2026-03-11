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

  return NextResponse.json(journal);
}
