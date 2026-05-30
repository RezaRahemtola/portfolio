"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "preloaderShown";

const Preloader = () => {
	const preloaderRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	// Skip the intro and reveal content immediately
	const dismiss = useCallback(() => {
		const el = preloaderRef.current;
		if (!el) return;
		timelineRef.current?.kill();
		gsap.to(el, { autoAlpha: 0, duration: 0.3 });
		sessionStorage.setItem(SESSION_KEY, "true");
	}, []);

	useGSAP(
		() => {
			const el = preloaderRef.current;
			if (!el) return;

			// Only play once per session, and never under reduced motion
			const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "true";
			const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			if (alreadyShown || prefersReduced) {
				gsap.set(el, { autoAlpha: 0 });
				return;
			}

			const tl = gsap.timeline({
				defaults: {
					ease: "power1.inOut",
				},
				onComplete: () => sessionStorage.setItem(SESSION_KEY, "true"),
			});
			timelineRef.current = tl;

			tl.to(".name-text span", {
				y: 0,
				stagger: 0.05,
				duration: 0.2,
			});

			tl.to(".preloader-item", {
				delay: 1,
				y: "100%",
				duration: 0.5,
				stagger: 0.1,
			})
				.to(".name-text span", { autoAlpha: 0 }, "<0.5")
				.to(
					el,
					{
						autoAlpha: 0,
					},
					"<1",
				);
		},
		{ scope: preloaderRef },
	);

	// Let users skip the intro with the Escape key
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") dismiss();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [dismiss]);

	return (
		<div className="fixed inset-0 z-6 flex" ref={preloaderRef} aria-hidden="true" onClick={dismiss}>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>
			<div className="preloader-item h-full w-[10%] bg-black"></div>

			<p className="name-text flex text-[20vw] lg:text-[200px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden">
				<span className="inline-block translate-y-full">R</span>
				<span className="inline-block translate-y-full">E</span>
				<span className="inline-block translate-y-full">Z</span>
				<span className="inline-block translate-y-full">A</span>
			</p>
		</div>
	);
};

export default Preloader;
