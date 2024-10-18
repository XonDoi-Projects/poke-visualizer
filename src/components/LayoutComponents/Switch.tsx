import { FunctionComponent, HTMLProps, useState } from "react";
import { Row } from "./Row";
import { Small } from "./Typography";
import { Container } from "./Container";
import { useDarkTheme } from "../Providers";

export interface SwitchProps {
  className?: HTMLProps<"HTMLElement">["className"];
  onClick?: () => void;
  value: string;
  switchPosition?: "left" | "right";
}

export const Switch: FunctionComponent<SwitchProps> = (props) => {
  const { light } = useDarkTheme();
  const [active, setActive] = useState(false);

  return (
    <Row
      onClick={() => {
        props.onClick && props.onClick();
        setActive(!active);
      }}
      className={`items-center w-fit ${props.className} gap-2 ${
        props.switchPosition === "left" ? "flex-row" : "flex-row-reverse"
      } cursor-pointer`}
    >
      <Container
        className={`relative box-content w-[40px] h-[20px] rounded-full ${
          light
            ? active
              ? "bg-blue-900/40"
              : "bg-blue-900/0"
            : active
            ? "bg-slate-300/40"
            : "bg-slate-300/0"
        } border-[1px] border-solid ${
          light ? "border-blue-900" : "border-slate-300"
        } `}
      >
        <Container
          className={`absolute w-[20px] h-[20px] transition-all top-0 left-0 ${
            active ? "translate-x-[100%]" : "translate-x-[0%]"
          } ${light ? "bg-blue-900" : "bg-slate-300"} rounded-full`}
        />
      </Container>

      <Small className={`${light ? "text-blue-900" : "text-slate-300"}`}>
        {props.value.toLocaleUpperCase()}
      </Small>
    </Row>
  );
};
