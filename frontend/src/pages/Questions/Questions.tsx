import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QUESTIONS from "@/constants/questions";
import { useUserLocation } from "@/context/user-location";
import { useToast } from "@/hooks/use-toast";
import { useCreateResults } from "@/lib/react-query/queries";
import ButtonNavigation from "@/pages/Questions/components/ButtonNavigation";
import Header from "@/pages/Questions/components/Header";
import ErrorPage from "@/pages/StateManage/ErrorPage";
import Loader from "@/pages/StateManage/Loader";
import { CreateSessionResultBody, QuestionData } from "@lud/shared";

const Questions = () => {
	const { toast } = useToast();
	const { sessionId } = useParams();
	const { userLocation } = useUserLocation();

	const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
		const saved = sessionStorage.getItem(`currentQuestion_${sessionId}`);
		return saved ? parseInt(saved) : 0;
	});

	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<number, string>
	>(() => {
		const saved = sessionStorage.getItem(`selectedAnswers_${sessionId}`);
		return saved ? JSON.parse(saved) : {};
	});

	const {
		mutateAsync: createResults,
		isError,
		isPending,
	} = useCreateResults();

	const form = useForm({
		defaultValues: {
			currentAnswer: selectedAnswers[currentQuestion] || "",
		},
	});

	// Update form when current question changes
	useEffect(() => {
		form.setValue("currentAnswer", selectedAnswers[currentQuestion] || "");
	}, [currentQuestion, selectedAnswers, form]);

	// Persists currentQuestion in case the user reloads the page
	useEffect(() => {
		sessionStorage.setItem(
			`currentQuestion_${sessionId}`,
			currentQuestion.toString(),
		);
	}, [currentQuestion, sessionId]);

	// Persists selectedAnswers in case the user reloads the page
	useEffect(() => {
		sessionStorage.setItem(
			`selectedAnswers_${sessionId}`,
			JSON.stringify(selectedAnswers),
		);
	}, [selectedAnswers, sessionId]);

	const handleAnswerChange = (value: string) => {
		setSelectedAnswers(prev => ({
			...prev,
			[currentQuestion]: value,
		}));
		form.setValue("currentAnswer", value);
	};

	const handleSubmit = async () => {
		// Check if all questions are answered
		const unansweredCount = QUESTIONS.map((_, index) => index).filter(
			index => !selectedAnswers[index],
		).length;

		if (unansweredCount > 0) {
			toast({
				description: `Please answer all questions. Missing: ${unansweredCount} questions.`,
				variant: "destructive",
			});
			return;
		}

		if (!userLocation.current) {
			toast({
				description:
					"Unable to access your location. Check your browser settings and try again.",
				variant: "destructive",
			});
			return;
		}

		if (!sessionId) {
			toast({
				description: "Unable to retrieve session ID.",
				variant: "destructive",
			});
			return;
		}

		const questionnaireData: QuestionData[] = QUESTIONS.map(
			(question, index) => ({
				questionText: question.text,
				answerText: selectedAnswers[index],
			}),
		);

		const reqBody: CreateSessionResultBody = {
			questionnaireData,
			userLocation: {
				latitude: userLocation.current.latitude,
				longitude: userLocation.current.longitude,
			},
		};

		await createResults({ sessionId, reqBody });

		sessionStorage.removeItem(`selectedAnswers_${sessionId}`);
		sessionStorage.removeItem(`currentQuestion_${sessionId}`);
	};

	// Show toast on reload if answers were restored
	useEffect(() => {
		const saved = sessionStorage.getItem(`selectedAnswers_${sessionId}`);
		if (saved && Object.keys(JSON.parse(saved)).length > 0) {
			toast({
				description: "Welcome back! Your answers have been restored.",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!sessionId || isError) {
		return <ErrorPage text={"Error creating results."} />;
	}

	if (isPending) {
		return <Loader text='Submitting your answers...' />;
	}

	return (
		<div className='flex grow flex-col'>
			<Header currentQuestion={currentQuestion} />
			<section className='page-container w-full max-w-xl justify-between self-center'>
				<Form {...form}>
					<FormField
						control={form.control}
						name='currentAnswer'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										value={field.value}
										onValueChange={handleAnswerChange}
										className='grid grid-cols-2'>
										{QUESTIONS[currentQuestion].answers.map(
											({ text }) => (
												<FormItem
													className={`flex h-[70px] w-full cursor-pointer items-center space-y-0 rounded-xl bg-secondary p-4 transition-all duration-200 ${selectedAnswers[currentQuestion] === text ? "bg-accent text-white" : "hover:bg-gray-300"}`}
													key={text}
													onClick={() =>
														handleAnswerChange(text)
													}>
													<FormControl>
														<RadioGroupItem
															value={text}
															className='sr-only'
														/>
													</FormControl>
													<FormLabel className='w-full cursor-pointer text-center font-semibold'>
														{text}
													</FormLabel>
												</FormItem>
											),
										)}
										<FormMessage />
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>
				</Form>
				<ButtonNavigation
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
					isPending={isPending}
					handleSubmit={handleSubmit}
				/>
			</section>
		</div>
	);
};

export default Questions;
