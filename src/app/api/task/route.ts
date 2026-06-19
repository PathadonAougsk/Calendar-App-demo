import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const result = await prisma.task.findMany();

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { description, date } = body;

  if (description == null) {
    return new Response(JSON.stringify("Internal Error"), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await prisma.task.upsert({
      where: {
        date: date,
      },
      update: { description: description },
      create: { description: description, date: date },
    });
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
