import QUESTIONS from "../src/constants/questions";
import prisma from "./prismaClient";

async function main() {
	try {
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
