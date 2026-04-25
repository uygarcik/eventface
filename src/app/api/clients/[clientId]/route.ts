import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/middleware";
import { hashPassword } from "@/lib/auth";

// PATCH — update client (toggle active, reset password)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ clientId: string }> }) {
  const { error } = requireSuperAdmin(req);
  if (error) return error;

  const { clientId } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (typeof body.active === "boolean") data.active = body.active;
  if (typeof body.name === "string") data.name = body.name;
  if (typeof body.company === "string") data.company = body.company;
  if (typeof body.password === "string" && body.password.length >= 8) {
    data.password = await hashPassword(body.password);
  }

  const client = await prisma.admin.update({
    where: { id: clientId, role: "CLIENT" },
    data,
    select: { id: true, email: true, name: true, company: true, active: true },
  });

  return NextResponse.json(client);
}

// DELETE — remove client and all their data
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ clientId: string }> }) {
  const { error } = requireSuperAdmin(req);
  if (error) return error;

  const { clientId } = await params;

  await prisma.admin.delete({ where: { id: clientId, role: "CLIENT" } });
  return NextResponse.json({ success: true });
}
