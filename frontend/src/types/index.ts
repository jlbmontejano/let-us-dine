import z from "zod";

import { checkSessionSchema, createSessionSchema } from "@/lib/zod-validation";
import { GooglePlace, TopAnswer } from "@/types/shared";

export type SessionType = "join" | "create" | "check" | "error" | null;

export type SessionResult = {
	places: GooglePlace[];
	topAnswers: TopAnswer[];
};

export type CreateSessionValues = z.infer<typeof createSessionSchema>;

export type CheckSessionValues = z.infer<typeof checkSessionSchema>;
