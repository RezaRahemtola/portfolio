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
		thumbnail: "/projects/thumbnail/doctripper.webp",
		images: [
			"/projects/images/doctripper-1.webp",
			"/projects/images/doctripper-2.webp",
			"/projects/images/doctripper-3.webp",
		],
		liveUrl: "https://doctripper.com",
		year: "2023 - 2026",
		lastModified: "2026-01-18",
		metaDescription:
			"French healthtech platform connecting medical students with rural professionals to fight medical deserts. 2000+ users, featured on TF1 and France 3.",
	},
	{
		title: "LibertAI landing",
		slug: "libertai-landing",
		techStack: ["GSAP", "Tailwind CSS", "React"],
		thumbnail: "/projects/thumbnail/libertai.webp",
		images: [
			"/projects/images/libertai-1.webp",
			"/projects/images/libertai-2.webp",
			"/projects/images/libertai-3.webp",
			"/projects/images/libertai-4.webp",
		],
		sourceCode: "https://github.com/LibertAI/libertai-website",
		liveUrl: "https://libertai.io",
		year: "2024",
		lastModified: "2026-01-18",
		metaDescription:
			"Confidential AI platform offering chat, inference APIs and agent deployment, powered by Trusted Execution Environments and decentralized tech.",
	},
	{
		title: "Stocks Hedging",
		slug: "polymarket-stocks-hedging",
		techStack: ["Next.js", "TypeScript", "Blockchain"],
		thumbnail: "/projects/thumbnail/polymarket-stocks-hedging.webp",
		images: ["/projects/images/polymarket-stocks-hedging-1.webp", "/projects/images/polymarket-stocks-hedging-2.webp"],
		sourceCode: "https://github.com/RezaRahemtola/polymarket-stocks-hedging",
		liveUrl: "https://polymarket-stocks-hedging.reza.dev",
		year: "2026",
		lastModified: "2026-02-04",
		metaDescription:
			"Polymarket scanner that ranks stock-price prediction markets by APY and lets you trade and hedge on your holdings.",
	},
	{
		title: "Solva",
		slug: "solva",
		techStack: ["React", "Solidity", "FastAPI", "PostgreSQL", "Tailwind CSS"],
		thumbnail: "/projects/thumbnail/solva.webp",
		images: [
			"/projects/images/solva-1.webp",
			"/projects/images/solva-2.webp",
			"/projects/images/solva-3.webp",
			"/projects/images/solva-4.webp",
		],
		sourceCode: "https://github.com/RezaRahemtola/ETHGlobal-Taipei2025",
		liveUrl: "https://ethglobal.com/showcase/solva-map8t",
		year: "2025",
		lastModified: "2026-01-18",
		metaDescription:
			"Venmo-like Web3 payment app for instant fee-free transfers without needing any crypto knowledge. Won 3 prizes & was a finalist at ETHGlobal Taipei 2025.",
	},
	{
		title: "CreAItors",
		slug: "creaitors",
		techStack: ["AI Agents", "Python", "Blockchain", "Next.js", "Shadcn"],
		thumbnail: "/projects/thumbnail/creaitors.webp",
		images: [
			"/projects/images/creaitors-1.webp",
			"/projects/images/creaitors-2.webp",
			"/projects/images/creaitors-3.webp",
			"/projects/images/creaitors-4.webp",
		],
		sourceCode: "https://github.com/ethdenver-creaitors/creaitors",
		liveUrl: "https://devfolio.co/projects/creaitors-b521",
		year: "2025",
		lastModified: "2026-01-18",
		metaDescription:
			"Platform to deploy unstoppable AI agents that pay for their own compute on a decentralized cloud. Won $6k in prizes at ETHDenver 2025.",
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
