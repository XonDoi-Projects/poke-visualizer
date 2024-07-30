import { Button, Column, Container, H3, H5, Row } from "../../LayoutComponents";
import { total, useDarkTheme, useSize } from "../..";
import { PokeCard } from "./PokeCard";
import { useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import {
  PokeRegion,
  PokeType,
  getPokemonDataList,
  pokeRegions,
  pokeTypes,
} from "@/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Options } from "@/components/LayoutComponents/Options";
import { PokeCardRound } from "./PokeCardRound";

export const Dex = () => {
  const { size } = useSize();
  const { light } = useDarkTheme();

  const [region, setRegion] = useState<PokeRegion>("All");
  const [types, setTypes] = useState<PokeType[]>(["Any"]);

  const [currentOffset, setCurrentOffset] = useState(0);

  const [limit, setLimit] = useState(20);

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

  const pokemon = useMemo(() => {
    return getPokemonDataList({
      range: { start: currentOffset, end: currentOffset + limit },
      types,
      limit,
      region,
    });
  }, [currentOffset, limit, types, total, region]);

  const scrollElement = useMemo(
    () => document.getElementById("main-content"),
    []
  );

  console.log(currentOffset);
  return (
    <Column className={`gap-2`}>
      <H5>{`You are currently viewing Pokemon #${pokemon.data[0]?.index
        .toString()
        .padStart(4, "0")} to #${pokemon.data[pokemon.data.length - 1]?.index
        .toString()
        .padStart(4, "0")}`}</H5>
      <Container className={`w-full justify-end gap-5`}>
        <Container className={`w-[150px]`}>
          <Options
            list={pokeTypes}
            selection={types}
            setSelection={(value) => {
              setTypes([value]);
              setCurrentOffset(0);
              setLimit(20);
            }}
          />
        </Container>
        <Container className={`w-[150px]`}>
          <Options
            list={pokeRegions}
            selection={region}
            setSelection={(value) => {
              setRegion(value);
              setCurrentOffset(0);
              setLimit(20);
            }}
          />
        </Container>
      </Container>

      <Container className={`grid ${gridCols} gap-10 p-5 justify-center`}>
        {pokemon?.data.map((poke) => (
          <Container
            key={poke.index}
            className={"flex items-center justify-center"}
          >
            <PokeCardRound data={poke} />
          </Container>
        ))}
      </Container>
      <Row className={`w-full justify-end gap-10`}>
        <Button
          onClick={() => {
            setCurrentOffset(currentOffset - 20);
            setLimit(20);
            scrollElement?.scrollTo({ top: 0 });
          }}
          disable={currentOffset < 20}
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
            scrollElement?.scrollTo({ top: 0 });
          }}
          disable={currentOffset + 20 >= pokemon.count}
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
