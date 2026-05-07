import compareDays from "@/utils/compareDays";
import { describe, expect, it } from "vitest";

const completeDay = "Monday: 9:00 AM – 5:00 PM";

describe("compareDays", () => {
	it("returns true when days match", () => {
		const res = compareDays(completeDay, "Monday");
		expect(res).toBe(true);
	});

	it("returns false when comparing full day to abbreviated", () => {
		const res = compareDays(completeDay, "mon");
		expect(res).toBe(false);
	});

	it("returns false when comparing when mismatch happens because of capital letter", () => {
		const res = compareDays(completeDay, "monday");
		expect(res).toBe(false);
	});

	it("returns false when completeDay is empty", () => {
		expect(compareDays("", "Monday")).toBe(false);
	});

	it("returns false when currentDay is empty", () => {
		expect(compareDays(completeDay, "")).toBe(false);
	});
});

// const compareDays = (completeDay: string, currentDay: string): boolean => {
// 	const weekday = completeDay.split(":")[0];
// 	return weekday === currentDay;
// };

// export default compareDays;
