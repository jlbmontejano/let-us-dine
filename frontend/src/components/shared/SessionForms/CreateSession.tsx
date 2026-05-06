import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ShareId from "@/components/shared/ShareId";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCreateSession } from "@/lib/react-query/queries";
import { CreateSessionValues } from "@/types";
import { createSessionSchema } from "@lud/shared/zod-validation";

const CreateSession = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [sessionId, setSessionId] = useState<string>();
	const {
		mutateAsync: createSession,
		isPending,
		isError,
	} = useCreateSession();

	useEffect(() => {
		if (isError) {
			toast({
				description: "Error creating session.",
				variant: "destructive",
			});
		}
	}, [isError, toast]);

	const form = useForm<CreateSessionValues>({
		resolver: zodResolver(createSessionSchema),
		defaultValues: {
			totalParticipants: 2,
		},
	});

	const onSubmit = async (values: CreateSessionValues) => {
		const { totalParticipants } = values;

		const data = await createSession(totalParticipants);

		setSessionId(data.uuid);
		toast({ description: "Session created successfully." });
	};

	const handleStart = () => {
		if (!sessionId) {
			toast({
				description: "Error getting session ID.",
				variant: "destructive",
			});
			return;
		}

		navigate(`/questions/${sessionId}`);
	};

	return (
		<div className='setup-form-container'>
			{!sessionId ? (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='setup-form'>
						<FormField
							control={form.control}
							name='totalParticipants'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										How many people will participate:
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											onChange={e =>
												field.onChange(
													e.target.valueAsNumber,
												)
											}
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='setup-form-btn'
							disabled={isPending}>
							Submit
						</Button>
					</form>
				</Form>
			) : (
				<div className='setup-form'>
					<ShareId sessionId={sessionId} />
					<Button onClick={handleStart} className='setup-form-btn'>
						Start!
					</Button>
				</div>
			)}
		</div>
	);
};

export default CreateSession;
