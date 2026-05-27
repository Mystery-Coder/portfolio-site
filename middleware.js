export default function middleware(request) {
	const userAgent = request.headers.get("user-agent") || "";
	const isCurl = userAgent.toLowerCase().includes("curl/");

	if (isCurl) {
		return Response.redirect(
			"https://github-stats-backend-production.up.railway.app/api/curl/Mystery-Coder",
			302,
		);
	}

	// Pass through to the Vite app for browsers
	return;
}
