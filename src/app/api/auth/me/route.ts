import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const payload = verifyToken(token);
    return NextResponse.json({ adminId: payload.adminId, email: payload.email });
  } catch {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
}
