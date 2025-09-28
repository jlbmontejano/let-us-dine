import { TopAnswer } from "../../../../../shared/types";

type TopAnswersProps = {
	topAnswers: TopAnswer[];
};

const TopAnswers = ({ topAnswers }: TopAnswersProps) => {
	return (
		<div className='grid gap-4 lg:grid-cols-2'>
			{topAnswers.map(
				(
					{ answer_text, question_text, vote_count }: TopAnswer,
					index,
				) => (
					<div
						className='rounded-xl border-l-2 border-l-red_accent bg-gray-50 p-4'
						key={`${question_text}/${answer_text}/${vote_count}`}>
						<p>
							<span className='font-semibold'>
								Question #{index + 1}:{" "}
							</span>
							{question_text}
						</p>
						<p>
							<span className='font-semibold'>
								Most Voted Answer:{" "}
							</span>
							{answer_text}
						</p>
						<p>
							<span className='font-semibold'>
								Votes Received:{" "}
							</span>
							{vote_count}
						</p>
					</div>
				),
			)}
		</div>
	);
};

export default TopAnswers;
