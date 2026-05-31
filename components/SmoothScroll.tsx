"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

// Wraps the app in Lenis smooth-scroll, but disables it for users who request
// reduced motion (Lenis hijacks native scrolling, which CSS alone can't undo).
const SmoothScroll = ({ children }: { children: ReactNode }) => {
	const reducedMotion = useReducedMotion();

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
