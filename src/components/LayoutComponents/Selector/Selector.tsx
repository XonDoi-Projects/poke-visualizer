import {
  CSSProperties,
  FunctionComponent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { BiChevronDown, BiX } from "react-icons/bi";
import { Column } from "../Column";
import { useDarkTheme } from "@/components/Providers";
import { SelectorOption } from "./SelectorOption";
import { Field, FieldProps } from "../Field";
import { useClickOutside } from "@/components/Hooks";
import { Row } from "../Row";
import { Chip } from "../Chip";

export interface SelectorProps<T> extends FieldProps {
  list: T[];
  options?: T[];
  setOptions: (value: T[]) => void;
  deleteOptions?: (value: T[]) => void;
  isMultipleOption?: boolean;
  ignoreOptionsWhenMultiple?: T[];
  maxOptions?: number;
}

export const Selector: FunctionComponent<SelectorProps<any>> = <T,>({
  list,
  options,
  setOptions,
  deleteOptions,
  isMultipleOption,
  ignoreOptionsWhenMultiple,
  ...props
}: SelectorProps<T>) => {
  const { light } = useDarkTheme();

  const [showOptions, setShowOptions] = useState(false);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const updatedRef = locationRef.current;
  const bottom = useMemo(() => {
    if (updatedRef) {
      return (
        updatedRef.getBoundingClientRect().bottom -
        updatedRef.getBoundingClientRect().top
      );
    }
    return;
  }, [updatedRef]);

  useClickOutside(clickOutsideRef, () => {
    setShowOptions(false);
  });

  const handleDelete = (value: T) => {
    if (options?.length) {
      const index = options?.findIndex((o) => o === value);

      if (index !== undefined && index >= 0) {
        options.splice(index, 1);
        deleteOptions && deleteOptions(options);
      }
    }
  };

  return (
    <Column className={`relative w-full gap-1`} ref={clickOutsideRef}>
      <Field ref={locationRef} {...props}>
        <Container
          className={`flex direction-row flex-1 items-center w-full cursor-pointer bg-transparent h-[30px]`}
          onClick={() => !props.disable && setShowOptions(!showOptions)}
        >
          <Span className={`flex-1`}>
            {options === undefined ||
            (isMultipleOption &&
              !options.every((o) => ignoreOptionsWhenMultiple?.includes(o)))
              ? "Select Option"
              : options?.toString()}
          </Span>

          <BiChevronDown
            className={`w-[20px] ${
              !light
                ? "text-slate-200 group-hover:text-slate-100"
                : "text-blue-900 group-hover:text-blue-800"
            } ${showOptions ? "rotate-180" : ""}`}
            style={{
              fontSize: "20px",
            }}
          />
        </Container>
      </Field>
      {isMultipleOption &&
      !options?.every((o) => ignoreOptionsWhenMultiple?.includes(o)) ? (
        <Row className={`flex-wrap gap-1`}>
          {options?.map((o, index) => (
            <Chip
              key={index}
              small
              value={o?.toString() || ""}
              className={`${light ? "bg-blue-900" : "bg-slate-300"}`}
              contrast={!light}
              suffix={
                <BiX
                  className={`${
                    !light ? "text-blue-900" : "text-slate-300"
                  } text-[14px] cursor-pointer`}
                  onClick={() => handleDelete(o)}
                />
              }
            />
          ))}
        </Row>
      ) : null}

      {showOptions && list.length ? (
        <Column
          style={{ "--bot-pos": bottom + "px" } as CSSProperties}
          className={`absolute z-[2] top-[var(--bot-pos)] right-0 border-[1px] w-full max-h-[150px] overflow-y-auto scrollbar ${
            light ? "light" : "dark"
          } rounded-md border-solid ${
            light ? "border-blue-900" : "border-slate-300"
          } shadow-border ${light ? "shadow-black-200" : "shadow-zinc-500"}`}
        >
          {list.map((item, index) => (
            <SelectorOption
              key={index}
              value={item}
              setOption={(value) => {
                setOptions([value]);
                setShowOptions(false);
              }}
            />
          ))}
        </Column>
      ) : (
        <></>
      )}
    </Column>
  );
};
