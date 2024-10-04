import { FieldProps } from "@/components/LayoutComponents";
import { Autocomplete } from "@/components/LayoutComponents/Autocomplete/Autocomplete";
import { MoveDetailsType, PokeDetails } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useMemo, useState } from "react";

export interface MoveAutocompleteProps extends FieldProps {
  data: MoveDetailsType[];
  move?: MoveDetailsType;
  setMove?: (value: MoveDetailsType | undefined) => void;
  noDropDownOnClick?: boolean;
}

export const MoveAutocomplete: FunctionComponent<MoveAutocompleteProps> = ({
  data,
  move,
  setMove,
  className,
  noDropDownOnClick = false,
  placeHolder,
  type,
  label,
  disable,
}) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(
    () => data.filter((d) => d.name.includes(search)) || [],
    [data, search]
  );

  return (
    <Autocomplete
      label={label || ""}
      list={filteredData || []}
      setSearch={setSearch}
      option={move}
      setOption={(value: MoveDetailsType | undefined) => {
        setMove && setMove(value);
        setSearch("");
      }}
      getDisplayName={(value: PokeDetails) =>
        value.name
          .split("-")
          .map((s: string) => s[0].toUpperCase() + s.slice(1))
          .join("-")
      }
      className={`w-full ${className}`}
      noDropDownOnClick={noDropDownOnClick}
      placeHolder={placeHolder}
      type={type}
      disable={disable}
    />
  );
};
