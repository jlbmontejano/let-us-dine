import { SessionType } from "@/types";

export const CAROUSEL_IMAGES: { src: string; alt: string }[] = [
	{
		src: "images/fruit.webp",
		alt: "fruit",
	},
	{
		src: "images/fusion.webp",
		alt: "fusion",
	},
	{
		src: "images/hamburger.webp",
		alt: "hamburger",
	},
	{
		src: "images/japanese.webp",
		alt: "japanese",
	},
	{
		src: "images/pancakes.webp",
		alt: "pancakes",
	},
	{
		src: "images/pasta.webp",
		alt: "pasta",
	},
	{
		src: "images/tacos.webp",
		alt: "tacos",
	},
	{
		src: "images/tiramisu.webp",
		alt: "tiramisu",
	},
];

export const SESSION_OPTIONS: { label: string; type: SessionType }[] = [
	{ label: "Create a Session", type: "create" },
	{ label: "Join a Session", type: "join" },
	{ label: "Check Results", type: "check" },
];
