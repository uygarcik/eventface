import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/admin/login",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/contact",
  "/api/debug",
  "/api/face-search",
  "/api/events/public",
  "/e/",
  "/_next",
  "/favicon",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p)) || pathname === "/") {
    return NextResponse.next();
  }

  // Protect everything else under /admin and /api
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Token exists — let the API route verify it fully
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
