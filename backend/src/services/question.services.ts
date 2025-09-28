import prisma from "../../prisma/prismaClient";
import { FindQuestionInfo } from "../types";

export async function findById(id: string): Promise<FindQuestionInfo | null> {
	return prisma.question.findUnique({
		where: {
			id: Number(id),
		},
		select: {
			id: true,
			text: true,
			answers: { select: { id: true, text: true } },
		},
	});
}

export async function findAll(): Promise<FindQuestionInfo[]> {
	return prisma.question.findMany({
		select: {
			id: true,
			text: true,
			answers: { select: { id: true, text: true } },
		},
	});
}
