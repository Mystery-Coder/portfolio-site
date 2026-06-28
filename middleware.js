export default function middleware(request) {
	const userAgent = request.headers.get("user-agent") || "";
	const isCurl = userAgent.toLowerCase().includes("curl/");
	const pathname = new URL(request.url).pathname;
	const postMatch = pathname.match(/^\/blog\/posts\/([^/]+)\/?$/);
	const isBlog = pathname.includes("blog");

	if (isCurl) {
		return Response.redirect(
			"https://github-stats-backend-production.up.railway.app/api/curl/Mystery-Coder",
			302,
		);
	}

	if (postMatch) {
		const postName = postMatch[1];
		return Response.redirect(
			`https://mystery-coder.github.io/blog/posts/${postName}`,
			302,
		);
	}

	if (isBlog) {
		return Response.redirect("https://mystery-coder.github.io/blog/", 302);
	}

	// Pass through to the Vite app for browsers
	return;
}
