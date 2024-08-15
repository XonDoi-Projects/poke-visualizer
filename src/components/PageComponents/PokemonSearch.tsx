import { FunctionComponent } from "react";
import { PokemonAutocomplete } from "./Dex/PokemonAutocomplete/PokemonAutocomplete";

export interface PokemonSearchProps {
  placeHolder?: string;
}

export const PokemonSearch: FunctionComponent<PokemonSearchProps> = (props) => {
  return <PokemonAutocomplete />;
};
