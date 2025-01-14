import Home from "@/pages/Home";
import Questions from "@/pages/Questions";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Setup from "./pages/Setup";
import Error from "./pages/Error";
import Results from "./pages/Results";

function App() {
	return (
		<main className='w-screen h-screen'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/setup' element={<Setup />} />
				<Route path='/questions/:sessionId' element={<Questions />} />
				<Route path='/sessions/:sessionId/results' element={<Results />} />
				<Route path='*' element={<Error />} />
			</Routes>
			<Toaster />
		</main>
	);
}

export default App;
