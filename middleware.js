import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  // agar user admin panel access kar raha hai
  if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // agar normal user dashboard access kare
  if (req.nextUrl.pathname.startsWith("/dashboard/user")) {
    if (!token || role !== "user") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // ye sirf dashboard pages pr apply hoga
};
