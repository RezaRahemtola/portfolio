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

export const generateStaticParams = async () => {
	return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
	const { slug } = await params;
	const project = PROJECTS.find((project) => project.slug === slug);
	const description = loadProjectContent(slug, "description");

	return {
		title: `${project?.title} - ${project?.techStack.slice(0, 3).join(", ")}`,
		description: description.substring(0, 160),
	} as Metadata;
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

	return <ProjectDetails project={projectWithContent} />;
};

export default Page;
