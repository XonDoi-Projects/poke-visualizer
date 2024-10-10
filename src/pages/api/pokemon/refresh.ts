import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const updatePokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbPokemon = client.db("pokemons").collection("pokemons");
    const dbVarieties = client.db("pokemons").collection("varieties");

    const { pokemon } = req.body;
    const { index } = req.query;

    let pokemonFilter = {};

    if (index) {
      pokemonFilter = { ...pokemonFilter, index: parseInt(index as string) };
    }

    let resultPokemon = await dbPokemon.findOneAndReplace(
      pokemonFilter,
      { ...pokemon.pokeDetails, updatedOn: new Date() },
      { returnDocument: "after" }
    );

    if (pokemon.varietyData.length) {
      let resultVarieties = [];
      for (let i = 0; i < pokemon.varietyData.length; i++) {
        let result = await dbVarieties.findOneAndReplace(
          { index: pokemon.varietyData[i].index },
          { ...pokemon.varietyData[i], updatedOn: new Date() },
          { returnDocument: "after", upsert: true }
        );

        resultVarieties.push(result);
      }

      if (resultPokemon && resultVarieties) {
        return res.status(200).json({ ...resultPokemon });
      }
    }

    if (resultPokemon) {
      return res.status(200).json({ ...resultPokemon });
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to update pokemon: ${e.message}` });
  }
};

export default updatePokemon;
