import { withPlausibleProxy } from "next-plausible";

const nextConfig = withPlausibleProxy({
	customDomain: "https://analytics.reza.dev",
})({
	/* config options here */
});

export default nextConfig;
