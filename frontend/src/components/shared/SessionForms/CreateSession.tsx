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
import { createSessionSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ShareId from "../ShareId";
import { PostSession, FetchResponse } from "@/types";

type CreateSessionProps = {
	sessionId: string;
	setSessionId: React.Dispatch<React.SetStateAction<string>>;
};

const CreateSession = ({ sessionId, setSessionId }: CreateSessionProps) => {
	const navigate = useNavigate();

	// 1. Define your form.
	const form = useForm<z.infer<typeof createSessionSchema>>({
		resolver: zodResolver(createSessionSchema),
		defaultValues: {
			totalParticipants: 2,
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof createSessionSchema>) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`, {
				method: "POST",
				body: JSON.stringify({
					totalParticipants: values.totalParticipants,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const { data }: FetchResponse<PostSession> = await response.json();

			setSessionId(data.uuid);
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	}

	return (
		<div className='form-container'>
			{!sessionId && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='form'>
						<FormField
							control={form.control}
							name='totalParticipants'
							render={({ field }) => (
								<FormItem>
									<FormLabel>How many people will participate:</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='form-btn'>
							Submit
						</Button>
					</form>
				</Form>
			)}
			{sessionId && (
				<div className='flex flex-col gap-4 my-6'>
					<ShareId sessionId={sessionId} />
					<Button
						onClick={() => navigate(`/questions/${sessionId}`)}
						className='form-btn'>
						Start!
					</Button>
				</div>
			)}
		</div>
	);
};

export default CreateSession;
