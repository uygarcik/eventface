import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";
import { deleteS3Object } from "@/lib/s3";
import { collectionId } from "@/lib/rekognition";
import { rekognition } from "@/lib/aws";
import { DeleteFacesCommand } from "@aws-sdk/client-rekognition";

// POST /api/events/[eventId]/photos/delete
// Body: { photoIds: string[] }
export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;
  const { photoIds } = await req.json() as { photoIds: string[] };

  if (!Array.isArray(photoIds) || photoIds.length === 0) {
    return NextResponse.json({ error: "Fotoğraf seçilmedi" }, { status: 400 });
  }

  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  const photos = await prisma.photo.findMany({
    where: { id: { in: photoIds }, eventId },
    include: { faceIds: { select: { rekFaceId: true } } },
  });

  // 1) Delete face IDs from Rekognition collection
  const allFaceIds = photos.flatMap((p) => p.faceIds.map((f) => f.rekFaceId));
  if (allFaceIds.length > 0) {
    try {
      // Rekognition allows max 1000 face IDs per request
      for (let i = 0; i < allFaceIds.length; i += 1000) {
        await rekognition.send(new DeleteFacesCommand({
          CollectionId: collectionId(eventId),
          FaceIds: allFaceIds.slice(i, i + 1000),
        }));
      }
    } catch {
      // collection may not exist yet — safe to continue
    }
  }

  // 2) Delete from S3
  await Promise.allSettled(photos.map((p) => deleteS3Object(p.s3Key)));

  // 3) Delete from DB (cascade deletes FaceIndex records)
  await prisma.photo.deleteMany({ where: { id: { in: photoIds }, eventId } });

  return NextResponse.json({ deleted: photos.length });
}
