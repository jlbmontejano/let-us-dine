import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type UserLocationType = {
	userLocation: React.MutableRefObject<GeolocationCoordinates | undefined>;
	isLoading: boolean;
	locationDenied: boolean;
};

const UserLocationContext = createContext<UserLocationType | undefined>(
	undefined,
);

export const UserLocationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { toast } = useToast();
	const userLocation = useRef<GeolocationCoordinates>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [locationDenied, setLocationDenied] = useState<boolean>(false);

	const requestLocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				userLocation.current = position.coords;
				setIsLoading(false);
			},
			err => {
				if (err.code === err.PERMISSION_DENIED) {
					setLocationDenied(true);
				} else {
					toast({
						description: "Error getting your location.",
						variant: "destructive",
					});
				}
				setIsLoading(false);
			},
			{ enableHighAccuracy: true, timeout: 15000 },
		);
	};

	useEffect(() => {
		if ("geolocation" in navigator) {
			requestLocation();
		} else {
			setLocationDenied(true);
			setIsLoading(false);
			toast({
				description: "Your browser doesn't support geolocation.",
				variant: "destructive",
			});
		}
	}, []);

	const value = { userLocation, isLoading, locationDenied };

	return (
		<UserLocationContext.Provider value={value}>
			{children}
		</UserLocationContext.Provider>
	);
};

export const useUserLocation = () => {
	const context = useContext(UserLocationContext);

	if (context === undefined) {
		throw new Error("User context required.");
	}

	return context;
};
