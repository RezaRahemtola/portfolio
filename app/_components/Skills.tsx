import SectionTitle from "@/components/SectionTitle";
import { MY_STACK } from "@/lib/data";
import Image from "next/image";

const Skills = () => {
	return (
		<section className="pb-40 md:pb-section" id="my-stack" aria-labelledby="my-stack-title">
			<div className="container">
				<SectionTitle id="my-stack-title" title="My favorite technologies" />

				<div className="space-y-20">
					{Object.entries(MY_STACK).map(([key, value]) => (
						<div className="grid sm:grid-cols-12" key={key}>
							<div className="sm:col-span-5">
								<p className="text-5xl font-anton leading-none text-muted-foreground uppercase">{key}</p>
							</div>

							<div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
								{value.map((item) => (
									<div className="flex gap-3.5 items-center leading-none" key={item.name}>
										<div className="w-10 h-10 relative">
											<Image src={item.icon} alt={item.name} sizes="40px" fill className="object-contain" />
										</div>
										<span className="text-2xl">{item.name}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;
