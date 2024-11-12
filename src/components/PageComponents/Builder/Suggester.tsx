import {
  Column,
  Row,
  Small,
  Span,
  Switch,
  Table,
} from "@/components/LayoutComponents";
import { MoveDetailsType, PokeStat, pokeTypes, statShortHand } from "@/utils";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { BuilderStatistics } from "./BuilderStatistics";
import { complexionData, TypeWeakness } from "@/pokemonTypes";
import { TypeChip } from "../Dex/TypeChip";
import {
  PlannerDetails,
  PokeDetailsWithSelectedMovesStatCalculator,
} from "./Builder";
import { ClassChip } from "../Dex";
import { useDarkTheme } from "@/components/Providers";

type TableTotals = {
  my: number;
  enemy: number;
};

type SuggestedStats = {
  speedValue?: number;
  speedValueDetails?: string;
  conclusion?: string;
  teamStats?: {
    name: string;
    baseStats: PokeStat[];
    effectiveStats?: PokeStat[];
  }[];
  teamStatsAverage?: PokeStat[];
  enemyTeamStats?: {
    name: string;
    baseStats: PokeStat[];
    effectiveStats?: PokeStat[];
  }[];
  enemyTeamStatsAverage?: PokeStat[];
  typeComposition?: {
    resistances?: { name: TypeWeakness; totalCount: TableTotals }[];
    weaknesses?: { name: TypeWeakness; totalCount: TableTotals }[];
    stab?: { name: TypeWeakness; totalCount: TableTotals }[];
    moves?: { name: TypeWeakness; totalCount: TableTotals }[];
  };
};

export interface SuggesterProps {
  plannerDetails: PlannerDetails;
  setShowTypes: (value: boolean) => void;
  showTypes: boolean;
}

export const Suggester: FunctionComponent<SuggesterProps> = ({
  plannerDetails,
  showTypes,
}) => {
  const { light } = useDarkTheme();
  const [stats, setStats] = useState<SuggestedStats>();

  const [showAverage, setShowAverage] = useState(false);
  const [showEffective, setShowEffective] = useState(false);
  const [showEnemy, setShowEnemy] = useState(false);

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
    let types: {
      name: TypeWeakness;
      totalCount: TableTotals;
    }[] = [
      {
        name: "normal",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "grass",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "fire",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "water",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "electric",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "fighting",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "rock",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "ground",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "bug",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "steel",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "dark",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "ghost",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "ice",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "fairy",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "psychic",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "dragon",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "flying",
        totalCount: { my: 0, enemy: 0 },
      },
      {
        name: "poison",
        totalCount: { my: 0, enemy: 0 },
      },
    ];

    let typeComposition = {
      resistances: types.map((t) => structuredClone(t)),
      weaknesses: types.map((t) => structuredClone(t)),
      stab: types.map((t) => structuredClone(t)),
      moves: types.map((t) => structuredClone(t)),
    };

    const keys = Object.keys(plannerDetails);

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      plannerDetails[k as keyof PlannerDetails].forEach((list) => {
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
              typeComposition.resistances[index].totalCount[
                k as keyof TableTotals
              ] += 1;
            }
          });
          receivesQuarter.forEach((h) => {
            const index = typeComposition.resistances.findIndex(
              (f) => f.name === h
            );

            if (index >= 0) {
              typeComposition.resistances[index].totalCount[
                k as keyof TableTotals
              ] += 1;
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
              typeComposition.weaknesses[index].totalCount[
                k as keyof TableTotals
              ] += 1;
            }
          });
          receivesQuadruple.forEach((h) => {
            const index = typeComposition.weaknesses.findIndex(
              (f) => f.name === h
            );

            if (index >= 0) {
              typeComposition.weaknesses[index].totalCount[
                k as keyof TableTotals
              ] += 1;
            }
          });
        }
      });
    }

    const moveList = keys.flatMap((k) =>
      plannerDetails[k as keyof PlannerDetails].flatMap((p) => p.selectedMoves)
    );

    moveList.forEach((move: MoveDetailsType | undefined) => {
      const index = typeComposition.moves.findIndex(
        (m) => m.name === move?.type
      );

      if (index >= 0) {
        if (move?.isEnemy) {
          typeComposition.moves[index].totalCount["enemy"] += 1;
        } else {
          typeComposition.moves[index].totalCount["my"] += 1;
        }
      }
    });

    keys.forEach((k) =>
      plannerDetails[k as keyof PlannerDetails].forEach((pokemon) => {
        pokemon.selectedMoves?.forEach((move) => {
          const index = typeComposition.stab.findIndex(
            (m) => m.name === move.type
          );
          if (move.type && pokemon.types?.includes(move.type)) {
            typeComposition.stab[index].totalCount[k as keyof TableTotals] += 1;
          }
        });
      })
    );

    return typeComposition;
  }, [plannerDetails]);

  const getStats = useCallback(() => {
    const myStatsObject: ({ [key in string]: number } | undefined)[] =
      plannerDetails.my.map((p, index) => {
        if (index === 0) {
          return p.statCalculatorDetails?.stats
            ? p.statCalculatorDetails?.stats.reduce(
                (obj, item) =>
                  Object.assign(obj, {
                    [item.name]: item.calculatedBase,
                  }),
                {}
              )
            : p.stats?.reduce(
                (obj, item) =>
                  Object.assign(obj, {
                    [item.name]: p.stats?.find((s) => s.name === item.name)
                      ?.value,
                  }),
                {}
              );
        }
      });

    const myFirstPokemonStats = myStatsObject[0];

    const enemyStatsObject: ({ [key in string]: number } | undefined)[] =
      plannerDetails.enemy.map((p, index) => {
        if (index === 0) {
          return p.statCalculatorDetails?.stats
            ? p.statCalculatorDetails?.stats.reduce(
                (obj, item) =>
                  Object.assign(obj, {
                    [item.name]: item.calculatedBase,
                  }),
                {}
              )
            : p.stats?.reduce(
                (obj, item) =>
                  Object.assign(obj, {
                    [item.name]: p.stats?.find((s) => s.name === item.name)
                      ?.value,
                  }),
                {}
              );
        }
      });

    const enemyFirstPokemonStats = enemyStatsObject[0];

    let details: SuggestedStats = {};

    console.log(enemyStatsObject);

    if (myFirstPokemonStats && enemyFirstPokemonStats) {
      if (myFirstPokemonStats["speed"] > enemyFirstPokemonStats["speed"]) {
        details = {
          speedValue: myFirstPokemonStats["speed"],
          speedValueDetails: `above enemy's speed ${enemyFirstPokemonStats["speed"]}`,
          conclusion: "You are likely to attack first.",
        };
      } else if (
        myFirstPokemonStats["speed"] < enemyFirstPokemonStats["speed"]
      ) {
        details = {
          speedValue: myFirstPokemonStats["speed"],
          speedValueDetails: `below enemy's speed ${enemyFirstPokemonStats["speed"]}`,
          conclusion: "You are likely to be attacked first.",
        };
      } else {
        details = {
          speedValue: myFirstPokemonStats["speed"],
          speedValueDetails: `equal enemy's speed ${enemyFirstPokemonStats["speed"]}`,
          conclusion: "You are likely to be attacked first.",
        };
      }
    } else if (myFirstPokemonStats) {
      if (myFirstPokemonStats["speed"] > 93) {
        details = {
          speedValue: myFirstPokemonStats["speed"],
          speedValueDetails: `above average (${93})`,
          conclusion: "You are likely to attack first.",
        };
      } else if (myFirstPokemonStats["speed"] < 93) {
        details = {
          speedValue: myFirstPokemonStats["speed"],
          speedValueDetails: `below average (${93})`,
          conclusion: "You are likely to be attacked .",
        };
      } else {
        details = {
          speedValue: myFirstPokemonStats["speed"],
          speedValueDetails: `equal to the average (${93})`,
          conclusion: "",
        };
      }
    }

    details = {
      ...details,
      teamStats: plannerDetails.my.map((p) => ({
        name: p.name,
        baseStats:
          Object.keys(statShortHand).map((s) => ({
            name: s,
            value: p.stats?.find((stat) => stat.name === s)?.value || 0,
          })) || [],
        effectiveStats:
          Object.keys(statShortHand).map((s) => ({
            name: s,
            value:
              p.statCalculatorDetails?.stats?.find((stat) => stat.name === s)
                ?.calculatedBase || 0,
          })) || [],
      })),
      enemyTeamStats: plannerDetails.enemy.map((p) => ({
        name: p.name,
        baseStats:
          Object.keys(statShortHand).map((s) => ({
            name: s,
            value: p.stats?.find((stat) => stat.name === s)?.value || 0,
          })) || [],
        effectiveStats:
          Object.keys(statShortHand).map((s) => ({
            name: s,
            value:
              p.statCalculatorDetails?.stats?.find((stat) => stat.name === s)
                ?.calculatedBase || 0,
          })) || [],
      })),
      teamStatsAverage: getTeamStatsAverage(myStatsObject),
      enemyTeamStatsAverage: getTeamStatsAverage(enemyStatsObject),
      typeComposition: getTypes(),
    };

    setStats(details);
  }, [getTypes, plannerDetails]);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <Column className={`gap-3 flex-1 w-full`}>
      {!showTypes ? (
        <>
          <Column className={`gap-2`}>
            <Span>{`Your first pokemon has a speed of ${stats?.speedValue}, which is ${stats?.speedValueDetails}. ${stats?.conclusion}`}</Span>
          </Column>
          <Column className={`gap-2`}>
            <Column className={`w-full gap-1 items-end`}>
              <Switch
                value={showAverage ? "Show All" : "Show Average"}
                onClick={() => setShowAverage(!showAverage)}
                switchPosition={"right"}
              />
              <Switch
                value={showEffective ? "Show Base" : "Show Effective"}
                onClick={() => setShowEffective(!showEffective)}
                switchPosition={"right"}
              />
              <Switch
                value={showEnemy ? "Show My Team" : "Show Enemy Team"}
                onClick={() => setShowEnemy(!showEnemy)}
                switchPosition={"right"}
              />
            </Column>

            <BuilderStatistics
              teamStats={
                showEnemy
                  ? stats?.enemyTeamStats?.map((s) => ({
                      name: s.name,
                      stats:
                        showEffective && s.effectiveStats !== undefined
                          ? s.effectiveStats
                          : s.baseStats,
                    })) || []
                  : stats?.teamStats?.map((s) => ({
                      name: s.name,
                      stats:
                        showEffective && s.effectiveStats !== undefined
                          ? s.effectiveStats
                          : s.baseStats,
                    })) || []
              }
              teamStatsAverage={
                showEnemy
                  ? stats?.enemyTeamStatsAverage
                  : stats?.teamStatsAverage
              }
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
                    keyId: "isEnemy",
                    name: "Enemy",
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
                resistances: (
                  <Row className={`gap-1`}>
                    <Small className={`text-green-500`}>
                      {
                        stats?.typeComposition?.resistances?.find(
                          (r) => r.name === t
                        )?.totalCount.my
                      }
                    </Small>
                    <Small
                      className={`${
                        light ? "text-blue-900" : "text-slate-300"
                      }`}
                    >
                      /
                    </Small>
                    <Small className={`text-red-500`}>
                      {
                        stats?.typeComposition?.resistances?.find(
                          (r) => r.name === t
                        )?.totalCount.enemy
                      }
                    </Small>
                  </Row>
                ),
                weaknesses: (
                  <Row className={`gap-1`}>
                    <Small className={`text-green-500`}>
                      {
                        stats?.typeComposition?.weaknesses?.find(
                          (r) => r.name === t
                        )?.totalCount.my
                      }
                    </Small>

                    <Small
                      className={`${
                        light ? "text-blue-900" : "text-slate-300"
                      }`}
                    >
                      /
                    </Small>
                    <Small className={`text-red-500`}>
                      {
                        stats?.typeComposition?.weaknesses?.find(
                          (r) => r.name === t
                        )?.totalCount.enemy
                      }
                    </Small>
                  </Row>
                ),
                stab: (
                  <Row className={`gap-1`}>
                    <Small className={`text-green-500`}>
                      {
                        stats?.typeComposition?.stab?.find((r) => r.name === t)
                          ?.totalCount.my
                      }
                    </Small>

                    <Small
                      className={`${
                        light ? "text-blue-900" : "text-slate-300"
                      }`}
                    >
                      /
                    </Small>
                    <Small className={`text-red-500`}>
                      {
                        stats?.typeComposition?.stab?.find((r) => r.name === t)
                          ?.totalCount.enemy
                      }
                    </Small>
                  </Row>
                ),
                moves: {
                  cellData: (
                    <Row className={`gap-1`}>
                      <Small className={`text-green-500`}>
                        {
                          stats?.typeComposition?.moves?.find(
                            (r) => r.name === t
                          )?.totalCount.my
                        }
                      </Small>

                      <Small
                        className={`${
                          light ? "text-blue-900" : "text-slate-300"
                        }`}
                      >
                        /
                      </Small>
                      <Small className={`text-red-500`}>
                        {
                          stats?.typeComposition?.moves?.find(
                            (r) => r.name === t
                          )?.totalCount.enemy
                        }
                      </Small>
                    </Row>
                  ),
                  subLayer: (
                    Object.values(
                      plannerDetails
                    ) as PokeDetailsWithSelectedMovesStatCalculator[][]
                  ).flatMap((p) =>
                    p.flatMap(
                      (c) =>
                        c.selectedMoves?.flatMap((s) =>
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
                                pokemonName: c.name,
                                isEnemy: s.isEnemy ? "Yes" : "No",
                              }
                            : []
                        ) || []
                    )
                  ),
                },
              }))}
          />
        </Column>
      )}
    </Column>
  );
};
