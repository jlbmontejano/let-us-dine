import { useIsMutating } from "@tanstack/react-query";
import { useState } from "react";

import BackButton from "@/components/shared/BackButton";
import CheckResults from "@/components/shared/SessionForms/CheckResults";
import CreateSession from "@/components/shared/SessionForms/CreateSession";
import JoinSession from "@/components/shared/SessionForms/JoinSession";
import { Button } from "@/components/ui/button";
import { SESSION_OPTIONS } from "@/constants";
import { SessionType } from "@/types/index";

const Setup = () => {
	const [sessionType, setSessionType] = useState<SessionType>(null);
	const isMutating = useIsMutating();
	const isDisabled = isMutating > 0;

	function renderSessionForm() {
		switch (sessionType) {
			case "create":
				return <CreateSession />;
			case "join":
				return <JoinSession />;
			case "check":
				return <CheckResults />;
			default:
				return null;
		}
	}

	return (
		<div className='page-container items-center'>
			<BackButton className='self-start' />
			<div className='text-center text-lg'>
				<h1 className='text-center text-3xl font-semibold'>
					Session Setup
				</h1>
				<div className='w-full max-w-xs pt-2 sm:max-w-xl'>
					<p className='font-semibold'> How does it work?</p>
					<p>
						Deciding where to eat as a group can be painful.{" "}
						<span className='font-semibold'>Let Us Dine</span> fixes
						that.
					</p>
					<p>
						Create a session, share the link with your friends or
						family, and once everyone answers a few quick questions,
						we'll suggest nearby restaurants that everyone will
						actually enjoy.
					</p>
				</div>
			</div>
			<div className='flex w-full max-w-xs flex-col gap-2'>
				<p className='text-center font-semibold'>Choose an option:</p>
				{SESSION_OPTIONS.map(({ label, type }) => (
					<Button
						key={type}
						onClick={() => setSessionType(type)}
						disabled={isDisabled}>
						{label}
					</Button>
				))}
				{renderSessionForm()}
			</div>
		</div>
	);
};

export default Setup;
