import ShareId from "@/components/shared/ShareId";
import { SessionStatus } from "@/types";

type ShowProgressProps = {
	sessionStatus: SessionStatus;
};

const ShowProgress = ({ sessionStatus }: ShowProgressProps) => {
	return (
		<div className='mx-auto flex w-[80%] flex-col gap-4'>
			<div className='mb-6 text-center'>
				<p className='text-2xl font-semibold'>Responses pending!</p>
				<p>
					{sessionStatus.currentParticipants} out of{" "}
					{sessionStatus.totalParticipants} participants have
					responded the questionnaire.
				</p>
			</div>
			<ShareId sessionId={sessionStatus.uuid} />
		</div>
	);
};

export default ShowProgress;
