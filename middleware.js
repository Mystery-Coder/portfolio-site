export default function middleware(request) {
	const url = new URL(request.url);
	const userAgent = request.headers.get("user-agent") || "";
	const isCurl = userAgent.toLowerCase().includes("curl/");

	if (isCurl) {
		return new Response("Hello from Middleware! (curl)");
	}

	// Let all non-curl requests pass through to the app.
	return;
}
