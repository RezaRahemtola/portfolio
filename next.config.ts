import { withPlausibleProxy } from "next-plausible";

const nextConfig = withPlausibleProxy({
	customDomain: "https://analytics.reza.dev",
})({
	images: {
		// Serve AVIF first (smaller than WebP), fall back to WebP
		formats: ["image/avif", "image/webp"],
		// Allow higher delivery quality than the default 75 (next/image requires whitelisting in v16+)
		qualities: [75, 90],
	},
});

export default nextConfig;
