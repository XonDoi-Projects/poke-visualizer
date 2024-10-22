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
  return (
    <span
      {...props}
      className={`flex font-sans font-semibold text-base leading-3 transition-all ${className} `}
    >
      <small>{children}</small>
    </span>
  );
};
