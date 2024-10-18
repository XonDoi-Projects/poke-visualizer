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
import { BiChevronLeft, BiChevronRight, BiSlider, BiX } from "react-icons/bi";
import { Selector } from "@/components/LayoutComponents/Selector";
import { PokeCardRound } from "./PokeCardRound";
import { useQuery } from "@tanstack/react-query";

export const Dex = () => {
  const { size } = useSize();
  const { light } = useDarkTheme();
  const { isLocallyLoaded } = useData();

  const [showFilter, setShowFilter] = useState(false);
  const [region, setRegion] = useState<PokeRegion>("all");
  const [types, setTypes] = useState<PokeType[]>(["all"]);
  const [form, setForm] = useState<string>("base");

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
        types: types.includes("all") ? undefined : types,
        limit,
        region: region === "all" ? undefined : region,
        form: form,
      }),
    });

    return await data.json();
  }, [currentOffset, form, limit, region, types]);

  const { data, isLoading } = useQuery<{
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
      form,
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
        <H2>Welcome to PokePlan</H2>
        <H5>{`You are currently viewing Pokemon #${data.data[0].index
          .toString()
          .padStart(4, "0")} to #${data.data[data.data?.length - 1].index
          .toString()
          .padStart(4, "0")}`}</H5>

        <Column className={`items-end gap-5`}>
          {!showFilter ? (
            <Button
              onClick={() => setShowFilter(!showFilter)}
              className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
              type="text"
            >
              <BiSlider
                className={
                  light
                    ? "text-blue-900 group-hover:text-blue-800"
                    : "text-slate-300 group-hover:text-slate-200"
                }
                style={{ fontSize: "24px" }}
              />
            </Button>
          ) : (
            <Button
              onClick={() => setShowFilter(!showFilter)}
              className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
              type="contained"
            >
              <BiX
                className={
                  !light
                    ? "text-blue-900 group-hover:text-blue-800"
                    : "text-slate-300 group-hover:text-slate-200"
                }
                style={{ fontSize: "24px" }}
              />
            </Button>
          )}
          {showFilter ? (
            <Row className={`gap-5 flex-wrap`}>
              <Container className={`flex-1 min-w-[150px]`}>
                <Selector
                  label="Base"
                  list={["base", "variant"].map(
                    (p) => p[0].toUpperCase() + p.slice(1)
                  )}
                  options={[form[0].toUpperCase() + form.slice(1)]}
                  setOptions={(value: string[]) => {
                    setForm(value[0].toLowerCase() as string);
                    setCurrentOffset(0);
                    setLimit(20);
                  }}
                />
              </Container>
              <Container className={`flex-1 min-w-[150px]`}>
                <Selector
                  label="Type"
                  list={pokeTypes.map((p) => p[0].toUpperCase() + p.slice(1))}
                  options={types.map((t) => t[0].toUpperCase() + t.slice(1))}
                  setOptions={(value: PokeType[]) => {
                    setTypes((prev) => [
                      ...prev,
                      ...value.map((v) => v.toLowerCase() as PokeType),
                    ]);
                    setCurrentOffset(0);
                    setLimit(20);
                  }}
                  deleteOptions={(value: PokeType[]) => {
                    if (!value.length) {
                      setTypes(["all"]);
                    } else {
                      setTypes(value.map((v) => v.toLowerCase() as PokeType));
                    }
                  }}
                  isMultipleOption
                  ignoreOptionsWhenMultiple={["all"].map(
                    (p) => p[0].toUpperCase() + p.slice(1)
                  )}
                  disable={types?.length >= 2}
                />
              </Container>
              <Container className={`flex-1 min-w-[150px]`}>
                <Selector
                  label="Region"
                  list={pokeRegions.map((p) => p[0].toUpperCase() + p.slice(1))}
                  options={[region[0].toUpperCase() + region.slice(1)]}
                  setOptions={(value: PokeRegion[]) => {
                    setRegion(value[0].toLowerCase() as PokeRegion);
                    setCurrentOffset(0);
                    setLimit(20);
                  }}
                />
              </Container>
            </Row>
          ) : null}
        </Column>

        <Container className={`grid ${gridCols} gap-10 p-5 justify-center`}>
          {data?.data.map((poke) => (
            <Container
              key={poke.index}
              className={"flex items-center justify-center"}
            >
              <PokeCardRound data={poke} form={form} />
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
