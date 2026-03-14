import { PROJECTS } from "@/lib/data";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://reza.dev";

	return [
		{ url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
		...PROJECTS.map((project) => ({
			url: `${baseUrl}/projects/${project.slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}
