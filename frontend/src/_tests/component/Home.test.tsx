import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import renderWithRouter from "@/_tests/utils/renderWithRouter";
import { CAROUSEL_IMAGES } from "@/constants";
import Home from "@/pages/Home";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

vi.mock("@/components/ui/carousel", () => ({
	Carousel: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CarouselContent: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CarouselItem: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

describe("Home", () => {
	it("renders the welcome heading", () => {
		renderWithRouter(<Home />);
		expect(screen.getByText("Welcome to")).toBeInTheDocument();
		expect(screen.getByText("Let Us Dine!")).toBeInTheDocument();
	});

	it("renders the Get Started button", () => {
		renderWithRouter(<Home />);
		expect(
			screen.getByRole("button", { name: "Get Started!" }),
		).toBeInTheDocument();
	});

	it("renders carousel images", () => {
		renderWithRouter(<Home />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(CAROUSEL_IMAGES.length);
	});
});
