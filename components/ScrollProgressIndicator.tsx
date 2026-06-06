"use client";
import React, { useEffect, useRef } from "react";

const ScrollProgressIndicator = () => {
	const scrollBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Indicator is `hidden md:block`, so on mobile it's invisible. Skip the scroll
		// listener there entirely — otherwise it forces a reflow every scroll frame
		// (reading scrollHeight/clientHeight/scrollY) for an element nobody can see,
		// which shows up as scroll jank on mobile.
		const mql = window.matchMedia("(min-width: 768px)");

		let ticking = false;
		let attached = false;

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

		const sync = () => {
			if (mql.matches && !attached) {
				window.addEventListener("scroll", handleScroll, { passive: true });
				attached = true;
				update();
			} else if (!mql.matches && attached) {
				window.removeEventListener("scroll", handleScroll);
				attached = false;
			}
		};

		sync();
		mql.addEventListener("change", sync);
		return () => {
			mql.removeEventListener("change", sync);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="hidden md:block fixed top-[50svh] right-[2%] -translate-y-1/2 w-1.5 h-[100px] rounded-full bg-background-light overflow-hidden">
			<div className="w-full bg-primary rounded-full h-full" ref={scrollBarRef}></div>
		</div>
	);
};

export default ScrollProgressIndicator;
