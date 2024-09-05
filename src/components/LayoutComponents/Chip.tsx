import { FunctionComponent, HTMLProps, ReactNode } from "react";
import { Row } from "./Row";
import { Small } from "./Typography";
import { Container } from "./Container";

export interface ChipProps {
  value: string;
  className?: HTMLProps<"HTMLElement">["className"];
  contrast?: boolean;
  suffix?: ReactNode;
}

export const Chip: FunctionComponent<ChipProps> = (props) => {
  return (
    <Row
      className={`flex-row items-center rounded-md w-fit ${props.className} px-2 py-1 min-h-[20px] h-fit gap-1 `}
    >
      <Small
        className={`${props.contrast ? "text-blue-900" : "text-slate-300"}`}
      >
        {props.value.toLocaleUpperCase()}
      </Small>
      {props.suffix && (
        <Container className={`h-full`}>{props.suffix}</Container>
      )}
    </Row>
  );
};
