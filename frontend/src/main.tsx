import App from "@/App.tsx";
import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserLocationProvider } from "./context/user-location";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<UserLocationProvider>
				<App />
			</UserLocationProvider>
		</BrowserRouter>
	</QueryClientProvider>,
);
