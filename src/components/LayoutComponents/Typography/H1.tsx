import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface H1Props extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const H1: FunctionComponent<H1Props> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <h1
      {...props}
      className={`flex font-sans font-semibold text-5xl transition-all ${
        light ? "text-blue-600" : "text-slate-300"
      } ${className}`}
    >
      {children}
    </h1>
  );
};
