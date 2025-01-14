import BackButton from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUESTIONS } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { questionsSchema } from "@/lib/zod-validation";
import { FetchResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const Questions = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { sessionId } = useParams();
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<number, string>
	>({});

	// 1. Define your form.
	const form = useForm<z.infer<typeof questionsSchema>>({
		resolver: zodResolver(questionsSchema),
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof questionsSchema>) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
				{
					method: "POST",
					body: JSON.stringify(values),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const { success, message }: FetchResponse = await response.json();

			if (success) {
				navigate(`/sessions/${sessionId}/results`);
				toast({ description: message });
			}
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	}

	const handleAnswerChange = (value: string) => {
		setSelectedAnswers(prev => ({
			...prev,
			[currentQuestion]: value,
		}));
	};

	const isNextDisabled = !selectedAnswers[currentQuestion];
	const isSubmitDisabled =
		currentQuestion === QUESTIONS.length - 1 &&
		!selectedAnswers[currentQuestion];

	return (
		<div className='page-padding'>
			<div className='flex justify-between'>
				{currentQuestion === 0 ? (
					<BackButton />
				) : (
					<Button onClick={() => setCurrentQuestion(prev => prev - 1)}>
						Previous Question
					</Button>
				)}

				{currentQuestion < QUESTIONS.length - 1 && (
					<Button
						onClick={() => setCurrentQuestion(prev => prev + 1)}
						disabled={isNextDisabled}>
						Next Question
					</Button>
				)}
			</div>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 mt-4'>
						<FormLabel className='text-md'>
							{currentQuestion + 1} / {QUESTIONS.length}{" "}
							{QUESTIONS[currentQuestion].text}
						</FormLabel>
						<FormField
							control={form.control}
							name={QUESTIONS[currentQuestion].text}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={value => {
												field.onChange(value);
												handleAnswerChange(value);
											}}>
											{QUESTIONS[currentQuestion].options.map(
												(option, optionIdx) => (
													<FormItem key={optionIdx}>
														<FormControl>
															<RadioGroupItem value={option} className='mr-1' />
														</FormControl>
														<FormLabel>{option}</FormLabel>
													</FormItem>
												)
											)}
											<FormMessage />
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>
						{currentQuestion === QUESTIONS.length - 1 && (
							<Button type='submit' disabled={isSubmitDisabled}>
								Submit
							</Button>
						)}
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Questions;
