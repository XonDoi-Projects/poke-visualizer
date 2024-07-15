import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface SmallProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const Small: FunctionComponent<SmallProps> = ({
  children,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();

  return (
    <span
      {...props}
      className={`flex font-sans font-semibold text-base ${
        light ? "text-blue-900" : "text-slate-300"
      } ${className}`}
    >
      <small>{children}</small>
    </span>
  );
};