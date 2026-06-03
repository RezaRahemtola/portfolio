"use client";

import Button from "@/components/Button";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-4 py-16 gap-6">
			<h1 className="text-[80px] sm:text-[120px] font-anton leading-none text-primary">Oops</h1>
			<p className="text-xl text-muted-foreground">Something went wrong on this page.</p>
			<div className="flex flex-wrap items-center justify-center gap-4">
				<Button as="button" onClick={reset} variant="primary">
					Try Again
				</Button>
				<Button as="link" href="/" variant="light">
					Back to Home
				</Button>
			</div>
		</section>
	);
}
