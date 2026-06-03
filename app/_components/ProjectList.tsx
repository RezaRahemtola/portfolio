"use client";
import SectionTitle from "@/components/SectionTitle";
import { PROJECTS } from "@/lib/data";
import { withDesktopMotion } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import Project from "./Project";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const projectListRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			withDesktopMotion(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom",
						end: "top 80%",
						toggleActions: "restart none none reverse",
						scrub: 1,
					},
				});

				tl.from(containerRef.current, {
					y: 150,
					opacity: 0,
				});
			});
		},
		{ scope: containerRef },
	);

	return (
		<section className="pb-section" id="projects-showcase" aria-labelledby="projects-showcase-title">
			<div className="container">
				<SectionTitle id="projects-showcase-title" title="PROJECTS SHOWCASE" />

				<div className="group/projects" ref={containerRef}>
					<div className="flex flex-col max-md:gap-10" ref={projectListRef}>
						{PROJECTS.map((project, index) => (
							<Project index={index} project={project} key={project.slug} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectList;
