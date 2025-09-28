export type CuisineAnswer = { text: string; category: string };
export type PriceAnswer = { text: string; price: string };
export type DistanceAnswer = { text: string; maxTravelDistance: number };
export type MealAnswer = { text: string; mealType: string };
export type VibeAnswer = { text: string; vibe: string };
export type RatingAnswer = { text: string; minRating: number };
export type BeverageAnswer = { text: string; beverages: string };

type CuisineQuestion = { text: string; answers: CuisineAnswer[] };
type PriceQuestion = { text: string; answers: PriceAnswer[] };
type DistanceQuestion = { text: string; answers: DistanceAnswer[] };
type MealQuestion = { text: string; answers: MealAnswer[] };
type VibeQuestion = { text: string; answers: VibeAnswer[] };
type RatingQuestion = { text: string; answers: RatingAnswer[] };
type BeverageQuestion = { text: string; answers: BeverageAnswer[] };

type Question =
	| CuisineQuestion
	| PriceQuestion
	| DistanceQuestion
	| MealQuestion
	| VibeQuestion
	| RatingQuestion
	| BeverageQuestion;

export default Question;
