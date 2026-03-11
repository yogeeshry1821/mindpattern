// app/api/journals/route.ts
import { authOptions } from "@/lib/auth"; // Import your options insteadimport { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Assuming your prisma instance is here
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.name) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content } = await req.json();

    if (!content || content.length < 10) {
      return new NextResponse("Content too short", { status: 400 });
    }

    const journal = await prisma.journal.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(journal);
  } catch (error) {
    console.error("[JOURNAL_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}