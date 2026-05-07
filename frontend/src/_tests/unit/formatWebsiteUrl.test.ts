import { describe, it, expect } from "vitest";
import formatWebsiteUrl from "@/utils/formateWebsiteUrl";

describe("formatWebsiteUrl", () => {
	it("removes https:// prefix", () => {
		const res = formatWebsiteUrl("https://www.google.com");
		expect(res).toBe("www.google.com");
	});

	it("adds www. when missing", () => {
		const res = formatWebsiteUrl("google.com");
		expect(res).toBe("www.google.com");
	});

	it("removes trailing slash", () => {
		const res = formatWebsiteUrl("google.com/");
		console.log(res);
		expect(res).toBe("www.google.com");
	});

	it("handles http:// as well as https://", () => {
		const res = formatWebsiteUrl("http://www.google.com");
		expect(res).toBe("www.google.com");
	});

	it("handles all transformations combined", () => {
		const res = formatWebsiteUrl("https://google.com/");
		expect(res).toBe("www.google.com");
	});

	it("does not add duplicate www. if already present", () => {
		const res = formatWebsiteUrl("https://www.google.com");
		expect(res).toBe("www.google.com");
	});

	it("removes trailing slash when url has path", () => {
		const res = formatWebsiteUrl("https://google.com/about/");
		expect(res).toBe("www.google.com");
	});
});
