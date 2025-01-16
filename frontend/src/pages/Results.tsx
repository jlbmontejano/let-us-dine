import ShareId from "@/components/shared/ShareId";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QuestionResult, SessionResults, SessionStatus } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Results = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { sessionId } = useParams();
	const [sessionCompleted, setSessionCompleted] = useState<boolean>();
	const [sessionStatus, setSessionStatus] = useState<SessionStatus>({
		isActive: false,
		currentParticipants: 0,
		totalParticipants: 0,
	});
	const [sessionData, setSessionData] = useState<SessionResults>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/sessions/${sessionId}/results`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				// Filter out any possible errors
				if (response.status !== 200) {
					throw new Error("Error");
				}

				// Sucess = true if results are ready
				// Sucess = false if results are pending
				const { success, data, message } = await response.json();

				if (success) {
					setSessionData(data);
					console.log(data);
				} else {
					setSessionStatus(data);
				}

				if (message) {
					toast({ description: message });
				}

				setSessionCompleted(success);
			} catch (error) {
				navigate("/");
				toast({
					description: "There's been an error.",
					variant: "destructive",
				});
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='page-padding'>
			<Button onClick={() => navigate("/")}>Back to Main Menu</Button>
			{sessionCompleted ? (
				<div className='flex flex-col mt-6 gap-4'>
					<p className='text-4xl text-center '>The results are:</p>
					{sessionData?.questionsResults.map(
						({ text, questionId, questionText, voteCount }: QuestionResult) => (
							<div key={`${questionId}/${text}/${voteCount}`}>
								<p>
									<span className='font-semibold'>Question: </span>
									{questionText}
								</p>
								<p>
									<span className='font-semibold'>Most Voted Answer: </span>
									{text}
								</p>
								<p>
									<span className='font-semibold'>Total Votes: </span>
									{voteCount}
								</p>
							</div>
						)
					)}
				</div>
			) : (
				<div className='flex flex-col mt-6 gap-4 mx-auto w-[80%]'>
					<div className='text-center mb-6'>
						<p className='text-2xl font-semibold'>Responses pending!</p>
						<p>
							{sessionStatus.currentParticipants} out of{" "}
							{sessionStatus.totalParticipants} have responded the
							questionnaire.
						</p>
					</div>
					{sessionId && <ShareId sessionId={sessionId} />}
				</div>
			)}
		</div>
	);
};

export default Results;
