import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const getSync = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbSync = client.db("pokemons").collection("refresh");

    let resultSync = await dbSync.findOne({});

    const currentDate = new Date();

    if (
      resultSync &&
      (currentDate > resultSync.updatedOn ||
        resultSync.status === "IN PROGRESS")
    ) {
      await dbSync.findOneAndUpdate({}, { $set: { status: "IN PROGRESS" } });
      return res.status(200).json({ result: true });
    }

    return res.status(200).json({ result: false });
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get sync: ${e.message}` });
  }
};

export default getSync;
