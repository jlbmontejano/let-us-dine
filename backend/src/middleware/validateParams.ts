import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import { checkParamsSchema } from "../utils/zod-validation/schemas";
import asyncHandler from "./asyncHandler";

const validateParams = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const idValidation = checkParamsSchema.safeParse(req.params);

		if (!idValidation.success) {
			return next(new ErrorResponse("Error validando ID.", 400));
		}

		next();
	}
);

export default validateParams;
