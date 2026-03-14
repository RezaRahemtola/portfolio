import Button from "@/components/Button";

export default function NotFound() {
	return (
		<section className="h-[100svh] flex flex-col items-center justify-center text-center px-4">
			<h1 className="text-[150px] sm:text-[200px] font-anton leading-none text-primary">404</h1>
			<p className="text-xl text-muted-foreground mt-4 mb-8">This page doesn&apos;t exist.</p>
			<Button as="link" href="/" variant="primary">
				Back to Home
			</Button>
		</section>
	);
}
