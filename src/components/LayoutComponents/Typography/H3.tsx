import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface H3Props extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const H3: FunctionComponent<H3Props> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <h3
      {...props}
      className={`flex font-sans font-semibold text-3xl transition-all ${
        light ? "text-blue-800" : "text-slate-300"
      } ${className}`}
    >
      {children}
    </h3>
  );
};
