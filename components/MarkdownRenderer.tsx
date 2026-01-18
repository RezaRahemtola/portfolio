import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import React from "react";

export const MarkdownRenderer = ({ content }: { content: string }) => (
	<Markdown
		remarkPlugins={[remarkGfm]}
		components={{
			a: ({ ...props }) => (
				<a {...props} target="_blank" className="underline underline-offset-3 decoration-primary">
					{props.children}
				</a>
			),
			p: ({ ...props }) => <p {...props} className="mt-4" />,
		}}
	>
		{content}
	</Markdown>
);
