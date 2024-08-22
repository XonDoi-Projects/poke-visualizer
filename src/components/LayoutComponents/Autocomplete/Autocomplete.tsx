import {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { BiChevronDown, BiX } from "react-icons/bi";
import { Column } from "../Column";
import { useDarkTheme } from "@/components/Providers";
import { Field, FieldProps } from "../Field";
import { InputField } from "../Inputs";
import { Row } from "../Row";
import { AutocompleteOption } from "./AutocompleteOption";
import { PokeDetails } from "@/utils";
import { useClickOutside } from "@/components/Hooks";

export interface AutocompleteProps<T> extends FieldProps {
  list: T[];
  option?: T;
  setOption: (value: T | undefined) => void;
  search: string;
  setSearch: (value: string) => void;
  getDisplayName: (value: T) => string;
  noDropDownOnClick?: boolean;
}

export const Autocomplete: FunctionComponent<AutocompleteProps<any>> = <T,>({
  list,
  option,
  setOption,
  search,
  setSearch,
  getDisplayName,
  className,
  noDropDownOnClick,
  type,
  placeHolder,
  label,
}: AutocompleteProps<T>) => {
  const { light } = useDarkTheme();

  const [query, setQuery] = useState("");
  const debounceRef = useRef<NodeJS.Timeout>();

  const [showOptions, setShowOptions] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updatedRef = ref.current;
  const bottom = useMemo(() => {
    if (updatedRef) {
      return (
        updatedRef.getBoundingClientRect().bottom -
        updatedRef.getBoundingClientRect().top
      );
    }
    return;
  }, [updatedRef]);

  useEffect(() => {
    let timeout = debounceRef.current;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (query) {
      setTimeout(() => setSearch(query), 300);
    }

    return () => clearTimeout(timeout);
  }, [query, setSearch]);

  useClickOutside(ref, () => {
    setIsFocus(false);
    setShowOptions(false);
    setSearch("");
    setQuery("");
  });

  return (
    <Column className={`relative w-full ${className}`} ref={ref}>
      <InputField
        label={label || ""}
        placeHolder={placeHolder}
        onValueChange={setQuery}
        value={isFocus ? query : option ? getDisplayName(option) : ""}
        suffix={
          !noDropDownOnClick && (
            <Row>
              <BiX
                className={`w-[20px] ${
                  !light
                    ? "text-slate-200 group-hover:text-slate-100"
                    : "text-blue-950 group-hover:text-blue-800"
                } ${showOptions ? "rotate-180" : ""}`}
                style={{
                  fontSize: "20px",
                }}
                onClick={() => {
                  setOption(undefined);
                }}
              />
              <BiChevronDown
                className={`w-[20px] ${
                  !light
                    ? "text-slate-200 group-hover:text-slate-100"
                    : "text-blue-950 group-hover:text-blue-800"
                } ${showOptions ? "rotate-180" : ""}`}
                style={{
                  fontSize: "20px",
                }}
                onClick={() => setShowOptions(!showOptions)}
              />
            </Row>
          )
        }
        onFocus={() => {
          setShowOptions(true);
          setIsFocus(true);
        }}
        type={type}
      />

      {(showOptions && !noDropDownOnClick && list.length) ||
      (query && list.length) ? (
        <Column
          style={{ "--bot-pos": bottom + "px" } as CSSProperties}
          className={`absolute z-[2] top-[var(--bot-pos)] right-0 border-[1px] w-full max-h-[150px] overflow-y-auto rounded-md border-solid ${
            light ? "border-blue-900" : "border-slate-300"
          } shadow-border ${light ? "shadow-black-200" : "shadow-blue-400"}`}
        >
          {list.map((item, index) => (
            <AutocompleteOption
              key={index}
              value={item}
              setOption={(value) => {
                setIsFocus(false);
                setShowOptions(false);
                setQuery("");
                setOption(value);
              }}
              getDisplayValue={(item: T) => getDisplayName(item)}
            />
          ))}
        </Column>
      ) : (
        <></>
      )}
    </Column>
  );
};
