
/*
// Kept for REFERENCE
import { NextResponse } from "next/server";
export function middleware(request) {
  // this will get applied for every single route unless we try to define specific routes with matcher

  console.log(request);

  return NextResponse.redirect(new URL('/about', request.url));
}
*/

// the auth function that we export from the next-auth can be used as a middleware
import { auth } from '@/app/_lib/auth';
export const middleware = auth;


export const config = {
  // matcher: ['/account', '/cabins'], // this makes the user to be redirected to /about page whenever he tries to access  /account and /cabins route
  matcher: ['/account'], // protecting only the /account
};