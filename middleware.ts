import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "universal-cookie";

type UserRole = "Admin" | "Freemium";

interface LoggedInUser {
  role: UserRole;
}

export function middleware(request: NextRequest) {
  const cookies = new Cookies(request.headers.get("cookie"));
  const loggedInUser = cookies.get("param-lms-user") as
    | LoggedInUser
    | undefined;
  const path = request.nextUrl.pathname;

  if (path === "/auth/login") {
    return NextResponse.next();
  }
  if (path === "/auth/register") {
    return NextResponse.next();
  }
  if (path === "/auth/login/reset-password") {
    return NextResponse.next();
  }

  if (!loggedInUser) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = loggedInUser.role;

  if (userRole === "Admin") {
    if (path.startsWith("/protected/home/projects")) {
      return NextResponse.redirect(
        new URL("/protected/home/courses", request.url)
      );
    }
    return NextResponse.next();
  } else if (userRole === "Freemium") {
    if (path.startsWith("/protected/home/courses")) {
      return NextResponse.redirect(
        new URL("/protected/home/projects", request.url)
      );
    }
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|/).*)"],
};