import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";
import {
	createResultAndUpdate,
	formatQuestionnaireData,
	isSessionActive,
} from "../services/session.services";
import { PostSessionResultBody } from "../types";

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

		const { questionnaireData, userLocation } =
			req.body as PostSessionResultBody;

		const { latitude: userLatitude = null, longitude: userLongitude = null } =
			userLocation ?? {};

		// Clean data to make sure we can create multiple results
		const formattedResults = formatQuestionnaireData(questionnaireData);

		// Make a transaction for make sure everything success or everything fails
		await createResultAndUpdate(
			sessionId,
			formattedResults,
			userLatitude,
			userLongitude
		);

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
				averageLatitude: true,
				averageLongitude: true,
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

		const questionsResults = await prisma.$queryRaw`
		WITH AnswerCounts AS 
		(
		  SELECT
			a."text",
			a."questionText",
			r."questionId",
			CAST(COUNT(*) AS INTEGER) AS "voteCount"
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
			MAX("voteCount") AS max_voteCount
		  FROM
			AnswerCounts
		  GROUP BY
			"questionId"
		)

		SELECT
			ac."text",
			ac."questionText",
		  	ac."questionId",
		 	ac."voteCount"
		FROM
		 	AnswerCounts ac
		JOIN
		  	MaxCounts mc
		ON
		  	ac."questionId" = mc."questionId" AND ac."voteCount" = mc.max_voteCount
		ORDER BY
		  	ac."questionId";
	  `;

		if (!questionsResults) {
			return res
				.status(404)
				.json({ success: false, message: "Results not found." });
		}

		const { averageLatitude, averageLongitude } =
			await prisma.sessions.findFirstOrThrow({
				where: { uuid: sessionId },
				select: {
					averageLatitude: true,
					averageLongitude: true,
				},
			});

		return res.status(200).json({
			success: true,
			data: {
				questionsResults,
				averageLatitude: averageLatitude ?? null,
				averageLongitude: averageLongitude ?? null,
			},
		});
	}
);
