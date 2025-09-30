import { GooglePlace } from "../../../../../shared/types";
import RestaurantCard from "./RestaurantCard";

type PlacesListProps = {
	places: GooglePlace[];
};

const PlacesList = ({ places }: PlacesListProps) => {
	return (
		<section>
			<h1 className='py-6 text-center text-4xl font-semibold'>
				The results are here!
			</h1>
			<div className='flex flex-col gap-4'>
				{places.map((place: GooglePlace) => (
					<RestaurantCard place={place} key={place.name} />
				))}
			</div>
		</section>
	);
};

export default PlacesList;
