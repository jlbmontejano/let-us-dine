import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import * as ResultServices from "../services/result.services";
import { FindResultInfo } from "../types";
import ErrorResponse from "../utils/errorResponse";

//@desc    Get a specific result
//@route   GET /results/:id
//@access  Admin
export const getResult = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const result: FindResultInfo | null = await ResultServices.findById(id);

		if (!result) {
			throw new ErrorResponse("Result not found.", 404);
		}

		return res.status(200).json({ success: true, data: result });
	}
);

//@desc    Get all results
//@route   GET /results
//@access  Admin
export const getResults = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const results: FindResultInfo[] = await ResultServices.findAll();

		return res
			.status(200)
			.json({ success: true, data: results, count: results.length });
	}
);
