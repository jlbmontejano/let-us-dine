import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ErrorPageProps = {
	text?: string;
};

const ErrorPage = ({
	text = "Something went wrong. Please try again.",
}: ErrorPageProps) => {
	const navigate = useNavigate();

	return (
		<div className='helper-container'>
			<h1 className='helper-container-title'>{text}</h1>
			<Button onClick={() => navigate("/")}>Home</Button>
		</div>
	);
};

export default ErrorPage;
