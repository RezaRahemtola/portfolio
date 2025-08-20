"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
	const container = React.useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					id: "about-me-in",
					trigger: container.current,
					start: "top 70%",
					end: "bottom bottom",
					scrub: 0.5,
				},
			});

			tl.from(".slide-up-and-fade", {
				y: 150,
				opacity: 0,
				stagger: 0.05,
			});
		},
		{ scope: container },
	);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					id: "about-me-out",
					trigger: container.current,
					start: "bottom 50%",
					end: "bottom 10%",
					scrub: 0.5,
				},
			});

			tl.to(".slide-up-and-fade", {
				y: -150,
				opacity: 0,
				stagger: 0.02,
			});
		},
		{ scope: container },
	);

	return (
		<section className="pb-section" id="about-me">
			<div className="container" ref={container}>
				<p className="pb-3 border-b text-muted-foreground slide-up-and-fade">This is me.</p>

				<div className="grid md:grid-cols-12 mt-9">
					<div className="md:col-span-5 space-y-4 md:max-w-fit">
						<p className="text-5xl slide-up-and-fade max-md:text-center md:max-w-fit md:mx-auto">
							Hi, I&apos;m Reza <span>👋</span>
						</p>
						<div className="mb-6 slide-up-and-fade">
							<Image
								src="/about/reza.jpeg"
								alt="Reza"
								width={200}
								height={200}
								className="object-cover mx-auto md:hidden"
							/>
							<Image src="/about/reza_full.jpeg" alt="Reza" width={375} height={200} className="max-md:hidden" />
						</div>
					</div>
					<div className="md:col-span-7">
						<div className="max-md:mx-auto text-lg text-muted-foreground max-w-[450px]">
							<p className="slide-up-and-fade">
								I&apos;m a full stack developer passionate about transforming complex problems into elegant, practical
								solutions. Over the years, I’ve worked on a wide range of projects, from web platforms and scalable
								backend systems to blockchain applications and AI-powered products.
							</p>
							<p className="mt-3 slide-up-and-fade">
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
