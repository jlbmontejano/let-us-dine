import QUESTIONS from "../../../shared/constants/questions";
import { QuestionData } from "../../../shared/types";
import prisma from "../../prisma/prismaClient";
import { UserLocation } from "../types";
import calculateTopAnswers from "../utils/calculateTopAnswers";
import calculateWeightedCentroid from "../utils/calculateWeightedCentroid";
import ErrorResponse from "../utils/errorResponse";
import formatSearchParams from "../utils/formatSearchParams";
import searchPlaces from "../utils/searchPlaces";

const RADIUS_QUESTION = QUESTIONS[2].text;

export async function create(uuid: string, totalParticipants: number) {
	return prisma.session.create({
		data: {
			uuid,
			currentParticipants: 0,
			totalParticipants,
		},
		select: { uuid: true },
	});
}

export async function findById(id: string) {
	return prisma.session.findUnique({
		where: {
			uuid: id,
		},
		select: {
			uuid: true,
			isActive: true,
			currentParticipants: true,
			totalParticipants: true,
		},
	});
}

export async function findAll() {
	return prisma.session.findMany();
}

export async function createResult(
	sessionId: string,
	questionnaireData: QuestionData[],
	userLocation: GeolocationCoordinates
) {
	return prisma.$transaction(async tx => {
		const createdResults = [];

		for (let i = 0; i < questionnaireData.length; i++) {
			const result = questionnaireData[i];

			const question = await tx.question.findUnique({
				where: { text: result.questionText },
			});

			if (!question) {
				throw new ErrorResponse("Question not found", 404);
			}

			const answer = await tx.answer.findUnique({
				where: {
					text: result.answerText,
				},
			});

			if (!answer) {
				throw new ErrorResponse("Answer not found", 404);
			}

			const createdResult = await tx.result.create({
				data: {
					session: { connect: { uuid: sessionId } },
					question: { connect: { id: question.id } },
					answer: { connect: { id: answer.id } },
					latitude: userLocation.latitude,
					longitude: userLocation.longitude,
				},
			});

			createdResults.push(createdResult);
		}

		// Increment currentParticipants by 1
		const updatedSession = await tx.session.update({
			where: { uuid: sessionId },
			data: {
				currentParticipants: {
					increment: 1,
				},
			},
		});

		// Mark as inactive if needed and proceed to calculate session's results
		if (
			updatedSession.currentParticipants >=
			updatedSession.totalParticipants
		) {
			await tx.session.update({
				where: { uuid: sessionId },
				data: { isActive: false },
			});

			// Fetch all users' lat, long and maxTravelDistance
			const userLocations = await tx.result.findMany({
				where: {
					sessionUuid: sessionId,
					question: {
						text: RADIUS_QUESTION,
					},
				},
				select: {
					latitude: true,
					longitude: true,
					answer: { select: { apiParams: true } },
				},
			});

			// Build necessary object for calculateWeightedCentroid function
			const locationsObject: UserLocation[] = userLocations.map(user => {
				const apiParams = user.answer.apiParams as {
					maxTravelDistance: number;
				};
				const { maxTravelDistance } = apiParams;

				return {
					latitude: user.latitude,
					longitude: user.longitude,
					maxTravelDistance: Number(
						JSON.stringify(maxTravelDistance)
					),
				};
			});

			// Calculate weighted centroid before updating session
			const { centerLat, centerLng, radiusMeters } =
				calculateWeightedCentroid(locationsObject);

			const topAnswers = await calculateTopAnswers(sessionId);

			const searchParams = formatSearchParams(
				topAnswers,
				centerLat,
				centerLng,
				radiusMeters
			);

			const googlePlaces = await searchPlaces(topAnswers, searchParams);

			console.log("googlePlace after filtering: ", googlePlaces.length);

			await tx.completedSession.create({
				data: {
					centerLat,
					centerLng,
					radiusMeters,
					topAnswers,
					places: googlePlaces,
					session: { connect: { uuid: sessionId } },
				},
			});
		}
	});
}

export async function findResultsById(id: string) {
	return prisma.completedSession.findUnique({
		where: {
			sessionUuid: id,
		},
		select: {
			places: true,
			topAnswers: true,
		},
	});
}
