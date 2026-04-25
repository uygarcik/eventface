import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return { error: NextResponse.json({ error: "Yetkisiz" }, { status: 401 }), payload: null };
  }
  try {
    const payload = verifyToken(token);
    return { error: null, payload };
  } catch {
    return { error: NextResponse.json({ error: "Yetkisiz" }, { status: 401 }), payload: null };
  }
}

export function requireSuperAdmin(req: NextRequest) {
  const { error, payload } = requireAdmin(req);
  if (error) return { error, payload: null };
  if (payload!.role !== "SUPER_ADMIN") {
    return { error: NextResponse.json({ error: "Yetkisiz" }, { status: 403 }), payload: null };
  }
  return { error: null, payload };
}
