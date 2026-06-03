import SectionTitle from "@/components/SectionTitle";
import { MY_EXPERIENCE } from "@/lib/data";

const Experiences = () => {
	return (
		<section className="pb-40 md:pb-section" id="experience" aria-labelledby="experience-title">
			<div className="container">
				<SectionTitle id="experience-title" title="My Experience" />

				<div className="grid gap-14">
					{MY_EXPERIENCE.map((item) => (
						<div key={item.title}>
							<p className="text-xl text-muted-foreground">{item.company}</p>
							<h3 className="text-5xl font-anton leading-none mt-3.5 mb-2.5">{item.title}</h3>
							<p className="text-lg text-muted-foreground">{item.duration}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experiences;
