import { Progress } from "@/components/ui/progress";
import QUESTIONS from "../../../../../shared/constants/questions";

type HeaderProps = {
	currentQuestion: number;
};

const Header = ({ currentQuestion }: HeaderProps) => {
	const PROGRESS_STEP = 100 / QUESTIONS.length;

	const calculateProgress = (num: number): number => {
		return Math.ceil((num + 1) * PROGRESS_STEP);
	};

	return (
		<div className='flex w-full flex-col items-center justify-center gap-4 bg-red_accent px-4 py-6 text-white'>
			<p>
				Question {currentQuestion + 1} of {QUESTIONS.length}
			</p>
			<Progress
				value={calculateProgress(currentQuestion)}
				className='max-w-lg'
			/>
			<p className='text-xl font-semibold'>
				{QUESTIONS[currentQuestion].text}
			</p>
		</div>
	);
};

export default Header;
