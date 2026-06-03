"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Runs GSAP animations only for users who haven't requested reduced motion.
// Returns the MatchMedia so callers can chain a reduced-motion branch if needed.
export function withMotion(callback: gsap.ContextFunc): gsap.MatchMedia {
	const mm = gsap.matchMedia();
	mm.add("(prefers-reduced-motion: no-preference)", callback);
	return mm;
}
