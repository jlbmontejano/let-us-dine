import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import renderWithRouter from "@/_tests/utils/renderWithRouter";
import CreateSession from "@/components/shared/SessionForms/CreateSession";

const mockNavigate = vi.fn();
const mockCreateSession = vi.fn().mockResolvedValue({ uuid: "test-uuid" });

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
	useCreateSession: () => ({
		mutateAsync: mockCreateSession,
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

describe("CreateSession", () => {
	it("renders the form", () => {
		renderWithRouter(<CreateSession />);
		expect(
			screen.getByLabelText("How many people will participate?"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Submit" }),
		).toBeInTheDocument();
	});

	it("shows ShareId and Start button after successful submission", async () => {
		renderWithRouter(<CreateSession />);
		await userEvent.click(screen.getByRole("button", { name: "Submit" }));
		expect(
			screen.getByRole("button", { name: "Start!" }),
		).toBeInTheDocument();
	});
});
