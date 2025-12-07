import { GooglePlace, TopAnswer } from "./shared";

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
