import { useState, useEffect } from "react";

export default function useDarkMode() {
	// Initialize from <html> or system preference
	const [darkMode, setDarkMode] = useState(
		() =>
			document.documentElement.classList.contains("dark") ||
			window.matchMedia("(prefers-color-scheme: dark)").matches
	);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return [darkMode, setDarkMode];
}
