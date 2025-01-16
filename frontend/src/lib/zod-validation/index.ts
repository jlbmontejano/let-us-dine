import { z } from "zod";
import { QUESTIONS } from "@/constants";

export const createSessionSchema = z.object({
	totalParticipants: z.coerce
		.number()
		.gt(1, "Number must be between 2 and 12")
		.lte(12, "Number must be between 2 and 12"),
});

export const joinSessionSchema = z.object({
	sessionId: z.string().min(1, { message: "A session ID is required." }),
});

export const checkSessionSchema = z.object({
	sessionId: z.string().min(1, { message: "A session ID is required." }),
});

export const questionsSchema = z.object(
	QUESTIONS.reduce((schema, question) => {
		schema[question.text] = z.enum(question.options as [string, ...string[]], {
			required_error: `An answer to each question is required.`,
		});
		return schema;
	}, {} as Record<string, z.ZodTypeAny>)
);
