import prisma from "../../prisma/prismaClient";
import { FindResultInfo } from "../types";

export async function findById(id: string): Promise<FindResultInfo | null> {
	return prisma.result.findUnique({
		where: {
			id: Number(id),
		},
		select: {
			id: true,
			sessionUuid: true,
			answer: { select: { text: true } },
			question: { select: { text: true } },
			latitude: true,
			longitude: true,
		},
	});
}

export async function findAll(): Promise<FindResultInfo[]> {
	return prisma.result.findMany({
		select: {
			id: true,
			sessionUuid: true,
			answer: { select: { text: true } },
			question: { select: { text: true } },
			latitude: true,
			longitude: true,
		},
	});
}
