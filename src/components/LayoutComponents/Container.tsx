import {
  ComponentPropsWithRef,
  FunctionComponent,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
} from "react";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`flex ${className}`}>
      {children}
    </div>
  );
};
