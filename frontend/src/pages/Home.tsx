import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { CAROUSEL_IMAGES } from "@/constants";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

const AUTOPLAY_PLUGIN = Autoplay({ delay: 1500 });
const CAROUSEL_OPTS = { align: "start", loop: true } as const;

const Home = () => {
	const navigate = useNavigate();

	const handleGetStarted = () => navigate("/setup");

	return (
		<div className='flex flex-grow flex-col'>
			<div className='flex grow flex-col items-center justify-center px-12 text-center text-4xl xl:text-5xl'>
				<h1 className='mb-4'>
					Welcome to
					<span className='block font-semibold'>Let Us Dine!</span>
				</h1>
				<Button onClick={handleGetStarted}>Get Started!</Button>
			</div>
			<Carousel plugins={[AUTOPLAY_PLUGIN]} opts={CAROUSEL_OPTS}>
				<CarouselContent>
					{CAROUSEL_IMAGES.map(image => (
						<CarouselItem
							className='h-[200px] basis-1/2 p-0 md:basis-1/5'
							key={image.alt}>
							<img
								src={`/${image.src}`}
								alt={image.alt}
								className='h-full w-full object-cover'
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default Home;
