import {
  Button,
  Column,
  Container,
  H3,
  H5,
  Row,
  Span,
} from "@/components/LayoutComponents";
import { total, useDarkTheme } from "@/components/Providers";
import {
  EvolutionType,
  PokeDetails,
  getPokemonDataID,
  getPokemonDataName,
} from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TypeChip } from "./TypeChip";
import {
  BiChevronLeft,
  BiChevronRight,
  BiGridAlt,
  BiVolumeFull,
} from "react-icons/bi";
import { Chip } from "@/components/LayoutComponents/Chip";
import { StatCompareTool } from "./StatCompareTool";
import { EvolutionChart } from "./EvolutionChart";

export const DexEntry = () => {
  const router = useRouter();

  const { light } = useDarkTheme();

  const [evolvesFrom, setEvolvesFrom] = useState<PokeDetails>();
  const [evolvesTo, setEvolvesTo] =
    useState<
      (PokeDetails & { evolutionDetails: Omit<EvolutionType, "name"> })[]
    >();

  const currentIndex = useMemo(
    () => parseInt(router.query.id as string),
    [router.query]
  );

  const pokemon = useMemo(
    () => getPokemonDataID({ index: currentIndex }),
    [currentIndex]
  );

  useEffect(() => {
    document.title = `Pokemon PokeDex - ${pokemon?.name}`;
  }, [pokemon]);

  const dropShadow = clsx({
    "drop-shadow-no-offset-light": light,
    "drop-shadow-no-offset-dark": !light,
  });

  const pointer = clsx({
    "cursor-auto": currentIndex <= 1 || currentIndex >= total,
    "cursor-pointer": currentIndex > 1 && currentIndex < total,
  });

  const audio = useMemo(
    () => (pokemon?.cry ? new Audio(pokemon.cry) : undefined),
    [pokemon]
  );

  const loadEvolutionChain = useCallback(() => {
    if (pokemon.evolvesFrom) {
      const fromResult = getPokemonDataName({
        name: pokemon.evolvesFrom,
      });
      setEvolvesFrom(fromResult);
    } else {
      setEvolvesFrom(undefined);
    }

    if (pokemon.evolvesTo?.length) {
      let toResult: (PokeDetails & {
        evolutionDetails: Omit<EvolutionType, "name">;
      })[] = [];
      for (let i = 0; i < pokemon.evolvesTo.length; i++) {
        const { name, ...restOfDetails } = pokemon.evolvesTo[i];
        const fromResult = getPokemonDataName({
          name: name.value,
        });

        if (fromResult) {
          toResult.push({ ...fromResult, evolutionDetails: restOfDetails });
        }
      }
      setEvolvesTo(toResult);
    } else {
      setEvolvesTo(undefined);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemon) {
      loadEvolutionChain();
    }
  }, [pokemon, loadEvolutionChain]);

  return (
    pokemon && (
      <Column className={`w-full h-full p-5 items-center gap-10`}>
        <Row className={`gap-5 justify-between`}>
          <Row
            className={`relative items-center gap-2 h-[35px] w-[100px] justify-start`}
          >
            <Button
              onClick={() => router.push(`/dex/${currentIndex - 1}`)}
              className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
              disable={currentIndex <= 1}
            >
              <BiChevronLeft
                className={light ? "text-slate-200" : "text-gray-900"}
                style={{ fontSize: "20px" }}
              />
            </Button>
            <Span>Prev</Span>
          </Row>
          <Button
            onClick={() => router.push(`/dex`)}
            className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
          >
            <BiGridAlt
              className={light ? "text-slate-200" : "text-gray-900"}
              style={{ fontSize: "20px" }}
            />
          </Button>
          <Row
            className={`relative items-center gap-2 h-[35px] w-[100px] justify-end`}
          >
            <Span>Next</Span>
            <Button
              onClick={() => router.push(`/dex/${currentIndex + 1}`)}
              className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all `}
              disable={currentIndex >= total}
            >
              <BiChevronRight
                className={light ? "text-slate-200" : "text-gray-900"}
                style={{
                  fontSize: "20px",
                }}
              />
            </Button>
          </Row>
        </Row>

        <Row className={`gap-10 w-full flex-wrap`}>
          <Column className={`flex-[2] items-center justify-center gap-2`}>
            <H3 className={`mb-[7px]`}>{pokemon.name}</H3>
            <Container
              className={"relative flex-1 w-full items-center justify-center"}
            >
              <Container className={`absolute top-0 right-0 cursor-pointer`}>
                <Button
                  onClick={() => audio?.play()}
                  className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
                >
                  <BiVolumeFull
                    className={light ? "text-slate-200" : "text-gray-900"}
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </Button>
              </Container>

              <picture>
                <Image
                  src={pokemon.imageLinkHighRes || pokemon.imageLink}
                  alt="Pokemon Image"
                  sizes="100vw"
                  width="0"
                  height="0"
                  loading="lazy"
                  fetchPriority="low"
                  className={`w-auto h-[250px] ${dropShadow}`}
                />
              </picture>
            </Container>
          </Column>

          <Column className={`flex-1 gap-5 min-w-[200px]`}>
            <Row className={`justify-between`}>
              <Column className={`w-full gap-2`}>
                <H5>Type</H5>
                <Row className={`gap-2`}>
                  {pokemon.types?.map((t) => (
                    <TypeChip key={t} value={t} />
                  ))}
                </Row>
              </Column>
            </Row>

            <Column className={`w-full gap-2`}>
              <H5>Description</H5>
              <Span>{pokemon.description}</Span>
            </Column>
            <Column className={`w-full gap-2`}>
              <H5>Forms</H5>
              <Row className={`gap-2 flex-wrap`}>
                {pokemon.forms && pokemon.forms?.length > 1 ? (
                  pokemon.forms
                    .slice(1, pokemon.forms.length)
                    .map((f) => (
                      <Chip
                        key={f}
                        value={f}
                        className={`${
                          light ? "bg-blue-950" : "bg-yellow-500"
                        } `}
                        contrast={!light}
                      />
                    ))
                ) : (
                  <Span>No other forms.</Span>
                )}
              </Row>
            </Column>
          </Column>

          <Column className={`flex-1 gap-5 min-w-[200px]`}>
            <Column className={`w-full gap-2`}>
              <H5>Abilities</H5>
              <Row className={`gap-2 flex-wrap`}>
                {pokemon.abilities?.map((a) => (
                  <Chip
                    key={a}
                    value={a}
                    className={`${light ? "bg-blue-950" : "bg-yellow-500"} `}
                    contrast={!light}
                  />
                ))}
              </Row>
            </Column>
            <Column className={`w-full gap-2`}>
              <H5>Stats</H5>
              <Column className={`gap-1`}>
                {pokemon.stats?.map((s) => (
                  <Row key={s.name}>
                    <Container className={`flex-1`}>
                      <Span>{s.name.toLocaleUpperCase()}</Span>
                    </Container>
                    <Container className={`flex-shrink-1`}>
                      <Span>{s.value.toString()}</Span>
                    </Container>
                  </Row>
                ))}
              </Column>
            </Column>
          </Column>

          <Column className={`flex-1 gap-5 min-w-[200px]`}>
            <Column className={`w-full gap-2`}>
              <H5>Other Details</H5>
              <Row className={`gap-2 flex-wrap`}>
                <Chip
                  value={"Baby"}
                  className={`${light ? "bg-blue-950" : "bg-yellow-500"} ${
                    !pokemon.isBaby ? "opacity-[0.3]" : "opacity-1"
                  }`}
                  contrast={!light}
                />
                <Chip
                  value={"Legendary"}
                  className={`${light ? "bg-blue-950" : "bg-yellow-500"}  ${
                    !pokemon.isLegendary ? "opacity-[0.3]" : "opacity-1"
                  }`}
                  contrast={!light}
                />
                <Chip
                  value={"Mythical"}
                  className={`${light ? "bg-blue-950" : "bg-yellow-500"}  ${
                    !pokemon.isMythical ? "opacity-[0.3]" : "opacity-1"
                  }`}
                  contrast={!light}
                />
              </Row>
              <Row className={`gap-5`}>
                <Span>Height: </Span>
                <Span>{pokemon.height / 10}m</Span>
              </Row>
              <Row className={`gap-5`}>
                <Span>Weight: </Span>
                <Span>{pokemon.weight / 10}kg</Span>
              </Row>
              <Row className={`gap-5`}>
                <Span>Capture Rate: </Span>
                <Span>{pokemon.captureRate}%</Span>
              </Row>
              <Row className={`gap-5`}>
                <Span>Gender Rate: </Span>
                <Span>{pokemon.genderRate || "No Gender"}</Span>
              </Row>
              <Row className={`gap-5`}>
                <Span>Growth Rate: </Span>
                <Span>{pokemon.growthRate}</Span>
              </Row>
              <Row className={`gap-5`}>
                <Span>Base Happiness: </Span>
                <Span>{pokemon.baseHappiness}</Span>
              </Row>
              <Row className={`gap-5`}>
                <Span>Shape: </Span>
                <Span>{pokemon.shape}</Span>
              </Row>
            </Column>
          </Column>
        </Row>
        <Row className={`flex-1 w-full gap-5 flex-wrap`}>
          <Column className={`flex-1`}>
            <StatCompareTool pokemon={pokemon} />
          </Column>

          {(evolvesFrom || evolvesTo?.length) && (
            <Column className={`flex-1`}>
              <EvolutionChart evolvesFrom={evolvesFrom} evolvesTo={evolvesTo} />
            </Column>
          )}
        </Row>
      </Column>
    )
  );
};
