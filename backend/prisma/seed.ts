import prisma from "./prismaClient";

async function main() {
	const questions = [
		{
			text: "What cuisine are you craving?",
			answers: [
				{ text: "Italian" },
				{ text: "Japanese" },
				{ text: "Mexican" },
				{ text: "American" },
				{ text: "Chinese" },
				{ text: "Other" },
			],
		},
		{
			text: "How much do you want to spend?",
			answers: [
				{ text: "Budget-friendly" },
				{ text: "Mid-range" },
				{ text: "Fancy dining" },
			],
		},
		{
			text: "How far are you willing to travel?",
			answers: [
				{ text: "Within walking distance" },
				{ text: "10 minutes drive" },
				{ text: "20+ minutes drive" },
				{ text: "Any distance" },
			],
		},
		{
			text: "Do you prefer dine-in, takeout, or delivery?",
			answers: [{ text: "Dine-in" }, { text: "Takeout" }, { text: "Delivery" }],
		},
		{
			text: "Do you have any dietary restrictions or preferences?",
			answers: [
				{ text: "Vegetarian" },
				{ text: "Vegan" },
				{ text: "Gluten-free" },
				{ text: "Halal" },
				{ text: "No preferences" },
			],
		},
		{
			text: "Are you in the mood for a particular meal type?",
			answers: [
				{ text: "Breakfast" },
				{ text: "Brunch" },
				{ text: "Lunch" },
				{ text: "Dinner" },
				{ text: "Late-night snacks" },
			],
		},
		{
			text: "How important is ambiance to you?",
			answers: [
				{ text: "Casual" },
				{ text: "Family-friendly" },
				{ text: "Romantic" },
				{ text: "Lively" },
				{ text: "Quiet" },
			],
		},
		{
			text: "Do you want alcohol or specialty beverages with your meal?",
			answers: [
				{ text: "Cocktails" },
				{ text: "Wine" },
				{ text: "Craft beer" },
				{ text: "Mocktails" },
				{ text: "No preference" },
			],
		},
		{
			text: "Are you looking for something trendy or a familiar favorite?",
			answers: [
				{ text: "Trying new spots" },
				{ text: "Sticking to well-known places" },
				{ text: "No preference" },
			],
		},
		{
			text: "What’s the group’s preference for wait time?",
			answers: [
				{ text: "No wait required" },
				{ text: "Okay with reservations" },
				{ text: "Flexible" },
			],
		},
	];

	try {
		const createdQuestions = questions.map(async (question, idx) => {
			const createdQuestion = await prisma.questions.create({
				data: {
					text: question.text,
					answers: {
						createMany: {
							data: question.answers,
						},
					},
				},
			});
		});
	} catch (error) {
		console.log(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
