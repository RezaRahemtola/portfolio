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
	if (!project) return {};

	const { title, metaDescription: description, thumbnail } = project;
	const brandedTitle = `${title} | Reza Rahemtola`;

	return {
		title,
		description,
		alternates: { canonical: `/projects/${slug}` },
		openGraph: {
			title: brandedTitle,
			description,
			url: `https://reza.dev/projects/${slug}`,
			type: "article",
			images: [thumbnail],
		},
		twitter: {
			card: "summary_large_image",
			title: brandedTitle,
			description,
			images: [thumbnail],
		},
	};
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const project = PROJECTS.find((project) => project.slug === slug);

	if (!project) {
		return notFound();
	}

	const description = loadProjectContent(slug, "description");
	const role = loadProjectContent(slug, "role");

	const projectWithContent: IProject = {
		...project,
		description,
		role,
	};

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name: project.title,
		description: project.metaDescription,
		url: `https://reza.dev/projects/${slug}`,
		author: { "@type": "Person", name: "Reza Rahemtola", url: "https://reza.dev" },
		programmingLanguage: project.techStack,
		...(project.sourceCode && { codeRepository: project.sourceCode }),
		...(project.liveUrl && { targetProduct: { "@type": "WebApplication", url: project.liveUrl } }),
		image: `https://reza.dev${project.thumbnail}`,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<ProjectDetails project={projectWithContent} />
		</>
	);
};

export default Page;
