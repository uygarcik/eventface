import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";
import { deleteS3Object } from "@/lib/s3";
import { deleteCollection } from "@/lib/rekognition";

// DELETE /api/events/[eventId]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;

  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
    include: { photos: { select: { s3Key: true } } },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  // 1) Delete all photos from S3
  await Promise.allSettled(event.photos.map((p) => deleteS3Object(p.s3Key)));

  // 2) Delete Rekognition collection (contains all indexed faces)
  await deleteCollection(eventId);

  // 3) Delete event from DB (cascade deletes photos + face indexes)
  await prisma.event.delete({ where: { id: eventId } });

  return NextResponse.json({ success: true });
}
