"use client";
import Button from "@/components/Button";
import { GENERAL_INFO } from "@/lib/data";
import { useIsDesktop } from "@/lib/useIsDesktop";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Laptop = dynamic(() => import("./Laptop"), { ssr: false, loading: () => null });

const Banner = () => {
	// Match the canvas' `lg:block` visibility so WebGL never inits on the 768-1023px range where it stays hidden
	const isDesktop = useIsDesktop("(min-width: 1024px)");

	// Pin the hero to a fixed pixel height measured ONCE on mount (and only on width /
	// orientation changes), exposed as --hero-h. On mobile the address bar shrinks/grows
	// the viewport — and with it every vh/svh/dvh unit — as you scroll, so a CSS viewport
	// height makes the hero (and the gap and sections after it) keep resizing. Measuring
	// once in px and never updating on those height-only changes keeps the hero, the gap
	// after it, and everything below perfectly still. Falls back to 100svh before JS runs.
	useEffect(() => {
		let lastWidth = window.innerWidth;
		const set = () => document.documentElement.style.setProperty("--hero-h", `${window.innerHeight}px`);
		const onResize = () => {
			// Ignore height-only resizes (the address bar); only re-measure on a real width change.
			if (window.innerWidth === lastWidth) return;
			lastWidth = window.innerWidth;
			set();
		};
		set();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<section className="relative overflow-hidden" id="banner" aria-labelledby="banner-title">
			{isDesktop && (
				<div className="absolute right-0 top-0 w-1/2 h-full z-1">
					<Laptop />
				</div>
			)}
			{/* min-height (not height): the section is overflow-hidden, so if --hero-h ever
			    locks shorter than the content (e.g. a pull-to-refresh where innerHeight is
			    briefly under-reported) a fixed height would clip the metrics. min-height keeps
			    the hero at least the locked height but grows to fit content, so it never clips. */}
			<div
				className="container max-md:pb-10 max-md:pt-28 flex items-center max-md:flex-col md:justify-between max-md:justify-start"
				style={{ minHeight: "var(--hero-h, 100svh)" }}
			>
				<div className="flex flex-col items-start max-w-[544px]">
					<h1 id="banner-title" className="leading-[.95] text-6xl sm:text-[80px] font-anton">
						<span className="text-primary">FULL STACK</span>
						<br /> <span className="ml-4">DEVELOPER</span>
					</h1>
					<p className="mt-6 text-lg text-muted-foreground">
						Hi! I&apos;m <span className="font-medium text-foreground">Reza</span>, a passionate Full Stack Developer
						with 3+ years of experience turning ideas to realities - from sleek frontends to robust backends.
					</p>
					<Button
						as="link"
						target="_blank"
						rel="noopener noreferrer"
						href={`mailto:${GENERAL_INFO.email}`}
						variant="primary"
						className="mt-9"
					>
						Hire Me
					</Button>
				</div>

				<div className="md:absolute bottom-[10%] right-[4%] max-md:mt-12 flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
					<div>
						<p className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">3+</p>
						<p className="text-muted-foreground">Years of Experience</p>
					</div>
					<div>
						<p className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">10+</p>
						<p className="text-muted-foreground">Completed Projects</p>
					</div>
					<div>
						<p className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">12k+</p>
						<p className="text-muted-foreground">GitHub Commits</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
