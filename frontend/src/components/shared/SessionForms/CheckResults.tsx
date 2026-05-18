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
import { useGetSessionStatus } from "@/lib/react-query/queries";
import { getSessionStatusSchema } from "@/lib/zod-validation";
import { GetSessionStatusValues } from "@/types";

const CheckResults = () => {
	const { mutateAsync: getSessionStatus, isPending } =
		useGetSessionStatus("check");

	const form = useForm<GetSessionStatusValues>({
		resolver: zodResolver(getSessionStatusSchema),
		defaultValues: {
			sessionId: "",
		},
	});

	const onSubmit = (values: GetSessionStatusValues) => {
		getSessionStatus(values.sessionId);
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
								<FormLabel>Enter the session ID:</FormLabel>
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
						Check
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CheckResults;
