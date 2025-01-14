import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";
import {
	formatRequestBody,
	isSessionActive,
} from "../services/session.services";

//@desc    Create a new session
//@route   POST /sessions
//@access  Public
export const createSession = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { totalParticipants } = req.body;

		const uuid = uuidv4();

		const response = await prisma.sessions.create({
			data: { uuid, currentParticipants: 0, totalParticipants },
			select: { uuid: true },
		});

		if (!response) {
			res.status(400).json({
				success: false,
				message: "Error creating session.",
			});
		}

		console.log(response);

		return res.status(200).json({
			success: true,
			data: response,
		});
	}
);

//@desc    Create session results
//@route   POST /sessions/:sessionId
//@access  Public
export const createSessionResults = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { sessionId } = req.params;

		// Check that the session is still active
		const sessionStatus = await isSessionActive(sessionId);

		if (!sessionStatus) {
			return res.status(404).json({
				success: false,
				message: "Session not found.",
			});
		}

		if (!sessionStatus.isActive) {
			return res.status(400).json({
				success: false,
				message: "This session is already inactive.",
			});
		}

		// Clean data to make sure we can create multiple results
		const formattedData = formatRequestBody(req.body);

		const resultPromises = formattedData.map(item => {
			return prisma.results.create({
				data: {
					session: {
						connect: { uuid: sessionId },
					},
					question: {
						connect: { text: item.questions },
					},
					answer: {
						connect: {
							questionText_text: {
								questionText: item.questions,
								text: item.answers,
							},
						},
					},
				},
			});
		});

		// Wait for all the result creations to complete
		const results = await Promise.all(resultPromises);

		// Increment currentParticipants by 1
		const { currentParticipants, totalParticipants } =
			await prisma.sessions.update({
				where: { uuid: sessionId },
				data: {
					currentParticipants: {
						increment: 1,
					},
				},
				select: {
					currentParticipants: true,
					totalParticipants: true,
				},
			});

		// Flag as inactive if needed
		if (currentParticipants >= totalParticipants) {
			await prisma.sessions.update({
				where: { uuid: sessionId },
				data: {
					isActive: false,
				},
			});
		}

		return res.status(200).json({
			success: true,
			message: "Your results have been added to the session.",
		});
	}
);

//@desc    Get a specific session
//@route   GET /sessions/:sessionId
//@access  Public
export const getSession = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { sessionId } = req.params;

		const response = await prisma.sessions.findFirst({
			where: {
				uuid: sessionId,
			},
			select: {
				uuid: true,
				currentParticipants: true,
				totalParticipants: true,
				isActive: true,
			},
		});

		if (!response) {
			return res
				.status(404)
				.json({ success: false, message: "Session not found." });
		}

		return res.status(200).json({ success: true, data: response });
	}
);

//@desc    Get all sessions
//@route   GET /sessions
//@access  Public
export const getSessions = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const response = await prisma.sessions.findMany({
			select: {
				uuid: true,
				currentParticipants: true,
				totalParticipants: true,
				isActive: true,
			},
		});

		return res
			.status(200)
			.json({ success: true, count: response.length, data: response });
	}
);

//@desc    Get a session's result
//@route   GET /sessions/:sessionId/results
//@access  Public
export const getSessionResults = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { sessionId } = req.params;

		const sessionStatus = await isSessionActive(sessionId);

		if (!sessionStatus) {
			return res.status(404).json({
				success: false,
				message: "Session not found.",
			});
		}

		if (sessionStatus.isActive) {
			return res.status(200).json({
				success: false,
				data: sessionStatus,
				message: "This session is still active.",
			});
		}

		const response = await prisma.$queryRaw`
		WITH AnswerCounts AS 
		(
		  SELECT
			a."text",
			a."questionText",
			r."questionId",
			CAST(COUNT(*) AS INTEGER) AS vote_count
		  FROM
			"Results" r
			JOIN "Questions" q ON q."id" = r."questionId"
			JOIN "Answers" a ON a."id" = r."answerId"
		  WHERE
			r."sessionUuid" = ${sessionId}
		  GROUP BY
			r."questionId", 
			a."text", 
			a."questionText"
		),

		MaxCounts AS (
		  SELECT
			"questionId",
			MAX(vote_count) AS max_vote_count
		  FROM
			AnswerCounts
		  GROUP BY
			"questionId"
		)

		SELECT
			ac."text",
			ac."questionText",
		  	ac."questionId",
		 	ac.vote_count
		FROM
		 	AnswerCounts ac
		JOIN
		  	MaxCounts mc
		ON
		  	ac."questionId" = mc."questionId" AND ac.vote_count = mc.max_vote_count
		ORDER BY
		  	ac."questionId";
	  `;

		if (!response) {
			return res
				.status(404)
				.json({ success: false, message: "Results not found." });
		}

		return res.status(200).json({ success: true, data: response });
	}
);
