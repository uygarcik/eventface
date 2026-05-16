import {
  CreateCollectionCommand,
  DeleteCollectionCommand,
  IndexFacesCommand,
  SearchFacesByImageCommand,
  ListCollectionsCommand,
} from "@aws-sdk/client-rekognition";
import { rekognition } from "./aws";

export function collectionId(eventId: string) {
  return `eventface-${eventId}`;
}

export async function createCollection(eventId: string) {
  const id = collectionId(eventId);
  try {
    await rekognition.send(new CreateCollectionCommand({ CollectionId: id }));
  } catch (err: unknown) {
    // already exists — safe to ignore
    if ((err as { name?: string }).name !== "ResourceAlreadyExistsException") throw err;
  }
  return id;
}

export async function deleteCollection(eventId: string) {
  try {
    await rekognition.send(
      new DeleteCollectionCommand({ CollectionId: collectionId(eventId) })
    );
  } catch {
    // collection may not exist, ignore
  }
}

export async function indexFaces(eventId: string, s3Key: string, photoId: string) {
  const res = await rekognition.send(
    new IndexFacesCommand({
      CollectionId: collectionId(eventId),
      Image: { S3Object: { Bucket: process.env.S3_BUCKET_NAME!, Name: s3Key } },
      ExternalImageId: photoId,
      MaxFaces: 100,        // grup fotoğrafları için yeterli
      QualityFilter: "NONE", // küçük/uzak yüzleri de indeksle
      DetectionAttributes: [],
    })
  );

  return (res.FaceRecords ?? []).map((r) => ({
    rekFaceId: r.Face!.FaceId!,
    boundingBox: r.Face!.BoundingBox ?? null,
  }));
}

export async function searchFacesByImage(eventId: string, imageBytes: Uint8Array) {
  const res = await rekognition.send(
    new SearchFacesByImageCommand({
      CollectionId: collectionId(eventId),
      Image: { Bytes: imageBytes },
      MaxFaces: 4096,
      FaceMatchThreshold: 70, // grup/uzak yüzler için daha toleranslı
    })
  );

  return (res.FaceMatches ?? []).map((m) => ({
    rekFaceId: m.Face!.FaceId!,
    externalImageId: m.Face!.ExternalImageId!,
    similarity: m.Similarity!,
  }));
}

export async function collectionExists(eventId: string): Promise<boolean> {
  const res = await rekognition.send(new ListCollectionsCommand({ MaxResults: 1000 }));
  return (res.CollectionIds ?? []).includes(collectionId(eventId));
}

// ─── Digital Delivery Collections ─────────────────────────────────────────────

export function digitalCollectionId(eventId: string) {
  return `eventface-digital-${eventId}`;
}

export async function createDigitalCollection(eventId: string) {
  const id = digitalCollectionId(eventId);
  try {
    await rekognition.send(new CreateCollectionCommand({ CollectionId: id }));
  } catch (err: unknown) {
    if ((err as { name?: string }).name !== "ResourceAlreadyExistsException") throw err;
  }
  return id;
}

export async function deleteDigitalCollection(eventId: string) {
  try {
    await rekognition.send(new DeleteCollectionCommand({ CollectionId: digitalCollectionId(eventId) }));
  } catch { /* ignore */ }
}

export async function indexDigitalFaces(eventId: string, s3Key: string, photoId: string): Promise<number> {
  const res = await rekognition.send(new IndexFacesCommand({
    CollectionId: digitalCollectionId(eventId),
    Image: { S3Object: { Bucket: process.env.S3_BUCKET_NAME!, Name: s3Key } },
    ExternalImageId: photoId,
    MaxFaces: 20,
    QualityFilter: "NONE",
    DetectionAttributes: [],
  }));
  return res.FaceRecords?.length ?? 0;
}

export async function searchDigitalFaces(
  eventId: string,
  imageBytes: Buffer
): Promise<{ photoId: string; similarity: number } | null> {
  try {
    const res = await rekognition.send(new SearchFacesByImageCommand({
      CollectionId: digitalCollectionId(eventId),
      Image: { Bytes: imageBytes },
      MaxFaces: 1,
      FaceMatchThreshold: 70,
    }));
    const match = res.FaceMatches?.[0];
    if (!match?.Face?.ExternalImageId) return null;
    return { photoId: match.Face.ExternalImageId, similarity: match.Similarity ?? 0 };
  } catch (err: unknown) {
    // Collection doesn't exist yet or no faces — not an error, just no match
    if ((err as { name?: string }).name === "ResourceNotFoundException") return null;
    if ((err as { name?: string }).name === "InvalidParameterException") return null;
    throw err;
  }
}
