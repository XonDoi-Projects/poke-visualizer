import { Button, Column, Container, H2, H5, Row } from "../../LayoutComponents";
import { total, useDarkTheme, useSize } from "../..";
import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import {
  PokeDetails,
  PokeRegion,
  PokeType,
  getPokemonDataList,
  pokeRegions,
  pokeTypes,
} from "@/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Selector } from "@/components/LayoutComponents/Selector";
import { PokeCardRound } from "./PokeCardRound";

export const Dex = () => {
  const { size } = useSize();
  const { light } = useDarkTheme();

  const [region, setRegion] = useState<PokeRegion>("all");
  const [types, setTypes] = useState<PokeType[]>(["any"]);
  const [pokemon, setPokemon] = useState<{
    data: PokeDetails[] | undefined;
    count: number | undefined;
  }>();

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

  useEffect(() => {
    const getData = async () => {
      const data = await getPokemonDataList({
        range: { start: currentOffset, end: currentOffset + limit },
        types,
        limit,
        region,
      });

      setPokemon(data);
    };
    getData();
  }, [currentOffset, limit, types, region]);

  const scrollElement = useMemo(
    () => document.getElementById("main-content"),
    []
  );

  return (
    pokemon?.data && (
      <Column className={`gap-5`}>
        <H2>Welcome to PokeVis</H2>
        <H5>{`You are currently viewing Pokemon #${pokemon.data[0].index
          .toString()
          .padStart(4, "0")} to #${pokemon.data[pokemon.data?.length - 1].index
          .toString()
          .padStart(4, "0")}`}</H5>
        <Container className={`w-full justify-end gap-5`}>
          <Container className={`w-[150px]`}>
            <Selector
              label="Type"
              list={pokeTypes.map((p) => p[0].toUpperCase() + p.slice(1))}
              option={types.map((t) => t[0].toUpperCase() + t.slice(1))}
              setOption={(value) => {
                setTypes([value]);
                setCurrentOffset(0);
                setLimit(20);
              }}
            />
          </Container>
          <Container className={`w-[150px]`}>
            <Selector
              label="Region"
              list={pokeRegions.map((p) => p[0].toUpperCase() + p.slice(1))}
              option={region[0].toUpperCase() + region.slice(1)}
              setOption={(value) => {
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
            disable={currentOffset + 20 >= (pokemon?.count || total)}
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
    )
  );
};
