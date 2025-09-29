import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserLocation } from "@/context/user-location";
import { useToast } from "@/hooks/use-toast";
import { useCreateResults } from "@/lib/react-query/queries";
import ButtonNavigation from "@/pages/Questions/components/ButtonNavigation";
import Header from "@/pages/Questions/components/Header";
import Loader from "@/pages/StateManage/Loader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import QUESTIONS from "../../../../shared/constants/questions";
import {
	CreateSessionResultBody,
	QuestionData,
} from "../../../../shared/types/index";
import ErrorPage from "../StateManage/ErrorPage";

const Questions = () => {
	const { toast } = useToast();
	const { sessionId } = useParams();
	const { userLocation } = useUserLocation();
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<number, string>
	>({});
	const {
		mutateAsync: createResults,
		isError,
		isPending,
	} = useCreateResults();

	// Simple form for current question only
	const form = useForm({
		defaultValues: {
			currentAnswer: selectedAnswers[currentQuestion] || "",
		},
	});

	// Update form when current question changes
	useEffect(() => {
		form.setValue("currentAnswer", selectedAnswers[currentQuestion] || "");
	}, [currentQuestion, selectedAnswers, form]);

	const handleAnswerChange = (value: string) => {
		setSelectedAnswers(prev => ({
			...prev,
			[currentQuestion]: value,
		}));
		form.setValue("currentAnswer", value);
	};

	const handleSubmit = async () => {
		// Check if all questions are answered
		const unansweredQuestions = QUESTIONS.map((_, index) => index).filter(
			index => !selectedAnswers[index],
		);

		if (unansweredQuestions.length > 0) {
			toast({
				description: `Please answer all questions. Missing: ${unansweredQuestions.length} questions.`,
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
			userLocation: userLocation.current,
		};

		await createResults({ sessionId, reqBody });
	};

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
											({ text }, optionsessionIdx) => (
												<FormItem
													className={`flex h-[70px] w-full cursor-pointer items-center space-y-0 rounded-xl bg-gray-100 p-4 transition-all duration-200 ${selectedAnswers[currentQuestion] === text ? "bg-red_accent text-white" : "hover:bg-gray-300"}`}
													key={optionsessionIdx}
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
