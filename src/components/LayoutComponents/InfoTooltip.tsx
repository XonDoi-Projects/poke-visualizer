import { FunctionComponent, ReactNode } from "react";
import { useDarkTheme } from "../Providers";
import { Column } from "./Column";
import { Container } from "./Container";

export interface InfoTooltipProps {
  details: ReactNode;
  setShowTooltip: (value: boolean) => void;
  setHoveringTooltip: (value: boolean) => void;
}

export const InfoTooltip: FunctionComponent<InfoTooltipProps> = (props) => {
  const { light } = useDarkTheme();

  return (
    <Column
      onTouchStart={(e) => {
        e.stopPropagation();
        props.setShowTooltip(true);
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        props.setShowTooltip(false);
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        props.setShowTooltip(true);
        props.setHoveringTooltip(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        props.setShowTooltip(false);
        props.setHoveringTooltip(false);
      }}
      className={`absolute top-[100%] left-[50%] transform translate-x-[-50%] w-max max-w-[200px] z-10 p-2 `}
    >
      <Container
        className={` rounded h-fit p-2 ${
          light ? "bg-slate-300" : "bg-gray-800"
        } shadow-border ${light ? "shadow-black-200" : "shadow-zinc-500"}`}
      >
        {props.details}
      </Container>
    </Column>
  );
};
