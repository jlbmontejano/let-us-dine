import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";

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

export default renderStars;
