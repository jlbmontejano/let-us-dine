import { useLocation } from "react-router-dom";

const Footer = () => {
	const location = useLocation();

	if (location.pathname === "/") return;

	return (
		<footer className='padding-control flex justify-end'>
			<a
				href='https://jorgebuenrostro.com/'
				target='_blank'
				className='hover:underline'>
				Created by Jorge Buenrostro
			</a>
		</footer>
	);
};

export default Footer;
