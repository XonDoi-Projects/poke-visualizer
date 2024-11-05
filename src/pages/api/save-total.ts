import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const saveTotal = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbTotal = client.db("pokemons").collection("total");

    const { total } = req.body;

    let resultTotal = await dbTotal.findOneAndReplace(
      {},
      { total },
      { returnDocument: "after" }
    );

    return res.status(200).json({ total: resultTotal?.total });
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to update pokemon: ${e.message}` });
  }
};

export default saveTotal;
