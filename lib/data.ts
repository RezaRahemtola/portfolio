import { IProject } from "@/types";

export const GENERAL_INFO = {
	email: "contact@reza.dev",
};

export const SOCIAL_LINKS = [
	{ name: "github", url: "https://github.com/RezaRahemtola" },
	{ name: "linkedin", url: "https://linkedin.com/in/reza-rahemtola" },
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

export const PROJECTS: IProject[] = [
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
		description:
			"DocTripper is a French startup founded by a dental surgeon to connect medical students with professionals installed in areas lacking healthcare personnel, allowing them to gain experience while also benefiting from advantages offered by the cities, departments and regions to discover the area & potentially settle there later.\n\n With more than 1500 users & 400 offers in 200 cities across France 🇫🇷, DocTripper is supported by several national healthcare institutions, was featured on television reports on [TF1](https://www.tf1info.fr/sante/video-je-ne-trouve-pas-ca-choquant-l-installation-des-dentistes-regulee-pour-les-pousser-a-aller-dans-des-deserts-medicaux-2342642.html) & [France 3](https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/correze/brive/un-site-internet-pour-trouver-des-medecins-remplacants-et-pourquoi-pas-attirer-les-jeunes-professionnels-en-zones-rurales-3103921.html) and is now accelerating its growth to reduce medical deserts.",
		role: `As the freelance lead developer & project manager, I:\n- Scaled the project from an internal PoC to a reliable platform used by hundreds of students, healthcare professionals & partner cities across France.\n- Translated the founder's vision into actual features, helping him prioritize the roadmap to scale quickly while mitigating the technical debt from the PoC.\n- Managed several developers to work with me on the platform development.\n- Implemented CI/CD pipelines using GitHub Actions for automated testing and deployment.`,
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
		description:
			"LibertAI is a confidential AI platform providing various AI services (chat UI, inference APIs, AI Agents deployment...) in a confidential way, leveraging TEEs (Trusted Execution Environments) and decentralized technologies.",
		role: `As the lead developer, apart from building these AI features, I also worked on the entire redesign of the LibertAI website to showcase the offering and capabilities of the platform with a smooth animated landing page.`,
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
		description: `Solva is a Venmo-like payment app powered by Web3 technologies, empowering anyone to receive and transfer funds, instantly & without fees, without knowing anything about crypto.\n\n Built in 36 hours during the [ETHGlobal Taipei 2025 hackathon](https://ethglobal.com/events/taipei), it received 3 prizes, totalling $5500 and was selected among the 8 finalist projects out of 226 by a jury of industry experts.`,
		role: `As the solo developer, I designed & developed the entire application, including:\n- The responsive frontend using React, Tailwind CSS and shadcn/ui.\n- The backend using FastAPI, PostgreSQL and Alembic.\n- The smart contracts & blockchain interactions using Solidity.\n- The deployment using Docker and GitHub Actions.\n\nI also had the opportunity to [demo the project live on stage](https://www.youtube.com/live/if_XZf0IIr8?t=5864s) in front of the 500+ other hackers at the end of the event.`,
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
		description:
			"CreAItors is a platform that allows anyone to create and deploy unstoppable & autonomous AI Agents that pay for their own computing on a decentralized cloud. Built during the [ETHDenver 2025 hackathon](https://ethdenver.com/), it received multiple prizes totalling $6000 and was selected among the top 10 infrastructure projects out of 200+ by a jury of industry experts.",
		role: `My role during this hackathon mainly consisted in:\n- Managing and coordinating our team of 3 developers to develop the project in a week (1 backend developer, 1 frontend developer and myself on the AI part)\n- Developing a custom AI framework on top of Coinbase's AgentKit to provide agents a wallet to control.\n- Creating the tools and reflexion system to allow agents to autonomously pay for their own computing\n- Presenting and demoing the project to the sponsors and jury members`,
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
