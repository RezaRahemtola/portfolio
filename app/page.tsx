import AboutMe from "./_components/AboutMe";
import Banner from "./_components/Banner";
import Experiences from "./_components/Experiences";
import Passions from "./_components/Passions";
import Skills from "./_components/Skills";
import ProjectList from "./_components/ProjectList";
import { getChessStats } from "@/lib/getChessStats";
import { GENERAL_INFO, SOCIAL_LINKS } from "@/lib/data";

export default async function Home() {
	const chessElo = await getChessStats();

	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Reza Rahemtola",
		url: "https://reza.dev",
		jobTitle: "Full Stack Developer",
		image: "https://reza.dev/about/reza.jpeg",
		email: `mailto:${GENERAL_INFO.email}`,
		sameAs: SOCIAL_LINKS.map((link) => link.url),
	};

	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Reza Rahemtola",
		url: "https://reza.dev",
		author: { "@type": "Person", name: "Reza Rahemtola", url: "https://reza.dev" },
	};

	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
			<Banner />
			<AboutMe />
			<Skills />
			<Experiences />
			<Passions chessElo={chessElo} />
			<ProjectList />
		</div>
	);
}
