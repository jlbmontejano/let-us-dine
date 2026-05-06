import { Route, Routes } from "react-router-dom";

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

const App = () => {
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
		<div className='flex min-h-screen w-full flex-col bg-background'>
			<main className='flex grow flex-col'>{renderContent()}</main>
			<Footer />
			<Toaster />
		</div>
	);
};

export default App;
