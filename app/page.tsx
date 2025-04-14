import AboutMe from "./_components/AboutMe";
import Banner from "./_components/Banner";
import Experiences from "./_components/Experiences";
import Passions from "./_components/Passions";
import Skills from "./_components/Skills";
import ProjectList from "./_components/ProjectList";

export default function Home() {
	return (
		<div className="page-">
			<Banner />
			<AboutMe />
			<Skills />
			<Experiences />
			<Passions />
			<ProjectList />
		</div>
	);
}
