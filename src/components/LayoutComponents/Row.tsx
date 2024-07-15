import { FunctionComponent, HTMLProps, ReactNode } from "react";
import { Container } from "./Container";

export interface RowProps {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const Row: FunctionComponent<RowProps> = (props) => {
  return (
    <Container className={`flex-row ${props.className}`}>
      {props.children}
    </Container>
  );
};
