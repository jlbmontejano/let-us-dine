import { NextFunction, Request, Response } from "express";

export default function requireApiKey(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const apiKey = req.headers["x-api-key"] as string;

	if (!apiKey) {
		res.status(401).json({ success: false, message: "API key required." });
		return;
	}

	if (apiKey !== process.env.ADMIN_API_KEY) {
		res.status(401).json({ success: false, message: "Invalid API key." });
		return;
	}

	next();
}
