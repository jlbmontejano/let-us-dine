import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { CAROUSEL_IMAGES } from "@/constants";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className='flex h-full flex-col'>
			<div className='flex grow flex-col items-center justify-center px-12 text-center text-4xl xl:text-5xl'>
				<h1 className='mb-4'>
					Welcome to <br />
					<span className='font-semibold'>Craving Compass</span>
				</h1>
				<Button onClick={() => navigate("/setup")}>Get Started!</Button>
			</div>
			<Carousel
				plugins={[
					Autoplay({
						delay: 1500,
					}),
				]}
				opts={{
					align: "start",
					loop: true,
				}}>
				<CarouselContent>
					{CAROUSEL_IMAGES.map(image => (
						<CarouselItem
							className='h-[200px] basis-1/3 p-0 md:basis-1/5'
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
