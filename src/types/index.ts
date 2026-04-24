export interface AdminPayload {
  adminId: string;
  email: string;
}

export interface EventWithCounts {
  id: string;
  name: string;
  date: Date;
  location: string | null;
  qrToken: string;
  createdAt: Date;
  _count: {
    photos: number;
  };
}

export interface PhotoWithFaces {
  id: string;
  s3Key: string;
  filename: string;
  createdAt: Date;
  faceIds: { rekFaceId: string }[];
}

export interface FaceSearchResult {
  photoId: string;
  s3Key: string;
  filename: string;
  similarity: number;
}
