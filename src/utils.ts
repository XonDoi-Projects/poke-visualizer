import { pokeBaseUrl } from "./components";
import { PokeDetails } from "./components/PageComponents/Dex/PokeCard";

export type PokeRegion = { name: string; start: number; end: number };
export type PokeRegions = {
  [key: string]: PokeRegion;
};

export const pokeRegions: PokeRegions = {
  All: { name: "All", start: 1, end: 1025 },
  Kanto: { name: "Kanto", start: 1, end: 151 },
  Johto: { name: "Johto", start: 152, end: 251 },
  Hoenn: { name: "Hoenn", start: 252, end: 386 },
  Sinnoh: { name: "Sinnoh", start: 387, end: 493 },
  Unovoa: { name: "Unovoa", start: 494, end: 649 },
  Kalos: { name: "Kalos", start: 650, end: 721 },
  Alola: { name: "Alola", start: 722, end: 809 },
  Hisui: { name: "Hisui", start: 810, end: 905 },
  Paldea: { name: "Paldea", start: 906, end: 1025 },
};

export const getPokemon = async (name: string) => {
  let pokeDetails: PokeDetails | undefined;
  const basicData = await fetch(`${pokeBaseUrl}/pokemon/${name}`)
    .then((data) => data.json())
    .then((pokemonResult) => {
      pokeDetails = {
        name: (pokemonResult.species.name as string).toUpperCase(),
        index: pokemonResult.id,
        imageLink: pokemonResult.sprites.front_default,
        imageLinkShiny: pokemonResult.sprites.front_shiny,
        types: pokemonResult.types.map((type: any) => type.type.name),
      };

      return pokeDetails;
    });

  const extraData = await fetch(
    `${pokeBaseUrl}/pokemon-species/${basicData.name.toLowerCase()}`
  )
    .then((data) => data.json())
    .then((pokemonResult) => {
      const flavorText = pokemonResult.flavor_text_entries.filter(
        (entry: any) => entry.language.name === "en"
      );

      return {
        ...basicData,
        description: `${flavorText[0].flavor_text
          .replace("\n", " ")
          .replace("\f", " ")}`,
      };
    });

  return extraData;
};

export const getPokemonList = async (limit?: number, offset?: number) => {
  let pokemonList: PokeDetails[] = [];

  const data = await fetch(
    `${pokeBaseUrl}/pokemon/?offset=${offset}&limit=${limit || 20}`
  )
    .then((data) => data.json())
    .then(async (pokemonResult) => {
      const result = pokemonResult.results;

      for (let i = 0; i < result.length; i++) {
        const pokemonResult = await getPokemon(result[i].name);

        if (pokemonResult) {
          pokemonList.push(pokemonResult);
        }
      }

      return { data: pokemonList, count: pokemonResult.count };
    });

  return data;
};
