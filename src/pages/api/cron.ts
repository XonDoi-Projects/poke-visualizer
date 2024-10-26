import { NextApiRequest, NextApiResponse } from "next";

const cronTest = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("cron running");
    return res.status(200).json({ message: `Cron ran successfully` });
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get last update: ${e.message}` });
  }
};

export default cronTest;
