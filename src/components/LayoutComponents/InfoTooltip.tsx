import { FunctionComponent, ReactNode } from "react";
import { Container } from "./Container";
import { useDarkTheme } from "../Providers";

export interface InfoTooltipProps {
  details: ReactNode;
}

export const InfoTooltip: FunctionComponent<InfoTooltipProps> = (props) => {
  const { light } = useDarkTheme();

  return (
    <Container
      className={`absolute top-[100%] left-[50%] transform translate-x-[-50%] w-max-[200px] h-fit p-2 m-2 z-10 ${
        light ? "bg-slate-300" : "bg-gray-800"
      } shadow-border ${light ? "shadow-black-200" : "shadow-blue-400"} `}
    >
      {props.details}
    </Container>
  );
};
