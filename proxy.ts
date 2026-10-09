import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();
export const config = {
  matcher: [
    "/members(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/(.*)",
    "/__clerk/:path*",
  ],
};
