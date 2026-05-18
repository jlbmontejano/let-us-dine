import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import renderWithRouter from "@/_tests/utils/renderWithRouter";
import JoinSession from "@/components/shared/SessionForms/JoinSession";

const mockNavigate = vi.fn();
const mockJoinSession = vi.fn().mockResolvedValue({ uuid: "test-uuid" });

afterEach(() => {
	vi.clearAllMocks();
});

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

vi.mock("@/lib/react-query/queries", () => ({
	useGetSessionStatus: () => ({
		mutateAsync: mockJoinSession,
		isPending: false,
		isError: false,
	}),
}));

vi.mock("@tanstack/react-query", async () => {
	const actual = await vi.importActual("@tanstack/react-query");
	return {
		...actual,
		useIsMutating: () => 0,
	};
});

describe("JoinSession", () => {
	it("renders the form", () => {
		renderWithRouter(<JoinSession />);
		expect(
			screen.getByLabelText("Enter the session ID shared with you:"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Join" }),
		).toBeInTheDocument();
	});
});
