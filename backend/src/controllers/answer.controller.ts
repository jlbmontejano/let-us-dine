import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc    Get a specific answer
//@route   GET /answers/:answerId
//@access  Public
export const getAnswer = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { answerId } = req.params;

		const response = await prisma.answers.findFirst({
			where: {
				id: Number(answerId),
			},
			select: {
				id: true,
				text: true,
				question: { select: { id: true, text: true } },
			},
		});

		if (!response) {
			return res
				.status(404)
				.json({ success: false, message: "Answer not found." });
		}

		return res.status(200).json({ success: true, data: response });
	}
);

//@desc    Get all answers
//@route   GET /answers
//@access  Public
export const getAnswers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const response = await prisma.answers.findMany({
			select: {
				id: true,
				text: true,
				question: { select: { id: true, text: true } },
			},
		});

		return res
			.status(200)
			.json({ success: true, count: response.length, data: response });
	}
);
