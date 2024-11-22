import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // // const session = await getServerSession();
  // console.log("🚀 ~ middleware ~ session:", session);

  // // const token = cookies().get("jwt");

  // const protectedRoutes = ["/", "/products", "/sales", "/users"];

  // if (protectedRoutes.includes(req.nextUrl.pathname)) {
  //   if (!session) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
