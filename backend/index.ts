import { configDotenv } from "dotenv";
configDotenv();

import prisma from "./prisma/prismaClient";
import app from "./src/app";

async function main() {
	const port = process.env.PORT || 8080;
	app.listen(port, () => console.log(`Server is listening on ${port}`));
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
