import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useUserLocation } from "@/context/user-location";
import Home from "@/pages/Home";
import Questions from "@/pages/Questions/Questions";
import Results from "@/pages/Result/Results";
import Setup from "@/pages/Setup";
import ErrorPage from "@/pages/StateManage/ErrorPage";
import Loader from "@/pages/StateManage/Loader";
import LocationDenied from "@/pages/StateManage/LocationDenied";
import { Route, Routes } from "react-router-dom";

function App() {
	const { isLoading, locationDenied } = useUserLocation();

	const renderContent = () => {
		if (isLoading) {
			return (
				<Loader text='We use your location to find restaurants you and your friends can easily reach.' />
			);
		}

		if (locationDenied) {
			return <LocationDenied />;
		}

		return (
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/setup' element={<Setup />} />
				<Route path='/questions/:sessionId' element={<Questions />} />
				<Route
					path='/sessions/:sessionId/results'
					element={<Results />}
				/>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		);
	};

	return (
		<div className='flex h-screen w-screen flex-col'>
			<main className='flex grow flex-col'>{renderContent()}</main>
			<Footer />
			<Toaster />
		</div>
	);
}

export default App;
