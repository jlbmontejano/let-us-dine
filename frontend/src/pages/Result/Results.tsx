import { Button } from "@/components/ui/button";
import { useGetSession } from "@/lib/react-query/queries";
import ShowProgress from "@/pages/Result/components/ShowProgress";
import ShowResults from "@/pages/Result/components/ShowResults";
import ErrorPage from "@/pages/StateManage/ErrorPage";
import Loader from "@/pages/StateManage/Loader";
import { useNavigate, useParams } from "react-router-dom";

const Results = () => {
	const navigate = useNavigate();
	const { sessionId } = useParams();
	const {
		data: sessionStatus,
		isError,
		isPending,
	} = useGetSession(sessionId ?? "");

	if (!sessionId || isError) {
		return <ErrorPage text={"Error fetching data"} />;
	}

	if (isPending) {
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
