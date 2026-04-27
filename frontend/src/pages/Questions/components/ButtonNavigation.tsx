import BackButton from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import QUESTIONS from "@/constants/questions";

type ButtonNavigationProps = {
	currentQuestion: number;
	setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
	isPending: boolean;
	handleSubmit: () => void;
};

const ButtonNavigation = ({
	currentQuestion,
	setCurrentQuestion,
	isPending,
	handleSubmit,
}: ButtonNavigationProps) => {
	const isFirstQuestion = currentQuestion === 0;
	const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

	const handlePrevious = () => setCurrentQuestion(prev => prev - 1);
	const handleNext = () => setCurrentQuestion(prev => prev + 1);

	return (
		<section className='flex justify-between'>
			{isFirstQuestion ? (
				<BackButton />
			) : (
				<Button onClick={handlePrevious}>Previous Question</Button>
			)}

			{isLastQuestion ? (
				<Button
					type='submit'
					onClick={handleSubmit}
					disabled={isPending}>
					{isPending ? "Submitting..." : "Submit"}
				</Button>
			) : (
				<Button onClick={handleNext}>Next Question</Button>
			)}
		</section>
	);
};

export default ButtonNavigation;
