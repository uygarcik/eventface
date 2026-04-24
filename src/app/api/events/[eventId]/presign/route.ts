import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware";
import { createPresignedUploadUrl, photoS3Key } from "@/lib/s3";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// POST /api/events/[eventId]/presign
// Body: { files: [{ filename, contentType }] }
// Returns presigned upload URLs + photoIds for up to 5000 files at once
export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { error, payload } = requireAdmin(req);
  if (error) return error;

  const { eventId } = await params;
  const { files } = await req.json() as { files: { filename: string; contentType: string }[] };

  if (!Array.isArray(files) || files.length === 0) {
    return NextResponse.json({ error: "Dosya listesi boş" }, { status: 400 });
  }

  // Verify event belongs to this admin
  const event = await prisma.event.findFirst({
    where: { id: eventId, adminId: payload!.adminId },
  });
  if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });

  // Generate presigned URLs for all files in parallel (batches of 50)
  const batchSize = 50;
  const results: { photoId: string; filename: string; s3Key: string; uploadUrl: string }[] = [];

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async ({ filename, contentType }) => {
        const photoId = uuidv4();
        const ext = filename.split(".").pop() ?? "jpg";
        const s3Key = photoS3Key(eventId, `${photoId}.${ext}`);
        const uploadUrl = await createPresignedUploadUrl(s3Key, contentType);
        return { photoId, filename, s3Key, uploadUrl };
      })
    );
    results.push(...batchResults);
  }

  return NextResponse.json({ uploads: results });
}
