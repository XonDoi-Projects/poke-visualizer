import * as index from "../components/index";
import * as util from "../utils";

(async () => {
  const fetch = (await import("node-fetch")).default;
  async function fetchData() {
    try {
      console.log("workflow started");
      const allPokemon = await fetch(
        `${index.pokeBaseUrl}/pokemon-species/?limit=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result: any = await allPokemon.json();

      const total = result.count;

      await fetch(`${index.appUrl}/total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
        }),
      });

      let pokemonList = [];

      for (let i = 0; i < total; i++) {
        const pokemonDetails = await util.getPokemon(i + 1);

        if (pokemonDetails) {
          pokemonList.push(pokemonDetails.pokeDetails);
        }

        const result = await fetch(
          `${index.appUrl}/pokemon/refresh?index=${pokemonDetails.pokeDetails.index}`,
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
      }

      console.log("workflow complete");
    } catch (error) {
      console.error("Error fetching data:", error);
      process.exit(1);
    }
  }

  fetchData();
})();
