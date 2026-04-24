import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public endpoint — only exposes non-sensitive event info for guest landing page
export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const event = await prisma.event.findUnique({
    where: { qrToken: token },
    select: {
      id: true,
      name: true,
      date: true,
      location: true,
      _count: { select: { photos: true } },
    },
  });

  if (!event) {
    return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(event);
}
