import { FunctionComponent, useState } from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components/Providers";

export interface AutocompleteOptionProps<T> {
  value: T;
  setOption: (value: T) => void;
  getDisplayValue: (value: T) => string;
}

export const AutocompleteOption: FunctionComponent<
  AutocompleteOptionProps<any>
> = <T,>({ value, setOption, getDisplayValue }: AutocompleteOptionProps<T>) => {
  const { light } = useDarkTheme();

  return (
    <Container
      className={`flex direction-row flex-1 items-center w-full h-[30px] ${
        light
          ? "bg-slate-300 hover:bg-slate-400"
          : "bg-blue-500 hover:bg-blue-600"
      } cursor-pointer p-2`}
      onClick={() => setOption(value)}
    >
      <Span className={`flex-1`}>{getDisplayValue(value)}</Span>
    </Container>
  );
};
