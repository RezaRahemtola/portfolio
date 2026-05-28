import { NextRequest, NextResponse } from "next/server";

const wantsMarkdown = (accept: string | null): boolean => accept?.toLowerCase().includes("text/markdown") ?? false;

export function middleware(request: NextRequest) {
	if (!wantsMarkdown(request.headers.get("accept"))) return NextResponse.next();

	const url = request.nextUrl.clone();
	const original = url.pathname.replace(/\/$/, "") || "";
	url.pathname = `/api/markdown${original}`;
	return NextResponse.rewrite(url);
}

export const config = {
	matcher: ["/((?!api/markdown|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)"],
};
