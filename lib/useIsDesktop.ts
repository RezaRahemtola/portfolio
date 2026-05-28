"use client";
import { useEffect, useState } from "react";

const QUERY = "(min-width: 768px)";

export function useIsDesktop(): boolean {
	const [isDesktop, setIsDesktop] = useState(false);
	useEffect(() => {
		const mql = window.matchMedia(QUERY);
		const update = () => setIsDesktop(mql.matches);
		update();
		mql.addEventListener("change", update);
		return () => mql.removeEventListener("change", update);
	}, []);
	return isDesktop;
}
