import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  //   const token = localStorage.getItem("access_token");

  const protectedRoutes = ["/", "/products", "/sales", "/users"];
  console.log(req.nextUrl.pathname);
  console.log(token);

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      console.log("testess");

      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
