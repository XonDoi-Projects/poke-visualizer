import {
  Column,
  Container,
  H5,
  Row,
  Span,
} from "@/components/LayoutComponents";
import { Autocomplete } from "@/components/LayoutComponents/Autocomplete/Autocomplete";
import { InputField } from "@/components/LayoutComponents/Inputs";
import { total, useDarkTheme } from "@/components/Providers";
import { PokeDetails, getPokemonDataList } from "@/utils";
import { data } from "autoprefixer";
import { FunctionComponent, useMemo, useState } from "react";
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
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface StatCompareToolProps {
  pokemon: PokeDetails;
}

export const StatCompareTool: FunctionComponent<StatCompareToolProps> = ({
  pokemon,
}) => {
  const { light } = useDarkTheme();

  const [search, setSearch] = useState("");
  const [pokemonTwo, setPokemonTwo] = useState<PokeDetails>();

  const comparePokemon = useMemo(() => {
    return getPokemonDataList({
      limit: total,
    });
  }, [total]);

  const filteredPokemon = useMemo(
    () =>
      search
        ? comparePokemon.data.filter((c) =>
            c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        : comparePokemon.data,
    [comparePokemon, search]
  );

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
        : [],
    [pokemonTwo]
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
        : [],
    [pokemonTwo]
  );

  return (
    <Container className={`flex-1 flex-wrap gap-5`}>
      <Column className={`flex-1 gap-5 items-start`}>
        <H5>Stat Comparison Tool</H5>
        <Span>{`Select a pokemon to compare with ${pokemon.name.toLocaleUpperCase()}`}</Span>
        <Container>
          <Autocomplete
            label=""
            list={filteredPokemon}
            search={search}
            setSearch={setSearch}
            option={pokemonTwo}
            setOption={(value: PokeDetails) => {
              setPokemonTwo(value);
              setSearch(value.name);
            }}
            getDisplayName={(value: PokeDetails) => value.name}
          />
        </Container>
        {pokemonTwo && (
          <Row className={`flex-wrap gap-5`}>
            <RadarChart
              outerRadius={50}
              width={250}
              height={250}
              data={radarData}
            >
              <PolarGrid
                strokeDasharray="5 5"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
              />
              <PolarAngleAxis
                tickLine={false}
                dataKey="subject"
                stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                baselineShift={-5}
              />
              <Tooltip />
              <Radar
                name={pokemon.name}
                dataKey={pokemon.name}
                stroke={light ? "#aa4274" : "#8884d8"}
                fill={light ? "#aa4274" : "#8884d8"}
                fillOpacity={0.4}
              />
              <Radar
                name={pokemonTwo.name}
                dataKey={pokemonTwo.name}
                stroke={light ? "#228822" : "#82ca9d"}
                fill={light ? "#228822" : "#82ca9d"}
                fillOpacity={0.4}
              />
              <Legend />
            </RadarChart>
            <Column>
              <BarChart
                width={200}
                height={150}
                data={[barData[0]]}
                layout="vertical"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                />
                <YAxis
                  dataKey="subject"
                  type="category"
                  stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                />
                <XAxis
                  type="number"
                  stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={pokemon.name}
                  fill={light ? "#aa4274" : "#8884d8"}
                  barSize={20}
                />
                <Bar
                  dataKey={pokemonTwo.name}
                  fill={light ? "#228822" : "#82ca9d"}
                  barSize={20}
                />
              </BarChart>
              <BarChart
                width={200}
                height={150}
                data={[barData[1]]}
                layout="vertical"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                />
                <YAxis
                  dataKey="subject"
                  type="category"
                  stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                />
                <XAxis
                  type="number"
                  stroke={light ? "rgb(23 37 84)" : "rgb(234 179 8)"}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={pokemon.name}
                  fill={light ? "#aa4274" : "#8884d8"}
                  barSize={20}
                />
                <Bar
                  dataKey={pokemonTwo.name}
                  fill={light ? "#228822" : "#82ca9d"}
                  barSize={20}
                />
              </BarChart>
            </Column>
          </Row>
        )}
      </Column>
    </Container>
  );
};
