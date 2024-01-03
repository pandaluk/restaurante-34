import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
    .$connect()
    .then(async () => {
        console.log("Connected to database");
    })
    .catch(async (e: any) => {
        console.error("Error connecting to database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export { prisma };
