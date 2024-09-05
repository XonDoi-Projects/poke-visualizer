import { Column, H5, Row, Span } from "@/components/LayoutComponents";
import { useDarkTheme } from "@/components/Providers";
import { PokeDetails } from "@/utils";
import { FunctionComponent, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PokemonAutocomplete } from "../PokemonAutocomplete/PokemonAutocomplete";
import { CustomTooltip } from "./CustomTooltip";

export interface StatCompareToolProps {
  pokemon: PokeDetails;
}

export const StatCompareTool: FunctionComponent<StatCompareToolProps> = ({
  pokemon,
}) => {
  const { light } = useDarkTheme();

  const [pokemonTwo, setPokemonTwo] = useState<PokeDetails>();

  const radarData = useMemo(
    () =>
      pokemonTwo
        ? [
            {
              subject: "HP",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "hp")
                ?.value,
              [pokemonTwo.name]: pokemonTwo.stats?.find((s) => s.name === "hp")
                ?.value,
              fullMarks: 200,
            },
            {
              subject: "Attack",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "attack")
                ?.value,
              [pokemonTwo.name]: pokemonTwo.stats?.find(
                (s) => s.name === "attack"
              )?.value,
              fullMarks: 200,
            },
            {
              subject: "Defense",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "defense")
                ?.value,
              [pokemonTwo.name]: pokemonTwo.stats?.find(
                (s) => s.name === "defense"
              )?.value,
              fullMarks: 200,
            },
            {
              subject: "Spc. Att",
              [pokemon.name]: pokemon.stats?.find(
                (s) => s.name === "special-attack"
              )?.value,
              [pokemonTwo.name]: pokemonTwo.stats?.find(
                (s) => s.name === "special-attack"
              )?.value,
              fullMarks: 200,
            },
            {
              subject: "Spc. Def",
              [pokemon.name]: pokemon.stats?.find(
                (s) => s.name === "special-defense"
              )?.value,
              [pokemonTwo.name]: pokemonTwo.stats?.find(
                (s) => s.name === "special-defense"
              )?.value,
              fullMarks: 200,
            },
            {
              subject: "Speed",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "speed")
                ?.value,
              [pokemonTwo.name]: pokemonTwo.stats?.find(
                (s) => s.name === "speed"
              )?.value,
              fullMarks: 200,
            },
          ]
        : [
            {
              subject: "HP",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "hp")
                ?.value,
            },
            {
              subject: "Attack",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "attack")
                ?.value,
            },
            {
              subject: "Defense",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "defense")
                ?.value,
            },
            {
              subject: "Spc. Att",
              [pokemon.name]: pokemon.stats?.find(
                (s) => s.name === "special-attack"
              )?.value,
            },
            {
              subject: "Spc. Def",
              [pokemon.name]: pokemon.stats?.find(
                (s) => s.name === "special-defense"
              )?.value,
            },
            {
              subject: "Speed",
              [pokemon.name]: pokemon.stats?.find((s) => s.name === "speed")
                ?.value,
            },
          ],
    [pokemon, pokemonTwo]
  );

  const barData = useMemo(
    () =>
      pokemonTwo
        ? [
            {
              subject: "Weight (Kg)",
              [pokemon.name]: pokemon.weight / 10,
              [pokemonTwo.name]: pokemonTwo.weight / 10,
            },
            {
              subject: "Height (m)",
              [pokemon.name]: pokemon.height / 10,
              [pokemonTwo.name]: pokemonTwo.height / 10,
            },
          ]
        : [
            {
              subject: "Weight (Kg)",
              [pokemon.name]: pokemon.weight / 10,
            },
            {
              subject: "Height (m)",
              [pokemon.name]: pokemon.height / 10,
            },
          ],
    [pokemon.height, pokemon.name, pokemon.weight, pokemonTwo]
  );

  return (
    <Column className={`flex-1 w-full gap-5 items-start`}>
      <H5>Stat Comparison Tool</H5>
      <Column className={`w-full gap-5 flex-wrap`}>
        <Span>{`Compare ${pokemon.name.toLocaleUpperCase()} with`}</Span>
        <PokemonAutocomplete
          pokemon={pokemonTwo}
          setPokemon={setPokemonTwo}
          className={`h-[50px]`}
          label=""
        />
      </Column>

      <Row className={`w-full flex-wrap gap-5`}>
        <Column className={`flex-1 min-w-[200px]`}>
          <ResponsiveContainer height={200}>
            <RadarChart
              outerRadius={50}
              width={250}
              height={250}
              data={radarData}
            >
              <PolarGrid
                strokeDasharray="1 1"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                opacity={0.2}
              />
              <PolarAngleAxis
                tickLine={false}
                dataKey="subject"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                baselineShift={-5}
              />
              <PolarRadiusAxis angle={30} domain={[0, 200]} opacity={0} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Radar
                name={pokemon.name}
                dataKey={pokemon.name}
                stroke={light ? "#aa4274" : "#8884d8"}
                fill={light ? "#aa4274" : "#8884d8"}
                fillOpacity={0.4}
                isAnimationActive={false}
              />
              {pokemonTwo && (
                <Radar
                  name={pokemonTwo.name}
                  dataKey={pokemonTwo.name}
                  stroke={light ? "#228822" : "#82ca9d"}
                  fill={light ? "#228822" : "#82ca9d"}
                  fillOpacity={0.4}
                  isAnimationActive={false}
                />
              )}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Column>

        <Column className={`flex-1 min-w-[200px]`}>
          <ResponsiveContainer height={150}>
            <BarChart data={[barData[0]]} layout="vertical">
              <CartesianGrid
                strokeDasharray="1 1"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                opacity={0.2}
              />
              <YAxis
                dataKey="subject"
                type="category"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
              />
              <XAxis
                type="number"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                domain={[
                  0,
                  pokemonTwo
                    ? barData[0][pokemon.name] < barData[0][pokemonTwo.name]
                      ? Math.ceil(
                          (barData[0][pokemonTwo.name] as number) +
                            (barData[0][pokemonTwo.name] as number) * 0.3
                        )
                      : Math.ceil(
                          (barData[0][pokemon.name] as number) +
                            (barData[0][pokemon.name] as number) * 0.3
                        )
                    : Math.ceil(
                        (barData[0][pokemon.name] as number) +
                          (barData[0][pokemon.name] as number) * 0.3
                      ),
                ]}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Legend />
              <Bar
                dataKey={pokemon.name}
                fill={light ? "#aa4274" : "#8884d8"}
                barSize={20}
                isAnimationActive={false}
              />
              {pokemonTwo && (
                <Bar
                  dataKey={pokemonTwo.name}
                  fill={light ? "#228822" : "#82ca9d"}
                  barSize={20}
                  isAnimationActive={false}
                />
              )}
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer height={150}>
            <BarChart data={[barData[1]]} layout="vertical">
              <CartesianGrid
                strokeDasharray="1 1"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                opacity={0.2}
              />
              <YAxis
                dataKey="subject"
                type="category"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
              />
              <XAxis
                type="number"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                domain={[
                  0,
                  pokemonTwo
                    ? barData[1][pokemon.name] < barData[1][pokemonTwo.name]
                      ? Math.ceil(
                          (barData[1][pokemonTwo.name] as number) +
                            (barData[1][pokemonTwo.name] as number) * 0.3
                        )
                      : Math.ceil(
                          (barData[1][pokemon.name] as number) +
                            (barData[1][pokemon.name] as number) * 0.3
                        )
                    : Math.ceil(
                        (barData[1][pokemon.name] as number) +
                          (barData[1][pokemon.name] as number) * 0.3
                      ),
                ]}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Legend />
              <Bar
                dataKey={pokemon.name}
                fill={light ? "#aa4274" : "#8884d8"}
                barSize={20}
                isAnimationActive={false}
              />
              {pokemonTwo && (
                <Bar
                  dataKey={pokemonTwo.name}
                  fill={light ? "#228822" : "#82ca9d"}
                  barSize={20}
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
