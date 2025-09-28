import { GooglePlace, TopAnswer } from "../../../shared/types";

export type FindAnswerInfo = {
	text: string;
	question: {
		id: number;
		text: string;
	};
};

export type FindQuestionInfo = {
	text: string;
	answers: {
		id: number;
		text: string;
	}[];
};

export type FindResultInfo = {
	sessionUuid: string;
	latitude: number;
	longitude: number;
	answer: {
		text: string;
	};
	question: {
		text: string;
	};
};

export type CreateSessionInfo = {
	uuid: string;
};

export type FindSessionInfo = {
	uuid: string;
	isActive: boolean;
	currentParticipants: number;
	totalParticipants: number;
};

export type UserLocation = {
	latitude: number;
	longitude: number;
	maxTravelDistance: number;
};

export type GooglePlacesParams = {
	restaurantType: string;
	latitude: number;
	longitude: number;
	radius: number;
};
