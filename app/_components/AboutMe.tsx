import Image from "next/image";

const AboutMe = () => {
	return (
		<section className="max-md:pt-28 pb-40 md:pb-section" id="about-me" aria-labelledby="about-me-title">
			<div className="container">
				<h2 id="about-me-title" className="sr-only">
					About Me
				</h2>
				<p className="pb-3 border-b text-muted-foreground">This is me.</p>

				<div className="grid md:grid-cols-12 mt-9">
					<div className="md:col-span-5 space-y-4 md:max-w-fit">
						<p className="text-5xl max-md:text-center md:max-w-fit md:mx-auto">
							Hi, I&apos;m Reza <span>👋</span>
						</p>
						<div className="mb-6">
							<Image
								src="/about/reza.jpeg"
								alt="Reza Rahemtola, Full Stack Developer"
								width={500}
								height={500}
								className="object-cover mx-auto w-[200px] h-auto md:hidden"
							/>
							<Image
								src="/about/reza_full.jpeg"
								alt="Reza Rahemtola, Full Stack Developer"
								width={1170}
								height={610}
								className="w-[375px] h-auto max-md:hidden"
							/>
						</div>
					</div>
					<div className="md:col-span-7">
						<div className="max-md:mx-auto text-lg text-muted-foreground max-w-[450px]">
							<p>
								I&apos;m a full stack developer passionate about transforming complex problems into elegant, practical
								solutions. Over the years, I’ve worked on a wide range of projects, from web platforms and scalable
								backend systems to blockchain applications and AI-powered products.
							</p>
							<p className="mt-3">
								My approach blends technical depth with a user-first mindset: I strive to create software that’s not
								only reliable and high-performing but also meaningful and impactful for its users. By combining
								innovation with solid engineering practices, I aim to deliver solutions that scale, adapt, and make a
								difference.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
