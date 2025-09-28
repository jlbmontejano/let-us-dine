import {
	FaPhoneAlt,
	FaRegMap,
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
	function renderStars(rating: number) {
		const result = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				result.push(<FaStar />);
			} else if (i - 0.5 <= rating) {
				result.push(<FaStarHalf />);
			} else {
				result.push(<FaRegStar />);
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

	return (
		<section>
			<h1 className='py-4 text-center text-4xl font-semibold'>
				The results are here!
			</h1>
			<div className='flex flex-col gap-4'>
				{places.map((place: GooglePlace) => (
					<div
						key={place.name}
						className='flex flex-col gap-1 rounded-xl bg-red_accent p-6'>
						<p className='text-2xl font-semibold'>{place.name}</p>
						<div className='place-list-details'>
							{place.rating ? (
								<>
									<p>{place.rating}</p>
									<div className='flex gap-1 pb-0.5'>
										{renderStars(place.rating!)}
									</div>
									<p>({place.userRatingCount})</p>
								</>
							) : (
								<p>N/A</p>
							)}
						</div>
						<div className='place-list-details'>
							<FaLocationDot className='mt-1 self-start' />
							<p>{place.formattedAddress}</p>
						</div>
						<div className='place-list-details'>
							<FaPhoneAlt />{" "}
							<p>
								{place.nationalPhoneNumber ? (
									<a
										href={`tel:${place.nationalPhoneNumber}`}>
										{place.nationalPhoneNumber}
									</a>
								) : (
									"N/A"
								)}
							</p>
						</div>
						<div className='place-list-details'>
							<TbWorld />
							<p>
								{place.websiteUri ? (
									<a
										href={place.websiteUri}
										target='_blank'
										rel='noopener noreferrer'>
										{formatWebsiteUrl(place.websiteUri)}
									</a>
								) : (
									"N/A"
								)}
							</p>
						</div>
						<div className='place-list-details'>
							<FaRegMap />
							<p>
								{place.googleMapsUri ? (
									<a
										href={place.googleMapsUri}
										target='_blank'>
										Open on Google Maps
									</a>
								) : (
									"Google Maps link not available."
								)}
							</p>
						</div>
						<div className='place-list-details'>
							<FaMoneyBill1Wave />
							{place.priceRange ? (
								<p>
									${place.priceRange?.startPrice} -{" "}
									{place.priceRange?.endPrice}{" "}
									{place.priceRange?.currencyCode}
								</p>
							) : (
								"N/A"
							)}
						</div>
						{place.weekdayDescriptions.length > 0 ? (
							<ul>
								{place.weekdayDescriptions.map(weekday => (
									<li>{weekday}</li>
								))}
							</ul>
						) : (
							<p>N/A</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default PlacesList;
