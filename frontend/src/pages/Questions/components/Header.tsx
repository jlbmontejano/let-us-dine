import { Progress } from "@/components/ui/progress";
import QUESTIONS from "@/constants/questions";

type HeaderProps = {
	currentQuestion: number;
};

const Header = ({ currentQuestion }: HeaderProps) => {
	const progress = Math.ceil(
		((currentQuestion + 1) / QUESTIONS.length) * 100,
	);

	return (
		<header className='flex w-full flex-col items-center justify-center gap-4 bg-accent px-4 py-6 text-center text-white'>
			<p>
				Question {currentQuestion + 1} of {QUESTIONS.length}
			</p>
			<Progress value={progress} className='max-w-lg' />
			<h1 className='text-2xl font-semibold'>
				{QUESTIONS[currentQuestion].text}
			</h1>
		</header>
	);
};

export default Header;
