import * as z from "zod";

import { QuestionData } from "@lud/shared";

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
