import { IProject } from "@/types";

export const GENERAL_INFO = {
	email: "contact@rezar.fr",
};

export const SOCIAL_LINKS = [
	{ name: "github", url: "https://github.com/RezaRahemtola" },
	{ name: "linkedin", url: "https://www.linkedin.com/in/reza-rahemtola" },
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
			name: "Node.js",
			icon: "/logo/node.png",
		},
		{
			name: "Nest.js",
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
			name: "MongoDB",
			icon: "/logo/mongodb.svg",
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
	tools: [
		{
			name: "Git",
			icon: "/logo/git.png",
		},
		{
			name: "Docker",
			icon: "/logo/docker.svg",
		},
		{
			name: "GitHub Actions",
			icon: "/logo/github.png",
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
		techStack: ["Next.js", "PostgreSQL", "Nest.js", "Chakra UI", "Prisma", "S3", "GitHub Actions"],
		thumbnail: "/projects/thumbnail/doctripper.png",
		thumbnailMobile: "/projects/thumbnail/doctripper-mobile.png",
		images: [
			"/projects/images/resume-roaster-1.png",
			"/projects/images/resume-roaster-2.png",
			"/projects/images/resume-roaster-3.png",
		],
		liveUrl: "https://doctripper.com",
		year: 2024,
		description:
			"DocTripper is a French startup founded by a dental surgeon to connect medical students with professionals installed in areas lacking healthcare personnel, allowing them to gain experience while also benefiting from advantages offered by the cities, departments and regions to discover the area & potentially settle there later.\n\n With more than 1000 users & 300 offers in 130 cities across France 🇫🇷, DocTripper is supported by several healthcare institutions, was featured on television reports on [TF1](https://www.tf1info.fr/sante/video-je-ne-trouve-pas-ca-choquant-l-installation-des-dentistes-regulee-pour-les-pousser-a-aller-dans-des-deserts-medicaux-2342642.html) & [France 3](https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/correze/brive/un-site-internet-pour-trouver-des-medecins-remplacants-et-pourquoi-pas-attirer-les-jeunes-professionnels-en-zones-rurales-3103921.html) and is now accelerating its growth to combat medical deserts.",
		role: `As the freelance lead developer & project manager, I:\n- Scaled the project from an internal PoC to a reliable platform used by hundreds of students, healthcare professionals & partner cities across France.\n- Translated the founder's vision into actual features, helping him prioritize the roadmap to scale quickly while mitigating the technical debt from the PoC.\n- Managed several developers to work with me on the platform development.\n- Implemented CI/CD pipelines using GitHub Actions for automated testing and deployment.`,
	},
	{
		title: "Solva",
		slug: "solva",
		techStack: ["React", "Solidity", "FastAPI", "PostgreSQL", "Tailwind CSS"],
		thumbnail: "/projects/thumbnail/solva.png",
		thumbnailMobile: "/projects/thumbnail/solva-mobile.png",
		images: [
			"/projects/images/epikcart-1.png",
			"/projects/images/epikcart-2.png",
			"/projects/images/epikcart-3.png",
			"/projects/images/epikcart-4.png",
			"/projects/images/epikcart-5.png",
		],
		sourceCode: "https://github.com/RezaRahemtola/ETHGlobal-Taipei2025",
		liveUrl: "https://solva.rezar.fr",
		year: 2025,
		description: `Solva is a Venmo-like payment app powered by Web3 technologies, empowering anyone to receive and transfer funds, instantly & without fees, without knowing anything about crypto.\n\n Built in 36 hours during the [ETHGlobal Taipei 2025 hackathon](https://ethglobal.com/showcase/solva-map8t), it received 3 prizes, totalling $5500 and was selected among the 8 finalist projects out of 226 by a jury of industry experts.`,
		role: `As the solo developer, I designed & developed the entire application, including:\n- The responsive frontend using React, Tailwind CSS and shadcn/ui.\n- The backend using FastAPI, PostgreSQL and Alembic.\n- The smart contracts & blockchain interactions using Solidity.\n- The deployment using Docker and GitHub Actions.\n\nI also had the opportunity to [demo the project live on stage](https://www.youtube.com/live/if_XZf0IIr8?t=5864s) in front of the 500+ other hackers at the end of the event.`,
	},
	{
		title: "CreAItors",
		slug: "creaitors",
		techStack: ["AI Agents", "Python", "Blockchain", "Next.js", "Shadcn"],
		thumbnail: "/projects/thumbnail/creaitors.png",
		thumbnailMobile: "/projects/thumbnail/creaitors.png",
		images: [
			"/projects/images/property-pro-1.png",
			"/projects/images/property-pro-2.png",
			"/projects/images/property-pro-3.png",
		],
		liveUrl: "https://creaitors.andresmolins.dev/",
		sourceCode: "https://github.com/ethdenver-creaitors/creaitors",
		year: 2025,
		description:
			"PropertyPro is a real estate management platform offering users a seamless experience to explore, manage, and view property listings. The application emphasizes accessibility and responsive design, ensuring a smooth interface across devices.",
		role: `As the frontend developer, I:\n- Built the frontend using React, Redux, RTK Query, Framer Motion, and Tailwind CSS.\n- Integrated dynamic state management for efficient handling of property data.\n- Implemented multi-language support with React i18n to cater to diverse audiences.\n- Enhanced user interaction with animations and transitions using Framer Motion.`,
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
