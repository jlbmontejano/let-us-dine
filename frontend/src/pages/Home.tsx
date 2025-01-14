import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { CAROUSEL_IMAGES } from "@/constants";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className='h-full flex flex-col'>
			<div className='h-full flex flex-col items-center justify-center gap-4 px-12'>
				<p className='text-4xl xl:text-5xl'>
					Welcome to <span className='font-semibold'>Where Should We Eat?</span>
				</p>
				<Button onClick={() => navigate("/setup")}>Get Started!</Button>
			</div>
			<Carousel
				className='bottom-0'
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
							className='basis-1/3 md:basis-1/5 p-0 h-[200px]'
							key={image.alt}>
							<img
								src={`/${image.src}`}
								alt={image.alt}
								className='w-full h-full object-cover'
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default Home;
