import BackButton from "@/components/shared/BackButton";
import CheckResults from "@/components/shared/SessionForms/CheckResults";
import CreateSession from "@/components/shared/SessionForms/CreateSession";
import JoinSession from "@/components/shared/SessionForms/JoinSession";
import { Button } from "@/components/ui/button";
import { SessionType } from "@/types";
import { useIsMutating } from "@tanstack/react-query";
import { useState } from "react";

const Setup = () => {
	const [sessionType, setSessionType] = useState<SessionType>(null);
	const isMutating = useIsMutating();

	function getSessionType() {
		switch (sessionType) {
			case "create":
				return <CreateSession />;
			case "join":
				return <JoinSession />;
			case "check":
				return <CheckResults />;
			default:
				return <></>;
		}
	}

	return (
		<div className='page-container items-center'>
			<BackButton className='self-start' />
			<div>
				<h1 className='text-2xl font-semibold'>Session Setup</h1>
				<p className='text-lg'>Choose an option:</p>
			</div>
			<div className='flex w-full max-w-xs flex-col gap-2'>
				<Button
					onClick={() => setSessionType("create")}
					disabled={isMutating > 0}>
					Create a Session
				</Button>
				<Button
					onClick={() => setSessionType("join")}
					disabled={isMutating > 0}>
					Join a Session
				</Button>
				<Button
					onClick={() => setSessionType("check")}
					disabled={isMutating > 0}>
					Check Results
				</Button>
				{getSessionType()}
			</div>
		</div>
	);
};

export default Setup;
