import { Column, Container, H2, H3, Row } from "@/components/LayoutComponents";
import { MoveDetailsType, PokeDetails } from "@/utils";
import { ReactNode, useState } from "react";
import { PokemonAutocomplete } from "../PageAutocomplete/PokemonAutocomplete";
import { DragArea } from "@/components/LayoutComponents/DragAround";
import { BuilderCard } from "./BuilderCard";
import { Suggester } from "./Suggester";

export interface PokeDetailsWithSelectedMoves extends PokeDetails {
  selectedMoves?: MoveDetailsType[];
}

export const Builder = () => {
  const [pokemons, setPokemons] = useState<PokeDetailsWithSelectedMoves[]>([]);

  return (
    <Column className={`relative gap-5`}>
      <H2>Team Planner</H2>
      <Container className={`w-[200px]`}>
        <PokemonAutocomplete
          label={`Select your Pokemon ${pokemons.length}/6`}
          pokemon={undefined}
          setPokemon={(data) => {
            if (data) {
              setPokemons((prev) => [...prev, data]);
            }
          }}
          disable={pokemons.length >= 6}
        />
      </Container>

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
