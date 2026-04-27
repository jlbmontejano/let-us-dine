import { useToast } from "@/hooks/use-toast";
import { useGetResults } from "@/lib/react-query/queries";
import ErrorPage from "@/pages/StateManage/ErrorPage";
import { useEffect } from "react";
import NoResults from "./NoResults";
import PlacesList from "./PlacesList";
import TopAnswers from "./TopAnswers";
import Loader from "@/pages/StateManage/Loader";

type ShowResultsProps = {
	sessionId: string;
};

const ShowResults = ({ sessionId }: ShowResultsProps) => {
	const { toast } = useToast();
	const {
		data: sessionResult,
		isError,
		isPending,
	} = useGetResults(sessionId);

	useEffect(() => {
		if (isError) {
			toast({
				description: "Error fetching session data",
				variant: "destructive",
			});
		}
	}, [isError, toast]);

	if (isError) {
		return <ErrorPage />;
	}

	if (isPending) {
		return <Loader text='Loading results...' />;
	}

	return (
		<section className='flex flex-col gap-4'>
			{Object.keys(sessionResult.places ?? []).length === 0 ? (
				<NoResults />
			) : (
				<PlacesList places={sessionResult.places} />
			)}
			<TopAnswers topAnswers={sessionResult.topAnswers} />
		</section>
	);
};

export default ShowResults;
