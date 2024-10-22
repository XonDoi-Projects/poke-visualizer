import {
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLProps,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
} from "react";
import { Column } from "./Column";
import { Small, Span } from "./Typography";
import { Row } from "./Row";
import { useDarkTheme } from "../Providers";

export interface FieldProps extends RefAttributes<HTMLDivElement> {
  label: string;
  errorText?: string;
  helperText?: string;
  elementPrefix?: ReactNode;
  elementSuffix?: ReactNode;
  disable?: boolean;
  placeHolder?: string;
  type?: "normal" | "transparent";
  className?: HTMLProps<"HTMLElement">["className"];
}
export const Field: FunctionComponent<PropsWithChildren<FieldProps>> =
  forwardRef(
    (
      {
        label,
        errorText,
        helperText,
        disable,
        elementPrefix,
        elementSuffix,
        type,
        className,
        ...props
      },
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const { light } = useDarkTheme();

      return (
        <Column ref={ref} className={`gap-1 w-full ${className}`}>
          {label && <Span>{label}</Span>}
          <Row
            className={`items-center gap-1 rounded border-solid border-[1px] rounded-md ${
              light ? "border-blue-900" : "border-slate-300"
            } ${
              type !== "transparent"
                ? light
                  ? "bg-slate-300 hover:bg-slate-200"
                  : "bg-gray-800 hover:bg-gray-700"
                : ""
            } px-2 group transition-all`}
          >
            {elementPrefix}
            {props.children}
            {elementSuffix}
          </Row>
          {(errorText || helperText) && (
            <Small className={light ? "text-blue-900" : "text-slate-300"}>
              {errorText || helperText}
            </Small>
          )}
        </Column>
      );
    }
  );

Field.displayName = "Field";
