"use client";
import { hasAppHistory } from "@/components/ScrollRestorer";
import { useRouter } from "next/navigation";
import { IProject } from "@/types";
import { Github } from "@/components/icons";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
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
						<p className="text-muted-foreground font-anton mb-3">Year</p>

						<div className="text-lg">{project.year}</div>
					</div>
					<div>
						<p className="text-muted-foreground font-anton mb-3">Technologies</p>

						<div className="text-lg">{project.techStack.join(", ")}</div>
					</div>
					<div>
						<p className="text-muted-foreground font-anton mb-3">Description</p>

						<div className="text-lg markdown-text">
							<MarkdownRenderer content={project.description} />
						</div>
					</div>
					{project.role && (
						<div>
							<p className="text-muted-foreground font-anton mb-3">My Role</p>

							<div className="text-lg markdown-text">
								<MarkdownRenderer content={project.role} />
							</div>
						</div>
					)}
				</div>

				<div className="relative flex flex-col gap-2 max-w-[800px] mx-auto" id="images">
					{project.images.map((image, i) => (
						<div key={image} className="group relative w-full aspect-750/400 bg-background-light overflow-hidden">
							<Image
								src={image}
								alt={`${project.title} screenshot ${i + 1}`}
								fill
								quality={90}
								sizes="(max-width: 800px) 100vw, 800px"
								className="object-cover"
								style={{ objectPosition: "center 50%" }}
							/>
							<a
								href={image}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View full-size image"
								className="absolute top-4 right-4 z-1 bg-background/70 text-foreground size-12 inline-flex justify-center items-center transition-all opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
							>
								<ExternalLink />
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectDetails;
