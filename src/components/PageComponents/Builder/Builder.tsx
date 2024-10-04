import {
  Button,
  Column,
  Container,
  H2,
  H3,
  Row,
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

export interface PokeDetailsWithSelectedMoves extends PokeDetails {
  selectedMoves?: MoveDetailsType[];
}

export const Builder = () => {
  const [pokemons, setPokemons] = useState<PokeDetailsWithSelectedMoves[]>([]);

  const [region, setRegion] = useState<PokeRegion>("any");
  const [trait, setTrait] = useState<PokeTrait>("any");
  const [types, setTypes] = useState<PokeType[]>(["any"]);

  const helperText = useMemo(() => {
    const filter = [region, trait, ...types]
      .filter((f) => f !== "any")
      .map((f) => f.slice(0, 1).toUpperCase() + f.slice(1));

    if (filter.length > 1) {
      return `${filter.slice(0, -1).join(", ")} and ${filter.slice(-1)}`;
    } else if (filter.length === 1) {
      return filter[0];
    }
    return;
  }, [region, trait, types]);

  const handleReset = () => {
    setRegion("any");
    setTrait("any");
    setTypes(["any"]);
  };

  return (
    <Column className={`relative gap-5`}>
      <H2>Team Planner</H2>
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
            helperText={helperText ? `${`Current Filters: ${helperText}`}` : ""}
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
            option={region[0].toUpperCase() + region.slice(1)}
            setOption={(value: PokeRegion) => {
              setRegion(value.toLowerCase() as PokeRegion);
            }}
          />
        </Container>

        <Container className={`flex-1 min-w-[150px]`}>
          <Selector
            label="Type"
            list={pokeTypes.map((p) => p[0].toUpperCase() + p.slice(1))}
            option={types.map((t) => t[0].toUpperCase() + t.slice(1))}
            setOption={(value: PokeType) => {
              setTypes([value.toLowerCase() as PokeType]);
            }}
          />
        </Container>

        <Container className={`flex-1 min-w-[150px]`}>
          <Selector
            label="Special Trait"
            list={pokeTraits.map((p) => p[0].toUpperCase() + p.slice(1))}
            option={trait[0].toUpperCase() + trait.slice(1)}
            setOption={(value: PokeTrait) => {
              setTrait(value.toLowerCase() as PokeTrait);
            }}
          />
        </Container>
        <Container className={`h-full items-end`}>
          <Button className={`h-[40px]`} onClick={handleReset}>
            Reset
          </Button>
        </Container>
      </Row>

      <Row className={`relative flex-wrap gap-5`}>
        <Column className={`relative flex-1 rounded gap-2 p-3`}>
          <H3>Team</H3>
          <DragArea list={pokemons} setList={setPokemons} />
        </Column>
        <Column className={`relative flex-1 rounded gap-2 w-full p-3`}>
          <H3>Details</H3>
          {pokemons.length > 0 && <Suggester pokemons={pokemons} />}
        </Column>
      </Row>
    </Column>
  );
};
