import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const getPokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");

    const { search } = req.body;

    let filter = {};

    if (search) {
      filter = { ...filter, name: { $regex: search, $options: "i" } };
    }

    let result = await dbPokemon
      .find<PokeDetails>(filter)
      .sort("index", "ascending")
      .toArray();

    let count = await dbPokemon.countDocuments();

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
    return res
      .status(404)
      .json({ message: `Failed to get pokemon: ${e.message}` });
  }
};

export default getPokemon;
