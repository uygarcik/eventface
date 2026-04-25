import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/middleware";
import { hashPassword } from "@/lib/auth";

// GET — list all clients
export async function GET(req: NextRequest) {
  const { error } = requireSuperAdmin(req);
  if (error) return error;

  const clients = await prisma.admin.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, email: true, name: true, company: true,
      active: true, createdAt: true,
      _count: { select: { events: true } },
    },
  });

  return NextResponse.json(clients);
}

// POST — create a new client
export async function POST(req: NextRequest) {
  const { error } = requireSuperAdmin(req);
  if (error) return error;

  const { email, password, name, company } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email ve şifre zorunlu" }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Bu email zaten kayıtlı" }, { status: 409 });
  }

  const hashed = await hashPassword(password);
  const client = await prisma.admin.create({
    data: { email, password: hashed, name, company, role: "CLIENT" },
    select: { id: true, email: true, name: true, company: true, active: true, createdAt: true },
  });

  return NextResponse.json(client, { status: 201 });
}
