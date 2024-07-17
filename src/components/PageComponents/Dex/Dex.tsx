import { Button, Column, Container, H3 } from "../../LayoutComponents";
import { useSize } from "../..";
import { PokeCard, PokeDetails } from "./PokeCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { getPokemonList } from "@/utils";

export const Dex = () => {
  const { size } = useSize();

  const [pokemon, setPokemon] = useState<PokeDetails[]>([]);
  const [loading, setLoading] = useState<boolean | undefined>();

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

  const getPokemonListData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPokemonList();

      setPokemon(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getPokemonListData();
  }, [getPokemonListData]);

  return loading ? (
    <Column className={`items-center justify-center h-full gap-5`}>
      <H3>Loading . . .</H3>
    </Column>
  ) : loading === false && !pokemon.length ? (
    <Column className={`items-center justify-center h-full gap-5`}>
      <H3>Failed to load Pokemon</H3>
      <Button onClick={getPokemonListData}>Retry</Button>
    </Column>
  ) : (
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
