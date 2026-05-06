import { useState } from "react";
import {
	FaCalendarAlt,
	FaPhoneAlt,
	FaRegStar,
	FaStar,
	FaStarHalf,
} from "react-icons/fa";
import { FaLocationDot, FaMoneyBill1Wave } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import DetailRow from "@/pages/Result/components/DetailRow";
import { GooglePlace } from "@lud/shared/types/shared";

type RestaurantCardProps = {
	place: GooglePlace;
};

const renderStars = (rating: number) => {
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
};

const formatWebsiteUrl = (url: string): string => {
	let formatted = url.replace(/^https?:\/\//, "");
	if (!formatted.startsWith("www.")) formatted = "www." + formatted;
	if (formatted.endsWith("/")) formatted = formatted.split("/")[0];
	return formatted;
};

const compareDays = (completeDay: string, currentDay: string): boolean => {
	const weekday = completeDay.split(":")[0];
	return weekday === currentDay;
};

const RestaurantCard = ({ place }: RestaurantCardProps) => {
	const [showDetails, setShowDetails] = useState(false);

	const currentDay = new Date().toLocaleDateString("en-US", {
		weekday: "long",
	});

	return (
		<article className='flex flex-col'>
			<div className='z-10 rounded-t-xl bg-accent p-6 text-white'>
				{place.googleMapsUri ? (
					<a
						href={place.googleMapsUri}
						target='_blank'
						rel='noopener noreferrer'
						className='text-left text-2xl font-semibold hover:underline'>
						{place.name?.toUpperCase()}
					</a>
				) : (
					<span>{place.name?.toUpperCase()}</span>
				)}
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
						onClick={() => setShowDetails(prev => !prev)}
						className='hover:underline'>
						{showDetails ? "Hide" : "Show"} Details
					</button>
				</div>
			</div>
			<div
				className={`flex flex-col items-center gap-4 overflow-hidden rounded-b-xl bg-secondary p-6 transition-all duration-300 ease-in-out ${
					showDetails
						? "max-h-full translate-y-0 opacity-100"
						: "max-h-0 -translate-y-4 py-0 opacity-0"
				}`}>
				<DetailRow
					icon={<FaLocationDot aria-hidden='true' />}
					label='Address'>
					{place.formattedAddress ?? (
						<span>Address not available</span>
					)}
				</DetailRow>
				<DetailRow
					icon={<FaPhoneAlt aria-hidden='true' />}
					label='Phone'>
					{place.nationalPhoneNumber ? (
						<a href={`tel:${place.nationalPhoneNumber}`}>
							{place.nationalPhoneNumber}
						</a>
					) : (
						<span>Phone number not available</span>
					)}
				</DetailRow>
				<DetailRow
					icon={<TbWorld aria-hidden='true' />}
					label='Website'>
					{place.websiteUri ? (
						<a
							href={place.websiteUri}
							className='places-list-anchor'
							target='_blank'
							rel='noopener noreferrer'>
							{formatWebsiteUrl(place.websiteUri)}
						</a>
					) : (
						<p>Website not available</p>
					)}
				</DetailRow>
				<DetailRow
					icon={<FaMoneyBill1Wave aria-hidden='true' />}
					label='Price Range'>
					<p>
						{place.priceRange
							? `$${place.priceRange?.startPrice || "N/A"} -	${place.priceRange?.endPrice || "N/A"} ${place.priceRange?.currencyCode || "Currency code not available"}`
							: "Price Range not available"}
					</p>
				</DetailRow>
				<DetailRow
					icon={
						<FaCalendarAlt className='mb-.5' aria-hidden='true' />
					}
					label='Opening Hours'>
					{place.weekdayDescriptions.length > 0 ? (
						<ul className='space-y-1'>
							{place.weekdayDescriptions.map((weekday, idx) => (
								<li
									className={`${compareDays(weekday, currentDay) ? "font-semibold text-accent" : "text-gray-700"}`}
									key={`weekday-${idx}`}>
									{weekday}
								</li>
							))}
						</ul>
					) : (
						<p>Opening Hours not available</p>
					)}
				</DetailRow>
				<div className='places-list-details flex justify-center'>
					{place.googleMapsUri ? (
						<Button
							asChild
							className='transition-colors hover:bg-accent/70'>
							<a
								href={place.googleMapsUri}
								target='_blank'
								rel='noopener noreferrer'>
								View on Google Maps
							</a>
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
