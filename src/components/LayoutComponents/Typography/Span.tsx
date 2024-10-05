import { useDarkTheme } from "@/components";
import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";

export interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
  swapColor?: boolean;
}

export const Span: FunctionComponent<SpanProps> = ({
  children,
  className,
  swapColor,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <span
      {...props}
      className={`flex font-sans font-semibold text-base transition-all ${
        (light && !swapColor) || (!light && swapColor)
          ? "text-blue-900"
          : "text-slate-300"
      } ${className}`}
    >
      {children}
    </span>
  );
};
