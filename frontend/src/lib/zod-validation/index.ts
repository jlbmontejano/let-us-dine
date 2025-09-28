import { z } from "zod";
import QUESTIONS from "../../../../shared/constants/questions";

export const createSessionSchema = z.object({
	totalParticipants: z.coerce
		.number<number>("Insert a number between 2 and 12")
		.gt(1, "Number must be between 2 and 12")
		.lte(12, "Number must be between 2 and 12"),
});

export const checkSessionSchema = z.object({
	sessionId: z
		.uuidv4("Invalid ID")
		.min(1, { message: "A session ID is required." }),
});

export const questionsSchema = z.object(
	QUESTIONS.reduce(
		(schema, question) => {
			const answerTexts = question.answers.map(answer => answer.text);

			schema[question.text] = z.enum(
				answerTexts as [string, ...string[]],
				{
					message: `An answer to "${question.text}" is required.`,
				},
			);
			return schema;
		},
		{} as Record<string, z.ZodTypeAny>,
	),
);
