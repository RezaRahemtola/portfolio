import { notFound } from "next/navigation";
import ProjectDetails from "./_components/ProjectDetails";
import { PROJECTS } from "@/lib/data";
import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { IProject } from "@/types";
import { getPolymarketStats } from "@/lib/getPolymarketStats";

const loadProjectContent = (slug: string, type: "description" | "role"): string => {
	const filePath = path.join(process.cwd(), "content", "projects", `${slug}-${type}.md`);
	if (fs.existsSync(filePath)) {
		return fs.readFileSync(filePath, "utf-8");
	}
	return "";
};

export const dynamic = "force-dynamic";

export const generateStaticParams = async () => {
	return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
	const { slug } = await params;
	const project = PROJECTS.find((project) => project.slug === slug);
	const description = loadProjectContent(slug, "description").substring(0, 160);
	const title = `${project?.title} - ${project?.techStack.slice(0, 3).join(", ")}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `https://reza.dev/projects/${slug}`,
			type: "article",
			images: project?.thumbnail ? [{ url: project.thumbnail, width: 1200, height: 630 }] : [],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: project?.thumbnail ? [project.thumbnail] : [],
		},
	};
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const project = PROJECTS.find((project) => project.slug === slug);

	if (!project) {
		return notFound();
	}

	let description = loadProjectContent(slug, "description");
	const role = loadProjectContent(slug, "role");

	// Fetch dynamic trading stats for polymarket bot
	if (slug === "polymarket-trading-bot") {
		const { balance, volume, pnl, monthlyPnl } = await getPolymarketStats();

		description = description.replace(
			"$BALANCE",
			balance !== null ? `$${Math.round(balance).toLocaleString()}` : "Error loading balance",
		);
		description = description.replace(
			"$ALL_TIME_VOLUME",
			volume !== null ? `$${Math.round(volume).toLocaleString()}` : "Error loading volume",
		);
		description = description.replace(
			"$ALL_TIME_PNL",
			pnl !== null ? `$${Math.round(pnl).toLocaleString()}` : "Error loading PnL",
		);
		description = description.replace(
			"$LAST_MONTH_PNL",
			monthlyPnl !== null ? `$${Math.round(monthlyPnl).toLocaleString()}` : "Error loading monthly PnL",
		);
	}

	const projectWithContent: IProject = {
		...project,
		description,
		role,
	};

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name: project.title,
		description: description.substring(0, 160),
		url: `https://reza.dev/projects/${slug}`,
		author: { "@type": "Person", name: "Reza Rahemtola", url: "https://reza.dev" },
		programmingLanguage: project.techStack,
		...(project.sourceCode && { codeRepository: project.sourceCode }),
		...(project.liveUrl && { targetProduct: { "@type": "WebApplication", url: project.liveUrl } }),
		image: project.thumbnail ? `https://reza.dev${project.thumbnail}` : undefined,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ProjectDetails project={projectWithContent} />
		</>
	);
};

export default Page;
