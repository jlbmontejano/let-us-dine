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
		<header className='flex w-full flex-col items-center justify-center gap-4 bg-red_accent px-4 py-6 text-center text-white'>
			<h2>
				Question {currentQuestion + 1} of {QUESTIONS.length}
			</h2>
			<Progress
				value={calculateProgress(currentQuestion)}
				className='max-w-lg'
			/>
			<h1 className='text-2xl font-semibold'>
				{QUESTIONS[currentQuestion].text}
			</h1>
		</header>
	);
};

export default Header;
