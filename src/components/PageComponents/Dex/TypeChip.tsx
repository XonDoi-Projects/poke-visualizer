import { Chip } from "@/components/LayoutComponents/Chip";
import clsx from "clsx";
import { FunctionComponent, HTMLProps, useMemo } from "react";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";

export interface TypeChipProps {
  value: string;
  className?: HTMLProps<"HTMLElement">["className"];
  type?: "double" | "quadruple" | "half" | "quarter";
}

export const TypeChip: FunctionComponent<TypeChipProps> = (props) => {
  const color = clsx({
    "bg-green-500": props.value === "bug",
    "bg-gray-900": props.value === "dark",
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

  const contrast = useMemo(
    () =>
      props.value === "bug" ||
      props.value === "grass" ||
      props.value === "flying" ||
      props.value === "electric" ||
      props.value === "fairy" ||
      props.value === "ice" ||
      props.value === "normal" ||
      props.value === "water",
    [props.value]
  );

  return (
    <Chip
      value={props.value}
      className={`${color}`}
      contrast={contrast}
      suffix={
        props.type === "double" ? (
          <FaAngleDown
            className={`${
              contrast ? "text-blue-900" : "text-slate-300"
            } text-[14px]`}
          />
        ) : props.type === "half" ? (
          <FaAngleUp
            className={`${
              contrast ? "text-blue-900" : "text-slate-300"
            } text-[14px]`}
          />
        ) : props.type === "quadruple" ? (
          <FaAngleDoubleDown
            className={`${
              contrast ? "text-blue-900" : "text-slate-300"
            } text-[14px]`}
          />
        ) : props.type === "quarter" ? (
          <FaAngleDoubleUp
            className={`${
              contrast ? "text-blue-900" : "text-slate-300"
            } text-[14px]`}
          />
        ) : undefined
      }
    />
  );
};
