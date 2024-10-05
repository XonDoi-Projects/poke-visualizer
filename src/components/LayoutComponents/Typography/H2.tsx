import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface H2Props extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const H2: FunctionComponent<H2Props> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <h2
      {...props}
      className={`flex font-sans font-semibold text-4xl transition-all ${
        light ? "text-blue-800" : "text-slate-300"
      } ${className}`}
    >
      {children}
    </h2>
  );
};
