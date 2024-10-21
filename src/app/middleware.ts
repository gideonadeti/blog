import { NextRequest, NextResponse } from "next/server";

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Origin": "*", // Allow all origins
};

export function middleware(req: NextRequest) {
  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsOptions });
  }

  // Handle actual requests
  const response = NextResponse.next();

  // Set CORS headers for all origins
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
