import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import * as QuestionServices from "../services/question.services";
import { FindQuestionInfo } from "../types";
import ErrorResponse from "../utils/errorResponse";

//@desc    Get a specific question
//@route   GET /questions/:id
//@access  Public
export const getQuestion = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const question: FindQuestionInfo | null =
			await QuestionServices.findById(id);

		if (!question) {
			throw new ErrorResponse("Question not found.", 404);
		}
		return res.status(200).json({ success: true, data: question });
	}
);

//@desc    Get all questions
//@route   GET /questions
//@access  Public
export const getQuestions = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const questions: FindQuestionInfo[] = await QuestionServices.findAll();

		return res
			.status(200)
			.json({ success: true, data: questions, count: questions.length });
	}
);
