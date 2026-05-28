"use client";
import dynamic from "next/dynamic";
import { useIsDesktop } from "@/lib/useIsDesktop";

const MatrixRain = dynamic(() => import("@/components/MatrixRain"), { ssr: false, loading: () => null });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false, loading: () => null });

export default function ClientEffects() {
	const isDesktop = useIsDesktop();
	if (!isDesktop) return null;
	return (
		<>
			<CustomCursor />
			<MatrixRain />
		</>
	);
}
