import { FunctionComponent, useState } from "react";
import { Container } from "../Container";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components/Providers";

export interface SelectorOptionProps<T> {
  value: T;
  setOption: (value: T) => void;
}

export const SelectorOption: FunctionComponent<SelectorOptionProps<any>> = <
  T,
>({
  value,
  setOption,
}: SelectorOptionProps<T>) => {
  const { light } = useDarkTheme();

  return (
    <Container
      className={`flex direction-row flex-1 items-center w-full h-[30px] ${
        light
          ? "bg-slate-300 hover:bg-slate-400"
          : "bg-gray-800 hover:bg-gray-700"
      } cursor-pointer p-2`}
      onClick={() => setOption(value)}
    >
      <Span className={`flex-1`}>
        {value !== undefined ? value?.toString() : ""}
      </Span>
    </Container>
  );
};
