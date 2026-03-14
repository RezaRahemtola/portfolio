"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const ParticleBackground = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(window.innerWidth < 768 ? 30 : 100);
	}, []);

	useGSAP(
		() => {
			if (!containerRef.current || count === 0) return;

			const particles = containerRef.current.querySelectorAll(".particle");
			particles.forEach((particle) => {
				gsap.set(particle, {
					width: Math.random() * 3 + 1,
					height: Math.random() * 3 + 1,
					opacity: Math.random(),
					left: Math.random() * window.innerWidth,
					top: Math.random() * (window.innerHeight + 1),
				});

				gsap.to(particle, {
					y: window.innerHeight,
					duration: Math.random() * 10 + 10,
					opacity: 0,
					repeat: -1,
					ease: "none",
				});
			});
		},
		{ scope: containerRef, dependencies: [count] },
	);

	if (count === 0) return null;

	return (
		<div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none">
			{[...Array(count)].map((_, i) => (
				<div key={i} className="particle absolute rounded-full bg-white" />
			))}
		</div>
	);
};

export default ParticleBackground;
