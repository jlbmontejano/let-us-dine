import z from "zod";
import { GooglePlace, TopAnswer } from "./shared";
import { checkSessionSchema, createSessionSchema } from "@/lib/zod-validation";

export type SessionType = "join" | "create" | "check" | "error" | null;

export type SessionStatus = {
	uuid: string;
	isActive: boolean;
	currentParticipants: number;
	totalParticipants: number;
};

export type SessionResult = {
	places: GooglePlace[];
	topAnswers: TopAnswer[];
};

export type CreateSessionValues = z.infer<typeof createSessionSchema>;

export type CheckSessionValues = z.infer<typeof checkSessionSchema>;
