import fetch from "node-fetch";

const pokeBaseUrl = " https://pokeapi.co/api/v2";
const appUrl = "https://poke-plan.vercel.app/api";

export const pokeRegions = [
  "all",
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "hisui",
  "paldea",
];

export const pokeTypes = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const pokeTraits = ["all", "baby", "legendary", "mythical", "other"];

const movesCache = {};
const evolutionCache = {};

const getNextEvolution = (currentPokemon, chain) => {
  if (chain.species.name === currentPokemon) {
    return chain.evolves_to.map((s) => {
      return {
        name: { value: s.species.name.toUpperCase(), flavorText: "" },
        item: {
          value: s.evolution_details[0]?.item?.name || null,
          flavorText: "Using Item",
        },
        trigger: {
          value: s.evolution_details[0]?.trigger?.name || null,
          flavorText: "",
        },
        gender: {
          value: s.evolution_details[0]?.gender || null,
          flavorText: "Being",
        },
        heldItem: {
          value: s.evolution_details[0]?.held_item?.name || null,
          flavorText: "Holding",
        },
        knownMove: {
          value: s.evolution_details[0]?.known_move?.name || null,
          flavorText: "Knowing",
        },
        knownMoveType: {
          value: s.evolution_details[0]?.known_move_type?.name || null,
          flavorText: "Knowing a Move of Type",
        },
        location: {
          value: s.evolution_details[0]?.location?.name || null,
          flavorText: "Being At",
        },
        minLevel: {
          value: s.evolution_details[0]?.min_level || null,
          flavorText: "Reaching Level",
        },
        minHappiness: {
          value: s.evolution_details[0]?.min_happiness || null,
          flavorText: "Reaching Happiness",
        },
        minBeauty: {
          value: s.evolution_details[0]?.min_beauty || null,
          flavorText: "Reaching Beauty",
        },
        minAffection: {
          value: s.evolution_details[0]?.min_affection || null,
          flavorText: "Reaching Affection",
        },
        needsOverworldRain: {
          value: s.evolution_details[0]?.needs_overworld_rain,
          flavorText: "During Rainy Weather",
        },
        partySpecies: {
          value: s.evolution_details[0]?.party_species?.name || null,
          flavorText: "With Party Species",
        },
        partyType: {
          value: s.evolution_details[0]?.party_type?.name || null,
          flavorText: "With Party Type",
        },
        relativePhysicalStats: {
          value: s.evolution_details[0]?.relative_physical_stats || null,
          flavorText: "having Physical Stats",
        },
        timeOfDay: {
          value: s.evolution_details[0]?.time_of_day,
          flavorText: "At Time of Day",
        },
        tradeSpecies: {
          value: s.evolution_details[0]?.trade_species?.name
            ? s.evolution_details[0]?.trade_species?.name.toUpperCase()
            : s.evolution_details[0]?.trigger?.name === "trade"
            ? "For Other Pokemon"
            : null,
          flavorText: "Trading",
        },
        turnUpsideDown: {
          value: s.evolution_details[0]?.turn_upside_down,
          flavorText: "Turning Upside Down",
        },
      };
    });
  }

  for (let i = 0; i < chain.evolves_to.length; i++) {
    return getNextEvolution(currentPokemon, chain.evolves_to[i]);
  }
};

const getMoveDetails = async (url) => {
  if (movesCache[url]) {
    return movesCache[url];
  }
  const moveData = await fetch(url);
  const moveJson = await moveData.json();
  movesCache[url] = moveJson;
  return moveJson;
};

const getEvolutionDetails = async (url) => {
  if (evolutionCache[url]) {
    return evolutionCache[url];
  }
  const evolutionData = await fetch(url);
  const evolutionJson = await evolutionData.json();
  evolutionCache[url] = evolutionJson;
  return evolutionJson;
};

export const getPokemon = async (index, variety, region) => {
  let pokeDetails;

  const [basicData, extraData] = await Promise.all(
    !variety
      ? [
          fetch(`${pokeBaseUrl}/pokemon/${index}`),
          fetch(`${pokeBaseUrl}/pokemon-species/${index}`),
        ]
      : [fetch(`${pokeBaseUrl}/pokemon/${index}`)]
  );

  const firstData = await basicData.json();
  const secondData = await extraData?.json();

  const validForms = firstData.forms.filter(
    (f) => f.url.split("/").slice(-2, -1)[0] !== index.toString()
  );

  let forms = [];

  if (validForms.length) {
    forms = await Promise.all(
      validForms.map(async (form) => {
        const formData = await fetch(form.url).then((res) => res.json());
        return {
          index: parseInt(form.url.split("/").slice(-2, -1)[0]),
          name: formData.name.toUpperCase(),
          types: formData.types.map((type) => type.type.name),
          imageLink: formData.sprites.front_default,
          imageLinkShiny: formData.sprites.front_shiny,
        };
      })
    );
  }

  const pokemonRegion = region
    ? region
    : index <= 151
    ? "kanto"
    : index <= 251
    ? "johto"
    : index <= 386
    ? "hoenn"
    : index <= 493
    ? "sinnoh"
    : index <= 649
    ? "unova"
    : index <= 721
    ? "kalos"
    : index <= 809
    ? "alola"
    : index <= 905
    ? "hisui"
    : "paldea";

  pokeDetails = {
    id: firstData.id,
    name: variety
      ? firstData.name.toUpperCase()
      : firstData.species.name.toUpperCase(),
    index: firstData.id,
    imageLink: firstData.sprites.front_default,
    imageLinkShiny: firstData.sprites.front_shiny,
    animated:
      firstData.sprites.versions["generation-v"]["black-white"].animated
        .front_default,
    animatedShiny:
      firstData.sprites.versions["generation-v"]["black-white"].animated
        .front_shiny,
    imageLinkHighRes: firstData.sprites.other["official-artwork"].front_default,
    imageLinkHighResShiny:
      firstData.sprites.other["official-artwork"].front_shiny,
    types: firstData.types.map((type) => type.type.name),
    abilities: firstData.abilities.map((ability) => ability.ability.name),
    forms: forms,
    stats: firstData.stats.map((stat) => {
      return { value: stat.base_stat, name: stat.stat.name };
    }),
    cry: firstData.cries.latest,
    weight: firstData.weight,
    height: firstData.height,
    region: pokemonRegion,
  };

  let varietyData = [];

  if (secondData) {
    const varieties = secondData.varieties
      .filter(
        (f) => f.pokemon.url.split("/").slice(-2, -1)[0] !== index.toString()
      )
      .map((v) => ({
        index: parseInt(v.pokemon.url.split("/").slice(-2, -1)[0]),
        name: v.pokemon.name.toUpperCase(),
      }));

    if (varieties.length) {
      varietyData = await Promise.all(
        varieties.map(async (v) => {
          const variety = await getPokemon(v.index, true, pokemonRegion);
          return {
            ...variety.pokeDetails,
            base: { index: pokeDetails?.index, name: pokeDetails?.name },
          };
        })
      );
    }

    const flavorText = secondData.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );

    pokeDetails = {
      ...pokeDetails,
      description: `${flavorText[0].flavor_text.replace(/[\n\f]/g, " ")}`,
      captureRate: secondData.capture_rate.toString(),
      genderRate:
        secondData.gender_rate === -1
          ? undefined
          : ((secondData.gender_rate / 8) * 100).toString() + "%",
      growthRate:
        secondData.growth_rate.name.charAt(0).toUpperCase() +
        secondData.growth_rate.name.slice(1),
      baseHappiness: secondData.base_happiness?.toString() || "N/A",
      isBaby: secondData.is_baby,
      isLegendary: secondData.is_legendary,
      isMythical: secondData.is_mythical,
      shape:
        secondData.shape?.name?.charAt(0).toUpperCase() +
          secondData.shape?.name?.slice(1) || "No Shape",
      evolvesFrom: secondData.evolves_from_species?.name?.toUpperCase(),
      varieties: varieties,
    };

    if (secondData.evolution_chain.url) {
      const evolutionChainUrl = secondData.evolution_chain.url;

      const thirdData = await getEvolutionDetails(evolutionChainUrl);

      const evolvesTo = getNextEvolution(
        pokeDetails.name.toLowerCase(),
        thirdData.chain
      );

      pokeDetails = {
        ...pokeDetails,
        evolvesTo,
      };
    }
  }

  if (firstData.moves.length) {
    const moves = await Promise.all(
      firstData.moves.map(async (move) => {
        const moveData = await getMoveDetails(move.move.url);
        return {
          name: move.move.name,
          versions: move.version_group_details.map((v) => {
            return {
              version: v.version_group.name,
              levelLearned: v.level_learned_at,
              learnMethod: v.move_learn_method.name,
            };
          }),
          accuracy: moveData.accuracy,
          damageClass: moveData.damage_class.name,
          effectChance: moveData.effect_chance,
          power: moveData.power,
          type: moveData.type.name,
        };
      })
    );
    pokeDetails = { ...pokeDetails, moves };
  }

  return { pokeDetails, varietyData };
};

async function main() {
  try {
    console.time("cron");

    const resultSync = await fetch(`${appUrl}/check-sync/get-sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultSyncJSON = await resultSync.json();

    if (!resultSyncJSON) {
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
      const result = await fetch(`${appUrl}/save-total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
        }),
      });

      resultTotal = await result.json();
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
      } catch (e) {
        console.error(e);
      }

      if (((i / total) * 100) % 1 === 0) {
        console.log((i / total) * 100);
      }
    }

    await fetch(`${appUrl}/check-sync/update-sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "COMPLETED" }),
    });

    console.timeEnd("cron");
  } catch (error) {
    await fetch(`${appUrl}/check-sync/update-sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "HALTED" }),
    });

    console.error("Error in script execution:", error);
    process.exit(1);
  }
}
// Call the main function
main();
