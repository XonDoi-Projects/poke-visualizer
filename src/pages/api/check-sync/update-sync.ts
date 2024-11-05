import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const updateSync = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbSync = client.db("pokemons").collection("refresh");

    let resultSync = await dbSync.findOneAndUpdate(
      {},
      { status: "COMPLETED", updatedOn: new Date() }
    );

    if (resultSync) {
      return res.status(200).json({ ...resultSync });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get sync: ${e.message}` });
  }
};

export default updateSync;
