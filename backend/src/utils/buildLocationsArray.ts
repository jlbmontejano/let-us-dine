import { PostFormatLocation, PreFormatLocation } from "../types";

export default function buildLocationsArray(
	usersLocations: PreFormatLocation[]
): PostFormatLocation[] {
	return usersLocations.map(user => {
		const apiParams = user.answer.apiParams as {
			maxTravelDistance: number;
		};

		const { maxTravelDistance } = apiParams;

		return {
			latitude: user.latitude,
			longitude: user.longitude,
			maxTravelDistance: Number(JSON.stringify(maxTravelDistance)),
		};
	});
}
