import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

interface Task {
  description: string;
  date: Date;
}

// UTC -> ISO (automatically convert by prisma) -> Local Time
// Assume we got params use Date.now()

export async function QueryBasedOnMonth(date: number | Date) {
  const now = new Date(date);
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const startOfNextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
  );
  const daysInMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0),
  ).getUTCDate();

  if (!startOfMonth || !startOfNextMonth) {
    throw Error("Something is wrong with either startOfMonth or nextmonth");
  }

  const queryDict: { [key: string]: Task | null } = {};
  for (let iDate = 1; iDate <= daysInMonth; iDate++) {
    queryDict[iDate] = null;
  }

  const result = await prisma.task.findMany({
    where: {
      date: {
        gte: startOfMonth.toISOString(),
        lte: startOfNextMonth.toISOString(),
      },
    },
  });

  for (const day of result) {
    queryDict[day.date.getUTCDate()] = day;
  }

  return queryDict;
}
