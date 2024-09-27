import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const getPokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");

    const { limit, range, types, region, search } = req.body;

    let filter = {};

    if (region) {
      filter = { ...filter, region: region.toString().toLowerCase() };
    }

    if (types) {
      filter = {
        ...filter,

        $or: types.map((t: string) => ({
          types: t.toString().toLowerCase(),
        })),
      };
    }

    if (search) {
      filter = { ...filter, name: { $regex: search, $options: "i" } };
    }

    let result = await dbPokemon
      .find<PokeDetails>(filter)
      .sort("index", "ascending")
      .skip(range.start)
      .limit(limit)
      .toArray();

    let count = await dbPokemon.countDocuments();

    if (result) {
      return res.status(200).json({ data: result, count });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get pokemon: ${e.message}` });
  }
};

export default getPokemon;