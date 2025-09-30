import { TopAnswer } from "../../../../../shared/types";

type TopAnswersProps = {
	topAnswers: TopAnswer[];
};

const TopAnswers = ({ topAnswers }: TopAnswersProps) => {
	return (
		<section className='grid gap-4'>
			<h2 className='text-center text-xl font-semibold'>
				Here are the top answers for your session:
			</h2>
			{topAnswers.map(
				({ answerText, questionText, voteCount }: TopAnswer, index) => (
					<div
						className='rounded-xl border-l-2 border-l-red_accent bg-gray-50 p-4'
						key={`${questionText}/${answerText}/${voteCount}`}>
						<p>
							<span className='font-semibold'>
								Question #{index + 1}:{" "}
							</span>
							{questionText}
						</p>
						<p>
							<span className='font-semibold'>
								Most Voted Answer:{" "}
							</span>
							{answerText}
						</p>
						<p>
							<span className='font-semibold'>
								Votes Received:{" "}
							</span>
							{voteCount}
						</p>
					</div>
				),
			)}
		</section>
	);
};

export default TopAnswers;
