"use client";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

// Wraps the app in Lenis smooth-scroll, but only on desktop and only for users who
// haven't requested reduced motion. On mobile Lenis' root styling interferes with
// native touch / momentum scrolling, so we leave the browser's scroll alone.
// Desktop is assumed during SSR/first paint so the common case never remounts.
const SmoothScroll = ({ children }: { children: ReactNode }) => {
	const reducedMotion = useReducedMotion();
	const isDesktop = useIsDesktop("(min-width: 768px)", true);

	if (reducedMotion || !isDesktop) {
		return <>{children}</>;
	}

	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
			{children}
		</ReactLenis>
	);
};

export default SmoothScroll;
