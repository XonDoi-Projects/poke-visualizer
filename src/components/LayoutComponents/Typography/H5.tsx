import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface H5Props extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const H5: FunctionComponent<H5Props> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <h5
      {...props}
      className={`flex font-sans font-semibold text-xl transition-all ${
        light ? "text-blue-900" : "text-slate-300"
      } ${className}`}
    >
      {children}
    </h5>
  );
};
