import {
  Button,
  Column,
  Container,
  Drawer,
  H3,
  H5,
  InfoButton,
  LabelWithValue,
  Row,
  Small,
  Span,
} from "@/components/LayoutComponents";
import { total, useDarkTheme, useSize } from "@/components/Providers";
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
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import { Chip } from "@/components/LayoutComponents/Chip";
import { StatCompareTool } from "./StatCompareTool/StatCompareTool";
import { EvolutionChart } from "./EvolutionChart";
import { complexionData } from "@/pokemonTypes";

export const DexEntry = () => {
  const router = useRouter();

  const { light } = useDarkTheme();
  const { mobile } = useSize();

  const [showStats, setShowStats] = useState(false);

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

  const audio = useMemo(() => {
    let audio = pokemon?.cry ? new Audio(pokemon.cry) : undefined;

    if (audio) {
      audio.volume = 0.05;
    }
    return audio;
  }, [pokemon]);

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

  const receivesDouble = useMemo(() => {
    if (pokemon?.types && pokemon.types.length > 1) {
      return complexionData[pokemon.types[0]].secondary[pokemon.types[1]]
        .complexion.double;
    } else if (pokemon?.types) {
      return complexionData[pokemon.types[0]].complexion.double;
    }
    return [];
  }, [pokemon?.types]);

  const receivesQuadruple = useMemo(() => {
    if (pokemon?.types && pokemon.types.length > 1) {
      return complexionData[pokemon.types[0]].secondary[pokemon.types[1]]
        .complexion.quadruple;
    } else if (pokemon?.types) {
      return complexionData[pokemon.types[0]].complexion.quadruple;
    }
    return [];
  }, [pokemon?.types]);

  const receivesHalf = useMemo(() => {
    if (pokemon?.types && pokemon.types.length > 1) {
      return complexionData[pokemon.types[0]].secondary[pokemon.types[1]]
        .complexion.half;
    } else if (pokemon?.types) {
      return complexionData[pokemon.types[0]].complexion.half;
    }
    return [];
  }, [pokemon?.types]);

  const receivesQuarter = useMemo(() => {
    if (pokemon?.types && pokemon.types.length > 1) {
      return complexionData[pokemon.types[0]].secondary[pokemon.types[1]]
        .complexion.quarter;
    } else if (pokemon?.types) {
      return complexionData[pokemon.types[0]].complexion.quarter;
    }
    return [];
  }, [pokemon?.types]);

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

        <Row className={`gap-10 w-full flex-wrap gap-10`}>
          <Column className={`flex-1 gap-10`}>
            <Column className={`flex-1 items-center justify-center gap-2`}>
              <H3 className={`mb-[7px]`}>{pokemon.name}</H3>
              <Container
                className={"relative flex-1 w-full items-center justify-center"}
              >
                <Row
                  className={`gap-2 absolute top-0 right-0 cursor-pointer z-10`}
                >
                  <Container>
                    <Button
                      onClick={() => setShowStats(true)}
                      className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
                    >
                      <Small
                        className={light ? "text-slate-200" : "text-gray-900"}
                      >
                        VS
                      </Small>
                    </Button>
                  </Container>
                  <Container>
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
                </Row>

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
            {(evolvesFrom || evolvesTo?.length) && (
              <Column className={`flex-1`}>
                <EvolutionChart
                  evolvesFrom={evolvesFrom}
                  evolvesTo={evolvesTo}
                />
              </Column>
            )}
          </Column>
          <Column className={`flex-[2] gap-10 h-fit`}>
            <Row
              className={`flex-1 gap-10 w-full flex-wrap ${
                mobile ? "" : "min-h-[300px]"
              } `}
            >
              <Column className={`flex-1 gap-5 min-w-[200px]`}>
                <Column className={`w-full gap-2`}>
                  <H5>Type</H5>
                  <Row className={`gap-2`}>
                    {pokemon.types?.map((t) => (
                      <TypeChip key={t} value={t} />
                    ))}
                  </Row>
                </Column>

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
                  <Row className={`gap-2`}>
                    <H5>Strong Against</H5>
                    <InfoButton
                      details={
                        <Column className={`w-[150px] gap-2`}>
                          <Row className={`flex-1 gap-2`}>
                            <FaAngleUp
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            />
                            <Small
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            >
                              Receives half damage from this type
                            </Small>
                          </Row>
                          <Row className={`flex-1 gap-2`}>
                            <FaAngleDoubleUp
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            />
                            <Small
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            >
                              Receives quarter damage from this type
                            </Small>
                          </Row>
                        </Column>
                      }
                    />
                  </Row>

                  <Row className={`gap-2 flex-wrap`}>
                    {receivesHalf.length || receivesQuarter.length ? (
                      receivesHalf
                        .map((t) => (
                          <TypeChip
                            key={t.toString()}
                            value={t.toString()}
                            type="half"
                          />
                        ))
                        .concat(
                          receivesQuarter.map((t) => (
                            <TypeChip
                              key={t.toString()}
                              value={t.toString()}
                              type="quarter"
                            />
                          ))
                        )
                    ) : (
                      <Span>This pokemon has no direct strengths</Span>
                    )}
                  </Row>
                </Column>
                <Column className={`w-full gap-2`}>
                  <Row className={`gap-2`}>
                    <H5>Weak Against</H5>
                    <InfoButton
                      details={
                        <Column className={`w-[150px] gap-2`}>
                          <Row className={`flex-1 gap-2`}>
                            <FaAngleDown
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            />
                            <Small
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            >
                              Receives double damage from this type
                            </Small>
                          </Row>
                          <Row className={`flex-1 gap-2`}>
                            <FaAngleDoubleDown
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            />
                            <Small
                              className={` ${
                                light ? "text-blue-900" : "text-slate-300"
                              } `}
                            >
                              Receives quadruple damage from this type
                            </Small>
                          </Row>
                        </Column>
                      }
                    />
                  </Row>
                  <Row className={`gap-2 flex-wrap`}>
                    {receivesDouble.length || receivesQuadruple.length ? (
                      receivesDouble
                        .map((t) => (
                          <TypeChip
                            key={t.toString()}
                            value={t.toString()}
                            type="double"
                          />
                        ))
                        .concat(
                          receivesQuadruple.map((t) => (
                            <TypeChip
                              key={t.toString()}
                              value={t.toString()}
                              type="quadruple"
                            />
                          ))
                        )
                    ) : (
                      <Span>This pokemon has no direct weaknesses</Span>
                    )}
                  </Row>
                </Column>
              </Column>
            </Row>
            <Row
              className={`flex-1 gap-10 w-full flex-wrap ${
                mobile ? "" : "min-h-[300px]"
              }`}
            >
              <Column className={`flex-1 gap-5 min-w-[200px]`}>
                <Column className={`w-full gap-2`}>
                  <H5>Abilities</H5>
                  <Row className={`gap-2 flex-wrap`}>
                    {pokemon.abilities?.map((a) => (
                      <Chip
                        key={a}
                        value={a}
                        className={`${
                          light ? "bg-blue-950" : "bg-yellow-500"
                        } `}
                        contrast={!light}
                      />
                    ))}
                  </Row>
                </Column>
                <Column className={`w-full gap-2`}>
                  <H5>Stats</H5>
                  <Column className={`gap-1`}>
                    {pokemon.stats?.map((s) => (
                      <LabelWithValue
                        key={s.name}
                        label={s.name}
                        value={s.value.toString()}
                      />
                    ))}
                  </Column>
                </Column>
              </Column>
              <Column className={`flex-1 gap-5 min-w-[200px]`}>
                <Column className={`w-full gap-2`}>
                  <H5>Special Trait</H5>
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
                </Column>
                <Column className={`w-full gap-2`}>
                  <H5>Other Details</H5>
                  <Column className={`gap-1`}>
                    <LabelWithValue
                      label={"Height"}
                      value={(pokemon.height / 10).toString() + "m"}
                    />
                    <LabelWithValue
                      label={"Weight"}
                      value={(pokemon.weight / 10).toString() + "kg"}
                    />
                    <LabelWithValue
                      label={"Capture Rate"}
                      value={pokemon.captureRate + "%"}
                    />
                    <LabelWithValue
                      label={"Gender Rate"}
                      value={pokemon.genderRate || "No Gender"}
                    />
                    <LabelWithValue
                      label={"Growth Rate"}
                      value={pokemon.growthRate}
                    />
                    <LabelWithValue
                      label={"Base Happiness"}
                      value={pokemon.baseHappiness}
                    />
                    <LabelWithValue label={"Shape"} value={pokemon.shape} />
                  </Column>
                </Column>
              </Column>
            </Row>
          </Column>
        </Row>
        <Drawer show={showStats} onClose={() => setShowStats(false)}>
          <StatCompareTool pokemon={pokemon} />
        </Drawer>
      </Column>
    )
  );
};
