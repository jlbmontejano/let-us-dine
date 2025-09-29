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

type PlacesListProps = {
	places: GooglePlace[];
};

const PlacesList = ({ places }: PlacesListProps) => {
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

		return url;
	}

	function compareDays(completeDay: string): boolean {
		const weekday = completeDay.split(":")[0];
		return weekday == currentDay;
	}

	const handleGoogleMapsClick = (uri: string) => {
		window.open(uri, "_blank", "noopener,noreferrer");
	};

	return (
		<section>
			<h1 className='py-6 text-center text-4xl font-semibold'>
				The results are here!
			</h1>
			<div className='flex flex-col gap-4'>
				{places.map((place: GooglePlace) => (
					<article className='flex flex-col' key={place.name}>
						<div className='rounded-t-xl bg-red_accent p-6 text-white'>
							<a className='text-3xl font-semibold hover:cursor-pointer hover:underline'>
								{place.name}
							</a>
							<div className='flex items-center gap-2 pt-1'>
								{place.rating ? (
									<>
										<p className='font-semibold'>
											{place.rating}
										</p>
										<div
											className='flex gap-0.5'
											aria-label={`Rating: ${place.rating} out of 5`}>
											{renderStars(place.rating)}
										</div>
										<p className='text-sm'>
											({place.userRatingCount})
										</p>
									</>
								) : (
									<p>Rating not available</p>
								)}
							</div>
						</div>
						<div className='flex flex-col items-center gap-4 rounded-b-xl bg-gray-200 p-6'>
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
									<p>Address not available</p>
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
									<p>Phone number not available</p>
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
									<p>Website not available</p>
								)}
							</div>
							<div className='places-list-details'>
								<div className='places-list-label'>
									<FaMoneyBill1Wave aria-hidden='true' />
									<p>Price Range</p>
								</div>
								<p className='places-list-left-padding'>
									{place.priceRange
										? `$${place.priceRange?.startPrice} -	${place.priceRange?.endPrice} ${place.priceRange?.currencyCode}`
										: "N/A"}
								</p>
							</div>
							<div className='places-list-details'>
								<div className='places-list-label'>
									<FaCalendarAlt
										className='mb-.5'
										aria-hidden='true'
									/>
									<p>Opening Hours:</p>
								</div>
								{place.weekdayDescriptions.length > 0 ? (
									<ul className='places-list-left-padding'>
										{place.weekdayDescriptions.map(
											(weekday, idx) => (
												<li
													className={`${compareDays(weekday) ? "font-semibold text-red_accent" : "text-gray-700"} py-1`}
													key={`weekday-${idx}`}>
													{weekday}
												</li>
											),
										)}
									</ul>
								) : (
									<p>N/A</p>
								)}
							</div>
							<div className='places-list-details flex justify-center'>
								{place.googleMapsUri ? (
									<Button
										className='bg-red_accent transition-colors hover:bg-red-500'
										onClick={() =>
											handleGoogleMapsClick(
												place.googleMapsUri!,
											)
										}>
										View on Google Maps
									</Button>
								) : (
									<Button
										disabled
										className='cursor-not-allowed'>
										Google Maps link not available.
									</Button>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default PlacesList;
