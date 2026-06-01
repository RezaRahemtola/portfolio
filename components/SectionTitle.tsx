import { ReactNode } from "react";
import { SectionFlower } from "./icons";
import { cn } from "@/lib/utils";

interface Props {
	icon?: ReactNode;
	className?: string;
	classNames?: {
		container?: string;
		title?: string;
		icon?: string;
	};
	title: string;
	id?: string;
}

const SectionTitle = ({ icon, title, className, classNames, id }: Props) => {
	return (
		<div className={cn("flex items-center gap-4 mb-10", className, classNames?.container)}>
			{icon ?? (
				<SectionFlower aria-hidden="true" width={25} className={cn("animate-spin duration-7000", classNames?.icon)} />
			)}
			<h2 id={id} className={cn("text-xl uppercase leading-none", classNames?.title)}>
				{title}
			</h2>
		</div>
	);
};

export default SectionTitle;
