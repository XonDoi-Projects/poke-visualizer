import { NextApiRequest, NextApiResponse } from "next";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export default function GET(_req: NextApiRequest, res: NextApiResponse) {
  // your db logic
  return res.status(200).send({ message: "Cron run successfully!" });
}
