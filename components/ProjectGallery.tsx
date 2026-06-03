"use client";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Props {
	images: string[];
	title: string;
}

const ProjectGallery = ({ images, title }: Props) => {
	// Natural aspect ratio per image, measured on load, so the gallery shows the
	// whole image without cropping and without hardcoding dimensions.
	const [ratios, setRatios] = useState<Record<number, number>>({});
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	// Once the page is idle, warm the cache with the full-size variants the lightbox
	// uses, so opening fullscreen / paging is instant instead of fetching on click.
	const [preloadFull, setPreloadFull] = useState(false);
	const isOpen = openIndex !== null;

	useEffect(() => {
		const id = window.setTimeout(() => setPreloadFull(true), 1000);
		return () => window.clearTimeout(id);
	}, []);

	const close = useCallback(() => setOpenIndex(null), []);
	const step = useCallback(
		(dir: number) => setOpenIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
		[images.length],
	);

	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			else if (e.key === "ArrowLeft") step(-1);
			else if (e.key === "ArrowRight") step(1);
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [isOpen, close, step]);

	const navButton =
		"absolute z-10 size-12 inline-flex items-center justify-center bg-background/70 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors";

	return (
		<>
			<div className="flex flex-col gap-2 max-w-[800px] mx-auto">
				{images.map((image, i) => (
					<button
						key={image}
						type="button"
						onClick={() => setOpenIndex(i)}
						aria-label={`View ${title} screenshot ${i + 1} fullscreen`}
						className="group relative w-full bg-background-light overflow-hidden"
						style={{ aspectRatio: ratios[i] ?? 16 / 10 }}
					>
						<Image
							src={image}
							alt={`${title} screenshot ${i + 1}`}
							fill
							quality={90}
							sizes="(max-width: 800px) 100vw, 800px"
							className="object-cover"
							onLoad={(e) => {
								const img = e.currentTarget;
								if (img.naturalWidth && img.naturalHeight) {
									setRatios((r) => (r[i] ? r : { ...r, [i]: img.naturalWidth / img.naturalHeight }));
								}
							}}
						/>
						<span className="absolute top-4 right-4 z-1 bg-background/70 text-foreground size-12 inline-flex justify-center items-center transition-all opacity-0 group-hover:opacity-100">
							<Maximize2 />
						</span>
					</button>
				))}
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
					role="dialog"
					aria-modal="true"
					aria-label={`${title} screenshots`}
					onClick={close}
				>
					<button type="button" onClick={close} aria-label="Close" className={`${navButton} top-4 right-4`}>
						<X />
					</button>

					{images.length > 1 && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								step(-1);
							}}
							aria-label="Previous image"
							className={`${navButton} left-4 top-1/2 -translate-y-1/2`}
						>
							<ChevronLeft />
						</button>
					)}

					<div className="relative w-[88vw] h-[85vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
						<Image
							src={images[openIndex]}
							alt={`${title} screenshot ${openIndex + 1}`}
							fill
							quality={90}
							sizes="100vw"
							className="object-contain"
						/>
					</div>

					{images.length > 1 && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								step(1);
							}}
							aria-label="Next image"
							className={`${navButton} right-4 top-1/2 -translate-y-1/2`}
						>
							<ChevronRight />
						</button>
					)}

					{images.length > 1 && (
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-anton tracking-widest text-foreground/80">
							{openIndex + 1} / {images.length}
						</div>
					)}
				</div>
			)}

			{/* Off-screen warm-up of the full-size variant the lightbox uses (same
			    sizes/quality), so fullscreen + carousel paging is instant. */}
			{preloadFull && (
				<div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden opacity-0">
					{images.map((image) => (
						<Image key={image} src={image} alt="" fill quality={90} sizes="100vw" loading="eager" />
					))}
				</div>
			)}
		</>
	);
};

export default ProjectGallery;
