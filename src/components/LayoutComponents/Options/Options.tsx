import { FunctionComponent, useState } from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { BiChevronDown } from "react-icons/bi";
import { Column } from "../Column";
import { useDarkTheme } from "@/components/Providers";
import { OptionsSelection } from "./OptionsSelection";

export interface OptionsProps {
  list: string[];
  selection?: string;
  setSelection: (value: string) => void;
}

export const Options: FunctionComponent<OptionsProps> = (props) => {
  const { light } = useDarkTheme();

  const [showOptions, setShowOptions] = useState(false);

  return (
    <Column className={`relative w-full`}>
      <Container
        className={`flex direction-row flex-1 items-center w-full h-[40px] border-[1px] rounded-md border-solid ${
          light ? "border-blue-900" : "border-slate-300"
        } ${
          light
            ? "bg-slate-300 hover:bg-slate-200"
            : "bg-blue-500 hover:bg-blue-400"
        } cursor-pointer p-2`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <Span className={`flex-1`}>{props.selection}</Span>
        <BiChevronDown
          className={`w-[20px] ${
            !light
              ? "text-slate-200 group-hover:text-slate-100"
              : "text-blue-950 group-hover:text-blue-800"
          } ${showOptions ? "rotate-180" : ""}`}
          style={{
            fontSize: "20px",
          }}
        />
      </Container>

      {showOptions && props.list.length ? (
        <Column
          className={`absolute z-[2] top-[42px] right-0 border-[1px] overflow-hidden rounded-md border-solid ${
            light ? "border-blue-900" : "border-slate-300"
          }`}
        >
          {props.list.map((item, index) => (
            <OptionsSelection
              key={index}
              value={item}
              setSelection={() => {
                props.setSelection(item);
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
