"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Link> {
	back?: boolean;
}

const TransitionLink = ({ href, onClick, children, back = false, ...rest }: Props) => {
	const router = useRouter();

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		if (back) {
			if (window.history.length > 1) {
				router.back();
			} else {
				router.push(href.toString());
			}
		} else if (href) {
			router.push(href.toString());
		} else if (onClick) {
			onClick(e);
		}
	};

	return (
		<Link href={href} {...rest} onClick={handleLinkClick}>
			{children}
		</Link>
	);
};

export default TransitionLink;
