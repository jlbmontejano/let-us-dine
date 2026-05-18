import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import renderWithRouter from "@/_tests/utils/renderWithRouter";
import CheckResults from "@/components/shared/SessionForms/CheckResults";

const mockNavigate = vi.fn();
const mockCheckResults = vi.fn().mockResolvedValue({ uuid: "test-uuid" });

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
		mutateAsync: mockCheckResults,
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

describe("CheckResults", () => {
	it("renders the form", () => {
		renderWithRouter(<CheckResults />);
		expect(
			screen.getByLabelText("Enter the session ID:"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Check" }),
		).toBeInTheDocument();
	});
});
