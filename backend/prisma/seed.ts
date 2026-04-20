import QUESTIONS from "../src/constants/questions";
import prisma from "./prismaClient";

async function main() {
	try {
		const existingQuestions = await prisma.question.count();

		if (existingQuestions > 0) {
			console.log("Las preguntas ya existen, saltando este paso...");
			return;
		}

		for (const question of QUESTIONS) {
			const createdQuestion = await prisma.question.create({
				data: {
					text: question.text,
				},
				select: {
					id: true,
				},
			});

			for (const answer of question.answers) {
				const { text, ...apiParams } = answer;

				await prisma.answer.create({
					data: {
						text,
						questionId: createdQuestion.id,
						apiParams,
					},
				});
			}
		}

		console.log("Preguntas creadas exitosamente.");
	} catch (error) {
		console.log("Error creando preguntas", error);
	}
}

main()
	.catch(async e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
