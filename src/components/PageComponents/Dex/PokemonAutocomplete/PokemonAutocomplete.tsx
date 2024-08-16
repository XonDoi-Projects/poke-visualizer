import { Autocomplete } from "@/components/LayoutComponents/Autocomplete/Autocomplete";
import { total } from "@/components/Providers";
import { getPokemonDataList, PokeDetails } from "@/utils";
import { FunctionComponent, HTMLProps, useMemo, useState } from "react";

export interface PokemonAutocompleteProps {
  pokemon?: PokeDetails;
  setPokemon?: (value: PokeDetails | undefined) => void;
  className?: HTMLProps<"HTMLElement">["className"];
  noDropDownOnClick?: boolean;
  placeHolder?: string;
  type?: 'normal' | 'transparent'
}

export const PokemonAutocomplete: FunctionComponent<
  PokemonAutocompleteProps
> = ({ pokemon, setPokemon, className, noDropDownOnClick, placeHolder, type }) => {
  const [search, setSearch] = useState("");

  const pokemonList = useMemo(() => {
    return getPokemonDataList({
      limit: total,
    });
  }, []);

  const filteredPokemon = useMemo(
    () =>
      search
        ? pokemonList?.data.filter((c) =>
            c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        : pokemonList?.data,
    [pokemonList, search]
  );

  return (
    <Autocomplete
      label=""
      list={filteredPokemon || []}
      search={search}
      setSearch={setSearch}
      option={pokemon}
      setOption={(value: PokeDetails | undefined) => {
        setPokemon && setPokemon(value);
        setSearch("");
      }}
      getDisplayName={(value: PokeDetails) => value.name}
      className={`max-w-[300px] w-full ${className}`}
      noDropDownOnClick={noDropDownOnClick}
      placeHolder={placeHolder}
      type={type}
    />
  );
};
