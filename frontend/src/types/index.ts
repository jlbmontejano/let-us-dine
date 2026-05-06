import z from "zod";

import { checkSessionSchema } from "@/lib/zod-validation";
import { GooglePlace, TopAnswer } from "@lud/shared";
import { createSessionSchema } from "@lud/shared/zod-validation";

export type SessionType = "join" | "create" | "check" | "error" | null;

export type SessionResult = {
	places: GooglePlace[];
	topAnswers: TopAnswer[];
};

export type CreateSessionValues = z.infer<typeof createSessionSchema>;

export type CheckSessionValues = z.infer<typeof checkSessionSchema>;
