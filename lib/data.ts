import { IProject } from "@/types";
import { Github, Linkedin, Trees } from "lucide-react";

export const GENERAL_INFO = {
	email: "contact@reza.dev",
};

export const SOCIAL_LINKS = [
	{ name: "github", url: "https://github.com/RezaRahemtola", icon: Github },
	{ name: "linkedin", url: "https://linkedin.com/in/reza-rahemtola", icon: Linkedin },
	{ name: "garden", url: "https://garden.reza.dev", icon: Trees },
];

export const MY_STACK = {
	frontend: [
		{
			name: "Typescript",
			icon: "/logo/ts.png",
		},
		{
			name: "React",
			icon: "/logo/react.png",
		},
		{
			name: "Next.js",
			icon: "/logo/next.png",
		},
		{
			name: "Vue",
			icon: "/logo/vue.png",
		},
		{
			name: "Tailwind CSS",
			icon: "/logo/tailwind.png",
		},
		{
			name: "GSAP",
			icon: "/logo/gsap.png",
		},
	],
	backend: [
		{
			name: "NodeJS",
			icon: "/logo/node.png",
		},
		{
			name: "NestJS",
			icon: "/logo/nest.svg",
		},
		{
			name: "FastAPI",
			icon: "/logo/fastapi.svg",
		},
	],
	database: [
		{
			name: "PostgreSQL",
			icon: "/logo/postgreSQL.png",
		},
		{
			name: "Redis",
			icon: "/logo/redis.png",
		},
		{
			name: "Prisma",
			icon: "/logo/prisma.png",
		},
	],
	devops: [
		{
			name: "Docker",
			icon: "/logo/docker.svg",
		},
		{
			name: "Traefik",
			icon: "/logo/traefik.svg",
		},
		{
			name: "Dokploy",
			icon: "/logo/dokploy.png",
		},
		{
			name: "GitHub Actions",
			icon: "/logo/github.png",
		},
		{
			name: "Google Cloud",
			icon: "/logo/gcloud.png",
		},
	],
	others: [
		{
			name: "Python",
			icon: "/logo/python.png",
		},
		{
			name: "Solidity",
			icon: "/logo/solidity.webp",
		},
	],
};

export const PROJECTS: Omit<IProject, "description" | "role">[] = [
	{
		title: "DocTripper",
		slug: "doctripper",
		techStack: ["Next.js", "PostgreSQL", "NestJS", "Chakra UI", "Prisma", "S3", "GitHub Actions"],
		thumbnail: "/projects/thumbnail/doctripper.png",
		images: [
			"/projects/images/doctripper-1.png",
			"/projects/images/doctripper-2.png",
			"/projects/images/doctripper-3.png",
		],
		liveUrl: "https://doctripper.com",
		year: "2023 - 2025",
	},
	{
		title: "LibertAI landing",
		slug: "libertai-landing",
		techStack: ["GSAP", "Tailwind CSS", "React"],
		thumbnail: "/projects/thumbnail/libertai.png",
		images: [
			"/projects/images/libertai-1.png",
			"/projects/images/libertai-2.png",
			"/projects/images/libertai-3.png",
			"/projects/images/libertai-4.png",
		],
		sourceCode: "https://github.com/LibertAI/libertai-website",
		liveUrl: "https://libertai.io",
		year: "2024",
	},
	{
		title: "Trading bot",
		slug: "polymarket-trading-bot",
		techStack: ["TypeScript", "Blockchain", "Python", "Docker"],
		thumbnail: "/projects/thumbnail/polymarket-trading-bot.png",
		images: [],
		liveUrl: "https://polymarket.com/@0xc0fd74f90C717431FE2fc9AFD25D310D3BAb0255-1768261238207",
		year: "2026",
	},
	{
		title: "Stocks Hedging",
		slug: "polymarket-stocks-hedging",
		techStack: ["Next.js", "TypeScript", "Blockchain"],
		thumbnail: "/projects/thumbnail/polymarket-stocks-hedging.png",
		images: ["/projects/images/polymarket-stocks-hedging-1.png", "/projects/images/polymarket-stocks-hedging-2.png"],
		sourceCode: "https://github.com/RezaRahemtola/polymarket-stocks-hedging",
		liveUrl: "https://polymarket-stocks-hedging.reza.dev",
		year: "2026",
	},
	{
		title: "Solva",
		slug: "solva",
		techStack: ["React", "Solidity", "FastAPI", "PostgreSQL", "Tailwind CSS"],
		thumbnail: "/projects/thumbnail/solva.png",
		images: [
			"/projects/images/solva-1.jpg",
			"/projects/images/solva-2.jpg",
			"/projects/images/solva-3.jpg",
			"/projects/images/solva-4.jpg",
		],
		sourceCode: "https://github.com/RezaRahemtola/ETHGlobal-Taipei2025",
		liveUrl: "https://ethglobal.com/showcase/solva-map8t",
		year: "2025",
	},
	{
		title: "CreAItors",
		slug: "creaitors",
		techStack: ["AI Agents", "Python", "Blockchain", "Next.js", "Shadcn"],
		thumbnail: "/projects/thumbnail/creaitors.png",
		images: [
			"/projects/images/creaitors-1.jpeg",
			"/projects/images/creaitors-2.jpeg",
			"/projects/images/creaitors-3.jpeg",
			"/projects/images/creaitors-4.jpeg",
		],
		sourceCode: "https://github.com/ethdenver-creaitors/creaitors",
		liveUrl: "https://devfolio.co/projects/creaitors-b521",
		year: "2025",
	},
];

export const MY_EXPERIENCE = [
	{
		title: "Lead Developer",
		company: "LibertAI",
		duration: "June 2024 - Present",
	},
	{
		title: "Freelance Developer",
		company: "Self employed",
		duration: "Jul 2023 - Present",
	},
	{
		title: "Back End Engineer (Internship)",
		company: "Cryptio",
		duration: "Feb 2024 - June 2024",
	},
	{
		title: "Full Stack Engineer (Internship)",
		company: "Qobra",
		duration: "Jul 2022 - Dec 2022",
	},
];
