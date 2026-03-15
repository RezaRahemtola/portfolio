"use client";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const MODES = ["default", "fireflies", "confetti", "bubbles"] as const;
type ParticleMode = (typeof MODES)[number];

const CONFETTI_COLORS = [
	"bg-red-500",
	"bg-yellow-400",
	"bg-green-400",
	"bg-blue-500",
	"bg-pink-500",
	"bg-purple-500",
	"bg-orange-400",
];

const MODE_COLORS: Record<ParticleMode, string> = {
	default: "bg-white",
	fireflies: "bg-yellow-300",
	confetti: "",
	bubbles: "bg-cyan-300/40",
};

const ParticleBackground = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [count, setCount] = useState(0);
	const [mode, setMode] = useState<ParticleMode>("default");

	useEffect(() => {
		setCount(window.innerWidth < 768 ? 30 : 100);
	}, []);

	useHotkey("Mod+.", (e) => {
		e.preventDefault();
		setMode((prev) => MODES[(MODES.indexOf(prev) + 1) % MODES.length]);
	});

	useGSAP(
		() => {
			if (!containerRef.current || count === 0) return;

			const particles = containerRef.current.querySelectorAll(".particle");
			particles.forEach((particle) => {
				gsap.killTweensOf(particle);

				const size =
					mode === "bubbles"
						? Math.random() * 8 + 4
						: mode === "confetti"
							? Math.random() * 6 + 4
							: Math.random() * 3 + 1;

				gsap.set(particle, {
					width: size,
					height: size,
					opacity: mode === "fireflies" ? 0 : Math.random(),
					left: Math.random() * window.innerWidth,
					top: mode === "bubbles" ? window.innerHeight + 20 : Math.random() * (window.innerHeight + 1),
					y: 0,
					x: 0,
				});

				if (mode === "default") {
					gsap.to(particle, {
						y: window.innerHeight,
						duration: Math.random() * 10 + 10,
						opacity: 0,
						repeat: -1,
						ease: "none",
					});
				} else if (mode === "fireflies") {
					const tl = gsap.timeline({ repeat: -1 });
					tl.to(particle, {
						opacity: Math.random() * 0.8 + 0.2,
						duration: Math.random() * 2 + 1,
						ease: "sine.inOut",
					}).to(particle, {
						opacity: 0,
						duration: Math.random() * 2 + 1,
						ease: "sine.inOut",
					});
					gsap.to(particle, {
						x: `+=${Math.random() * 200 - 100}`,
						y: `+=${Math.random() * 200 - 100}`,
						duration: Math.random() * 8 + 6,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				} else if (mode === "confetti") {
					gsap.set(particle, {
						rotation: Math.random() * 360,
						borderRadius: Math.random() > 0.5 ? "50%" : "2px",
					});
					gsap.to(particle, {
						y: window.innerHeight,
						rotation: `+=${Math.random() * 720 - 360}`,
						duration: Math.random() * 8 + 6,
						opacity: 0,
						repeat: -1,
						ease: "none",
					});
					gsap.to(particle, {
						x: `+=${Math.random() * 80 - 40}`,
						duration: Math.random() * 2 + 1,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				} else if (mode === "bubbles") {
					gsap.to(particle, {
						y: -(window.innerHeight + 40),
						x: `+=${Math.random() * 60 - 30}`,
						duration: Math.random() * 15 + 15,
						opacity: 0,
						repeat: -1,
						ease: "none",
					});
				}
			});
		},
		{ scope: containerRef, dependencies: [count, mode] },
	);

	if (count === 0) return null;

	return (
		<div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none">
			{[...Array(count)].map((_, i) => (
				<div
					key={i}
					className={`particle absolute rounded-full ${mode === "confetti" ? CONFETTI_COLORS[i % CONFETTI_COLORS.length] : MODE_COLORS[mode]} ${mode === "fireflies" ? "shadow-[0_0_6px_2px_rgba(250,204,21,0.4)]" : ""}`}
				/>
			))}
		</div>
	);
};

export default ParticleBackground;
