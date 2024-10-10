import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const getOnePokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");
    const dbVarieties = client.db("pokemons").collection("varieties");

    const { name, index, isVariant } = req.body;

    let filter = {};

    if (name) {
      filter = { ...filter, name };
    }

    if (index) {
      filter = { ...filter, index };
    }

    let result: PokeDetails | null;
    let prevValue: number;
    let nextValue: number;

    if (!isVariant) {
      prevValue = (
        await dbPokemon
          .find({ index: { $lt: index } })
          .sort("index", "descending")
          .limit(1)
          .toArray()
      )[0]?.index;
      result = await dbPokemon.findOne<PokeDetails>(filter);
      nextValue = (
        await dbPokemon
          .find({ index: { $gt: index } })
          .sort("index", "ascending")
          .limit(1)
          .toArray()
      )[0]?.index;
    } else {
      prevValue = (
        await dbVarieties
          .find({ index: { $lt: index } })
          .sort("index", "descending")
          .limit(1)
          .toArray()
      )[0]?.index;
      result = await dbVarieties.findOne<PokeDetails>(filter);
      nextValue = (
        await dbVarieties
          .find({ index: { $gt: index } })
          .sort("index", "ascending")
          .limit(1)
          .toArray()
      )[0]?.index;
    }

    if (result) {
      return res.status(200).json({ ...result, prevValue, nextValue });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get pokemon: ${e.message}` });
  }
};

export default getOnePokemon;
