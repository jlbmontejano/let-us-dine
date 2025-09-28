import * as z from "zod";

export const checkParamsSchema = z.object({
	id: z.string().min(1, { message: "An ID is required." }),
});

export const createSessionSchema = z.object({
	totalParticipants: z.coerce
		.number()
		.gt(1, "Number must be between 2 and 12")
		.lte(12, "Number must be between 2 and 12"),
});
