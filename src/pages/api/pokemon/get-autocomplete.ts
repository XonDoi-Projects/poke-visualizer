import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const getPokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbScore = client.db("pokemons");

    const { search } = req.body;

    let filter = {};

    if (search) {
      filter = { ...filter, name: { $regex: search, $options: "i" } };
    }

    let result = await dbScore
      .collection("pokemons")
      .find<PokeDetails>(filter)
      .sort("index", "ascending")
      .toArray();

    let count = await dbScore.collection("pokemons").countDocuments();

    if (result) {
      return res.status(200).json({
        data: result.map((r) => ({
          name: r.name,
          index: r.index,
          stats: r.stats,
          height: r.height,
          weight: r.weight,
        })),
        count,
      });
    }
  } catch (e: any) {
    return res.status(404).json({ message: `Failed to get pokemon: ${e}` });
  }
};

export default getPokemon;
