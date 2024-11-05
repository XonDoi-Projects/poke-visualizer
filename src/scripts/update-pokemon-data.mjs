import fetch from "node-fetch";

const pokeBaseUrl = " https://pokeapi.co/api/v2";
const appUrl = "https://poke-plan.vercel.app/api";

async function main() {
  try {
    console.time("cron");

    const resultSync = await fetch(`${appUrl}/get-sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resultSync) {
      throw new Error(
        `Process failed because it is either IN PROGRESS or it was COMPLETED in the last 24hours.`
      );
    }

    const allPokemon = await fetch(`${pokeBaseUrl}/pokemon-species/?limit=0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await allPokemon.json();

    const total = result.count;

    console.log("Total pokemon:", total);

    let resultTotal;

    try {
      resultTotal = await fetch(`${appUrl}/save-total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          total,
        },
      });
    } catch (e) {
      console.error(e);
    }

    console.log("Total has been updated to: ", resultTotal.total);
    let pokemonList = [];

    for (let i = 0; i < total; i++) {
      const pokemonDetails = await getPokemon(i + 1);

      if (pokemonDetails) {
        pokemonList.push(pokemonDetails);
      }

      try {
        fetch(
          `${appUrl}/pokemon/update-one?index=${pokemonDetails.pokeDetails.index}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              pokemon: {
                pokeDetails: pokemonDetails.pokeDetails,
                varietyData: pokemonDetails.varietyData,
              },
            },
          }
        );
      } catch (e) {
        console.error(e);
      }

      if (((i / total) * 100) % 1 === 0) {
        console.log((i / total) * 100);
      }
    }

    await fetch(`${appUrl}/update-sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.timeEnd("cron");

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    // Parse and log the JSON data
    const data = await response.json();
    console.log("Data fetched from API:", data);
  } catch (error) {
    console.error("Error in script execution:", error);
    process.exit(1);
  }
}
// Call the main function
main();
