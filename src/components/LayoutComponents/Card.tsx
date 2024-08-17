import {
  ComponentProps,
  FunctionComponent,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
} from "react";
import { Column } from "./Column";
import { useDarkTheme } from "../Providers";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const Card: FunctionComponent<CardProps> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <Column
      {...props}
      className={`flex ${
        light ? "bg-slate-300" : "bg-gray-800"
      } shadow-border ${
        light ? "shadow-black-200" : "shadow-blue-400"
      } ${className}`}
    >
      {children}
    </Column>
  );
};
