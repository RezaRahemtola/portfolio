"use client";
import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

// Wraps the app in Lenis smooth-scroll, but disables it for users who request
// reduced motion (Lenis hijacks native scrolling, which CSS alone can't undo).
const SmoothScroll = ({ children }: { children: ReactNode }) => {
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReducedMotion(mql.matches);

		const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	if (reducedMotion) {
		return <>{children}</>;
	}

	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
			{children}
		</ReactLenis>
	);
};

export default SmoothScroll;
