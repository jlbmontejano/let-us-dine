import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App.tsx";
import { UserLocationProvider } from "@/context/user-location";
import "@/index.css";

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
