import fs from "node:fs";
import path from "node:path";
import { GENERAL_INFO, MY_EXPERIENCE, MY_STACK, PROJECTS, SOCIAL_LINKS } from "@/lib/data";

const loadProjectContent = (slug: string, type: "description" | "role"): string => {
	const filePath = path.join(process.cwd(), "content", "projects", `${slug}-${type}.md`);
	if (fs.existsSync(filePath)) {
		return fs.readFileSync(filePath, "utf-8").trim();
	}
	return "";
};

export const buildHomeMarkdown = (): string => {
	const lines: string[] = [];

	lines.push("# Reza Rahemtola — Full Stack Developer");
	lines.push("");
	lines.push(
		"Hi! I'm Reza, a passionate Full Stack Developer with 3+ years of experience turning ideas to realities — from sleek frontends to robust backends.",
	);
	lines.push("");

	lines.push("## About");
	lines.push("");
	lines.push(
		"I'm a full stack developer passionate about transforming complex problems into elegant, practical solutions. Over the years, I've worked on a wide range of projects, from web platforms and scalable backend systems to blockchain applications and AI-powered products.",
	);
	lines.push("");
	lines.push(
		"My approach blends technical depth with a user-first mindset: I strive to create software that's not only reliable and high-performing but also meaningful and impactful for its users.",
	);
	lines.push("");

	lines.push("## Skills");
	lines.push("");
	for (const [category, items] of Object.entries(MY_STACK)) {
		lines.push(`### ${category.charAt(0).toUpperCase() + category.slice(1)}`);
		lines.push("");
		for (const item of items) lines.push(`- ${item.name}`);
		lines.push("");
	}

	lines.push("## Experience");
	lines.push("");
	for (const job of MY_EXPERIENCE) {
		lines.push(`### ${job.title} — ${job.company}`);
		lines.push(`_${job.duration}_`);
		lines.push("");
	}

	lines.push("## Projects");
	lines.push("");
	for (const project of PROJECTS) {
		lines.push(`### [${project.title}](https://reza.dev/projects/${project.slug}) (${project.year})`);
		lines.push("");
		lines.push(`**Tech:** ${project.techStack.join(", ")}`);
		lines.push("");
	}

	lines.push("## Links");
	lines.push("");
	for (const link of SOCIAL_LINKS) {
		lines.push(`- ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}: ${link.url}`);
	}
	lines.push(`- Email: ${GENERAL_INFO.email}`);
	lines.push("");

	return lines.join("\n");
};

export const buildProjectMarkdown = (slug: string): string | null => {
	const project = PROJECTS.find((p) => p.slug === slug);
	if (!project) return null;

	const description = loadProjectContent(slug, "description");
	const role = loadProjectContent(slug, "role");

	const lines: string[] = [];
	lines.push(`# ${project.title}`);
	lines.push("");
	lines.push(`**Year:** ${project.year}`);
	lines.push(`**Tech:** ${project.techStack.join(", ")}`);
	const links: string[] = [];
	if (project.liveUrl) links.push(`[Live](${project.liveUrl})`);
	if (project.sourceCode) links.push(`[Source](${project.sourceCode})`);
	if (links.length) {
		lines.push("");
		lines.push(links.join(" • "));
	}
	lines.push("");

	if (description) {
		lines.push("## Description");
		lines.push("");
		lines.push(description);
		lines.push("");
	}

	if (role) {
		lines.push("## My Role");
		lines.push("");
		lines.push(role);
		lines.push("");
	}

	return lines.join("\n");
};

export const buildNotFoundMarkdown = (): string => {
	return ["# 404 — Not Found", "", "This page doesn't exist.", "", "Back to [home](https://reza.dev).", ""].join("\n");
};

export const estimateTokens = (text: string): number => Math.ceil(text.length / 4);
