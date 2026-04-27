import ShareId from "@/components/shared/ShareId";
import { SessionStatus } from "@/types/index";

type ShowProgressProps = {
	sessionStatus: SessionStatus;
};

const ShowProgress = ({
	sessionStatus: { currentParticipants, totalParticipants, uuid },
}: ShowProgressProps) => {
	return (
		<div className='flex flex-col items-center gap-4'>
			<section className='mb-6 text-center'>
				<h1 className='text-2xl font-semibold'>Responses pending!</h1>
				<p>
					{currentParticipants} out of {totalParticipants}{" "}
					participants have responded to the questionnaire.
				</p>
			</section>
			<ShareId sessionId={uuid} />
		</div>
	);
};

export default ShowProgress;
