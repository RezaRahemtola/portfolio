"use client";
import SnakeGame from "@/components/SnakeGame";
import { useIsDesktop } from "@/lib/useIsDesktop";

// Mount the Snake easter egg only on desktop — it needs a laid-out canvas and
// keyboard input, so there's no point running it on mobile/touch.
const SnakeGameSection = () => {
	const isDesktop = useIsDesktop();
	if (!isDesktop) return null;

	return (
		<div className="w-full">
			<SnakeGame />
		</div>
	);
};

export default SnakeGameSection;
