import z from "zod";

export const getAnswerSchema = z.object({
  text: z.string(),
  question: z.object({
    id: z.number(),
    text: z.string(),
  }),
});

export const getQuestionSchema = z.object({
  text: z.string(),
  answers: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
    }),
  ),
});

export const getResultSchema = z.object({
  sessionUuid: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  answer: z.object({
    text: z.string(),
  }),
  question: z.object({
    text: z.string(),
  }),
});

export const getSessionSchema = z.object({
  uuid: z.string(),
  isActive: z.boolean(),
  currentParticipants: z.number(),
  totalParticipants: z.number(),
});

export const postSessionSchema = z.object({
  uuid: z.string(),
});
