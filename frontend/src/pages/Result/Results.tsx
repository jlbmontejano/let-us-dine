import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetSession } from "@/lib/react-query/queries";
import ShowProgress from "@/pages/Result/components/ShowProgress";
import ShowResults from "@/pages/Result/components/ShowResults";
import ErrorPage from "@/pages/StateManage/ErrorPage";
import Loader from "@/pages/StateManage/Loader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Results = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { sessionId } = useParams();
	const {
		data: sessionStatus,
		isError: statusError,
		isPending: statusPending,
	} = useGetSession(sessionId!);

	useEffect(() => {
		if (!sessionId || statusError) {
			navigate("/setup");
			toast({
				description: "Error fetching session data",
				variant: "destructive",
			});
		}
	}, [sessionId, statusError, toast]);

	if (!sessionId || statusError) {
		return <ErrorPage text={"Error fetching data"} />;
	}

	if (statusPending) {
		return <Loader text="Fetching session's data" />;
	}

	return (
		<div className='page-container'>
			<Button onClick={() => navigate("/")} className='w-fit'>
				Back to Main Menu
			</Button>
			<div className='w-full max-w-xl self-center'>
				{sessionStatus.isActive ? (
					<ShowProgress sessionStatus={sessionStatus} />
				) : (
					<ShowResults sessionId={sessionId} />
				)}
			</div>
		</div>
	);
};

export default Results;
