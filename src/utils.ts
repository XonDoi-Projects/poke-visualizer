import { mergedBasesUrl, pokeBaseUrl, total } from "./components";

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
}

export type PokeAbility = string;
export type PokeForm = string;
export type PokeStat = { name: string; value: number };

export type PokeRegion =
  | "All"
  | "Kanto"
  | "Johto"
  | "Hoenn"
  | "Sinnoh"
  | "Unova"
  | "Kalos"
  | "Alola"
  | "Hisui"
  | "Paldea";

export const pokeRegions = [
  "All",
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
  "Hisui",
  "Paldea",
];

export type PokeType =
  | "Any"
  | "Grass"
  | "Fire"
  | "Water"
  | "Flying"
  | "Normal"
  | "Fighting"
  | "Poison"
  | "Steel"
  | "Dragon"
  | "Ghost"
  | "Dark"
  | "Psychic"
  | "Fairy"
  | "Rock"
  | "Ground"
  | "Electric"
  | "Bug"
  | "Ice";

export const pokeTypes = [
  "Any",
  "Grass",
  "Fire",
  "Water",
  "Flying",
  "Normal",
  "Fighting",
  "Poison",
  "Steel",
  "Dragon",
  "Ghost",
  "Dark",
  "Psychic",
  "Fairy",
  "Rock",
  "Ground",
  "Electric",
  "Bug",
  "Ice",
];

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
        ? "Kanto"
        : index <= 251
        ? "Johto"
        : index <= 386
        ? "Hoenn"
        : index <= 493
        ? "Sinnoh"
        : index <= 649
        ? "Unova"
        : index <= 721
        ? "Kalos"
        : index <= 809
        ? "Alola"
        : index <= 905
        ? "Hisui"
        : "Paldea",
  };

  const flavorText = secondData.flavor_text_entries.filter(
    (entry: any) => entry.language.name === "en"
  );

  return {
    ...pokeDetails,
    description: `${flavorText[0].flavor_text.replace(/[\n\f]/g, " ")}`,
  };
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
export type PokeArgsOne = {
  index: number;
};

export const getPokemonDataList = (
  args?: PokeArgsMany
): { data: PokeDetails[]; count: number } => {
  if (!args) {
    return JSON.parse(localStorage.getItem("pokemon") || "");
  }

  let data: PokeDetails[] = JSON.parse(localStorage.getItem("pokemon") || "");

  if (args.types && !args.types?.includes("Any")) {
    data = data.filter((d) =>
      args.types?.map((t) => d.types?.includes(t.toLowerCase())).some((b) => b)
    );
  }

  if (args.region && args.region !== "All") {
    data = data.filter((d) => args.region?.includes(d.region));
  }

  const count = data.length;

  if (args.range) {
    data = data.slice(
      args.range.start,
      data.length - args.range.start > args.limit ? args.range.end : data.length
    );
  }

  return { data, count };
};

export const getPokemonDataID = (args: PokeArgsOne): PokeDetails => {
  const data: PokeDetails[] = JSON.parse(localStorage.getItem("pokemon") || "");

  return data[args.index - 1];
};

//----------- Merged Pokemon Data ------------

export const getMergedPokemon = async (
  firstIndex: number,
  secondIndex: number
) => {
  const resultByProjectId = await fetch(
    `${mergedBasesUrl}/projects?search=${encodeURIComponent("customSprites")}`
  );
  const dataByProjectId = await resultByProjectId.json();

  const id = dataByProjectId.find((d: any) =>
    d.web_url.includes("pokemoninfinitefusion")
  ).id;

  console.log(id);

  const result = await fetch(
    `${mergedBasesUrl}/projects/${id}/repository/files/${encodeURIComponent(
      "CustomBattlers/1.1.png"
    )}/raw?ref=master`
  );
  const blob = await result.blob();

  const image = URL.createObjectURL(blob);

  return image;
};
