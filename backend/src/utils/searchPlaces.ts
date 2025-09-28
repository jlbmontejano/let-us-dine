import { GooglePlace, TopAnswer } from "../../../shared/types";
import { GooglePlacesParams } from "../types";

const PRICE_LEVEL_INDEX = 1;
const MEAL_TYPE_INDEX = 3;
const VIBE_INDEX = 4;
const MIN_RATING_INDEX = 5;
const BEVERAGES_INDEX = 6;

const FIELD_MASK = [
	"places.displayName",
	"places.formattedAddress",
	"places.googleMapsUri",
	"places.photos",
	"places.nationalPhoneNumber",
	"places.rating",
	"places.priceRange",
	"places.priceLevel",
	"places.websiteUri",
	"places.servesBeer",
	"places.servesCocktails",
	"places.servesCoffee",
	"places.servesWine",
	"places.goodForChildren",
	"places.goodForGroups",
	"places.userRatingCount",
	"places.regularOpeningHours",
].join(",");

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

export default async function searchPlaces(
	topAnswers: TopAnswer[],
	params: GooglePlacesParams
): Promise<GooglePlace[]> {
	const apiKey = process.env.GOOGLE_PLACES_API_KEY;

	if (!apiKey) {
		throw new Error("GOOGLE_PLACES_API_KEY not configured");
	}

	const includedTypes = `${params.restaurantType}_restaurant`;

	const reqBody = {
		includedTypes,
		maxResultCount: 20,
		locationRestriction: {
			circle: {
				center: {
					latitude: params.latitude,
					longitude: params.longitude,
				},
				radius: params.radius,
			},
		},
	};

	const options = {
		headers: {
			"Content-Type": "application/json",
			"X-Goog-Api-Key": apiKey,
			"X-Goog-FieldMask": FIELD_MASK,
		},
		method: "POST",
		body: JSON.stringify(reqBody),
	};

	try {
		const response = await fetch(BASE_URL, options);

		if (!response.ok) {
			throw new Error(`Google Places API error: ${response.status}`);
		}

		const data = await response.json();

		if (!data.places || !data.places.length) {
			console.log("No restaurant found with specified criteria)");
			return [];
		}

		console.log("googlePlace before filtering: ", data.places.length);

		const priceLevelAnswer =
			topAnswers[PRICE_LEVEL_INDEX].answer_api_params.price!;
		const mealTypeAnswer =
			topAnswers[MEAL_TYPE_INDEX].answer_api_params.mealType!;
		const vibeAnswer = topAnswers[VIBE_INDEX].answer_api_params.vibe!;
		const minRatingAnswer =
			topAnswers[MIN_RATING_INDEX].answer_api_params.minRating!;
		const beveragesAnswer =
			topAnswers[BEVERAGES_INDEX].answer_api_params.beverages!;

		return data.places
			.filter((place: any) => {
				if (place.priceLevel && place.priceLevel !== priceLevelAnswer) {
					return false;
				}

				if (place[mealTypeAnswer] === false) {
					return false;
				}

				if (place[vibeAnswer] === false) {
					return false;
				}

				if (place.rating && place.rating < minRatingAnswer) {
					return false;
				}

				if (place[beveragesAnswer] === false) {
					return false;
				}

				return true;
			})
			.map(
				(place: any): GooglePlace => ({
					name: place.displayName?.text ?? null,
					formattedAddress: place.formattedAddress ?? null,
					nationalPhoneNumber: place.nationalPhoneNumber ?? null,
					rating: place.rating ?? null,
					googleMapsUri: place.googleMapsUri ?? null,
					websiteUri: place.websiteUri ?? null,
					servesBeer: place.servesBeer ?? null,
					servesWine: place.servesWine ?? null,
					servesCocktails: place.servesCocktails ?? null,
					servesCoffee: place.servesCoffee ?? null,
					goodForChildren: place.goodForChildren ?? null,
					goodForGroups: place.goodForGroups ?? null,
					priceRange: place.priceRange
						? {
								startPrice:
									place.priceRange.startPrice?.units ?? null,
								endPrice:
									place.priceRange.endPrice?.units ?? null,
								currencyCode:
									place.priceRange.startPrice?.currencyCode ??
									null,
						  }
						: null,
					priceLevel: place.priceLevel ?? null,
					photos: Array.isArray(place.photos)
						? place.photos.map((photo: any) => ({
								photoUri: photo.googleMapsUri ?? null,
								altText:
									photo.authorAttributions?.[0]
										?.displayName ?? null,
						  }))
						: [],
					userRatingCount: place.userRatingCount ?? null,
					weekdayDescriptions: Array.isArray(
						place.regularOpeningHours?.weekdayDescriptions
					)
						? place.regularOpeningHours.weekdayDescriptions
						: [],
				})
			);
	} catch (error) {
		console.error("Error searching Google Places:", error);
		throw error;
	}
}
