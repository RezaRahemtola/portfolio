"use client";
import SectionTitle from "@/components/SectionTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Award, WavesLadder } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const passionsData = [
	{
		icon: Award,
		title: "Hackathons",
		value: 26300,
		prefix: "$",
		suffix: "+",
		unit: "cash prizes won",
		description:
			"I love the fast-paced environment of hackathons to push my creativity and technical skills to their limits. Whether I compete in solo or with friends, it's always a fun experience and an opportunity to connect with amazing people & companies (some of which I've ended up working with afterwards).",
	},
	{
		icon: WavesLadder,
		title: "Swimming",
		value: 105,
		prefix: "",
		suffix: "km",
		unit: "swam in the last year",
		description:
			"Swimming is something I really enjoy, it helps me clear my head and take a break from screens. It's one of the few activities where I can disconnect completely: no notifications, no distractions. I try to swim regularly, whether it's to stay active, reset after a long day, or just enjoy the quiet.",
	},
	{
		svg: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M144 16c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 16L96 32c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 0 32L60.2 96C49.1 96 40 105.1 40 116.2c0 2.5 .5 4.9 1.3 7.3L73.8 208 72 208c-13.3 0-24 10.7-24 24s10.7 24 24 24l4 0L60 384l136 0L180 256l4 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-1.8 0 32.5-84.5c.9-2.3 1.3-4.8 1.3-7.3c0-11.2-9.1-20.2-20.2-20.2L144 96l0-32 16 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16zM48 416L4.8 473.6C1.7 477.8 0 482.8 0 488c0 13.3 10.7 24 24 24l208 0c13.3 0 24-10.7 24-24c0-5.2-1.7-10.2-4.8-14.4L208 416 48 416zm288 0l-43.2 57.6c-3.1 4.2-4.8 9.2-4.8 14.4c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24c0-5.2-1.7-10.2-4.8-14.4L464 416l-128 0zM304 208l0 51.9c0 7.8 2.8 15.3 8 21.1L339.2 312 337 384l125.5 0-3.3-72 28.3-30.8c5.4-5.9 8.5-13.6 8.5-21.7l0-51.5c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16l0 16-24 0 0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16l0 16-24 0 0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zm80 96c0-8.8 7.2-16 16-16s16 7.2 16 16l0 32-32 0 0-32z" />
			</svg>
		),
		title: "Chess",
		value: 747,
		prefix: "",
		suffix: "",
		unit: "highest elo on chess.com",
		description:
			"I started playing chess recently (May 2025) and have been enjoying it casually to slowly grind. I mainly play rapid and blitz games on chess.com, and spend time doing puzzles to improve my tactical skills. It's a great mental exercise that complements my other activities.",
	},
];

const Passions = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const valueRefs = useRef<HTMLSpanElement[]>([]);

	// Animation for section entrance
	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 60%",
					end: "bottom 50%",
					toggleActions: "restart none none reverse",
					scrub: 1,
				},
			});

			tl.from(".passion-item", {
				y: 50,
				opacity: 0,
				stagger: 0.3,
			});
		},
		{ scope: containerRef },
	);

	// Animation for section exit
	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "bottom 50%",
					end: "bottom 20%",
					scrub: 1,
				},
			});

			tl.to(containerRef.current, {
				y: -150,
				opacity: 0,
			});
		},
		{ scope: containerRef },
	);

	// Number counters animation
	useGSAP(
		() => {
			valueRefs.current.forEach((ref) => {
				if (ref) {
					gsap.from(ref, {
						innerText: 0,
						duration: 2,
						snap: { innerText: 1 },
						scrollTrigger: {
							trigger: ref,
							start: "top 80%",
						},
					});
				}
			});
		},
		{ scope: containerRef },
	);

	return (
		<section className="py-section" id="passions">
			<div className="container" ref={containerRef}>
				<SectionTitle title="My Passions" />

				<div className="grid gap-14">
					{passionsData.map((passion, index) => {
						const IconComponent = passion.icon;

						return (
							<div key={passion.title} className="passion-item">
								<div className="flex items-center gap-2 mb-1">
									{passion.svg && (
										<div className="h-6 w-6 text-primary [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current">
											{passion.svg}
										</div>
									)}
									{IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
									<p className="text-xl text-muted-foreground">{passion.title}</p>
								</div>
								<div className="flex flex-wrap items-baseline gap-x-4 mt-3.5 mb-2.5 group">
									<p className="text-5xl font-anton leading-none transition-all duration-700 bg-linear-to-r from-primary to-foreground from-50% to-50% bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
										{passion.prefix}
										{/* @ts-expect-error ref*/}
										<span ref={(el) => (valueRefs.current[index] = el)}>{passion.value}</span>
										{passion.suffix}
									</p>
									<p className="text-xl text-muted-foreground">{passion.unit}</p>
								</div>
								<p className="text-lg text-muted-foreground max-w-[650px]">{passion.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Passions;
