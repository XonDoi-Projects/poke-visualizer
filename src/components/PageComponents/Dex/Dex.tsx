import {
  Button,
  Column,
  Container,
  H2,
  H5,
  Row,
  Loading,
} from "../../LayoutComponents";
import { total, useDarkTheme, useData, useSize } from "../..";
import { useCallback, useMemo, useState } from "react";
import { clsx } from "clsx";
import {
  PokeDetails,
  PokeRegion,
  PokeType,
  pokeRegions,
  pokeTypes,
} from "@/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Selector } from "@/components/LayoutComponents/Selector";
import { PokeCardRound } from "./PokeCardRound";
import { useQuery } from "@tanstack/react-query";

export const Dex = () => {
  const { size } = useSize();
  const { light } = useDarkTheme();
  const { isLocallyLoaded } = useData();

  const [region, setRegion] = useState<PokeRegion>("any");
  const [types, setTypes] = useState<PokeType[]>(["any"]);

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

  const scrollElement = useMemo(
    () =>
      typeof window !== "undefined"
        ? document?.getElementById("main-content")
        : undefined,
    []
  );

  const getPokemonByFilter = useCallback(async () => {
    const data = await fetch("/api/pokemon/get-many", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        range: { start: currentOffset, end: currentOffset + limit },
        types: types.includes("any") ? undefined : types,
        limit,
        region: region === "any" ? undefined : region,
      }),
    });

    return await data.json();
  }, [currentOffset, limit, region, types]);

  const { data, error, isLoading } = useQuery<{
    data: PokeDetails[] | undefined;
    count: number | undefined;
  }>({
    queryKey: [
      "getPokemonByFilter",
      currentOffset,
      limit,
      region,
      types,
      isLocallyLoaded,
    ],
    queryFn: getPokemonByFilter,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  return isLoading ? (
    <Column className={`w-full h-full items-center justify-center`}>
      <Loading />
      <H5>Catching Them All!</H5>
    </Column>
  ) : (
    data?.data && (
      <Column className={`gap-5`}>
        <H2>Welcome to PokeVis</H2>
        <H5>{`You are currently viewing Pokemon #${data.data[0].index
          .toString()
          .padStart(4, "0")} to #${data.data[data.data?.length - 1].index
          .toString()
          .padStart(4, "0")}`}</H5>
        <Container className={`w-full justify-end gap-5`}>
          <Container className={`w-[150px]`}>
            <Selector
              label="Type"
              list={pokeTypes.map((p) => p[0].toUpperCase() + p.slice(1))}
              option={types.map((t) => t[0].toUpperCase() + t.slice(1))}
              setOption={(value: PokeType) => {
                setTypes([value.toLowerCase() as PokeType]);
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
              setOption={(value: PokeRegion) => {
                setRegion(value.toLowerCase() as PokeRegion);
                setCurrentOffset(0);
                setLimit(20);
              }}
            />
          </Container>
        </Container>

        <Container className={`grid ${gridCols} gap-10 p-5 justify-center`}>
          {data?.data.map((poke) => (
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
                  ? "text-blue-900 group-hover:text-blue-800"
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
            disable={currentOffset + 20 >= (data?.count || total)}
          >
            <BiChevronRight
              className={
                !light
                  ? "text-blue-900 group-hover:text-blue-800"
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
