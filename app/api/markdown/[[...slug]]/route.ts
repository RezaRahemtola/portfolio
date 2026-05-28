import { NextRequest } from "next/server";
import { buildHomeMarkdown, buildNotFoundMarkdown, buildProjectMarkdown, estimateTokens } from "@/lib/buildMarkdown";

const respond = (body: string, status: number) =>
	new Response(body, {
		status,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"x-markdown-tokens": String(estimateTokens(body)),
			"Cache-Control": "public, max-age=0, s-maxage=3600",
		},
	});

const resolveMarkdown = (segments: string[]): { body: string; status: number } => {
	if (segments.length === 0) {
		return { body: buildHomeMarkdown(), status: 200 };
	}
	if (segments.length === 2 && segments[0] === "projects") {
		const body = buildProjectMarkdown(segments[1]);
		if (body) return { body, status: 200 };
	}
	return { body: buildNotFoundMarkdown(), status: 404 };
};

const handle = async (_request: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) => {
	const { slug } = await ctx.params;
	const { body, status } = resolveMarkdown(slug ?? []);
	return respond(body, status);
};

export const GET = handle;
export const HEAD = handle;
