import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

// https://clerk.com/docs/nextjs/get-started-with-nextjs

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};