import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";

function errorHandler(
	err: ErrorResponse,
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
}

export default errorHandler;
