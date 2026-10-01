import { NextResponse, type NextRequest } from "next/server";

/**
 * Redirects that used to live in a Vercel Edge Function.
 *
 * Next.js 16 renamed the `middleware` convention to `proxy` and runs it on the
 * Node.js runtime. The URLs are inlined rather than imported from `@/lib/site`
 * because proxy runs outside the app's module graph.
 */
const ASCII_ART_URL =
  "https://github-stats-backend-production.up.railway.app/api/curl/Mystery-Coder";
const BLOG_BASE_URL = "https://mystery-coder.github.io/blog/";

const BLOG_POST_PATTERN = /^\/blog\/posts\/([^/]+)\/?$/;

export function proxy(request: NextRequest) {
  // `curl srikar.is-a.dev` gets an ASCII-art GitHub summary.
  const userAgent = request.headers.get("user-agent") ?? "";
  if (userAgent.toLowerCase().includes("curl/")) {
    return NextResponse.redirect(ASCII_ART_URL, 302);
  }

  const { pathname } = request.nextUrl;

  // A specific post keeps its slug on the GitHub Pages blog.
  const postMatch = pathname.match(BLOG_POST_PATTERN);
  const postSlug = postMatch?.[1];
  if (postSlug) {
    return NextResponse.redirect(`${BLOG_BASE_URL}posts/${postSlug}`, 302);
  }

  // Any other /blog path goes to the blog root.
  if (pathname.includes("blog")) {
    return NextResponse.redirect(BLOG_BASE_URL, 302);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals, image optimization and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|me\\.webp|robots\\.txt|sitemap\\.xml).*)",
  ],
};
