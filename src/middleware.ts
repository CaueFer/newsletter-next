import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const protectedRoutes = ["/admin", "/admin/:path*"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.replace("/:path*", ""))
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

      return NextResponse.next();
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
