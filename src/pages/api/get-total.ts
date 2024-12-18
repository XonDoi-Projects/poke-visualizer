import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const getTotal = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbTotal = client.db("pokemons").collection("total");

    let resultTotal = await dbTotal.findOne({});

    if (resultTotal) {
      return res.status(200).json({ ...resultTotal });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to update pokemon: ${e.message}` });
  }
};

export default getTotal;
