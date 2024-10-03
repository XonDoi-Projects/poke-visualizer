import {
  CSSProperties,
  FunctionComponent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { BiChevronDown } from "react-icons/bi";
import { Column } from "../Column";
import { useDarkTheme } from "@/components/Providers";
import { SelectorOption } from "./SelectorOption";
import { Field, FieldProps } from "../Field";
import { useClickOutside } from "@/components/Hooks";

export interface SelectorProps<T> extends FieldProps {
  list: T[];
  option?: T;
  setOption: (value: T) => void;
}

export const Selector: FunctionComponent<SelectorProps<any>> = <T,>({
  list,
  option,
  setOption,
  ...props
}: SelectorProps<T>) => {
  const { light } = useDarkTheme();

  const [showOptions, setShowOptions] = useState(false);
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

  useClickOutside(ref, () => {
    setShowOptions(false);
  });

  return (
    <Column className={`relative w-full`} ref={ref}>
      <Field {...props}>
        <Container
          className={`flex direction-row flex-1 items-center w-full cursor-pointer bg-transparent`}
          onClick={() => setShowOptions(!showOptions)}
        >
          <Span className={`flex-1`}>
            {option !== undefined ? option?.toString() : "Select Region"}
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

      {showOptions && list.length ? (
        <Column
          style={{ "--bot-pos": bottom + "px" } as CSSProperties}
          className={`absolute z-[2] top-[var(--bot-pos)] right-0 border-[1px] w-[150px] max-h-[150px] overflow-y-auto rounded-md border-solid ${
            light ? "border-blue-900" : "border-slate-300"
          } shadow-border ${light ? "shadow-black-200" : "shadow-zinc-500"}`}
        >
          {list.map((item, index) => (
            <SelectorOption
              key={index}
              value={item}
              setOption={(value) => {
                setOption(value);
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
