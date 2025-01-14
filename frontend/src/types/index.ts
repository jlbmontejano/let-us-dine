export type SessionType = "join" | "create" | "check" | null;

export type PostSession = {
	uuid: string;
};

export type GetSession = {
	uuid: string;
	currentParticipants: number;
	totalParticipants: number;
	isActive: boolean;
};

export type SessionData = {
	text: string;
	questionId: string;
	questionText: string;
	vote_count: number;
}[];

export type SessionStatus = {
	isActive: boolean;
	currentParticipants: number;
	totalParticipants: number;
};

export type FetchResponse<T = undefined> = {
	success: boolean;
	data: T;
	message?: string;
};
