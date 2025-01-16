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

export type SessionResults = {
	averageLatitude: number | null;
	averageLongitude: number | null;
	questionsResults: QuestionResult[];
};

export type QuestionResult = {
	text: string;
	questionId: string;
	questionText: string;
	voteCount: number;
};

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
