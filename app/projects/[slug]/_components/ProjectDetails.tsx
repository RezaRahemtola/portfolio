"use client";
import { hasAppHistory } from "@/components/ScrollRestorer";
import { useRouter } from "next/navigation";
import { IProject } from "@/types";
import { Github } from "@/components/icons";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface Props {
	project: IProject;
}

const ProjectDetails = ({ project }: Props) => {
	const router = useRouter();

	// Pop history when we got here from within the app (restores the home scroll
	// position); otherwise fall back to navigating home (e.g. on a direct visit).
	const handleBack = () => {
		if (hasAppHistory()) {
			router.back();
		} else {
			router.push("/");
		}
	};

	return (
		<section className="pt-5 pb-14">
			<div className="container">
				<button
					type="button"
					onClick={handleBack}
					className="mb-16 inline-flex gap-2 items-center group h-12 cursor-pointer"
				>
					<ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
					Back
				</button>

				<div className="flex items-start gap-6 mx-auto mb-10 max-w-[635px]">
					<h1 className="text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
						<span className="inline-block">{project.title}</span>
					</h1>

					<div className="flex gap-2">
						{project.sourceCode && (
							<a
								href={project.sourceCode}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View source code"
								className="hover:text-primary"
							>
								<Github size={30} />
							</a>
						)}
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View live project"
								className="hover:text-primary"
							>
								<ExternalLink size={30} />
							</a>
						)}
					</div>
				</div>

				<div className="max-w-[635px] space-y-7 pb-20 mx-auto">
					<div>
						<h2 className="text-muted-foreground font-anton mb-3">Year</h2>

						<div className="text-lg">{project.year}</div>
					</div>
					<div>
						<h2 className="text-muted-foreground font-anton mb-3">Technologies</h2>

						<div className="text-lg">{project.techStack.join(", ")}</div>
					</div>
					<div>
						<h2 className="text-muted-foreground font-anton mb-3">Description</h2>

						<div className="text-lg markdown-text">
							<MarkdownRenderer content={project.longDescription} />
						</div>
					</div>
					{project.role && (
						<div>
							<h2 className="text-muted-foreground font-anton mb-3">My Role</h2>

							<div className="text-lg markdown-text">
								<MarkdownRenderer content={project.role} />
							</div>
						</div>
					)}
				</div>

				<ProjectGallery images={project.images} title={project.title} />
			</div>
		</section>
	);
};

export default ProjectDetails;
