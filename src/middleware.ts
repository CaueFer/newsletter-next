import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave-default";
const protectedRoutes = ["/admin", "/admin/:path*"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.replace("/:path*", ""))
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);

      return NextResponse.next();
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
