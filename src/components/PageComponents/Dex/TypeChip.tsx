import { Row, Small } from "@/components/LayoutComponents";
import { Chip } from "@/components/LayoutComponents/Chip";
import { PokeType } from "@/utils";
import clsx from "clsx";
import { FunctionComponent, HTMLProps, ReactNode, useMemo } from "react";

export interface TypeChipProps {
  value: string;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const TypeChip: FunctionComponent<TypeChipProps> = (props) => {
  const color = clsx({
    "bg-green-500": props.value === "bug",
    "bg-gray-800": props.value === "dark",
    "bg-indigo-700": props.value === "dragon",
    "bg-yellow-500": props.value === "electric",
    "bg-pink-300": props.value === "fairy",
    "bg-red-600": props.value === "fighting",
    "bg-orange-500": props.value === "fire",
    "bg-indigo-300": props.value === "flying",
    "bg-purple-800": props.value === "ghost",
    "bg-green-400": props.value === "grass",
    "bg-yellow-700": props.value === "ground",
    "bg-blue-200": props.value === "ice",
    "bg-blue-400": props.value === "water",
    "bg-purple-600": props.value === "poison",
    "bg-pink-500": props.value === "psychic",
    "bg-yellow-800": props.value === "rock",
    "bg-gray-500": props.value === "steel",
    "bg-gray-400": props.value === "normal",
  });

  return (
    <Chip
      value={props.value}
      className={`${color}`}
      contrast={
        props.value === "bug" ||
        props.value === "grass" ||
        props.value === "flying" ||
        props.value === "electric" ||
        props.value === "fairy" ||
        props.value === "ice" ||
        props.value === "water"
      }
    />
  );
};
