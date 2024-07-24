import { FunctionComponent, useState } from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components/Providers";

export interface OptionsSelectionProps {
  value: string;
  setSelection: () => void;
}

export const OptionsSelection: FunctionComponent<OptionsSelectionProps> = (
  props
) => {
  const { light } = useDarkTheme();

  return (
    <Container
      className={`flex direction-row flex-1 items-center w-full h-[30px] ${
        light
          ? "bg-slate-300 hover:bg-slate-400"
          : "bg-blue-500 hover:bg-blue-600"
      } cursor-pointer p-2`}
      onClick={props.setSelection}
    >
      <Span className={`flex-1`}>{props.value}</Span>
    </Container>
  );
};
