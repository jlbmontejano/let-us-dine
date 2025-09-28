export type CreateSessionResultBody = {
	questionnaireData: QuestionData[];
	userLocation: GeolocationCoordinates;
};

export type QuestionData = {
	questionText: string;
	answerText: string;
};

export type TopAnswer = {
	answer_text: string;
	answer_api_params: {
		category?: string;
		price?: string;
		mealType?: string;
		vibe?: string;
		minRating?: number;
		beverages?: string;
	};
	question_text: string;
	vote_count: string;
};

export type GooglePlace = {
	name: string | null;
	formattedAddress: string | null;
	nationalPhoneNumber: string | null;
	rating: number | null;
	googleMapsUri: string | null;
	websiteUri: string | null;
	servesBeer: boolean | null;
	servesWine: boolean | null;
	servesCocktails: boolean | null;
	servesCoffee: boolean | null;
	goodForChildren: boolean | null;
	goodForGroups: boolean | null;
	photos: GooglePhoto[];
	priceRange: PriceRange | null;
	priceLevel: string | null;
	userRatingCount: number | null;
	weekdayDescriptions: string[];
};

type GooglePhoto = {
	altText: string;
	photoUri: string;
};

type PriceRange = {
	startPrice: string;
	endPrice: string;
	currencyCode: string;
};
