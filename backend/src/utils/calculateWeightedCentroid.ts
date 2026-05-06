import { PostFormatLocation } from "@/types/index";

type SearchArea = {
  centerLat: number;
  centerLng: number;
  radiusMeters: number;
};

const MINIMUM_RADIUS = 1_000;
const MAX_GOOGLE_PLACES_RADIUS = 50_000;

export default function calculateWeightedCentroid(
  userLocations: PostFormatLocation[],
): SearchArea {
  // Users willing to travel less get higher weight, pulling the center closer to them
  const totalWeight = userLocations.reduce(
    (sum, user) => sum + 1 / user.maxTravelDistance,
    0,
  );

  // Weighted average of all user coordinates
  const centerLat = userLocations.reduce((sum, user) => {
    const weight = 1 / user.maxTravelDistance / totalWeight;
    return sum + user.latitude * weight;
  }, 0);

  const centerLng = userLocations.reduce((sum, user) => {
    const weight = 1 / user.maxTravelDistance / totalWeight;
    return sum + user.longitude * weight;
  }, 0);

  const userDistances = userLocations.map((user) => ({
    distanceToCenter: calculateDistance(
      centerLat,
      centerLng,
      user.latitude,
      user.longitude,
    ),
    maxTravelDistance: user.maxTravelDistance,
  }));

  // How much further the most disadvantaged user would need to travel beyond their limit
  const maxOvershoot = userDistances.reduce((max, user) => {
    const overshoot = user.distanceToCenter - user.maxTravelDistance;
    return Math.max(max, overshoot);
  }, 0);

  // Remaining travel budget for each user after reaching the center
  const maxRadius = userDistances.reduce((max, user) => {
    const effectiveRadius = Math.max(
      0,
      user.maxTravelDistance - user.distanceToCenter,
    );
    return Math.max(max, effectiveRadius);
  }, 0);

  // Guarantee a minimum radius and expand to cover users who can't reach the center
  const radiusMeters = Math.min(
    MAX_GOOGLE_PLACES_RADIUS,
    Math.max(MINIMUM_RADIUS, maxRadius, maxOvershoot),
  );

  return {
    centerLat,
    centerLng,
    radiusMeters,
  };
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
