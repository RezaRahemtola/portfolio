import { PROJECTS } from "@/lib/data";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://reza.dev";
	const rootLastModified =
		PROJECTS.map((p) => p.lastModified)
			.sort()
			.at(-1) ?? "2026-01-18";

	return [
		{ url: baseUrl, lastModified: rootLastModified, changeFrequency: "monthly", priority: 1 },
		...PROJECTS.map((project) => ({
			url: `${baseUrl}/projects/${project.slug}`,
			lastModified: project.lastModified,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}
