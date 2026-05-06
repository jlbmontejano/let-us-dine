type CuisineAnswer = { text: string; category: string };
type PriceAnswer = { text: string; price: string };
type DistanceAnswer = { text: string; maxTravelDistance: number };
type MealAnswer = { text: string; mealType: string };
type VibeAnswer = { text: string; vibe: string };
type RatingAnswer = { text: string; minRating: number };
type BeverageAnswer = { text: string; beverages: string };

type CuisineQuestion = { text: string; answers: CuisineAnswer[] };
type PriceQuestion = { text: string; answers: PriceAnswer[] };
type DistanceQuestion = { text: string; answers: DistanceAnswer[] };
type MealQuestion = { text: string; answers: MealAnswer[] };
type VibeQuestion = { text: string; answers: VibeAnswer[] };
type RatingQuestion = { text: string; answers: RatingAnswer[] };
type BeverageQuestion = { text: string; answers: BeverageAnswer[] };

export type Question =
  | CuisineQuestion
  | PriceQuestion
  | DistanceQuestion
  | MealQuestion
  | VibeQuestion
  | RatingQuestion
  | BeverageQuestion;
