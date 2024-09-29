import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("request received in middleware", request.method, request.url);
    // actual middleware implementation is not relevant for this example since the problem is
    // that the request is never received by the middleware or the endpoint that it is sent to
    return NextResponse.next();
}

export const config = {
	matcher: [
	  // run on everything except static files
	  '/((?!_next/static|_next/image|favicon.ico).*)',
	],
  }

