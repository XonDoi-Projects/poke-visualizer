import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const getPokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");

    const { search, region, trait, types } = req.body;

    let filter = {};

    if (trait === "legendary") {
      filter = { ...filter, isLegendary: true };
    }

    if (trait === "mythical") {
      filter = { ...filter, isMythical: true };
    }

    if (trait === "baby") {
      filter = { ...filter, isBaby: true };
    }

    if (trait === "other") {
      filter = {
        ...filter,
        isBaby: false,
        isLegendary: false,
        isMythical: false,
      };
    }

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
      .limit(10)
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
          imageLinkHighRes: r.imageLinkHighRes,
          types: r.types,
          moves: r.moves,
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
