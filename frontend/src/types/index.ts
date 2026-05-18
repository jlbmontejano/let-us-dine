import z from "zod";

import {
	createSessionSchema,
	getSessionStatusSchema,
} from "@/lib/zod-validation";
import { GooglePlace, TopAnswer } from "@/types/shared";

export type SessionType = "join" | "create" | "check" | "error" | null;

export type SessionResult = {
	places: GooglePlace[];
	topAnswers: TopAnswer[];
};

export type CreateSessionValues = z.infer<typeof createSessionSchema>;

export type GetSessionStatusValues = z.infer<typeof getSessionStatusSchema>;
