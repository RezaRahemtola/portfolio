"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { GENERAL_INFO, SOCIAL_LINKS } from "@/lib/data";

const COLORS = [
	"bg-yellow-500 text-black",
	"bg-blue-500 text-white",
	"bg-teal-500 text-black",
	"bg-indigo-500 text-white",
	"bg-rose-500 text-white",
];

const MENU_LINKS = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "About Me",
		url: "/#about-me",
	},
	{
		name: "Experience",
		url: "/#experience",
	},
	{
		name: "Passions",
		url: "/#passions",
	},
	{
		name: "Projects",
		url: "/#projects-showcase",
	},
];

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	const closeMenu = () => setIsMenuOpen(false);

	// While open: move focus into the panel, trap Tab inside it, close on
	// Escape, and restore focus to the toggle.
	useEffect(() => {
		if (!isMenuOpen) return;
		const panel = panelRef.current;
		if (!panel) return;

		const getFocusable = () => Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

		getFocusable()[0]?.focus();

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuOpen(false);
				toggleRef.current?.focus();
				return;
			}
			if (e.key === "Tab") {
				const items = getFocusable();
				if (items.length === 0) return;
				const first = items[0];
				const last = items[items.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [isMenuOpen]);

	return (
		<nav>
			<div className="sticky top-0 z-4">
				<button
					ref={toggleRef}
					aria-label="Toggle navigation menu"
					aria-expanded={isMenuOpen}
					aria-controls="nav-menu"
					className={cn("group size-12 absolute top-5 right-5 md:right-10 z-2")}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<span
						className={cn(
							"inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ",
							{
								"rotate-45 -translate-y-1/2": isMenuOpen,
								"md:group-hover:rotate-12": !isMenuOpen,
							},
						)}
					></span>
					<span
						className={cn(
							"inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ",
							{
								"-rotate-45 -translate-y-1/2": isMenuOpen,
								"md:group-hover:-rotate-12": !isMenuOpen,
							},
						)}
					></span>
				</button>
			</div>

			<div
				className={cn("overlay fixed inset-0 z-2 bg-black/70 transition-all duration-150", {
					"opacity-0 invisible pointer-events-none": !isMenuOpen,
				})}
				onClick={() => setIsMenuOpen(false)}
			></div>

			<div
				ref={panelRef}
				id="nav-menu"
				role="dialog"
				aria-modal="true"
				aria-label="Site menu"
				inert={!isMenuOpen}
				className={cn(
					"fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-3 overflow-hidden gap-y-14",
					"flex flex-col lg:justify-center py-10",
					{ "translate-x-0": isMenuOpen },
				)}
			>
				<div
					className={cn(
						"fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-background-light duration-700 delay-150 z-[-1]",
						{
							"translate-x-0": isMenuOpen,
						},
					)}
				></div>

				<div className="grow flex md:items-center w-full max-w-[300px] mx-8 sm:mx-auto">
					<div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
						<div className="max-lg:order-2">
							<p className="text-muted-foreground mb-5 md:mb-8">SOCIAL</p>
							<ul className="space-y-3">
								{SOCIAL_LINKS.map((link) => (
									<li key={link.name}>
										<a
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-lg capitalize hover:underline flex items-center gap-2"
										>
											<link.icon className="w-5 h-5" />
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="">
							<p className="text-muted-foreground mb-5 md:mb-8">MENU</p>
							<ul className="space-y-3">
								{MENU_LINKS.map((link, idx) => (
									<li key={link.name}>
										<Link href={link.url} onClick={closeMenu} className="group text-xl flex items-center gap-3">
											<span
												className={cn(
													"size-3.5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all",
													COLORS[idx],
												)}
											>
												<MoveUpRight size={8} className="scale-0 group-hover:scale-100 transition-all" />
											</span>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className="w-full max-w-[300px] mx-8 sm:mx-auto">
					<p className="text-muted-foreground mb-4">GET IN TOUCH</p>
					<a href={`mailto:${GENERAL_INFO.email}`}>{GENERAL_INFO.email}</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
