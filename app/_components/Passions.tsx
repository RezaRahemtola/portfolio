"use client";
import SectionTitle from "@/components/SectionTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Award, WavesLadder } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Passions = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const hackathonRef = useRef<HTMLSpanElement>(null);
	const swimmingRef = useRef<HTMLSpanElement>(null);

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
			// Animate hackathon prize money
			gsap.from(hackathonRef.current, {
				innerText: 0,
				duration: 2,
				snap: { innerText: 1 },
				scrollTrigger: {
					trigger: hackathonRef.current,
					start: "top 80%",
				},
			});

			// Animate swimming distance
			gsap.from(swimmingRef.current, {
				innerText: 0,
				duration: 2,
				snap: { innerText: 1 },
				scrollTrigger: {
					trigger: swimmingRef.current,
					start: "top 80%",
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<section className="py-section" id="passions">
			<div className="container" ref={containerRef}>
				<SectionTitle title="My Passions" />

				<div className="grid gap-14">
					<div className="passion-item">
						<div className="flex items-center gap-2 mb-1">
							<Award className="h-6 w-6 text-primary" />
							<p className="text-xl text-muted-foreground">Hackathons</p>
						</div>
						<div className="flex flex-wrap items-baseline gap-x-4 mt-3.5 mb-2.5 group">
							<p className="text-5xl font-anton leading-none transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
								$<span ref={hackathonRef}>23800</span>+
							</p>
							<p className="text-xl text-muted-foreground">cash prizes won</p>
						</div>
						<p className="text-lg text-muted-foreground max-w-[650px]">
							I love the fast-paced environment of hackathons to push my creativity and technical skills to their
							limits. Whether I compete in solo or with friends, it&apos;s always a fun experience and an opportunity to
							connect with amazing people & companies (some of which I&apos;ve ended up working for afterwards).
						</p>
					</div>

					<div className="passion-item">
						<div className="flex items-center gap-2 mb-1">
							<WavesLadder className="h-6 w-6 text-primary" />
							<p className="text-xl text-muted-foreground">Swimming</p>
						</div>
						<div className="flex flex-wrap items-baseline gap-x-4 mt-3.5 mb-2.5 group">
							<p className="text-5xl font-anton leading-none transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
								<span ref={swimmingRef}>105</span>km
							</p>
							<p className="text-xl text-muted-foreground">swam in the last year</p>
						</div>
						<p className="text-lg text-muted-foreground max-w-[650px]">
							Swimming is something I really enjoy, it helps me clear my head and take a break from screens. It&apos;s
							one of the few activities where I can disconnect completely: no notifications, no distractions. I try to
							swim regularly, whether it&apos;s to stay active, reset after a long day, or just enjoy the quiet.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Passions;
