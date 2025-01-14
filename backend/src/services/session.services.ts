import prisma from "../../prisma/prismaClient";
import { RequestBody } from "../types";

export const isSessionActive = (sessionId: string) => {
	return prisma.sessions.findFirst({
		where: { uuid: sessionId },
		select: {
			isActive: true,
			currentParticipants: true,
			totalParticipants: true,
		},
	});
};

export const formatRequestBody = (
	data: any
): { questions: string; answers: string }[] => {
	console.log(data);
	const cleansed = [];
	const reqBody: RequestBody = data;

	for (const [key, value] of Object.entries(reqBody)) {
		cleansed.push({ questions: key, answers: value });
	}

	return cleansed;
};
