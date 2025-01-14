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
import { joinSessionSchema } from "@/lib/zod-validation";
import { FetchResponse, GetSession } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const JoinSession = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	// 1. Define your form.
	const form = useForm<z.infer<typeof joinSessionSchema>>({
		resolver: zodResolver(joinSessionSchema),
		defaultValues: {
			sessionId: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof joinSessionSchema>) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/sessions/${values.sessionId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 404) {
				return toast({
					description: "Session not found.",
					variant: "destructive",
				});
			}

			if (response.status !== 200) {
				return toast({
					description: "There's been an error, please try again.",
					variant: "destructive",
				});
			}

			const { data }: FetchResponse<GetSession> = await response.json();

			if (!data.isActive) {
				return toast({
					description: "This session is already full.",
					variant: "destructive",
				});
			}

			navigate(`/questions/${data.uuid}`);
		} catch (error) {
			toast({ description: "Error", variant: "destructive" });
			console.error(`${error}`);
		}
	}

	return (
		<div className='form-container'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='form'>
					<FormField
						control={form.control}
						name='sessionId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the ID shared with you:</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='form-btn'>
						Join
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default JoinSession;
