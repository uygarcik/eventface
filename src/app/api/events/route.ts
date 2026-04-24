import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";
import { createCollection } from "@/lib/rekognition";

// GET /api/events — list all events for this admin
export async function GET(req: NextRequest) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const events = await prisma.event.findMany({
    where: { adminId: payload!.adminId },
    orderBy: { date: "desc" },
    include: { _count: { select: { photos: true } } },
  });

  return NextResponse.json(events);
}

// POST /api/events — create a new event
export async function POST(req: NextRequest) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { name, date, location } = await req.json();
  if (!name || !date) {
    return NextResponse.json({ error: "İsim ve tarih zorunlu" }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: { name, date: new Date(date), location, adminId: payload!.adminId },
  });

  // Create isolated Rekognition collection for this event
  await createCollection(event.id);

  return NextResponse.json(event, { status: 201 });
}
