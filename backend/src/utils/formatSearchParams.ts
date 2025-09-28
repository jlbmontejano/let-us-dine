import { TopAnswer } from "../../../shared/types";
import { GooglePlacesParams } from "../types";

export default function formatSearchParams(
	topAnswers: TopAnswer[],
	centerLat: number,
	centerLng: number,
	maxTravelDistance: number
): GooglePlacesParams {
	return {
		restaurantType: topAnswers[0].answer_api_params.category!,
		latitude: centerLat,
		longitude: centerLng,
		radius: maxTravelDistance,
	};
}
