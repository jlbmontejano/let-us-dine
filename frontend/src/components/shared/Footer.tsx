import { useLocation } from "react-router-dom";

const Footer = () => {
	const location = useLocation();

	if (location.pathname === "/") return;

	return (
		<footer className='padding-control flex justify-between'>
			<a href='https://jorgebuenrostro.com/' target='_blank'>
				Created by Jorge Buenrostro
			</a>
			<a href='mailto:jlbmontejano@gmail.com'>Contact Me</a>
		</footer>
	);
};

export default Footer;
