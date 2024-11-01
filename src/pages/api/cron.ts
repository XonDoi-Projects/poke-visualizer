import { pokeBaseUrl } from "@/components";
import { getPokemon, PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import updatePokemon from "./pokemon/refresh";
import saveTotal from "./save-total";

const cronTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allPokemon = await fetch(`${pokeBaseUrl}/pokemon-species/?limit=0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await allPokemon.json();

    const total = result.count;

    console.log("total pokemon:", total);

    try {
      await saveTotal({ ...req, body: { total } } as NextApiRequest, res);
    } catch (e: any) {
      console.log(e.message);
    }

    console.log("total has been updated");
    let pokemonList: PokeDetails[] = [];

    for (let i = 0; i < total; i++) {
      const pokemonDetails = await getPokemon(i + 1);

      if (pokemonDetails) {
        pokemonList.push(pokemonDetails.pokeDetails);
      }

      try {
        await updatePokemon(
          {
            ...req,
            query: { index: pokemonDetails.pokeDetails.index.toString() },
            body: {
              pokemon: {
                pokeDetails: pokemonDetails.pokeDetails,
                varietyData: pokemonDetails.varietyData,
              },
            },
          } as unknown as NextApiRequest,
          res
        );

        if (((i / total) * 100) % 2 === 0) {
          console.log((i / total) * 100);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    }

    return res.status(200).json({ message: "Cron ran successfully" });
  } catch (e: any) {
    console.error(e.message);
    return new Response(`CRON has failed to run:${e.message}`, { status: 500 });
  }
};

export default cronTest;
