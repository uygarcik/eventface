import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, S3_BUCKET } from "@/lib/aws";
import { prisma } from "@/lib/prisma";

function contentTypeFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg"].includes(ext)) return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  if (ext === "heic") return "image/heic";
  return "image/jpeg";
}

// GET /api/download?photoId=<id>&filename=<filename>
// Generates a fresh S3 presigned URL with Content-Disposition + Content-Type forced,
// then redirects. Avoids streaming through Vercel and cross-origin download issues on iOS.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const photoId = searchParams.get("photoId");
  const filename = (searchParams.get("filename") ?? "photo.jpg").replace(/\.json$/i, "");

  if (!photoId) {
    return NextResponse.json({ error: "photoId required" }, { status: 400 });
  }

  const photo = await prisma.photo.findUnique({ where: { id: photoId }, select: { s3Key: true } });
  if (!photo) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const contentType = contentTypeFromFilename(filename);

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: photo.s3Key,
    ResponseContentDisposition: `attachment; filename="${filename}"`,
    ResponseContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return NextResponse.redirect(presignedUrl, 307);
}
