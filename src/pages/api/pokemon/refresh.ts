import clientPromise from "@/lib/mongodb";
import { PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const updatePokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");

    const { pokemon } = req.body;
    const { index } = req.query;

    let filter = {};

    if (index) {
      filter = { ...filter, index: parseInt(index as string) };
    }

    let result = await dbPokemon.findOneAndReplace(
      filter,
      { ...pokemon, updatedOn: new Date() },
      { returnDocument: "after" }
    );

    if (result) {
      return res.status(200).json({ ...result });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to update pokemon: ${e.message}` });
  }
};

export default updatePokemon;
