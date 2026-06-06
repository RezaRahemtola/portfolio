"use client";
import Button from "@/components/Button";
import { GENERAL_INFO } from "@/lib/data";
import { useIsDesktop } from "@/lib/useIsDesktop";
import dynamic from "next/dynamic";

const Laptop = dynamic(() => import("./Laptop"), { ssr: false, loading: () => null });

const Banner = () => {
	// Match the canvas' `lg:block` visibility so WebGL never inits on the 768-1023px range where it stays hidden
	const isDesktop = useIsDesktop("(min-width: 1024px)");

	return (
		<section className="relative overflow-hidden" id="banner" aria-labelledby="banner-title">
			{isDesktop && (
				<div className="absolute right-0 top-0 w-1/2 h-full z-1">
					<Laptop />
				</div>
			)}
			<div className="container h-[100svh] min-h-[530px] max-md:pb-10 max-md:pt-28 flex items-center max-md:flex-col md:justify-between max-md:justify-start">
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
						<p className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">12+</p>
						<p className="text-muted-foreground">Completed Projects</p>
					</div>
					<div>
						<p className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">7k+</p>
						<p className="text-muted-foreground">GitHub Commits</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
