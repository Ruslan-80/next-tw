// prisma/client.js
import { PrismaClient } from "@prisma/client";

// В dev‑режиме кэшируем клиент, чтобы не плодить подключения
const globalForPrisma = global;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
