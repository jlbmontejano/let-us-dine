import { PostFormatLocation } from "@/types/index";
import calculateWeightedCentroid from "@/utils/calculateWeightedCentroid";

describe("calculateWeightedCentroid", () => {
  describe("center calculation", () => {
    it("should return the exact location when only one user is provided", () => {
      const users: PostFormatLocation[] = [
        { latitude: 40.7128, longitude: -74.006, maxTravelDistance: 1000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.centerLat).toBeCloseTo(40.7128);
      expect(result.centerLng).toBeCloseTo(-74.006);
    });

    it("should return the midpoint when two users have equal travel distance", () => {
      const users: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 1000 },
        { latitude: 0, longitude: 10, maxTravelDistance: 1000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.centerLat).toBeCloseTo(0);
      expect(result.centerLng).toBeCloseTo(5);
    });

    it("should pull the center closer to the user with a smaller travel distance", () => {
      const users: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 500 },
        { latitude: 0, longitude: 10, maxTravelDistance: 2000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.centerLng).toBeLessThan(5);
    });

    it("should handle multiple users with equal weights", () => {
      const users: PostFormatLocation[] = [
        { latitude: 10, longitude: 10, maxTravelDistance: 1000 },
        { latitude: 20, longitude: 20, maxTravelDistance: 1000 },
        { latitude: 30, longitude: 30, maxTravelDistance: 1000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.centerLat).toBeCloseTo(20);
      expect(result.centerLng).toBeCloseTo(20);
    });
  });

  describe("radius calculation", () => {
    it("should always return at least the minimum radius of 1000m", () => {
      const users: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 1000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.radiusMeters).toBeGreaterThanOrEqual(1000);
    });

    it("should return a larger radius when users are further apart", () => {
      const nearUsers: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 10000 },
        { latitude: 0, longitude: 0.01, maxTravelDistance: 10000 },
      ];

      const farUsers: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 10000 },
        { latitude: 0, longitude: 1, maxTravelDistance: 10000 },
      ];

      const nearResult = calculateWeightedCentroid(nearUsers);
      const farResult = calculateWeightedCentroid(farUsers);

      expect(farResult.radiusMeters).toBeGreaterThan(nearResult.radiusMeters);
    });

    it("should never return a negative radius", () => {
      const users: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 1 },
        { latitude: 50, longitude: 50, maxTravelDistance: 1 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.radiusMeters).toBeGreaterThanOrEqual(0);
    });

    it("should expand the radius when users travel ranges do not overlap", () => {
      // Users are ~111km apart but can only travel 5km each
      const users: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 5000 },
        { latitude: 0, longitude: 1, maxTravelDistance: 5000 },
      ];

      const result = calculateWeightedCentroid(users);

      // Radius should expand beyond either user's travel budget to cover the gap
      expect(result.radiusMeters).toBeGreaterThan(5000);
    });

    it("should cap the radius at 50000m regardless of how far apart users are", () => {
      // Users are roughly 1000km apart
      const users: PostFormatLocation[] = [
        { latitude: 0, longitude: 0, maxTravelDistance: 1000 },
        { latitude: 0, longitude: 10, maxTravelDistance: 1000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result.radiusMeters).toBeLessThanOrEqual(50000);
    });
  });

  describe("return shape", () => {
    it("should always return centerLat, centerLng, and radiusMeters", () => {
      const users: PostFormatLocation[] = [
        { latitude: 40.7128, longitude: -74.006, maxTravelDistance: 1000 },
      ];

      const result = calculateWeightedCentroid(users);

      expect(result).toHaveProperty("centerLat");
      expect(result).toHaveProperty("centerLng");
      expect(result).toHaveProperty("radiusMeters");
    });
  });
});
