import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";
import { indexFaces } from "@/lib/rekognition";

const BATCH_SIZE = 5;   // concurrent Rekognition calls per batch
const BATCH_DELAY = 200; // ms between batches to respect rate limits

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// POST /api/events/[eventId]/index-faces
// Indexes all unprocessed photos in this event (safe to call multiple times)
export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;

  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  // Only process photos that haven't been indexed yet
  const unindexed = await prisma.photo.findMany({
    where: { eventId, faceIds: { none: {} } },
    select: { id: true, s3Key: true },
  });

  if (unindexed.length === 0) {
    return NextResponse.json({ message: "Tüm fotoğraflar zaten indekslendi", indexed: 0 });
  }

  let indexed = 0;
  let failed = 0;

  for (let i = 0; i < unindexed.length; i += BATCH_SIZE) {
    const batch = unindexed.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async ({ id, s3Key }) => {
        try {
          const faces = await indexFaces(eventId, s3Key, id);
          if (faces.length > 0) {
            await prisma.faceIndex.createMany({
              data: faces.map((f) => ({
                rekFaceId: f.rekFaceId,
                photoId: id,
                eventId,
                boundingBox: f.boundingBox
                  ? JSON.parse(JSON.stringify(f.boundingBox))
                  : undefined,
              })),
              skipDuplicates: true,
            });
          }
          indexed++;
        } catch {
          failed++;
        }
      })
    );

    // Rate limiting: pause between batches
    if (i + BATCH_SIZE < unindexed.length) {
      await sleep(BATCH_DELAY);
    }
  }

  return NextResponse.json({
    total: unindexed.length,
    indexed,
    failed,
    message: `${indexed} fotoğraf işlendi, ${failed} başarısız`,
  });
}

// GET /api/events/[eventId]/index-faces — indexing progress
export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;

  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  const [total, indexed] = await Promise.all([
    prisma.photo.count({ where: { eventId } }),
    prisma.photo.count({ where: { eventId, faceIds: { some: {} } } }),
  ]);

  return NextResponse.json({
    total,
    indexed,
    pending: total - indexed,
    percent: total > 0 ? Math.round((indexed / total) * 100) : 0,
  });
}
