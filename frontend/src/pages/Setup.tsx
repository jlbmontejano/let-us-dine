import BackButton from "@/components/shared/BackButton";
import CheckResults from "@/components/shared/SessionForms/CheckResults";
import CreateSession from "@/components/shared/SessionForms/CreateSession";
import JoinSession from "@/components/shared/SessionForms/JoinSession";
import { Button } from "@/components/ui/button";
import { SessionType } from "@/types";
import { useState } from "react";

const Setup = () => {
	const [sessionId, setSessionId] = useState<string>("");
	const [sessionType, setSessionType] = useState<SessionType>(null);

	function getSessionType() {
		switch (sessionType) {
			case "create":
				return (
					<CreateSession sessionId={sessionId} setSessionId={setSessionId} />
				);
			case "join":
				return <JoinSession />;
			case "check":
				return <CheckResults />;
			default:
				return <></>;
		}
	}

	return (
		<div className='h-full page-padding'>
			<BackButton />
			<div className='flex flex-col gap-4 my-10 justify-center items-center'>
				<p>Choose an option:</p>
				<div className='flex flex-col gap-2 w-[80%]'>
					<Button onClick={() => setSessionType("create")}>
						Create a Session
					</Button>
					<Button onClick={() => setSessionType("join")}>Join a Session</Button>
					<Button onClick={() => setSessionType("check")}>Check Results</Button>
				</div>
			</div>
			{getSessionType()}
		</div>
	);
};

export default Setup;
