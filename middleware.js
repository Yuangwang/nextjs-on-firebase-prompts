// middleware.js

import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/middleware-redirect") {
    return NextResponse.redirect(
      new URL("/middleware-redirect-destination", req.url)
    );
  }
}
