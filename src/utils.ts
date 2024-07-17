import { pokeBaseUrl } from "./components";
import { PokeDetails } from "./components/PageComponents/Dex/PokeCard";

export const getPokemon = async (name: string) => {
  let pokeDetails: PokeDetails | undefined;
  const basicData = await fetch(`${pokeBaseUrl}/pokemon/${name}`)
    .then((data) => data.json())
    .then((pokemonResult) => {
      pokeDetails = {
        name: (pokemonResult.name as string).toUpperCase(),
        index: pokemonResult.id,
        imageLink: pokemonResult.sprites.front_default,
        types: pokemonResult.types.map((type: any) => type.type.name),
      };

      return pokeDetails;
    });

  const extraData = await fetch(`${pokeBaseUrl}/pokemon-species/${name}`)
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

export const getPokemonList = async (limit?: number) => {
  let pokemonList: PokeDetails[] = [];

  const data = await fetch(`${pokeBaseUrl}/pokemon/?limit=${limit || 20}`)
    .then((data) => data.json())
    .then(async (pokemonResult) => {
      const result = pokemonResult.results;

      for (let i = 0; i < result.length; i++) {
        const pokemonResult = await getPokemon(result[i].name);

        if (pokemonResult) {
          pokemonList.push(pokemonResult);
        }
      }

      return pokemonList;
    });

  return data;
};
