import { pokeBaseUrl } from "@/components";
import { getPokemon, PokeDetails } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const cronTest = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allPokemon = await fetch(`${pokeBaseUrl}/pokemon-species/?limit=0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await allPokemon.json();

    const total = result.count;

    console.log(total);
    try {
      await fetch(`/api/total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
        }),
      });
    } catch (e: any) {
      console.log(e.message);
    }

    let pokemonList: PokeDetails[] = [];

    for (let i = 0; i < total; i++) {
      const pokemonDetails = await getPokemon(i + 1);

      if (pokemonDetails) {
        pokemonList.push(pokemonDetails.pokeDetails);
      }

      try {
        const result = await fetch(
          `/api/pokemon/refresh?index=${pokemonDetails.pokeDetails.index}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pokemon: {
                pokeDetails: pokemonDetails.pokeDetails,
                varietyData: pokemonDetails.varietyData,
              },
            }),
          }
        );

        await result.json();

        if ((total / i) % 5 === 0) {
          console.log((total / i) * 100);
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
