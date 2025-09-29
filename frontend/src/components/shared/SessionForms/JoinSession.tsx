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
import { useCheckSession } from "@/lib/react-query/queries";
import { checkSessionSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const JoinSession = () => {
	const { mutateAsync: checkSession } = useCheckSession();

	// 1. Define your form.
	const form = useForm<z.infer<typeof checkSessionSchema>>({
		resolver: zodResolver(checkSessionSchema),
		defaultValues: {
			sessionId: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof checkSessionSchema>) {
		checkSession(values.sessionId);
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
