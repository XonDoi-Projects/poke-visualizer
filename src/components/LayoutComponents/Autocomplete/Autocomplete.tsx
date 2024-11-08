import {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "../Container";
import { BiChevronDown, BiX } from "react-icons/bi";
import { Column } from "../Column";
import { useDarkTheme } from "@/components/Providers";
import { FieldProps } from "../Field";
import { InputField } from "../Inputs";
import { Row } from "../Row";
import { AutocompleteOption } from "./AutocompleteOption";
import { useClickOutside } from "@/components/Hooks";

export interface AutocompleteProps<T> extends FieldProps {
  list: T[];
  option?: T;
  setOption: (value: T | undefined) => void;
  setSearch: (value: string) => void;
  getDisplayName: (value: T) => string;
  noDropDownOnClick?: boolean;
  loading?: boolean;
}

export const Autocomplete: FunctionComponent<AutocompleteProps<any>> = <T,>({
  list,
  option,
  setOption,
  setSearch,
  getDisplayName,
  className,
  noDropDownOnClick,
  fieldType,
  placeHolder,
  label,
  disable,
  loading,
  elementPrefix,
  helperText,
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
      timeout = setTimeout(() => setSearch(query), 300);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [query, setSearch]);

  useClickOutside(ref, () => {
    setIsFocus(false);
    setShowOptions(false);
    setSearch("");
    setQuery("");
  });

  return (
    <Column
      className={`relative w-full ${className} ${
        disable ? "pointer-events-none" : ""
      }`}
      ref={ref}
    >
      <InputField
        label={label || ""}
        placeHolder={placeHolder}
        onValueChange={setQuery}
        value={isFocus ? query : option ? getDisplayName(option) : ""}
        helperText={helperText}
        elementPrefix={elementPrefix}
        elementSuffix={
          !noDropDownOnClick && (
            <Row>
              <BiX
                className={`w-[20px] ${
                  !light
                    ? "text-slate-200 group-hover:text-slate-100"
                    : "text-blue-900 group-hover:text-blue-800"
                } ${showOptions ? "rotate-180" : ""}`}
                style={{
                  fontSize: "20px",
                }}
                onClick={() => {
                  setOption(undefined);
                  setQuery("");
                  setSearch("");
                }}
              />
              <BiChevronDown
                className={`w-[20px] ${
                  !light
                    ? "text-slate-200 group-hover:text-slate-100"
                    : "text-blue-900 group-hover:text-blue-800"
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
        fieldType={fieldType}
        disable={disable}
      />

      {loading && showOptions ? (
        <Column
          style={{ "--bot-pos": bottom + "px" } as CSSProperties}
          className={`absolute z-[2] top-[var(--bot-pos)] right-0 border-[1px] w-full max-h-[150px] h-[100px] rounded-md border-solid ${
            light ? "border-blue-900" : "border-slate-300"
          } shadow-border ${light ? "shadow-black-200" : "shadow-zinc-500"} ${
            light ? "bg-slate-300" : "bg-gray-800"
          } items-center justify-center`}
        >
          <Container
            className={`w-[30px] h-[30px] border-4 ${
              light ? "border-blue-900" : "border-slate-300"
            } border-t-transparent rounded-full animate-spin `}
          />
        </Column>
      ) : (showOptions && !noDropDownOnClick && list.length) ||
        (query && list.length) ? (
        <Column
          style={{ "--bot-pos": bottom + "px" } as CSSProperties}
          className={`absolute z-[2] top-[var(--bot-pos)] right-0 border-[1px] w-full max-h-[150px] overflow-y-auto scrollbar ${
            light ? "light" : "dark"
          } rounded-md border-solid ${
            light ? "border-blue-900" : "border-slate-300"
          } shadow-border ${light ? "shadow-black-200" : "shadow-zinc-500"}`}
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
