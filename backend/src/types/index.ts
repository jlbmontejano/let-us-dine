export type PostSessionResultBody = {
	questionnaireData: QuestionnaireData;
	userLocation: GeolocationCoordinates;
};

export type QuestionnaireData = {
	[key: string]: string;
};

export type QuestionWithAnswer = {
	question: string;
	answer: string;
};
