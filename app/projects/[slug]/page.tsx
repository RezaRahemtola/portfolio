import { notFound } from "next/navigation";
import ProjectDetails from "./_components/ProjectDetails";
import { PROJECTS } from "@/lib/data";
import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { IProject } from "@/types";

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
		try {
			const [volumeRes, pnlRes, monthlyPnlRes] = await Promise.all([
				fetch("https://predictfolio.com/api/current-volume?trader_id=0xc0fd74f90c717431fe2fc9afd25d310d3bab0255", {
					next: { revalidate: 3600 },
				}),
				fetch("https://predictfolio.com/api/current-pnl?trader_id=0xc0fd74f90c717431fe2fc9afd25d310d3bab0255", {
					next: { revalidate: 3600 },
				}),
				fetch(
					"https://user-pnl-api.polymarket.com/user-pnl?user_address=0xc0fd74f90c717431fe2fc9afd25d310d3bab0255&interval=1m&fidelity=1d",
					{
						next: { revalidate: 3600 },
					},
				),
			]);

			const volumeData = await volumeRes.json();
			const pnlData = await pnlRes.json();
			const monthlyPnlData = await monthlyPnlRes.json();

			const volume = volumeData[0]?.amount;
			const pnl = pnlData[0]?.amount;
			const monthlyPnl =
				monthlyPnlData && Array.isArray(monthlyPnlData) && monthlyPnlData.length > 0
					? monthlyPnlData[monthlyPnlData.length - 1].p
					: null;

			if (volume) {
				const formattedVolume = `$${Math.round(volume).toLocaleString()}`;
				description = description.replace("$ALL_TIME_VOLUME", formattedVolume);
			} else {
				description = description.replace("$ALL_TIME_VOLUME", "Error loading volume");
			}

			if (pnl) {
				const formattedPnl = `$${Math.round(pnl).toLocaleString()}`;
				description = description.replace("$ALL_TIME_PNL", formattedPnl);
			} else {
				description = description.replace("$ALL_TIME_PNL", "Error loading PnL");
			}

			if (monthlyPnl === null) {
				description = description.replace("$LAST_MONTH_PNL", "Error loading monthly PnL");
			} else {
				const formattedMonthlyPnl = `$${Math.round(monthlyPnl).toLocaleString()}`;
				description = description.replace("$LAST_MONTH_PNL", formattedMonthlyPnl);
			}
		} catch (error) {
			console.error("Failed to fetch trading stats:", error);
			description = description.replace("$ALL_TIME_VOLUME", "Error loading volume");
			description = description.replace("$ALL_TIME_PNL", "Error loading PnL");
			description = description.replace("$LAST_MONTH_PNL", "Error loading monthly PnL");
		}
	}

	const projectWithContent: IProject = {
		...project,
		description,
		role,
	};

	return <ProjectDetails project={projectWithContent} />;
};

export default Page;
