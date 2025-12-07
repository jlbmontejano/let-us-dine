import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import * as AnswerServices from "../services/answer.services";
import { FindAnswerInfo } from "../types/index";
import ErrorResponse from "../utils/errorResponse";

//@desc    Get a specific answer
//@route   GET /answers/:id
//@access  Public
export const getAnswer = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const answer: FindAnswerInfo | null = await AnswerServices.findById(id);

		if (!answer) {
			throw new ErrorResponse("Answer not found.", 404);
		}

		return res.status(200).json({ success: true, data: answer });
	}
);

//@desc    Get all answers
//@route   GET /answers
//@access  Public
export const getAnswers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const answers: FindAnswerInfo[] = await AnswerServices.findAll();

		return res
			.status(200)
			.json({ success: true, data: answers, count: answers.length });
	}
);
