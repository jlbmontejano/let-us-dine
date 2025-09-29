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
import { checkSessionSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const CheckResults = () => {
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
		navigate(`/sessions/${values.sessionId}/results`);
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
								<FormLabel>Enter the session's ID:</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='setup-form-btn'>
						Check
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CheckResults;
