export type Variant =
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "danger"
	| "info"
	| "light"
	| "dark"
	| "link"
	| "no-color";

export interface IProject {
	title: string;
	year: string;
	description: string;
	role: string;
	techStack: string[];
	thumbnail: string;
	thumbnailMobile: string;
	images: string[];
	slug: string;
	liveUrl?: string;
	sourceCode?: string;
}
