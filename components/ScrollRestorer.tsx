"use client";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Lenis (desktop) keeps its own scroll target across the persistent App Router
// layout, so navigating doesn't reset it. This restores browser-like behaviour:
// a new navigation (clicking a project) jumps to the top, while back/forward
// restores the scroll position of the page you're returning to.
// On mobile there's no Lenis provider, so useLenis is undefined and native
// scroll restoration is left untouched.
const scrollPositions = new Map<string, number>();
let isBackForward = false;
let hasNavigated = false;

// Whether at least one in-app navigation has happened, i.e. router.back() can
// return to a page within the app rather than leaving the site.
export const hasAppHistory = () => hasNavigated;

if (typeof window !== "undefined") {
	window.addEventListener("popstate", () => {
		isBackForward = true;
	});
}

const ScrollRestorer = () => {
	const pathname = usePathname();
	const prevPath = useRef<string | null>(null);

	// Continuously record the active path's scroll position via Lenis' scroll event.
	const lenis = useLenis((instance) => scrollPositions.set(pathname, instance.scroll), [pathname]);

	useEffect(() => {
		// Ignore the initial mount and re-runs that aren't real navigations (e.g.
		// when the Lenis instance first becomes available).
		const navigated = prevPath.current !== null && prevPath.current !== pathname;
		prevPath.current = pathname;
		if (!navigated) return;

		hasNavigated = true;
		const target = isBackForward ? (scrollPositions.get(pathname) ?? 0) : 0;
		isBackForward = false;
		if (lenis) {
			lenis.scrollTo(target, { immediate: true, force: true });
		}
	}, [pathname, lenis]);

	return null;
};

export default ScrollRestorer;
