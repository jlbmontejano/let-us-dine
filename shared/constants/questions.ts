import Question from "../types/questions";

const QUESTIONS: Question[] = [
	{
		text: "What cuisine are you craving?",
		answers: [
			{ text: "Italian", category: "italian" },
			{ text: "Japanese", category: "japanese" },
			{ text: "Mexican", category: "mexican" },
			{ text: "American", category: "american" },
			{ text: "Chinese", category: "chinese" },
			{ text: "Indian", category: "indian" },
			{ text: "Thai", category: "thai" },
			{ text: "Mediterranean", category: "mediterranean" },
			{ text: "Vegetarian", category: "vegetarian" },
		],
	},
	{
		text: "How much do you want to spend?",
		answers: [
			{ text: "$ - Budget-friendly", price: "PRICE_LEVEL_INEXPENSIVE" },
			{ text: "$$ - Moderate", price: "PRICE_LEVEL_MODERATE" },
			{ text: "$$$ - Upscale", price: "PRICE_LEVEL_EXPENSIVE" },
			{ text: "$$$$ - Fine dining", price: "PRICE_LEVEL_VERY_EXPENSIVE" },
		],
	},
	{
		text: "How far are you willing to travel?",
		answers: [
			{ text: "Walking distance (1 km)", maxTravelDistance: 1000 },
			{ text: "Short drive (3 kms)", maxTravelDistance: 3000 },
			{ text: "Anywhere in the area (7 kms)", maxTravelDistance: 7000 },
			{ text: "I'll go anywhere good!", maxTravelDistance: 16000 },
		],
	},
	{
		text: "What kind of bites are you in the mood for?",
		answers: [
			{
				text: "A hearty breakfast to start the day",
				mealType: "servesBreakfast",
			},
			{
				text: "A laid-back brunch with friends",
				mealType: "servesBrunch",
			},
			{ text: "A quick and tasty lunch fix", mealType: "servesLunch" },
			{ text: "A cozy dinner to wind down", mealType: "servesDinner" },
			{
				text: "Something sweet to treat myself",
				mealType: "servesDessert",
			},
		],
	},
	{
		text: "What kind of vibe are you after?",
		answers: [
			{ text: "Fresh air and outdoor seating", vibe: "outdoorSeating" },
			{ text: "A fun, family-friendly spot", vibe: "goodForChildren" },
			{
				text: "Perfect for hanging out with the crew",
				vibe: "goodForGroups",
			},
			{
				text: "A sports bar to catch the game",
				vibe: "goodForWatchingSports",
			},
		],
	},
	{
		text: "How picky are you about ratings?",
		answers: [
			{ text: "Only highly rated (4+ stars)", minRating: 4 },
			{ text: "Good enough (3+ stars)", minRating: 3 },
			{ text: "I'm adventurous!", minRating: 0 },
		],
	},
	{
		text: "Do you want alcohol or specialty beverages with your meal?",
		answers: [
			{ text: "Cocktails & mixed drinks", beverages: "servesCocktails" },
			{ text: "Wine selection", beverages: "servesWine" },
			{ text: "Craft beer", beverages: "servesBeer" },
			{
				text: "Coffee & specialty drinks",
				beverages: "servesCoffee",
			},
		],
	},
];

export default QUESTIONS;
