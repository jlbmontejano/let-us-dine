import { Button } from "@/components/ui/button";
import {
	FaCalendarAlt,
	FaPhoneAlt,
	FaRegStar,
	FaStar,
	FaStarHalf,
} from "react-icons/fa";
import { FaLocationDot, FaMoneyBill1Wave } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { GooglePlace } from "../../../../../shared/types";
import { useState } from "react";

type RestaurantCardProps = {
	place: GooglePlace;
};

const RestaurantCard = ({ place }: RestaurantCardProps) => {
	const [showDetails, setShowDetails] = useState(false);

	const currentDay = new Date().toLocaleDateString("en-US", {
		weekday: "long",
	});

	function renderStars(rating: number) {
		const result = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				result.push(
					<FaStar
						color='#ffd700'
						className='text-sm'
						key={`star-${i}`}
					/>,
				);
			} else if (i - 0.5 <= rating) {
				result.push(
					<FaStarHalf
						color='#ffd700'
						className='text-sm'
						key={`star-${i}`}
					/>,
				);
			} else {
				result.push(
					<FaRegStar
						color='#ffd700'
						className='text-sm'
						key={`star-${i}`}
					/>,
				);
			}
		}

		return result;
	}

	function formatWebsiteUrl(url: string): string {
		// Remove leading protocols
		url = url.replace(/^https?:\/\//, "");

		// Ensure it starts with www.
		if (!url.startsWith("www.")) {
			url = "www." + url;
		}

		if (url.endsWith("/")) {
			url = url.split("/")[0];
		}

		return url;
	}

	function compareDays(completeDay: string): boolean {
		const weekday = completeDay.split(":")[0];
		return weekday == currentDay;
	}

	const handleGoogleMapsClick = (uri: string) => {
		console.log("Button clicked");
		window.open(uri, "_blank", "noopener,noreferrer");
	};
	return (
		<article className='flex flex-col'>
			<div className='z-10 rounded-t-xl bg-red_accent p-6 text-white'>
				<button
					className='text-left text-3xl font-semibold hover:underline'
					onClick={() => handleGoogleMapsClick(place.googleMapsUri!)}>
					{place.name}
				</button>
				<div className='flex justify-between pt-1'>
					{place.rating ? (
						<div className='flex items-center gap-2'>
							<p className='font-semibold'>{place.rating}</p>
							<div
								className='flex gap-0.5'
								aria-label={`Rating: ${place.rating} out of 5`}>
								{renderStars(place.rating)}
							</div>
							<p className='text-sm'>({place.userRatingCount})</p>
						</div>
					) : (
						<p>Rating not available</p>
					)}

					<button
						onClick={() => setShowDetails(!showDetails)}
						className='hover:underline'>
						{showDetails ? "Hide" : "Show"} Details
					</button>
				</div>
			</div>
			<div
				className={`flex flex-col items-center gap-4 overflow-hidden rounded-b-xl bg-gray-200 p-6 transition-all duration-300 ease-in-out ${
					showDetails
						? "max-h-full translate-y-0 opacity-100"
						: "max-h-0 -translate-y-4 py-0 opacity-0"
				}`}>
				<div className='places-list-details'>
					<div className='places-list-label'>
						<FaLocationDot
							className='mt-1 self-start'
							aria-hidden='true'
						/>
						<p>Address</p>
					</div>
					{place.formattedAddress ? (
						<address className='places-list-left-padding'>
							{place.formattedAddress}
						</address>
					) : (
						<p className='places-list-left-padding'>
							Address not available
						</p>
					)}
				</div>
				<div className='places-list-details'>
					<div className='places-list-label'>
						<FaPhoneAlt aria-hidden='true' />
						<p>Phone</p>
					</div>
					{place.nationalPhoneNumber ? (
						<a
							href={`tel:${place.nationalPhoneNumber}`}
							className='places-list-anchor places-list-left-padding'>
							{place.nationalPhoneNumber}
						</a>
					) : (
						<p className='places-list-left-padding'>
							Phone number not available
						</p>
					)}
				</div>
				<div className='places-list-details'>
					<div className='places-list-label'>
						<TbWorld aria-hidden='true' />
						<p>Website</p>
					</div>
					{place.websiteUri ? (
						<a
							href={place.websiteUri}
							className='places-list-anchor places-list-left-padding'
							target='_blank'
							rel='noopener noreferrer'>
							{formatWebsiteUrl(place.websiteUri)}
						</a>
					) : (
						<p className='places-list-left-padding'>
							Website not available
						</p>
					)}
				</div>
				<div className='places-list-details'>
					<div className='places-list-label'>
						<FaMoneyBill1Wave aria-hidden='true' />
						<p>Price Range</p>
					</div>
					<p className='places-list-left-padding'>
						{place.priceRange
							? `$${place.priceRange?.startPrice || "N/A"} -	${place.priceRange?.endPrice || "N/A"} ${place.priceRange?.currencyCode || "Currency code not available"}`
							: "Price Range not available"}
					</p>
				</div>
				<div className='places-list-details'>
					<div className='places-list-label'>
						<FaCalendarAlt className='mb-.5' aria-hidden='true' />
						<p>Opening Hours:</p>
					</div>
					{place.weekdayDescriptions.length > 0 ? (
						<ul className='places-list-left-padding space-y-1'>
							{place.weekdayDescriptions.map((weekday, idx) => (
								<li
									className={`${compareDays(weekday) ? "font-semibold text-red_accent" : "text-gray-700"}`}
									key={`weekday-${idx}`}>
									{weekday}
								</li>
							))}
						</ul>
					) : (
						<p>Opening Hours not available</p>
					)}
				</div>
				<div className='places-list-details flex justify-center'>
					{place.googleMapsUri ? (
						<Button
							className='bg-red_accent transition-colors hover:cursor-pointer hover:bg-red-500'
							onClick={() =>
								handleGoogleMapsClick(place.googleMapsUri!)
							}>
							View on Google Maps
						</Button>
					) : (
						<Button disabled className='cursor-not-allowed'>
							Google Maps link not available.
						</Button>
					)}
				</div>
			</div>
		</article>
	);
};

export default RestaurantCard;
