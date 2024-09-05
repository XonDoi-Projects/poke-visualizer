import { FieldProps } from "@/components/LayoutComponents";
import { Autocomplete } from "@/components/LayoutComponents/Autocomplete/Autocomplete";
import { PokeDetails } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
  FunctionComponent,
  HTMLProps,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface PokemonAutocompleteProps extends FieldProps {
  pokemon?: PokeDetails;
  setPokemon?: (value: PokeDetails | undefined) => void;
  noDropDownOnClick?: boolean;
}

export const PokemonAutocomplete: FunctionComponent<
  PokemonAutocompleteProps
> = ({
  pokemon,
  setPokemon,
  className,
  noDropDownOnClick,
  placeHolder,
  type,
  label,
}) => {
  const [search, setSearch] = useState("");

  const getData = async () => {
    const data = await fetch("/api/pokemon/get-autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });

    return await data.json();
  };

  const { data, error, isLoading } = useQuery<{
    data: PokeDetails[] | undefined;
    count: number | undefined;
  }>({
    queryKey: ["getData", search],
    queryFn: getData,
    enabled: search ? true : false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  return (
    <Autocomplete
      label={label || ""}
      list={data?.data || []}
      search={search}
      setSearch={setSearch}
      option={pokemon}
      setOption={(value: PokeDetails | undefined) => {
        setPokemon && setPokemon(value);
        setSearch("");
      }}
      getDisplayName={(value: PokeDetails) => value.name}
      className={`w-full ${className}`}
      noDropDownOnClick={noDropDownOnClick}
      placeHolder={placeHolder}
      type={type}
    />
  );
};
