import {
  ForwardedRef,
  FunctionComponent,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
  RefAttributes,
  forwardRef,
} from "react";

export interface ContainerProps
  extends RefAttributes<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const Container: FunctionComponent<ContainerProps> = forwardRef(
  ({ children, className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`flex no-tap-highlight ${className}`}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
