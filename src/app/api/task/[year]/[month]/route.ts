import { QueryBasedOnMonth } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string; month: string }> },
) {
  try {
    const { year, month } = await params;
    const y = parseInt(year);
    const m = parseInt(month);
    if (isNaN(y) || isNaN(m) || m < 1 || m > 12) {
      return new Response(JSON.stringify({ error: "Invalid year or month" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const date = new Date(Date.UTC(y, m - 1));
    const data = await QueryBasedOnMonth(date);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
