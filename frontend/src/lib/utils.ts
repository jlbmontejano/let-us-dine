import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const copyIdToClipboard = async (sessionId: string) => {
	await navigator.clipboard.writeText(sessionId);
};
