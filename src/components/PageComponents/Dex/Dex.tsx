import { Button, Column, Container, H3, H5, Row } from "../../LayoutComponents";
import { useDarkTheme, useSize } from "../..";
import { PokeCard, PokeDetails } from "./PokeCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { PokeRegion, PokeRegions, getPokemonList, pokeRegions } from "@/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Options } from "@/components/LayoutComponents/Options";

export const Dex = () => {
  const { size } = useSize();
  const { light } = useDarkTheme();

  const [pokemon, setPokemon] = useState<PokeDetails[]>([]);
  const [selection, setSelection] = useState<PokeRegion>(pokeRegions["All"]);
  const [loading, setLoading] = useState<boolean | undefined>();

  const [currentOffset, setCurrentOffset] = useState(0);

  const [limit, setLimit] = useState(20);
  const [regionalOffsetStart, setRegionalOffsetStart] = useState(0);
  const [regionalOffsetEnd, setRegionalOffsetEnd] = useState(0);

  const [total, setTotal] = useState(0);

  const numberOfCols = useMemo(() => {
    const value = size?.width ? Math.floor(size?.width / 300) : undefined;
    return !value || value > 5 ? 5 : value;
  }, [size]);

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
      const data = await getPokemonList(limit, currentOffset);

      setPokemon(data.data);
      setTotal(data.count);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [currentOffset, limit]);

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
    <Column className={`gap-2`}>
      <H5>{`You are currently viewing Pokemon #${pokemon[0]?.index
        .toString()
        .padStart(4, "0")} to #${pokemon[pokemon.length - 1]?.index
        .toString()
        .padStart(4, "0")}`}</H5>
      <Container className={`w-full justify-end`}>
        <Container className={`w-[200px]`}>
          <Options
            list={Object.keys(pokeRegions)}
            selection={selection?.name}
            setSelection={(value) => {
              setSelection(pokeRegions[value as keyof PokeRegions]);
              setCurrentOffset(
                pokeRegions[value as keyof PokeRegions].start - 1
              );
              setRegionalOffsetStart(
                pokeRegions[value as keyof PokeRegions].start - 1
              );
              setRegionalOffsetEnd(
                value === "All"
                  ? total
                  : pokeRegions[value as keyof PokeRegions].end
              );
              setLimit(20);
            }}
          />
        </Container>
      </Container>

      <Container className={`grid ${gridCols} gap-10 p-5 justify-center`}>
        {pokemon?.map((poke) => (
          <Container
            key={poke.index}
            className={"flex items-center justify-center"}
          >
            <PokeCard data={poke} />
          </Container>
        ))}
      </Container>
      <Row className={`w-full justify-end gap-10`}>
        <Button
          onClick={() => {
            setCurrentOffset(currentOffset - 20);
            setLimit(20);
          }}
          disable={currentOffset < regionalOffsetStart + 20}
        >
          <BiChevronLeft
            className={
              !light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-slate-200 group-hover:text-slate-100"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
        <Button
          onClick={() => {
            setCurrentOffset(currentOffset + 20);
            setLimit(
              !regionalOffsetEnd ||
                regionalOffsetEnd - (currentOffset + 20) > 20
                ? 20
                : regionalOffsetEnd - (currentOffset + 20)
            );
          }}
          disable={
            regionalOffsetEnd
              ? currentOffset + 20 >= regionalOffsetEnd
              : currentOffset + 20 >= total
          }
        >
          <BiChevronRight
            className={
              !light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-slate-200 group-hover:text-slate-100"
            }
            style={{
              fontSize: "20px",
            }}
          />
        </Button>
      </Row>
    </Column>
  );
};
