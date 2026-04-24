import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchFacesByImage } from "@/lib/rekognition";
import { createPresignedDownloadUrl } from "@/lib/s3";

// POST /api/face-search
// Body: multipart/form-data { token: string, image: File }
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const token = formData.get("token") as string;
  const imageFile = formData.get("image") as File;

  if (!token || !imageFile) {
    return NextResponse.json({ error: "token ve image gerekli" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { qrToken: token } });
  if (!event) {
    return NextResponse.json({ error: "Geçersiz etkinlik linki" }, { status: 404 });
  }

  const imageBytes = new Uint8Array(await imageFile.arrayBuffer());

  let matches;
  try {
    matches = await searchFacesByImage(event.id, imageBytes);
  } catch (err: unknown) {
    const message = (err as { message?: string }).message ?? "";
    if (message.includes("InvalidParameterException") || message.includes("no faces")) {
      return NextResponse.json({ photos: [], message: "Yüz tespit edilemedi" });
    }
    throw err;
  }

  if (matches.length === 0) {
    return NextResponse.json({ photos: [], message: "Fotoğrafınız bulunamadı" });
  }

  // Get unique photo IDs from matches (a person may appear in multiple photos)
  const photoIds = [...new Set(matches.map((m) => m.externalImageId))];

  const photos = await prisma.photo.findMany({
    where: { id: { in: photoIds }, eventId: event.id },
    select: { id: true, s3Key: true, filename: true },
  });

  const withUrls = await Promise.all(
    photos.map(async (p) => {
      const match = matches.find((m) => m.externalImageId === p.id);
      return {
        id: p.id,
        filename: p.filename,
        similarity: match?.similarity ?? 0,
        url: await createPresignedDownloadUrl(p.s3Key),
      };
    })
  );

  // Sort by similarity descending
  withUrls.sort((a, b) => b.similarity - a.similarity);

  return NextResponse.json({ photos: withUrls, eventName: event.name });
}
