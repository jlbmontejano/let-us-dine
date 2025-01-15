import prisma from "../../prisma/prismaClient";
import { QuestionnaireData, QuestionWithAnswer } from "../types";

export const isSessionActive = (sessionId: string) => {
	return prisma.sessions.findFirst({
		where: { uuid: sessionId },
		select: {
			isActive: true,
			currentParticipants: true,
			totalParticipants: true,
		},
	});
};

export const formatQuestionnaireData = (
	questionnaireData: QuestionnaireData
): QuestionWithAnswer[] => {
	const cleansedData = [];

	for (const [key, value] of Object.entries(questionnaireData)) {
		cleansedData.push({ question: key, answer: value });
	}

	return cleansedData;
};

export const createResultAndUpdate = (
	sessionId: string,
	formattedResults: QuestionWithAnswer[],
	userLatitude: number | null,
	userLongitude: number | null
) => {
	return prisma.$transaction(async tx => {
		const resultPromises = formattedResults.map(item => {
			return tx.results.create({
				data: {
					session: {
						connect: { uuid: sessionId },
					},
					question: {
						connect: { text: item.question },
					},
					answer: {
						connect: {
							questionText_text: {
								questionText: item.question,
								text: item.answer,
							},
						},
					},
				},
			});
		});

		// Wait for all the result creations to complete
		const results = await Promise.all(resultPromises);

		// Increment currentParticipants by 1, we take advantage of this query to SELECT the averageLatitude and averageLongitude, which we will update next
		const {
			currentParticipants,
			totalParticipants,
			averageLatitude,
			averageLongitude,
		} = await tx.sessions.update({
			where: { uuid: sessionId },
			data: {
				currentParticipants: {
					increment: 1,
				},
			},
			select: {
				currentParticipants: true,
				totalParticipants: true,
				averageLatitude: true,
				averageLongitude: true,
			},
		});

		// Flag our session as inactive if needed
		if (currentParticipants >= totalParticipants) {
			await tx.sessions.update({
				where: { uuid: sessionId },
				data: {
					isActive: false,
				},
			});
		}

		if (!userLatitude || !userLongitude) {
			return;
		}

		// Make sure we calculate our updated average latitude and longitude, let's remember that all our users might block their location, therefore we could end up with 0 as our average.
		const updatedAvgLatitude = calculateAverage(
			averageLatitude ?? 0,
			userLatitude
		);
		const updatedAvgLongitude = calculateAverage(
			averageLongitude ?? 0,
			userLongitude
		);

		const updatedAverages = await tx.sessions.update({
			where: { uuid: sessionId },
			data: {
				averageLatitude: updatedAvgLatitude,
				averageLongitude: updatedAvgLongitude,
			},
			select: {
				averageLatitude: true,
				averageLongitude: true,
			},
		});
	});
};

export const calculateAverage = (
	oldAverage: number,
	newMeasurement: number
): number => {
	return (oldAverage ?? newMeasurement ?? 0) + (newMeasurement ?? 0);
};
