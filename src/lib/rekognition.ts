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
      MaxFaces: 10,
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
