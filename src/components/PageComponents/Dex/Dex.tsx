import { Container } from "../../LayoutComponents";
import { pokeBaseUrl, useSize } from "../..";
import { PokeCard, PokeDetails } from "./PokeCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";

export const Dex = () => {
  const { mobile, size } = useSize();

  const [pokemon, setPokemon] = useState<PokeDetails[]>([]);

  const numberOfCols = useMemo(
    () => (size?.width ? Math.floor(size?.width / 300) : undefined),
    [size]
  );

  const gridCols = clsx({
    "grid-cols-[repeat(1,minmax(200px,300px))]": numberOfCols === 1,
    "grid-cols-[repeat(2,minmax(200px,300px))]": numberOfCols === 2,
    "grid-cols-[repeat(3,minmax(200px,300px))]": numberOfCols === 3,
    "grid-cols-[repeat(4,minmax(200px,300px))]": numberOfCols === 4,
    "grid-cols-[repeat(5,minmax(200px,300px))]": numberOfCols === 5,
    "grid-cols-[repeat(6,minmax(200px,300px))]": numberOfCols === 6,
    "grid-cols-[repeat(7,minmax(200px,300px))]": numberOfCols === 7,
    "grid-cols-[repeat(8,minmax(200px,300px))]": numberOfCols === 8,
  });

  const getPokemon = useCallback(async (name: string) => {
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
  }, []);

  const getPokemonList = useCallback(async () => {
    let pokemonList: PokeDetails[] = [];
    const data = await fetch(`${pokeBaseUrl}/pokemon/?limit=20`)
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

    setPokemon((prev) => [...prev, ...data]);
  }, [getPokemon]);

  useEffect(() => {
    getPokemonList();
  }, [getPokemonList]);

  return (
    <Container className={`grid ${gridCols} gap-10 p-10`}>
      {pokemon?.map((poke) => (
        <Container
          key={poke.index}
          className={"flex items-center justify-center"}
        >
          <PokeCard data={poke} />
        </Container>
      ))}
    </Container>
  );
};
