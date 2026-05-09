import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui: React.ReactElement) => {
	return render(ui, { wrapper: MemoryRouter });
};

export default renderWithRouter;
