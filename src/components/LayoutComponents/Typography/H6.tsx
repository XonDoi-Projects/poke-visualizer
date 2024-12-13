import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface H6Props extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const H6: FunctionComponent<H6Props> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <h6
      {...props}
      className={`flex font-sans font-semibold text-l transition-all ${
        light ? "text-blue-900" : "text-slate-300"
      } ${className}`}
    >
      {children}
    </h6>
  );
};
