import SectionTitle from "@/components/SectionTitle";
import { PROJECTS } from "@/lib/data";
import Project from "./Project";

const ProjectList = () => {
	return (
		<section className="pb-40 md:pb-section" id="projects-showcase" aria-labelledby="projects-showcase-title">
			<div className="container">
				<SectionTitle id="projects-showcase-title" title="PROJECTS SHOWCASE" />

				<div className="group/projects">
					<div className="flex flex-col max-md:gap-10">
						{PROJECTS.map((project, index) => (
							<Project index={index} project={project} key={project.slug} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectList;
