import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { Readable } from "stream";
import sharp from "sharp";
import { s3, S3_BUCKET } from "@/lib/aws";
import { prisma } from "@/lib/prisma";

// GET /api/thumbnail?photoId=<id>
// Fetches full-res image from S3, resizes to 400px, returns JPEG at q70.
// Cache-Control lets Vercel CDN serve repeat requests instantly.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const photoId = searchParams.get("photoId");

  if (!photoId) {
    return NextResponse.json({ error: "photoId required" }, { status: 400 });
  }

  const photo = await prisma.photo.findUnique({ where: { id: photoId }, select: { s3Key: true } });
  if (!photo) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const s3Res = await s3.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: photo.s3Key }));

  const chunks: Uint8Array[] = [];
  for await (const chunk of s3Res.Body as Readable) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  const thumbnail = await sharp(buffer)
    .resize(600, 600, { fit: "cover", position: "center" })
    .jpeg({ quality: 65 })
    .toBuffer();

  return new NextResponse(thumbnail.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
