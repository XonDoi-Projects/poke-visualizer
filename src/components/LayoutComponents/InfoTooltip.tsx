import { FunctionComponent, ReactNode } from "react";
import { Container } from "./Container";
import { useDarkTheme } from "../Providers";
import { Column } from "./Column";

export interface InfoTooltipProps {
  details: ReactNode;
  setShowTooltip: (value: boolean) => void;
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
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        props.setShowTooltip(false);
      }}
      className={`absolute top-[100%] left-[50%] rounded transform translate-x-[-50%] w-max max-w-[200px] overflow-hidden h-fit p-2 z-10 ${
        light ? "bg-slate-300" : "bg-gray-800"
      } shadow-border ${light ? "shadow-black-200" : "shadow-blue-400"} `}
    >
      {props.details}
    </Column>
  );
};
