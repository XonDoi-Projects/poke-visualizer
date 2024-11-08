import { FieldProps } from "@/components/LayoutComponents";
import { Autocomplete } from "@/components/LayoutComponents/Autocomplete/Autocomplete";
import { MoveDetailsType, PokeDetails } from "@/utils";
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
  fieldType,
  label,
  disable,
}) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(
    () =>
      data
        .filter((d) => d.name.includes(search))
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)) || [],
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
      fieldType={fieldType}
      disable={disable}
    />
  );
};
