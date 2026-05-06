import * as z from "zod";

import { QuestionData } from "@/types/shared";

export const createSessionSchema = z.object({
  totalParticipants: z
    .number()
    .gt(1, "Number must be between 2 and 12")
    .lte(12, "Number must be between 2 and 12"),
});

export const checkParamsSchema = z.object({
  id: z.string().min(1, { message: "An ID is required." }),
});

const questionDataSchema: z.ZodType<QuestionData> = z.object({
  questionText: z.string(),
  answerText: z.string(),
});

export const createSessionResultSchema = z.object({
  questionnaireData: z.array(questionDataSchema),
  userLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
