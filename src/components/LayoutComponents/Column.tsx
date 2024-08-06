import {
  ForwardedRef,
  FunctionComponent,
  HTMLProps,
  ReactNode,
  RefAttributes,
  forwardRef,
} from "react";
import { Container, ContainerProps } from "./Container";

export interface ColumnProps
  extends RefAttributes<HTMLDivElement>,
    ContainerProps {}

export const Column: FunctionComponent<ColumnProps> = forwardRef(
  ({ className, children, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Container ref={ref} {...props} className={`flex-col ${className}`}>
        {children}
      </Container>
    );
  }
);
