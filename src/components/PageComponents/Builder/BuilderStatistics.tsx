import { Column, Row } from "@/components/LayoutComponents";
import { useDarkTheme } from "@/components/Providers";
import { PokeDetails, PokeStat, statShortHand } from "@/utils";
import { FunctionComponent, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "../Dex/StatCompareTool";

export interface BuilderStatisticsProps {
  teamStats: { name: string; stats: PokeStat[] }[];
  teamStatsAverage?: PokeStat[];
  showAverage?: boolean;
}

export const BuilderStatistics: FunctionComponent<BuilderStatisticsProps> = ({
  teamStats,
  teamStatsAverage,
  showAverage,
}) => {
  const { light } = useDarkTheme();

  const colors = useMemo(
    () => ({
      light: ["#009999", "#672042", "#2c4f52", "#2c339a", "#66119a", "#8c110a"],
      dark: ["#229740", "#995522", "#9f8640", "#b796ad", "#2c90b6", "#a96ca9"],
    }),
    []
  );

  const teamData = useMemo(() => {
    let stats = {
      speed: { name: statShortHand["speed"].toUpperCase() },
      attack: { name: statShortHand["attack"].toUpperCase() },
      defense: { name: statShortHand["defense"].toUpperCase() },
      hp: { name: statShortHand["hp"].toUpperCase() },
      "special-attack": { name: statShortHand["special-attack"].toUpperCase() },
      "special-defense": {
        name: statShortHand["special-defense"].toUpperCase(),
      },
    };

    teamStats.forEach((stat) => {
      stats["speed"] = {
        ...stats["speed"],
        [stat.name]: stat.stats.find((s) => s.name === "speed")?.value,
      };
      stats["attack"] = {
        ...stats["attack"],
        [stat.name]: stat.stats.find((s) => s.name === "attack")?.value,
      };
      stats["defense"] = {
        ...stats["defense"],
        [stat.name]: stat.stats.find((s) => s.name === "defense")?.value,
      };
      stats["hp"] = {
        ...stats["hp"],
        [stat.name]: stat.stats.find((s) => s.name === "hp")?.value,
      };
      stats["special-attack"] = {
        ...stats["special-attack"],
        [stat.name]: stat.stats.find((s) => s.name === "special-attack")?.value,
      };
      stats["special-defense"] = {
        ...stats["special-defense"],
        [stat.name]: stat.stats.find((s) => s.name === "special-defense")
          ?.value,
      };
    });

    return Object.values(stats);
  }, [teamStats]);

  const averageData = useMemo(
    () =>
      teamStatsAverage?.map((stat) => ({
        name: statShortHand[stat.name].toUpperCase(),
        AVERAGE: stat.value,
      })),
    [teamStatsAverage]
  );

  return (
    <Column className={`flex-1 w-full gap-5 items-start`}>
      <Row className={`w-full flex-wrap gap-5`}>
        <Column className={`flex-1 min-w-[200px] h-[400px] items-center`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={!showAverage ? teamData : averageData}
              layout="vertical"
              barCategoryGap={7}
              margin={{ right: 10, left: 5 }}
            >
              <CartesianGrid
                strokeDasharray="1 1"
                stroke={light ? "rgb(23 37 84)" : "rgb(203 213 225)"}
                opacity={0.2}
              />
              <XAxis
                type="number"
                stroke={light ? "rgb(23 37 84)" : "rgb(203 213 225)"}
                domain={[0, 260]}
                interval={0}
                tickMargin={5}
                tickSize={2}
                tickCount={5}
                fontSize={12}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke={light ? "rgb(23 37 84)" : "rgb(203 213 225)"}
                width={35}
                tickMargin={5}
                tickSize={0}
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Legend />
              {!showAverage ? (
                teamStats.map((stat, index) => (
                  <Bar
                    key={index}
                    dataKey={stat.name}
                    fill={light ? colors.light[index] : colors.dark[index]}
                    isAnimationActive={false}
                  />
                ))
              ) : (
                <Bar
                  dataKey={"AVERAGE"}
                  fill={light ? colors.light[0] : colors.dark[0]}
                  isAnimationActive={false}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </Column>
      </Row>
    </Column>
  );
};
