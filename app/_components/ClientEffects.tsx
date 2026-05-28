"use client";
import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("@/components/MatrixRain"), { ssr: false, loading: () => null });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false, loading: () => null });

export default function ClientEffects() {
	return (
		<>
			<CustomCursor />
			<MatrixRain />
		</>
	);
}
