"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
	const mql = window.matchMedia(QUERY);
	mql.addEventListener("change", callback);
	return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
	return window.matchMedia(QUERY).matches;
}

// Assume motion is allowed during SSR/first paint; corrected on hydration.
function getServerSnapshot(): boolean {
	return false;
}

// Reactively tracks the user's prefers-reduced-motion setting (SSR-safe).
export function useReducedMotion(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
