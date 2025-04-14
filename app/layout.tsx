import { ReactLenis } from "lenis/react";
import type { Metadata } from "next";
import { Anton, Roboto_Flex } from "next/font/google";

import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import { GoogleAnalytics } from "@next/third-parties/google";
import "lenis/dist/lenis.css";
import Preloader from "../components/Preloader";
import StickyEmail from "./_components/StickyEmail";
import "./globals.css";

const antonFont = Anton({
	weight: "400",
	style: "normal",
	subsets: ["latin"],
	variable: "--font-anton",
});

const robotoFlex = Roboto_Flex({
	weight: ["100", "400", "500", "600", "700", "800"],
	style: "normal",
	subsets: ["latin"],
	variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
	title: "Portfolio - Reza Rahemtola",
	description: "Personal portfolio of Reza Rahemtola",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<GoogleAnalytics gaId="G-MHLY1LNGY5" />
			<body className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}>
				<ReactLenis
					root
					options={{
						lerp: 0.1,
						duration: 1.4,
					}}
				>
					<Navbar />
					<main>{children}</main>
					<Footer />

					<CustomCursor />
					<Preloader />
					<ScrollProgressIndicator />
					<ParticleBackground />
					<StickyEmail />
				</ReactLenis>
			</body>
		</html>
	);
}
