"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Runs GSAP animations only for users who haven't requested reduced motion.
// Returns the MatchMedia so callers can chain a reduced-motion branch if needed.
export function withMotion(callback: gsap.ContextFunc): gsap.MatchMedia {
	const mm = gsap.matchMedia();
	mm.add("(prefers-reduced-motion: no-preference)", callback);
	return mm;
}

// The shared "slide the whole section up and fade out as it scrolls off" exit effect.
export function useScrollExitAnimation(
	scope: RefObject<HTMLElement | null>,
	{ end = "bottom 20%" }: { end?: string } = {},
) {
	useGSAP(
		() => {
			withMotion(() => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: scope.current,
							start: "bottom 50%",
							end,
							scrub: 1,
						},
					})
					.to(scope.current, { y: -150, opacity: 0 });
			});
		},
		{ scope },
	);
}
