"use client";
import { useEffect, useState } from "react";

const DEFAULT_QUERY = "(min-width: 768px)";

export function useIsDesktop(query: string = DEFAULT_QUERY): boolean {
	const [isDesktop, setIsDesktop] = useState(false);
	useEffect(() => {
		const mql = window.matchMedia(query);
		const update = () => setIsDesktop(mql.matches);
		update();
		mql.addEventListener("change", update);
		return () => mql.removeEventListener("change", update);
	}, [query]);
	return isDesktop;
}
