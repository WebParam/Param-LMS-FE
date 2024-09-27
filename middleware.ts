import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'universal-cookie';

export function middleware(request: NextRequest) {
  const cookies = new Cookies(request.headers.get('cookie'));
  const loggedInUser = cookies.get('param-lms-user');

  if (!loggedInUser) {
    //return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|/).*)'],
};
  
