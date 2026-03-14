import Button from "@/components/Button";
import SnakeGame from "@/components/SnakeGame";

export default function NotFound() {
	return (
		<section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-4 py-16 gap-6">
			<h1 className="text-[100px] sm:text-[150px] font-anton leading-none text-primary">404</h1>
			<p className="text-xl text-muted-foreground">This page doesn&apos;t exist.</p>
			<div className="hidden md:block w-full">
				<SnakeGame />
			</div>
			<Button as="link" href="/" variant="primary">
				Back to Home
			</Button>
		</section>
	);
}
