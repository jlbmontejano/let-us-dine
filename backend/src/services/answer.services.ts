import prisma from "../../prisma/prismaClient";
import { FindAnswerInfo } from "../types/index";

export async function findById(id: string): Promise<FindAnswerInfo | null> {
	return prisma.answer.findUnique({
		where: {
			id: Number(id),
		},
		select: {
			id: true,
			text: true,
			question: { select: { id: true, text: true } },
		},
	});
}

export async function findAll(): Promise<FindAnswerInfo[]> {
	return prisma.answer.findMany({
		select: {
			id: true,
			text: true,
			question: { select: { id: true, text: true } },
		},
	});
}
