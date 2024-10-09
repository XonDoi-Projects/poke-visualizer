import { mergedBasesUrl, pokeBaseUrl } from "./components";
import { complexionData } from "./pokemonTypes";

export const statShortHand: { [key in string]: string } = {
  attack: "atk",
  defense: "def",
  speed: "spd",
  hp: "hp",
  "special-attack": "s-atk",
  "special-defense": "s-def",
};

export const maxStats: { [key in string]: number } = {
  attack: 190,
  defense: 230,
  speed: 200,
  hp: 255,
  "special-attack": 194,
  "special-defense": 230,
};

export type PokeAbility = string;
export type PokeForm = {
  index: string;
  name: string;
  types: PokeType[];
  imageLink: string;
  imageLinkShiny?: string;
};
export type PokeVariety = {
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
  types: PokeType[];
  stats?: PokeStat[];
  abilities?: PokeAbility[];
  region: PokeRegion;
  cry?: string;
  moves?: MoveDetailsType[];
  forms?: PokeForm[];
};
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
export type PokeType =
  | "all"
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
export type PokeTrait = "all" | "baby" | "legendary" | "mythical" | "other";

export type MoveDetailsType = {
  name: string;
  accuracy: number | null;
  power: number | null;
  effectChance: number | null;
  damageClass: string | null;
  type: string | null;
  versions: {
    levelLearned: number;
    learnMethod: string;
    version: string;
  }[];
};

export type EvolutionType = {
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
};

export interface PokeDetails {
  id: number;
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
  varieties?: PokeVariety[];
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
  moves?: MoveDetailsType[];
}

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

let movesCache: { url: string; data: any }[] = [];

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

  let forms: PokeForm[] = [];

  const validForms = firstData.forms.filter(
    (f: any) => f.url.split("/").slice(-2, -1)[0] !== index.toString()
  );

  for (let i = 0; i < validForms.length; i++) {
    const formsData = await fetch(validForms[i].url);

    const fourthData = await formsData.json();

    forms.push({
      index: validForms[i].url.split("/").slice(-2, -1)[0],
      name: (fourthData.name as string).toUpperCase(),
      types: fourthData.types.map((type: any) => type.type.name),
      imageLink: fourthData.sprites.front_default,
      imageLinkShiny: fourthData.sprites.front_shiny,
    });
  }

  // const varietiesData = secondData.varieties
  //   .filter((item: any) => !item.is_default)
  //   .flatMap((item: any) => ({
  //     name: (item.pokemon.name as string).toUpperCase(),
  //     index: parseInt(item.pokemon.url.split("/").slice(-2, -1)[0]),
  //   }));

  pokeDetails = {
    id: firstData.id,
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
    forms: forms,
    // varieties: varietiesData,
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

    pokeDetails = {
      ...pokeDetails,
      evolvesTo,
    };
  }

  if (firstData.moves.length) {
    for (let i = 0; i < firstData.moves.length; i++) {
      const thisMove = firstData.moves[i];
      const moveUrl = thisMove.move.url;

      const moveExists = movesCache.find((move) => move.url === moveUrl);

      let fourthData;
      if (!moveExists) {
        const moveData = await fetch(moveUrl);

        fourthData = await moveData.json();
        movesCache.push({ url: moveUrl, data: fourthData });
      } else {
        fourthData = moveExists.data;
      }
      pokeDetails = {
        ...pokeDetails,
        moves: pokeDetails?.moves
          ? [
              ...pokeDetails.moves,
              {
                name: thisMove.move.name,
                versions: thisMove.version_group_details.map((v: any) => {
                  return {
                    version: v.version_group.name,
                    levelLearned: v.level_learned_at,
                    learnMethod: v.move_learn_method.name,
                  };
                }),
                accuracy: fourthData.accuracy,
                damageClass: fourthData.damage_class.name,
                effectChance: fourthData.effect_chance,
                power: fourthData.power,
                type: fourthData.type.name,
              },
            ]
          : [
              {
                name: thisMove.move.name,
                versions: thisMove.version_group_details.map((v: any) => {
                  return {
                    version: v.version_group.name,
                    levelLearned: v.level_learned_at,
                    learnMethod: v.move_learn_method.name,
                  };
                }),
                accuracy: fourthData.accuracy,
                damageClass: fourthData.damage_class.name,
                effectChance: fourthData.effect_chance,
                power: fourthData.power,
                type: fourthData.type.name,
              },
            ],
      };
    }
  }

  return pokeDetails;
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
