import { GENERAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import { Github, Linkedin } from "lucide-react";

const Footer = async () => {
	return (
		<footer className="text-center pb-5" id="contact">
			<div className="container">
				<p className="text-lg">Have a project in mind?</p>
				<a
					href={`mailto:${GENERAL_INFO.email}`}
					className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-5 hover:underline"
				>
					{GENERAL_INFO.email}
				</a>

				<div className="flex justify-center gap-6 mb-12">
					{SOCIAL_LINKS.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							className="transition-transform hover:scale-110"
							aria-label={social.name}
						>
							{social.name === "github" ? <Github className="w-6 h-6" /> : <Linkedin className="w-6 h-6" />}
						</a>
					))}
				</div>

				{/*<div>*/}
				{/*	<a*/}
				{/*		href="https://www.me.toinfinite.dev/"*/}
				{/*		target="_blank"*/}
				{/*		className="leading-none text-muted-foreground hover:underline hover:text-white"*/}
				{/*	>*/}
				{/*		Original design by Tajmirul Islam*/}
				{/*	</a>*/}
				{/*</div>*/}
			</div>
		</footer>
	);
};

export default Footer;
