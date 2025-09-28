import { MoonLoader } from "react-spinners";

type LoaderProps = {
	text?: string;
};

const Loader = ({ text = "Loading..." }: LoaderProps) => {
	return (
		<div className='helper-container'>
			<MoonLoader />
			<h1 className='helper-container-title'>{text}</h1>
		</div>
	);
};

export default Loader;
