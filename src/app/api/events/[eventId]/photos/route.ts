import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";
import { createPresignedDownloadUrl } from "@/lib/s3";

// POST /api/events/[eventId]/photos — register photos after S3 upload
// Body: { photos: [{ photoId, filename, s3Key }] }
export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;
  const { photos } = await req.json() as {
    photos: { photoId: string; filename: string; s3Key: string }[];
  };

  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  // Batch insert photos into DB
  await prisma.photo.createMany({
    data: photos.map(({ photoId, filename, s3Key }) => ({
      id: photoId,
      eventId,
      s3Key,
      filename,
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ registered: photos.length });
}

// GET /api/events/[eventId]/photos — list photos with signed URLs
export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;

  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  const photos = await prisma.photo.findMany({
    where: { eventId },
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { faceIds: true } } },
  });

  const withUrls = await Promise.all(
    photos.map(async (p) => ({
      id: p.id,
      filename: p.filename,
      faceCount: p._count.faceIds,
      createdAt: p.createdAt,
      url: await createPresignedDownloadUrl(p.s3Key),
    }))
  );

  return NextResponse.json(withUrls);
}
