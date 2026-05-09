import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import renderWithRouter from "@/_tests/utils/renderWithRouter";
import Setup from "@/pages/Setup";

const mockNavigate = vi.fn();
const mockMutation = vi.fn().mockReturnValue(0);

afterEach(() => {
	vi.clearAllMocks();
	mockMutation.mockReturnValue(0);
});

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

vi.mock("@tanstack/react-query", async () => {
	const actual = await vi.importActual("@tanstack/react-query");
	return {
		...actual,
		useIsMutating: () => mockMutation(),
	};
});

vi.mock("@/components/shared/SessionForms/CreateSession", () => ({
	default: () => <div>CreateSession Form</div>,
}));

vi.mock("@/components/shared/SessionForms/JoinSession", () => ({
	default: () => <div>JoinSession Form</div>,
}));

vi.mock("@/components/shared/SessionForms/CheckResults", () => ({
	default: () => <div>CheckResults Form</div>,
}));

describe("Setup", async () => {
	it("renders all buttons: create, join, check", () => {
		renderWithRouter(<Setup />);

		expect(
			screen.getByRole("button", { name: "Create a Session" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Join a Session" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Check Results" }),
		).toBeInTheDocument();
	});

	it("renders proper form when user changes between them", async () => {
		renderWithRouter(<Setup />);

		await userEvent.click(
			screen.getByRole("button", { name: "Create a Session" }),
		);
		expect(screen.getByText("CreateSession Form")).toBeInTheDocument();

		await userEvent.click(
			screen.getByRole("button", { name: "Join a Session" }),
		);
		expect(screen.getByText("JoinSession Form")).toBeInTheDocument();

		await userEvent.click(
			screen.getByRole("button", { name: "Check Results" }),
		);
		expect(screen.getByText("CheckResults Form")).toBeInTheDocument();
	});

	it("disables session option buttons when a mutation is in progress", async () => {
		mockMutation.mockReturnValue(1);
		renderWithRouter(<Setup />);
		expect(
			screen.getByRole("button", { name: "Create a Session" }),
		).toBeDisabled();
	});
});
