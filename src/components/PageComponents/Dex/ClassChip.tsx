import { Chip } from "@/components/LayoutComponents/Chip";
import clsx from "clsx";
import { FunctionComponent, HTMLProps, ReactNode, useMemo } from "react";

export interface ClassChipProps {
  value: string;
  className?: HTMLProps<"HTMLElement">["className"];
  small?: boolean;
}

export const ClassChip: FunctionComponent<ClassChipProps> = (props) => {
  const color = clsx({
    "bg-physical-gradient from-white to-gray-400": props.value === "physical",
    "bg-special-gradient from-blue-300 to-purple-300":
      props.value === "special",
    "bg-status-gradient from-red-400 to-yellow-200": props.value === "status",
  });

  const contrast = useMemo(
    () =>
      props.value === "physical" ||
      props.value === "status" ||
      props.value === "special",
    [props.value]
  );

  return (
    <Chip
      value={props.value}
      className={`${color}`}
      contrast={contrast}
      small={props.small}
    />
  );
};
