import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";
import { Container } from "./Container";

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const Column: FunctionComponent<ColumnProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Container {...props} className={`flex-col ${className}`}>
      {children}
    </Container>
  );
};
