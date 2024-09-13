import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const getUpdatedOn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbRefresh = client.db("pokemons").collection("refresh");

    let result = await dbRefresh.findOne<{ _id: String; updatedOn: string }>();

    if (result) {
      const lastUpdateDate = new Date(result.updatedOn).getTime();
      const thisAttempt = new Date().getTime();

      const diffInHours =
        Math.abs(lastUpdateDate - thisAttempt) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    } else {
      return res.status(200).json(false);
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get last update: ${e.message}` });
  }
};

export default getUpdatedOn;
