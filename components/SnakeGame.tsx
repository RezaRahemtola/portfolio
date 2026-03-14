"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const CELL_SIZE = 20;
const TICK_MS = 100;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const OPPOSITE: Record<Direction, Direction> = {
	UP: "DOWN",
	DOWN: "UP",
	LEFT: "RIGHT",
	RIGHT: "LEFT",
};

const KEY_MAP: Record<string, Direction> = {
	ArrowUp: "UP",
	ArrowDown: "DOWN",
	ArrowLeft: "LEFT",
	ArrowRight: "RIGHT",
};

const SnakeGame = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dirRef = useRef<Direction>("RIGHT");
	const nextDirRef = useRef<Direction>("RIGHT");
	const snakeRef = useRef<Point[]>([]);
	const foodRef = useRef<Point>({ x: 0, y: 0 });
	const gridRef = useRef({ cols: 0, rows: 0 });
	const loopRef = useRef<number>(0);
	const lastTickRef = useRef<number>(0);

	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [started, setStarted] = useState(false);

	const spawnFood = useCallback(() => {
		const { cols, rows } = gridRef.current;
		const snake = snakeRef.current;
		let pos: Point;
		do {
			pos = {
				x: Math.floor(Math.random() * cols),
				y: Math.floor(Math.random() * rows),
			};
		} while (snake.some((s) => s.x === pos.x && s.y === pos.y));
		foodRef.current = pos;
	}, []);

	const init = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const parent = canvas.parentElement;
		if (!parent) return;

		canvas.width = parent.clientWidth;
		canvas.height = parent.clientHeight;

		const cols = Math.floor(canvas.width / CELL_SIZE);
		const rows = Math.floor(canvas.height / CELL_SIZE);
		gridRef.current = { cols, rows };

		const startX = Math.floor(cols / 2);
		const startY = Math.floor(rows / 2);
		snakeRef.current = [
			{ x: startX, y: startY },
			{ x: startX - 1, y: startY },
			{ x: startX - 2, y: startY },
		];

		dirRef.current = "RIGHT";
		nextDirRef.current = "RIGHT";
		setScore(0);
		setGameOver(false);
		spawnFood();
	}, [spawnFood]);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const { cols, rows } = gridRef.current;
		const snake = snakeRef.current;
		const food = foodRef.current;

		// Background
		ctx.fillStyle = "#1a1a1a";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Grid lines (subtle)
		ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
		ctx.lineWidth = 1;
		for (let x = 0; x <= cols; x += 1) {
			ctx.beginPath();
			ctx.moveTo(x * CELL_SIZE, 0);
			ctx.lineTo(x * CELL_SIZE, rows * CELL_SIZE);
			ctx.stroke();
		}
		for (let y = 0; y <= rows; y += 1) {
			ctx.beginPath();
			ctx.moveTo(0, y * CELL_SIZE);
			ctx.lineTo(cols * CELL_SIZE, y * CELL_SIZE);
			ctx.stroke();
		}

		// Food
		ctx.fillStyle = "#00e5ff"; // secondary color
		ctx.shadowColor = "#00e5ff";
		ctx.shadowBlur = 10;
		ctx.beginPath();
		ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.shadowBlur = 0;

		// Snake
		snake.forEach((seg, i) => {
			const brightness = 47 - (i / snake.length) * 20;
			ctx.fillStyle = i === 0 ? "#ffffff" : `hsl(140, 100%, ${brightness}%)`;
			if (i === 0) {
				ctx.shadowColor = "#00ff78";
				ctx.shadowBlur = 8;
			}
			ctx.fillRect(seg.x * CELL_SIZE + 1, seg.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
			ctx.shadowBlur = 0;
		});
	}, []);

	const tick = useCallback(() => {
		const snake = snakeRef.current;
		const { cols, rows } = gridRef.current;

		dirRef.current = nextDirRef.current;
		const head = snake[0];
		const newHead = { ...head };

		switch (dirRef.current) {
			case "UP":
				newHead.y -= 1;
				break;
			case "DOWN":
				newHead.y += 1;
				break;
			case "LEFT":
				newHead.x -= 1;
				break;
			case "RIGHT":
				newHead.x += 1;
				break;
		}

		// Wall collision
		if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
			setGameOver(true);
			return;
		}

		// Self collision
		if (snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
			setGameOver(true);
			return;
		}

		snake.unshift(newHead);

		// Eat food
		if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
			setScore((s) => s + 1);
			spawnFood();
		} else {
			snake.pop();
		}
	}, [spawnFood]);

	// Game loop
	useEffect(() => {
		if (!started || gameOver) return;

		const loop = (time: number) => {
			if (time - lastTickRef.current >= TICK_MS) {
				lastTickRef.current = time;
				tick();
			}
			draw();
			loopRef.current = requestAnimationFrame(loop);
		};

		loopRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(loopRef.current);
	}, [started, gameOver, tick, draw]);

	// Draw initial state
	useEffect(() => {
		init();
		draw();
	}, [init, draw]);

	// Key handler
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			const dir = KEY_MAP[e.key];
			if (!dir) return;
			e.preventDefault();

			if (!started && !gameOver) {
				setStarted(true);
			}

			if (dir !== OPPOSITE[dirRef.current]) {
				nextDirRef.current = dir;
			}
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [started, gameOver]);

	const restart = () => {
		init();
		setStarted(true);
	};

	return (
		<div className="relative w-full max-w-[600px] aspect-square mx-auto">
			<canvas ref={canvasRef} className="w-full h-full rounded-md" />

			{/* Score */}
			<div className="absolute top-3 right-4 font-anton text-primary text-2xl">{score}</div>

			{/* Start overlay */}
			{!started && !gameOver && (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-md">
					<p className="text-muted-foreground text-lg mb-2">While you&apos;re lost, play a game</p>
					<p className="text-foreground font-anton text-2xl animate-pulse">Press arrow keys to start</p>
				</div>
			)}

			{/* Game over overlay */}
			{gameOver && (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-md gap-4">
					<p className="font-anton text-primary text-4xl">Game Over</p>
					<p className="text-muted-foreground text-lg">Score: {score}</p>
					<button
						onClick={restart}
						className="h-12 px-8 bg-primary text-primary-foreground font-anton text-lg uppercase tracking-widest hover:brightness-110 transition"
					>
						Play Again
					</button>
				</div>
			)}
		</div>
	);
};

export default SnakeGame;
