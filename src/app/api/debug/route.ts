import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const allCookies = req.cookies.getAll();
  return NextResponse.json({
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + "..." : null,
    cookieCount: allCookies.length,
    cookieNames: allCookies.map((c) => c.name),
  });
}

// Also allow setting a test cookie to verify cookies work at all
export async function POST(req: NextRequest) {
  const res = NextResponse.json({ set: true });
  res.cookies.set("test_cookie", "hello123", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 300,
  });
  return res;
}
