import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET(_req: Request) {
  // your db logic
  return NextResponse.json({
    result: "Cron ran successfully",
  });
}
