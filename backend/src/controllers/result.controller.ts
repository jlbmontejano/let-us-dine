import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc    Get a specific result
//@route   GET /results/:resultId
//@access  Public
export const getResult = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { resultId } = req.params;

		const response = await prisma.results.findFirst({
			where: {
				id: Number(resultId),
			},
			select: {
				id: true,
				session: {
					select: {
						uuid: true,
					},
				},
				answer: {
					select: {
						questionText: true,
						text: true,
					},
				},
			},
		});

		if (!response) {
			return res
				.status(404)
				.json({ success: false, message: "Result not found." });
		}

		return res.status(200).json({ success: true, data: response });
	}
);

//@desc    Get all results
//@route   GET /results
//@access  Public
export const getResults = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const response = await prisma.results.findMany({
			select: {
				id: true,
				session: {
					select: {
						uuid: true,
					},
				},
				answer: {
					select: {
						questionText: true,
						text: true,
					},
				},
			},
		});

		return res
			.status(200)
			.json({ success: true, count: response.length, data: response });
	}
);
