import { configDotenv } from "dotenv";
configDotenv();

import app from "@/app";
import prisma from "@localPrisma/prismaClient";

async function main() {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Server is listening on ${port}`));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
