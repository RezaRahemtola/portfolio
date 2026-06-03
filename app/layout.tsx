import type { Metadata } from "next";
import { Anton, Roboto_Flex } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import ScrollRestorer from "@/components/ScrollRestorer";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import Preloader from "../components/Preloader";
import ClientEffects from "./_components/ClientEffects";
import StickyEmail from "./_components/StickyEmail";
import "./globals.css";
import { ReactNode } from "react";
import PlausibleProvider from "next-plausible";

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

const DESCRIPTION =
	"Reza Rahemtola — full stack developer with 3+ years building web platforms, scalable backends, blockchain apps, and AI-powered products.";

export const metadata: Metadata = {
	metadataBase: new URL("https://reza.dev"),
	title: {
		default: "Portfolio - Reza Rahemtola",
		template: "%s | Reza Rahemtola",
	},
	description: DESCRIPTION,
	alternates: { canonical: "/" },
	openGraph: {
		title: "Portfolio - Reza Rahemtola",
		description: DESCRIPTION,
		url: "https://reza.dev",
		type: "website",
		images: [{ url: "/about/reza_full.jpeg", width: 1170, height: 610, alt: "Reza Rahemtola" }],
	},
	twitter: { card: "summary_large_image", description: DESCRIPTION, images: ["/about/reza_full.jpeg"] },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<PlausibleProvider domain="reza.dev" customDomain="https://analytics.reza.dev" trackOutboundLinks />
			</head>
			<body className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}>
				<SmoothScroll>
					<ScrollRestorer />
					<Navbar />
					<main>{children}</main>
					<Footer />

					<Preloader />
					<ScrollProgressIndicator />
					<ParticleBackground />
					<StickyEmail />
					<ClientEffects />
				</SmoothScroll>
			</body>
		</html>
	);
}
