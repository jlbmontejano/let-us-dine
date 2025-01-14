import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc    Get a specific question
//@route   GET /questions/:questionId
//@access  Public
export const getQuestion = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { questionId } = req.params;

		const response = await prisma.questions.findFirst({
			where: {
				id: Number(questionId),
			},
			select: {
				id: true,
				text: true,
				answers: { select: { id: true, text: true } },
			},
		});

		if (!response) {
			return res
				.status(404)
				.json({ success: false, message: "Question not found." });
		}

		return res.status(200).json({ success: true, data: response });
	}
);

//@desc    Get all questions
//@route   GET /questions
//@access  Public
export const getQuestions = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const response = await prisma.questions.findMany({
			select: {
				id: true,
				text: true,
				answers: { select: { id: true, text: true } },
			},
		});

		return res
			.status(200)
			.json({ success: true, count: response.length, data: response });
	}
);
