import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { CheckSessionValues } from "@/types";

const JoinSession = () => {
	const { mutateAsync: checkSession, isPending } = useCheckSession();

	const form = useForm<CheckSessionValues>({
		resolver: zodResolver(checkSessionSchema),
		defaultValues: {
			sessionId: "",
		},
	});

	const onSubmit = (values: CheckSessionValues) => {
		checkSession(values.sessionId);
	};

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
									Enter the session ID shared with you:
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						disabled={isPending}
						className='setup-form-btn'>
						Join
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default JoinSession;
