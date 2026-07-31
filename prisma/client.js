// // prisma/client.js
// import { PrismaClient } from "@prisma/client";

// let prisma;

// if (process.env.NEXT_PHASE === 'phase-production-build') {
//   // Во время сборки возвращаем пустышку (Proxy), чтобы избежать попытки коннекта
//   prisma = new Proxy({}, {
//     get: (target, prop) => {
//       return () => {
//         throw new Error(
//           `Prisma was called during build phase at property "${prop}". ` +
//           `Make sure you are not calling DB on top-level or use "export const dynamic = 'force-dynamic'"`
//         );
//       };
//     },
//   });
// } else {
//   // Обычная логика для Runtime (dev или production)
//   if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
//   } else {
//     if (!global.prisma) {
//       global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
//   }
// }

// export { prisma };

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NEXT_PHASE === "phase-production-build") {
  prisma = new Proxy(
    {},
    {
      get: (target, prop) => {
        return () => {
          throw new Error(
            `Prisma was called during build phase at property "${prop}". ` +
              `Make sure you are not calling DB on top-level or use "export const dynamic = 'force-dynamic'"`,
          );
        };
      },
    },
  );
} else {
  // Используем globalThis вместо global для надежности в ESM/Next.js
  const globalForPrisma = globalThis;

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  prisma = globalForPrisma.prisma;
}

export { prisma };
