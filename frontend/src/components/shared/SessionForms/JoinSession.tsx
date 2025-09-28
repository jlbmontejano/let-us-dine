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
import { checkSessionSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const JoinSession = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	// 1. Define your form.
	const form = useForm<z.infer<typeof checkSessionSchema>>({
		resolver: zodResolver(checkSessionSchema),
		defaultValues: {
			sessionId: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof checkSessionSchema>) {
		try {
			navigate(`/questions/${values.sessionId}`);
		} catch (error) {
			toast({
				description: "Error retrieving session",
				variant: "destructive",
			});
			console.error(`${error}`);
		}
	}

	return (
		<div className='setup-form-container'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='setup-form'>
					<FormField
						control={form.control}
						name='sessionId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Enter the ID shared with you:
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='setup-form-btn'>
						Join
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default JoinSession;
