"use client";
import SectionTitle from "@/components/SectionTitle";
import { MY_EXPERIENCE } from "@/lib/data";
import { useScrollExitAnimation, withMotion } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			withMotion(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top 60%",
						end: "bottom 50%",
						toggleActions: "restart none none reverse",
						scrub: 1,
					},
				});

				tl.from(".experience-item", {
					y: 50,
					opacity: 0,
					stagger: 0.3,
				});
			});
		},
		{ scope: containerRef },
	);

	useScrollExitAnimation(containerRef);

	return (
		<section className="py-section" id="experience" aria-labelledby="experience-title">
			<div className="container" ref={containerRef}>
				<SectionTitle id="experience-title" title="My Experience" />

				<div className="grid gap-14">
					{MY_EXPERIENCE.map((item) => (
						<div key={item.title} className="experience-item">
							<p className="text-xl text-muted-foreground">{item.company}</p>
							<h3 className="text-5xl font-anton leading-none mt-3.5 mb-2.5">{item.title}</h3>
							<p className="text-lg text-muted-foreground">{item.duration}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experiences;
