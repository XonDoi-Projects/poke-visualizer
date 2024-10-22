import {
  ForwardedRef,
  FunctionComponent,
  RefAttributes,
  forwardRef,
} from "react";
import { Container, ContainerProps } from "./Container";

export interface RowProps
  extends RefAttributes<HTMLDivElement>,
    ContainerProps {}

export const Row: FunctionComponent<RowProps> = forwardRef(
  ({ className, children, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Container ref={ref} {...props} className={`flex-row ${className}`}>
        {children}
      </Container>
    );
  }
);

Row.displayName = "Row";
