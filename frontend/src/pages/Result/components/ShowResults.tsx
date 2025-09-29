import { useToast } from "@/hooks/use-toast";
import { useGetResults } from "@/lib/react-query/queries";
import ErrorPage from "@/pages/StateManage/ErrorPage";
import { useEffect } from "react";
import NoResults from "./NoResults";
import PlacesList from "./PlacesList";
import TopAnswers from "./TopAnswers";

type ShowResultsProps = {
	sessionId: string;
};

const ShowResults = ({ sessionId }: ShowResultsProps) => {
	const { toast } = useToast();
	const {
		data: sessionResult,
		isError: resultsError,
		isPending: resultsPending,
	} = useGetResults(sessionId!);

	useEffect(() => {
		if (!sessionId || resultsError) {
			toast({
				description: "Error fetching session data",
				variant: "destructive",
			});
		}
	}, [sessionId, resultsError, toast]);

	if (resultsError) {
		return <ErrorPage />;
	}

	if (resultsPending) {
		return (
			<section className='flex w-full items-center justify-center'>
				<p className='helper-container-title'>Loading...</p>
			</section>
		);
	}

	return (
		<section className='flex flex-col gap-4'>
			{Object.entries(sessionResult.places ?? []).length === 0 ? (
				<NoResults />
			) : (
				<PlacesList places={sessionResult.places} />
			)}

			<TopAnswers topAnswers={sessionResult.topAnswers} />
		</section>
	);
};

export default ShowResults;
