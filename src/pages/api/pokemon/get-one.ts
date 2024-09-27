import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const getOnePokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");

    const { name, index } = req.body;

    let filter = {};

    if (name) {
      filter = { ...filter, name };
    }

    if (index) {
      filter = { ...filter, index };
    }

    let result = await dbPokemon.findOne<PokeDetails>(filter);

    if (result) {
      return res.status(200).json({ ...result });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get pokemon: ${e.message}` });
  }
};

export default getOnePokemon;