import {
  Button,
  Column,
  H5,
  Row,
  Small,
  Span,
  Switch,
  Table,
} from "@/components/LayoutComponents";
import { PokeDetails, PokeStat, pokeTypes } from "@/utils";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { BuilderStatistics } from "./BuilderStatistics";
import { useDarkTheme } from "@/components/Providers";
import { complexionData, TypeWeakness } from "@/pokemonTypes";
import { TypeChip } from "../Dex/TypeChip";
import { PokeDetailsWithSelectedMoves } from "./Builder";
import { ClassChip } from "../Dex";

type SuggestedStats = {
  speedValue?: number;
  speedValueDetails?: string;
  conclusion?: string;
  teamStats?: { name: string; stats: PokeStat[] }[];
  teamStatsAverage?: PokeStat[];
  typeComposition?: {
    resistances?: { name: TypeWeakness; totalCount: number }[];
    weaknesses?: { name: TypeWeakness; totalCount: number }[];
    stab?: { name: TypeWeakness; totalCount: number }[];
    moves?: { name: TypeWeakness; totalCount: number }[];
  };
};

export interface SuggesterProps {
  pokemons: PokeDetailsWithSelectedMoves[];
  setShowTypes: (value: boolean) => void;
  showTypes: boolean;
}

export const Suggester: FunctionComponent<SuggesterProps> = ({
  pokemons,
  setShowTypes,
  showTypes,
}) => {
  const { light } = useDarkTheme();
  const [stats, setStats] = useState<SuggestedStats>();

  const [showAverage, setShowAverage] = useState(false);

  const getTeamStatsAverage = (
    statsObject: ({ [key in string]: number } | undefined)[]
  ) => {
    return statsObject.reduce((array: PokeStat[], item, currentIndex) => {
      if (array.find((a) => a.name === "speed") && item) {
        let index = array.findIndex((a) => a.name === "speed");

        array[index].value = array[index].value + item["speed"];
      } else if (item) {
        array.push({ name: "speed", value: item["speed"] });
      }

      if (array.find((a) => a.name === "attack") && item) {
        let index = array.findIndex((a) => a.name === "attack");

        array[index].value = array[index].value + item["attack"];
      } else if (item) {
        array.push({ name: "attack", value: item["attack"] });
      }

      if (array.find((a) => a.name === "defense") && item) {
        let index = array.findIndex((a) => a.name === "defense");

        array[index].value = array[index].value + item["defense"];
      } else if (item) {
        array.push({ name: "defense", value: item["defense"] });
      }

      if (array.find((a) => a.name === "hp") && item) {
        let index = array.findIndex((a) => a.name === "hp");

        array[index].value = array[index].value + item["hp"];
      } else if (item) {
        array.push({ name: "hp", value: item["hp"] });
      }

      if (array.find((a) => a.name === "special-attack") && item) {
        let index = array.findIndex((a) => a.name === "special-attack");

        array[index].value = array[index].value + item["special-attack"];
      } else if (item) {
        array.push({
          name: "special-attack",
          value: item["special-attack"],
        });
      }

      if (array.find((a) => a.name === "special-defense") && item) {
        let index = array.findIndex((a) => a.name === "special-defense");

        array[index].value = array[index].value + item["special-defense"];
      } else if (item) {
        array.push({
          name: "special-defense",
          value: item["special-defense"],
        });
      }

      if (currentIndex + 1 === statsObject.length) {
        array = array.map((a) => ({
          ...a,
          value: a.value / (currentIndex + 1),
        }));
      }

      return array;
    }, []);
  };

  const getTypes = useCallback(() => {
    let types: { name: TypeWeakness; totalCount: number }[] = [
      {
        name: "normal",
        totalCount: 0,
      },
      {
        name: "grass",
        totalCount: 0,
      },
      {
        name: "fire",
        totalCount: 0,
      },
      {
        name: "water",
        totalCount: 0,
      },
      {
        name: "electric",
        totalCount: 0,
      },
      {
        name: "fighting",
        totalCount: 0,
      },
      {
        name: "rock",
        totalCount: 0,
      },
      {
        name: "ground",
        totalCount: 0,
      },
      {
        name: "bug",
        totalCount: 0,
      },
      {
        name: "steel",
        totalCount: 0,
      },
      {
        name: "dark",
        totalCount: 0,
      },
      {
        name: "ghost",
        totalCount: 0,
      },
      {
        name: "ice",
        totalCount: 0,
      },
      {
        name: "fairy",
        totalCount: 0,
      },
      {
        name: "psychic",
        totalCount: 0,
      },
      {
        name: "dragon",
        totalCount: 0,
      },
      {
        name: "flying",
        totalCount: 0,
      },
      {
        name: "poison",
        totalCount: 0,
      },
    ];

    let typeComposition = {
      resistances: types.map((t) => ({ ...t })),
      weaknesses: types.map((t) => ({ ...t })),
      stab: types.map((t) => ({ ...t })),
      moves: types.map((t) => ({ ...t })),
    };

    const typesList = pokemons.flatMap((p) => p.types?.map((t) => t));

    pokemons.forEach((list) => {
      if (list) {
        let receivesHalf: TypeWeakness[] = [];
        let receivesQuarter: TypeWeakness[] = [];
        let receivesDouble: TypeWeakness[] = [];
        let receivesQuadruple: TypeWeakness[] = [];

        if (list.types && list.types?.length > 1) {
          receivesHalf =
            complexionData[list.types[0]].secondary[list.types[1]].complexion
              .half;
          receivesQuarter =
            complexionData[list.types[0]].secondary[list.types[1]].complexion
              .quarter;
        } else if (list.types) {
          receivesHalf = complexionData[list.types[0]].complexion.half;
          receivesQuarter = complexionData[list.types[0]].complexion.quarter;
        }

        receivesHalf.forEach((h) => {
          const index = typeComposition.resistances.findIndex(
            (f) => f.name === h
          );

          if (index >= 0) {
            typeComposition.resistances[index].totalCount += 1;
          }
        });
        receivesQuarter.forEach((h) => {
          const index = typeComposition.resistances.findIndex(
            (f) => f.name === h
          );

          if (index >= 0) {
            typeComposition.resistances[index].totalCount += 1;
          }
        });

        if (list.types && list.types?.length > 1) {
          receivesDouble =
            complexionData[list.types[0]].secondary[list.types[1]].complexion
              .double;
          receivesQuadruple =
            complexionData[list.types[0]].secondary[list.types[1]].complexion
              .quadruple;
        } else if (list.types) {
          receivesDouble = complexionData[list.types[0]].complexion.double;
          receivesQuadruple =
            complexionData[list.types[0]].complexion.quadruple;
        }

        receivesDouble.forEach((h) => {
          const index = typeComposition.weaknesses.findIndex(
            (f) => f.name === h
          );

          if (index >= 0) {
            typeComposition.weaknesses[index].totalCount += 1;
          }
        });
        receivesQuadruple.forEach((h) => {
          const index = typeComposition.weaknesses.findIndex(
            (f) => f.name === h
          );

          if (index >= 0) {
            typeComposition.weaknesses[index].totalCount += 1;
          }
        });
      }
    });

    const moveList = pokemons.flatMap((p) => p.selectedMoves);

    moveList.forEach((move) => {
      const index = typeComposition.moves.findIndex(
        (m) => m.name === move?.type
      );

      if (index >= 0) {
        typeComposition.moves[index].totalCount += 1;
      }
    });

    pokemons.forEach((pokemon) => {
      pokemon.selectedMoves?.forEach((move) => {
        const index = typeComposition.stab.findIndex(
          (m) => m.name === move.type
        );
        if (move.type && pokemon.types?.includes(move.type)) {
          typeComposition.stab[index].totalCount += 1;
        }
      });
    });

    return typeComposition;
  }, [pokemons]);

  const getStats = useCallback(() => {
    const statsObject: ({ [key in string]: number } | undefined)[] =
      pokemons.map((p) =>
        p.stats?.reduce(
          (obj, item) => Object.assign(obj, { [item.name]: item.value }),
          {}
        )
      );

    const firstPokemonStats = statsObject[0];

    let details: SuggestedStats = {};

    if (firstPokemonStats) {
      if (firstPokemonStats["speed"] >= 93) {
        details = {
          speedValue: firstPokemonStats["speed"],
          speedValueDetails: `above average (${93})`,
          conclusion: "You are likely to attack first",
        };
      } else {
        details = {
          speedValue: firstPokemonStats["speed"],
          speedValueDetails: `below average (${93})`,
          conclusion: "You are likely to be attacked first",
        };
      }
    }

    details = {
      ...details,
      teamStats: pokemons.map((p) => ({ name: p.name, stats: p.stats || [] })),
      teamStatsAverage: getTeamStatsAverage(statsObject),
      typeComposition: getTypes(),
    };

    setStats(details);
  }, [getTypes, pokemons]);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <Column className={`gap-3 flex-1 w-full`}>
      {!showTypes ? (
        <>
          <Column className={`gap-2`}>
            <Span>{`Your first pokemon has a speed of ${stats?.speedValue}, which is ${stats?.speedValueDetails}. ${stats?.conclusion}.`}</Span>
          </Column>
          <Column className={`gap-2`}>
            <Row className={`w-full justify-end`}>
              <Switch
                value={showAverage ? "Show All" : "Show Average"}
                onClick={() => setShowAverage(!showAverage)}
                switchPosition={"right"}
              />
            </Row>

            <BuilderStatistics
              teamStats={stats?.teamStats || []}
              teamStatsAverage={stats?.teamStatsAverage}
              showAverage={showAverage}
            />
          </Column>
        </>
      ) : (
        <Column className={`gap-2 flex-1 w-full`}>
          <Table
            headers={[
              {
                name: "TYPE",
                keyId: "id",
                expandable: false,
                minWidth: "80px",
              },
              {
                name: "RESIST",
                keyId: "resistances",
                expandable: false,
                minWidth: "80px",
              },
              {
                name: "WEAK",
                keyId: "weaknesses",
                expandable: false,
                minWidth: "80px",
              },
              {
                name: "STAB",
                keyId: "stab",
                expandable: false,
                minWidth: "80px",
              },
              {
                name: "MOVE",
                keyId: "moves",
                expandable: true,
                minWidth: "80px",
                subHeaders: [
                  {
                    keyId: "pokemonName",
                    name: "Pokemon",
                    minWidth: "100px",
                  },
                  {
                    keyId: "moveName",
                    name: "Move",
                    minWidth: "170px",
                  },
                  {
                    keyId: "damageClass",
                    name: "Class",
                    minWidth: "100px",
                  },
                ],
              },
            ]}
            rows={pokeTypes
              .filter((t) => t !== "all")
              .map((t) => ({
                id: <TypeChip value={t} />,
                resistances: stats?.typeComposition?.resistances?.find(
                  (r) => r.name === t
                )?.totalCount,
                weaknesses: stats?.typeComposition?.weaknesses?.find(
                  (r) => r.name === t
                )?.totalCount,
                stab: stats?.typeComposition?.stab?.find((r) => r.name === t)
                  ?.totalCount,
                moves: {
                  cellData: stats?.typeComposition?.moves?.find(
                    (r) => r.name === t
                  )?.totalCount,
                  subLayer: pokemons.flatMap(
                    (p) =>
                      p.selectedMoves?.flatMap((s) =>
                        t === s.type
                          ? {
                              damageClass: (
                                <ClassChip
                                  value={s.damageClass || ""}
                                  key={s.name}
                                  small
                                />
                              ),
                              moveName: s.name,
                              pokemonName: p.name,
                            }
                          : []
                      ) || []
                  ),
                },
              }))}
          />
        </Column>
      )}
    </Column>
  );
};
