"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const KONAMI_CODE = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

const CHARS =
	"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const MatrixRain = () => {
	const [active, setActive] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number>(0);
	const inputRef = useRef<string[]>([]);

	const stop = useCallback(() => {
		setActive(false);
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = 0;
		}
	}, []);

	// Konami code listener
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (active) {
				if (e.key === "Escape") stop();
				return;
			}

			inputRef.current.push(e.key);
			if (inputRef.current.length > KONAMI_CODE.length) {
				inputRef.current.shift();
			}

			if (inputRef.current.join(",") === KONAMI_CODE.join(",")) {
				inputRef.current = [];
				setActive(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [active, stop]);

	// Canvas animation
	useEffect(() => {
		if (!active || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d")!;

		const fontSize = 16;
		let columns = Math.floor(canvas.width / fontSize);
		let drops = new Array(columns).fill(0).map(() => Math.random() * -50);

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			const newColumns = Math.floor(canvas.width / fontSize);
			if (newColumns > columns) {
				drops = [...drops, ...new Array(newColumns - columns).fill(0).map(() => Math.random() * -50)];
			} else {
				drops = drops.slice(0, newColumns);
			}
			columns = newColumns;
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		};
		resize();
		window.addEventListener("resize", resize);

		let lastTime = 0;
		const interval = 50; // ms between frames — higher = slower

		const draw = (time: number) => {
			animationRef.current = requestAnimationFrame(draw);

			if (time - lastTime < interval) return;
			lastTime = time;

			ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = CHARS[Math.floor(Math.random() * CHARS.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				// Bright green head, dimmer trail
				if (Math.random() > 0.98) {
					ctx.fillStyle = "#ffffff";
				} else {
					ctx.fillStyle = `hsl(140, 100%, ${Math.random() * 30 + 30}%)`;
				}

				ctx.fillText(char, x, y);

				if (y > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i] += 1;
			}
		};

		// Initial black fill
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		animationRef.current = requestAnimationFrame((t) => draw(t));

		return () => {
			window.removeEventListener("resize", resize);
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [active]);

	if (!active) return null;

	return (
		<canvas
			ref={canvasRef}
			onClick={stop}
			className="fixed inset-0 z-[100] cursor-none w-screen h-screen bg-black"
			aria-hidden="true"
		/>
	);
};

export default MatrixRain;
