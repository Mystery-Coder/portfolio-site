const USER = "Mystery-Coder";
const EXCLUDED_REPOS = ["XAI-AIML", "ML-Stress-Detection", "XAI-Project"];

export default async function middleware(request) {
	const userAgent = request.headers.get("user-agent") || "";
	const isCurl = userAgent.toLowerCase().includes("curl/");
	if (!isCurl) return;

	try {
		const [pinnedRes, statsRes] = await Promise.all([
			fetch(`https://github-stats-backend-production.up.railway.app/api/pinned/${USER}`),
			fetch(`https://github-stats-backend-production.up.railway.app/api/stats/${USER}`),
		]);

		if (!pinnedRes.ok || !statsRes.ok) {
			return new Response("Hello from Middleware! (curl)\n", {
				headers: { "content-type": "text/plain" },
			});
		}

		const pinnedData = await pinnedRes.json();
		const statsData = await statsRes.json();

		const repos = statsData.user?.repositories?.nodes || [];
		const langMap = {};
		for (const repo of repos) {
			if (repo.isFork) continue;
			if (EXCLUDED_REPOS.includes(repo.name)) continue;
			for (const e of repo.languages?.edges || []) {
				langMap[e.node.name] = (langMap[e.node.name] || 0) + e.size;
			}
		}
		const totalSize = Object.values(langMap).reduce((a, b) => a + b, 0);
		const topLangs = Object.entries(langMap)
			.map(([n, s]) => ({ n, p: (s / totalSize) * 100 }))
			.sort((a, b) => b.p - a.p)
			.slice(0, 6);

		const pinned = pinnedData.user?.pinnedItems?.edges?.map((e) => e.node) || [];

		const R = "\x1b[0m";
		const B = "\x1b[1m";
		const C = "\x1b[36m";
		const G = "\x1b[32m";
		const Y = "\x1b[33m";
		const M = "\x1b[35m";
		const Bu = "\x1b[34m";
		const W = "\x1b[37m";
		const O = "\x1b[38;5;208m";

		const lc = {
			JavaScript: Y, TypeScript: "\x1b[94m", Python: "\x1b[93m",
			HTML: "\x1b[91m", CSS: M, Rust: "\x1b[96m", Go: Bu,
			Java: "\x1b[91m", C: "\x1b[94m", "C++": "\x1b[94m",
			Ruby: "\x1b[91m", Shell: G, "Jupyter Notebook": O,
		};

		const WIDTH = 64;

		const hash = (s) => {
			let a = 0, b = 0, c = 0;
			for (let i = 0; i < s.length; i++) {
				const ch = s.charCodeAt(i);
				a = ((a << 5) - a) + ch;
				b = ((b << 7) - b) + ch * 31;
				c = ((c << 3) - c) + ch * 17;
				a |= 0; b |= 0; c |= 0;
			}
			return [a, b, c];
		};

		const identicon = (seed, color) => {
			const shades = ["\u2591", "\u2592", "\u2593", "\u2588"];
			const [h1, h2, h3] = hash(seed);
			const size = 9;
			const half = Math.ceil(size / 2);
			const rows = [];
			for (let y = 0; y < size; y++) {
				const left = [];
				for (let x = 0; x < half; x++) {
					const v = Math.abs(h1 * (x + 1) * 7 + h2 * (y + 1) * 13 + h3 * (x * y + 1) * 3);
					const idx = v % 100 < 15 ? 0 : v % 100 < 45 ? 1 : v % 100 < 75 ? 2 : 3;
					left.push(shades[idx]);
				}
				const mirror = left.slice(0, size % 2 === 0 ? left.length : left.length - 1).reverse();
				const plain = left.join("") + mirror.join("");
				rows.push({ plain, colored: color + plain + R });
			}
			return rows;
		};

		const f = (...parts) => {
			let plain = "";
			let colored = "";
			for (const p of parts) {
				if (typeof p === "string") {
					plain += p;
					colored += p;
				} else if (Array.isArray(p)) {
					plain += p[0];
					colored += (p[1] || "") + p[0] + R;
				}
			}
			const pad = WIDTH - plain.length;
			return `${C}║${R}${colored}${" ".repeat(Math.max(0, pad))}${C}║${R}\n`;
		};

		const ct = (txt, ansi) => {
			const pad = WIDTH - txt.length;
			const l = Math.floor(pad / 2);
			const r = pad - l;
			return ansi ? f(" ".repeat(l), [txt, ansi], " ".repeat(r)) : f(" ".repeat(l), txt, " ".repeat(r));
		};

		const gap = () => f("");

		const icolor = topLangs.length ? (lc[topLangs[0].n] || C) : C;
		const avatar = identicon(USER, `${B}${icolor}`);

		let out = "\n";
		out += `${C}╔${"═".repeat(WIDTH)}╗${R}\n`;
		out += gap();
		out += ct(USER, `${B}${G}`);
		out += ct("Full-Stack Developer & AI Enthusiast", W);
		out += gap();
		for (const row of avatar) {
			const p = Math.floor((WIDTH - row.plain.length) / 2);
			out += f(" ".repeat(p), [row.plain, `${B}${icolor}`], " ".repeat(WIDTH - p - row.plain.length));
		}
		out += gap();

		out += f("  ", ["*  Pinned Repos", `${B}${Bu}`]);
		out += f("  ", ["\u2500".repeat(48)]);
		for (const repo of pinned.slice(0, 4)) {
			const rname = repo.name.length > 24 ? repo.name.slice(0, 21) + "..." : repo.name.padEnd(24);
			const lang = repo.primaryLanguage?.name || "";
			const sc = repo.stargazerCount || 0;
			const langC = lc[lang] || W;
			out += f("    ", [rname, G], "  ", ["* ".concat(String(sc).padStart(2)), Y], "    ", [lang, langC]);
		}
		out += gap();

		if (topLangs.length) {
			out += f("  ", ["~  Top Languages", `${B}${M}`]);
			out += f("  ", ["\u2500".repeat(48)]);
			const maxPct = topLangs[0].p;
			const barMax = 28;
			const nw = 16;
			for (const lang of topLangs) {
				const name = lang.n.length > nw ? lang.n.slice(0, nw - 1) + "\u2026" : lang.n.padEnd(nw);
				const barLen = Math.max(1, Math.round((lang.p / maxPct) * barMax));
				const bar = "\u2588".repeat(barLen);
				const pct = `${lang.p.toFixed(1)}%`.padStart(5);
				const c = lc[lang.n] || W;
				out += f("    ", [name, c], " ", [bar, c], " ".repeat(barMax - barLen), " ".concat(pct));
			}
			out += gap();
		}

		out += f("  ", ["->  https://github.com/".concat(USER), `${B}${W}`]);
		out += gap();
		out += `${C}╚${"═".repeat(WIDTH)}╝${R}\n`;

		return new Response(out, {
			headers: { "content-type": "text/plain; charset=utf-8" },
		});
	} catch (err) {
		return new Response("Hello from Middleware! (curl)\n", {
			headers: { "content-type": "text/plain" },
		});
	}
}
