import { PostFormatLocation } from "../types/index";

type SearchArea = {
	centerLat: number;
	centerLng: number;
	radiusMeters: number;
};

export default function calculateWeightedCentroid(
	userLocations: PostFormatLocation[]
): SearchArea {
	// Weight by inverse of travel distance (users willing to travel less get more weight)
	const totalWeight = userLocations.reduce(
		(sum, user) => sum + 1 / user.maxTravelDistance,
		0
	);

	const centerLat = userLocations.reduce((sum, user) => {
		const weight = 1 / user.maxTravelDistance / totalWeight;
		return sum + user.latitude * weight;
	}, 0);

	const centerLng = userLocations.reduce((sum, user) => {
		const weight = 1 / user.maxTravelDistance / totalWeight;
		return sum + user.longitude * weight;
	}, 0);

	// Calculate radius: distance from center to furthest user, adjusted by their travel preference
	let maxRadius = 0;
	userLocations.forEach(user => {
		const distanceToCenter = calculateDistance(
			centerLat,
			centerLng,
			user.latitude,
			user.longitude
		);
		const effectiveRadius = Math.max(
			0,
			user.maxTravelDistance - distanceToCenter
		);
		maxRadius = Math.max(maxRadius, effectiveRadius);
	});

	return {
		centerLat,
		centerLng,
		radiusMeters: maxRadius,
	};
}

function calculateDistance(
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number
): number {
	const R = 6371000; // Earth's radius in meters
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLng = ((lng2 - lng1) * Math.PI) / 180;

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // Distance in meters
}
