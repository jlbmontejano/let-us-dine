import { PreFormatLocation } from "../types/index";
import buildLocationsArray from "../utils/buildLocationsArray";

// Helper function

function makeLocation({
  latitude = 40.7128,
  longitude = -74.006,
  maxTravelDistance = 10,
}: {
  latitude?: number;
  longitude?: number;
  maxTravelDistance?: number;
} = {}): PreFormatLocation {
  return {
    latitude,
    longitude,
    answer: { apiParams: { maxTravelDistance } },
  };
}

// Tests

describe("buildLocationsArray", () => {
  describe("return shape", () => {
    it("returns an empty array when given an empty array", () => {
      expect(buildLocationsArray([])).toEqual([]);
    });

    it("returns the same number of items as the input", () => {
      const input = [makeLocation(), makeLocation(), makeLocation()];
      expect(buildLocationsArray(input)).toHaveLength(3);
    });

    it("returns objects with exactly the expected keys", () => {
      const result = buildLocationsArray([makeLocation()]);
      expect(Object.keys(result[0]).sort()).toEqual(
        ["latitude", "longitude", "maxTravelDistance"].sort(),
      );
    });
  });

  describe("field mapping", () => {
    it("maps latitude correctly", () => {
      const result = buildLocationsArray([makeLocation({ latitude: 51.5074 })]);
      expect(result[0].latitude).toBe(51.5074);
    });

    it("maps longitude correctly", () => {
      const result = buildLocationsArray([
        makeLocation({ longitude: -0.1278 }),
      ]);
      expect(result[0].longitude).toBe(-0.1278);
    });

    it("maps maxTravelDistance from apiParams", () => {
      const result = buildLocationsArray([
        makeLocation({ maxTravelDistance: 25 }),
      ]);
      expect(result[0].maxTravelDistance).toBe(25);
    });

    it("maps multiple entries independently", () => {
      const input = [
        makeLocation({ latitude: 1.1, longitude: 2.2, maxTravelDistance: 5 }),
        makeLocation({ latitude: 3.3, longitude: 4.4, maxTravelDistance: 50 }),
      ];
      const result = buildLocationsArray(input);

      expect(result[0]).toEqual({
        latitude: 1.1,
        longitude: 2.2,
        maxTravelDistance: 5,
      });
      expect(result[1]).toEqual({
        latitude: 3.3,
        longitude: 4.4,
        maxTravelDistance: 50,
      });
    });
  });

  describe("maxTravelDistance coercion via Number(JSON.stringify(...))", () => {
    it("returns a number when given an integer", () => {
      const result = buildLocationsArray([
        makeLocation({ maxTravelDistance: 30 }),
      ]);
      expect(typeof result[0].maxTravelDistance).toBe("number");
      expect(result[0].maxTravelDistance).toBe(30);
    });

    it("preserves floating-point values", () => {
      const result = buildLocationsArray([
        makeLocation({ maxTravelDistance: 12.5 }),
      ]);
      expect(result[0].maxTravelDistance).toBe(12.5);
    });

    it("handles zero as maxTravelDistance", () => {
      const result = buildLocationsArray([
        makeLocation({ maxTravelDistance: 0 }),
      ]);
      expect(result[0].maxTravelDistance).toBe(0);
    });

    it("handles large distance values", () => {
      const result = buildLocationsArray([
        makeLocation({ maxTravelDistance: 99999 }),
      ]);
      expect(result[0].maxTravelDistance).toBe(99999);
    });
  });

  describe("edge cases", () => {
    it("handles negative coordinates (southern/western hemisphere)", () => {
      const result = buildLocationsArray([
        makeLocation({ latitude: -33.8688, longitude: -70.6693 }),
      ]);
      expect(result[0].latitude).toBe(-33.8688);
      expect(result[0].longitude).toBe(-70.6693);
    });

    it("does not mutate the original input array", () => {
      const input = [makeLocation({ maxTravelDistance: 10 })];
      const inputCopy = JSON.parse(JSON.stringify(input));
      buildLocationsArray(input);
      expect(input).toEqual(inputCopy);
    });

    it("handles a single entry correctly", () => {
      const input = [
        makeLocation({
          latitude: 48.8566,
          longitude: 2.3522,
          maxTravelDistance: 15,
        }),
      ];
      expect(buildLocationsArray(input)).toEqual([
        { latitude: 48.8566, longitude: 2.3522, maxTravelDistance: 15 },
      ]);
    });
  });
});
