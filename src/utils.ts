import { mergedBasesUrl, pokeBaseUrl } from "./components";
import { JSDOM } from "jsdom";
import { complexionData, TypeWeakness } from "./pokemonTypes";

export interface EvolutionType {
  name: { value: string; flavorText: string };
  item: { value: string | null; flavorText: string };
  trigger: { value: string | null; flavorText: string };
  gender: { value: number | null; flavorText: string };
  heldItem: { value: string | null; flavorText: string };
  knownMove: { value: string | null; flavorText: string };
  knownMoveType: { value: string | null; flavorText: string };
  location: { value: string | null; flavorText: string };
  minLevel: { value: number | null; flavorText: string };
  minHappiness: { value: number | null; flavorText: string };
  minBeauty: { value: number | null; flavorText: string };
  minAffection: { value: number | null; flavorText: string };
  needsOverworldRain: { value: boolean | null; flavorText: string };
  partySpecies: { value: string | null; flavorText: string };
  partyType: { value: string | null; flavorText: string };
  relativePhysicalStats: { value: number | null; flavorText: string };
  timeOfDay: { value: string | null; flavorText: string };
  tradeSpecies: { value: string | null; flavorText: string };
  turnUpsideDown: { value: boolean | null; flavorText: string };
}

export interface PokeDetails {
  name: string;
  index: string;
  weight: number;
  height: number;
  imageLink: string;
  imageLinkShiny?: string;
  animated?: string;
  animatedShiny?: string;
  imageLinkHighRes?: string;
  imageLinkHighResShiny?: string;
  description?: string;
  types?: string[];
  preEvolution?: string;
  postEvolution?: string;
  stats?: PokeStat[];
  abilities?: PokeAbility[];
  forms?: PokeForm[];
  region: PokeRegion;
  cry?: string;
  growthRate?: string;
  captureRate?: string;
  genderRate?: string;
  baseHappiness?: string;
  isBaby?: boolean;
  isLegendary?: boolean;
  isMythical?: boolean;
  shape?: string;
  evolvesFrom?: string;
  evolvesTo?: EvolutionType[];
}

export type PokeAbility = string;
export type PokeForm = string;
export type PokeStat = { name: string; value: number };

export type PokeRegion =
  | "all"
  | "kanto"
  | "johto"
  | "hoenn"
  | "sinnoh"
  | "unova"
  | "kalos"
  | "alola"
  | "hisui"
  | "paldea";

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

export type PokeType =
  | "any"
  | "grass"
  | "fire"
  | "water"
  | "flying"
  | "normal"
  | "fighting"
  | "poison"
  | "steel"
  | "dragon"
  | "ghost"
  | "dark"
  | "psychic"
  | "fairy"
  | "rock"
  | "ground"
  | "electric"
  | "bug"
  | "ice";

export const pokeTypes = [
  "any",
  "grass",
  "fire",
  "water",
  "flying",
  "normal",
  "fighting",
  "poison",
  "steel",
  "dragon",
  "ghost",
  "dark",
  "psychic",
  "fairy",
  "rock",
  "ground",
  "electric",
  "bug",
  "ice",
];

interface EvolveTriggerPokeAPI {
  item: { name: string } | null;
  trigger: { name: string } | null;
  gender: number | null;
  held_item: { name: string } | null;
  known_move: { name: string } | null;
  known_move_type: { name: string } | null;
  location: { name: string } | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: { name: string } | null;
  party_type: { name: string } | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: { name: string } | null;
  turn_upside_down: boolean;
}

interface EvolveChainPokeAPI {
  species: { name: string };
  evolution_details: EvolveTriggerPokeAPI[];
  evolves_to: EvolveChainPokeAPI[];
}

const getNextEvolution = (
  currentPokemon: string,
  chain: EvolveChainPokeAPI
): EvolutionType[] | undefined => {
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

export const getPokemon = async (index: number) => {
  let pokeDetails: PokeDetails | undefined;

  const [basicData, extraData] = await Promise.all([
    fetch(`${pokeBaseUrl}/pokemon/${index}`),
    fetch(`${pokeBaseUrl}/pokemon-species/${index}`),
  ]);

  const firstData = await basicData.json();
  const secondData = await extraData.json();

  pokeDetails = {
    name: (firstData.species.name as string).toUpperCase(),
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
    types: firstData.types.map((type: any) => type.type.name),
    abilities: firstData.abilities.map((ability: any) => ability.ability.name),
    forms: firstData.forms.map((form: any) => form.name),
    stats: firstData.stats.map((stat: any) => {
      return { value: stat.base_stat, name: stat.stat.name };
    }),
    cry: firstData.cries.latest,
    weight: firstData.weight,
    height: firstData.height,
    region:
      index <= 151
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
        : "paldea",
  };

  const flavorText = secondData.flavor_text_entries.filter(
    (entry: any) => entry.language.name === "en"
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
      (secondData.growth_rate.name as string).charAt(0).toUpperCase() +
      (secondData.growth_rate.name as string).slice(1),
    baseHappiness: secondData.base_happiness?.toString() || "N/A",
    isBaby: secondData.is_baby,
    isLegendary: secondData.is_legendary,
    isMythical: secondData.is_mythical,
    shape:
      (secondData.shape?.name as string)?.charAt(0).toUpperCase() +
        (secondData.shape?.name as string)?.slice(1) || "No Shape",
    evolvesFrom: (
      secondData.evolves_from_species?.name as string
    )?.toUpperCase(),
  };

  if (secondData.evolution_chain.url) {
    const evolutionChainUrl = secondData.evolution_chain.url;

    const evolutionChainData = await fetch(evolutionChainUrl);

    const thirdData = await evolutionChainData.json();

    const evolvesTo = getNextEvolution(
      pokeDetails.name.toLowerCase(),
      thirdData.chain
    );

    return {
      ...pokeDetails,
      evolvesTo,
    };
  }

  return pokeDetails;
};

export const getPokemonList = async (limit?: number, offset?: number) => {
  let pokemonList: PokeDetails[] = [];

  const result = await fetch(
    `${pokeBaseUrl}/pokemon/?offset=${offset}&limit=${limit || 20}`
  );
  const data = await result.json();

  for (let i = 0; i < data.results.length; i++) {
    const pokemonResult = await getPokemon(i + 1);

    if (pokemonResult) {
      pokemonList.push(pokemonResult);
    }
  }

  return { data: pokemonList, count: data.count };
};

export const setPokemonData = (pokeData: PokeDetails[]) => {
  localStorage.setItem("pokemon", JSON.stringify(pokeData));
};

export const checkPokemonData = () => {
  return localStorage.getItem("pokemon")?.length ? true : false;
};

export type PokeArgsMany = {
  limit: number;
  range?: { start: number; end: number };
  name?: string;
  index?: string;
  types?: PokeType[];
  region?: PokeRegion;
};
export type PokeArgsOneById = {
  index: number;
};
export type PokeArgsOneByName = {
  name: string;
};

export const getPokemonDataList = (
  args?: PokeArgsMany
): { data: PokeDetails[]; count: number } | undefined => {
  if (typeof window !== "undefined") {
    if (!args) {
      return JSON.parse(localStorage.getItem("pokemon") || "");
    }

    let data: PokeDetails[] = JSON.parse(localStorage.getItem("pokemon") || "");

    if (args.types && !args.types?.includes("any")) {
      data = data.filter((d) =>
        args.types
          ?.map((t) => d.types?.includes(t.toLowerCase()))
          .some((b) => b)
      );
    }

    if (args.region && args.region !== "all") {
      data = data.filter((d) => args.region?.includes(d.region));
    }

    const count = data.length;

    if (args.range) {
      data = data.slice(
        args.range.start,
        data.length - args.range.start > args.limit
          ? args.range.end
          : data.length
      );
    }

    return { data, count };
  }
  return;
};

export const getPokemonDataID = (args: PokeArgsOneById): PokeDetails => {
  const data: PokeDetails[] = JSON.parse(localStorage.getItem("pokemon") || "");

  return data[args.index - 1];
};

export const getPokemonDataName = (args: PokeArgsOneByName) => {
  const data: PokeDetails[] = JSON.parse(localStorage.getItem("pokemon") || "");

  return data.find((d) => d.name === args.name);
};

//----------- Merged Pokemon Data ------------

export const getMergedPokemon = async (
  firstIndex: string,
  secondIndex: string
) => {
  const resultByProjectId = await fetch(
    `${mergedBasesUrl}/projects?search=${encodeURIComponent("customSprites")}`
  );
  const dataByProjectId = await resultByProjectId.json();

  const id = dataByProjectId.find((d: any) =>
    d.web_url.includes("pokemoninfinitefusion")
  ).id;

  const result = await fetch(
    `${mergedBasesUrl}/projects/${id}/repository/files/${encodeURIComponent(
      `CustomBattlers/${firstIndex}.${secondIndex}.png`
    )}/raw?ref=master`
  );
  const blob = await result.blob();

  const image = URL.createObjectURL(blob);

  return image;
};

//----------- Team Builder Setup -------------

export const determineWeaknesses = (typeOne: string) => {
  return complexionData[typeOne].complexion.weakAgainst;
};

export const determinePartyWeaknesses = (typeOne: string, typeTwo: string) => {
  complexionData[typeOne].secondary[typeTwo].complexion.weakAgainst;
};
