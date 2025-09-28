import BackButton from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import React from "react";
import QUESTIONS from "../../../../../shared/constants/questions";

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
	return (
		<section className='flex justify-between px-2'>
			{currentQuestion === 0 ? (
				<BackButton />
			) : (
				<Button onClick={() => setCurrentQuestion(prev => prev - 1)}>
					Previous Question
				</Button>
			)}

			{currentQuestion < QUESTIONS.length - 1 ? (
				<Button onClick={() => setCurrentQuestion(prev => prev + 1)}>
					Next Question
				</Button>
			) : (
				<Button
					type='submit'
					className='self-end'
					onClick={handleSubmit}
					disabled={isPending}>
					{isPending ? "Submitting..." : "Submit"}
				</Button>
			)}
		</section>
	);
};

export default ButtonNavigation;
