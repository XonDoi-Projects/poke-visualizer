import { NextApiRequest, NextApiResponse } from "next";

export const revalidate = 0;
export const dynamic = "force-dynamic";
const cronTest = async (_req: NextApiRequest, res: NextApiResponse) => {
  // your db logic
  return res.status(200).json({ message: "Cron run successfully!" });
};

export default cronTest;
