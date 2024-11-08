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
  label?: string;
  errorText?: string;
  helperText?: string;
  elementPrefix?: ReactNode;
  elementSuffix?: ReactNode;
  disable?: boolean;
  placeHolder?: string;
  fieldType?: "normal" | "transparent";
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
        fieldType,
        className,
        ...props
      },
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const { light } = useDarkTheme();

      return (
        <Column ref={ref} className={`w-full ${className || ""}`}>
          {label && <Span>{label}</Span>}
          <Row
            className={`w-full items-center gap-1 rounded border-solid border-[1px] rounded-md ${
              light ? "border-blue-900" : "border-slate-300"
            } ${
              fieldType !== "transparent"
                ? light
                  ? "bg-slate-300 hover:bg-slate-200"
                  : "bg-gray-800 hover:bg-gray-700"
                : ""
            } px-1 group transition-all`}
          >
            {elementPrefix || null}
            {props.children}
            {elementSuffix || null}
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
