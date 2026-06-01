"use client";
import React, { useEffect, useRef } from "react";

const ScrollProgressIndicator = () => {
	const scrollBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let ticking = false;

		const update = () => {
			ticking = false;
			if (!scrollBarRef.current) return;
			const { scrollHeight, clientHeight } = document.documentElement;
			const scrollableHeight = scrollHeight - clientHeight;
			const scrollProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

			scrollBarRef.current.style.transform = `translateY(-${100 - scrollProgress}%)`;
		};

		// Coalesce rapid scroll events into one read/write per frame.
		const handleScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};

		update();

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="fixed top-[50svh] right-[2%] -translate-y-1/2 w-1.5 h-[100px] rounded-full bg-background-light overflow-hidden">
			<div className="w-full bg-primary rounded-full h-full" ref={scrollBarRef}></div>
		</div>
	);
};

export default ScrollProgressIndicator;
