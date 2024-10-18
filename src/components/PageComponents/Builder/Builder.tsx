import {
  Button,
  Column,
  Container,
  H2,
  H3,
  Row,
  Small,
  Span,
} from "@/components/LayoutComponents";
import {
  MoveDetailsType,
  PokeDetails,
  PokeRegion,
  pokeRegions,
  PokeTrait,
  pokeTraits,
  PokeType,
  pokeTypes,
} from "@/utils";
import { useMemo, useState } from "react";
import { PokemonAutocomplete } from "../PageAutocomplete/PokemonAutocomplete";
import { DragArea } from "@/components/LayoutComponents/DragAround";
import { Suggester } from "./Suggester";
import { Selector } from "@/components/LayoutComponents/Selector";
import { Card } from "@/components/LayoutComponents/Card";
import { useDarkTheme } from "@/components/Providers";
import { BiSlider, BiX } from "react-icons/bi";

export interface PokeDetailsWithSelectedMoves extends PokeDetails {
  selectedMoves?: MoveDetailsType[];
}

export const Builder = () => {
  const { light } = useDarkTheme();
  const [pokemons, setPokemons] = useState<PokeDetailsWithSelectedMoves[]>([]);

  const [showTypes, setShowTypes] = useState(true);

  const [showFilter, setShowFilter] = useState(false);

  const [region, setRegion] = useState<PokeRegion>("all");
  const [trait, setTrait] = useState<PokeTrait>("all");
  const [types, setTypes] = useState<PokeType[]>(["all"]);

  const helperText = useMemo(() => {
    const filter = [region, trait, ...types]
      .filter((f) => f !== "all")
      .map((f) => f.slice(0, 1).toUpperCase() + f.slice(1));

    if (filter.length > 1) {
      return `${filter.slice(0, -1).join(", ")} and ${filter.slice(-1)}`;
    } else if (filter.length === 1) {
      return filter[0];
    }
    return;
  }, [region, trait, types]);

  const handleReset = () => {
    setRegion("all");
    setTrait("all");
    setTypes(["all"]);
  };

  return (
    <Column className={`relative gap-5`}>
      <H2>Team Planner</H2>
      <Column className={`items-end gap-2`}>
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
          <Column className={`w-full gap-2`}>
            <Row className={`w-full flex-wrap gap-5`}>
              <Container className={`flex-1 min-w-[200px]`}>
                <PokemonAutocomplete
                  label={`Select your Pokemon ${pokemons.length}/6`}
                  pokemon={undefined}
                  setPokemon={(data) => {
                    if (data) {
                      setPokemons((prev) => [...prev, data]);
                    }
                  }}
                  disable={pokemons.length >= 6}
                  helperText={
                    helperText ? `${`Current Filters: ${helperText}`}` : ""
                  }
                  filter={{
                    region,
                    trait,
                    types,
                  }}
                />
              </Container>

              <Container className={`flex-1 min-w-[150px]`}>
                <Selector
                  label="Region"
                  list={pokeRegions.map((p) => p[0].toUpperCase() + p.slice(1))}
                  options={[region[0].toUpperCase() + region.slice(1)]}
                  setOptions={(value: PokeRegion[]) => {
                    setRegion(value[0].toLowerCase() as PokeRegion);
                  }}
                />
              </Container>

              <Container className={`flex-1 min-w-[150px]`}>
                <Selector
                  label="Type"
                  list={pokeTypes.map((p) => p[0].toUpperCase() + p.slice(1))}
                  options={types.map((t) => t[0].toUpperCase() + t.slice(1))}
                  setOptions={(value: PokeType[]) => {
                    setTypes(value.map((v) => v.toLowerCase() as PokeType));
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
                  label="Special Trait"
                  list={pokeTraits.map((p) => p[0].toUpperCase() + p.slice(1))}
                  options={[trait[0].toUpperCase() + trait.slice(1)]}
                  setOptions={(value: PokeTrait[]) => {
                    setTrait(value[0].toLowerCase() as PokeTrait);
                  }}
                />
              </Container>
            </Row>
            <Container className={`h-full items-end`}>
              <Button className={`h-[30px] rounded-full`} onClick={handleReset}>
                Reset
              </Button>
            </Container>
          </Column>
        ) : null}
      </Column>

      <Row className={`relative flex-wrap gap-5`}>
        <Column className={`relative flex-1 rounded gap-2 p-3`}>
          <H3>Team</H3>
          <DragArea list={pokemons} setList={setPokemons} />
        </Column>
        <Column className={`relative flex-1 rounded gap-2 w-full p-3`}>
          <Row className={`justify-between items-center`}>
            <H3>{showTypes ? "Type Composition" : "Stat Details"}</H3>
            <Button className={`rounded-full`}>
              <Small
                onClick={() => setShowTypes(!showTypes)}
                className={`${!light ? "text-blue-900" : "text-slate-300"}  `}
              >
                {showTypes ? "See Stats" : "See Types"}
              </Small>
            </Button>
          </Row>

          {pokemons.length > 0 ? (
            <Suggester
              pokemons={pokemons}
              setShowTypes={setShowTypes}
              showTypes={showTypes}
            />
          ) : (
            <Card
              className={`flex-1 items-center justify-center rounded-md opacity-40`}
              noShadow
            >
              <Span>Start building your team!</Span>
            </Card>
          )}
        </Column>
      </Row>
    </Column>
  );
};
