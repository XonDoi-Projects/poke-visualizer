import { FunctionComponent, HTMLProps } from "react";
import { Row } from "./Row";
import { Small } from "./Typography";
import { useDarkTheme } from "../Providers";

export interface ChipProps {
  value: string;
  className?: HTMLProps<"HTMLElement">["className"];
  contrast?: boolean;
}

export const Chip: FunctionComponent<ChipProps> = (props) => {
  return (
    <Row
      className={`flex-row items-center rounded-md w-fit ${props.className} pl-2 pr-2 h-[20px] `}
    >
      <Small
        className={`${props.contrast ? "text-blue-900" : "text-slate-300"}`}
      >
        {props.value.toLocaleUpperCase()}
      </Small>
    </Row>
  );
};
