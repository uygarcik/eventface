import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email ve şifre gerekli" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !admin.active) {
      return NextResponse.json({ error: "Geçersiz bilgiler" }, { status: 401 });
    }

    const valid = await comparePassword(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Geçersiz bilgiler" }, { status: 401 });
    }

    const token = signToken({ adminId: admin.id, email: admin.email, role: admin.role });

    const res = NextResponse.json({ success: true, email: admin.email, role: admin.role });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
