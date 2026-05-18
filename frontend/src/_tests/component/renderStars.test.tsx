import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import renderStars from "@/utils/renderStars";

describe("renderStars", () => {
	it("renders 5 full stars for a rating of 5", () => {
		render(<>{renderStars(5)}</>);
		expect(screen.getAllByTestId("star-full")).toHaveLength(5);
	});

	it("renders 5 empty stars for a rating of 0", () => {
		render(<>{renderStars(0)}</>);
		expect(screen.getAllByTestId("star-empty")).toHaveLength(5);
	});

	it("renders a half star for a rating of 4.5", () => {
		render(<>{renderStars(4.5)}</>);
		expect(screen.getAllByTestId("star-full")).toHaveLength(4);
		expect(screen.getAllByTestId("star-half")).toHaveLength(1);
	});

	it("renders correct mix for a rating of 3.5", () => {
		render(<>{renderStars(3.5)}</>);
		expect(screen.getAllByTestId("star-full")).toHaveLength(3);
		expect(screen.getAllByTestId("star-half")).toHaveLength(1);
		expect(screen.getAllByTestId("star-empty")).toHaveLength(1);
	});

	it("always renders exactly 5 stars total", () => {
		render(<>{renderStars(3.5)}</>);
		const full = screen.getAllByTestId("star-full").length;
		const half = screen.queryAllByTestId("star-half").length;
		const empty = screen.queryAllByTestId("star-empty").length;
		expect(full + half + empty).toBe(5);
	});
});
