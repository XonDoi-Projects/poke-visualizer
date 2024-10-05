import {
  FunctionComponent,
  HTMLProps,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Column } from "./Column";
import { Small, Span } from "./Typography";
import { Row } from "./Row";
import { useDarkTheme } from "../Providers";

export interface FieldProps {
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
export const Field: FunctionComponent<PropsWithChildren<FieldProps>> = ({
  label,
  errorText,
  helperText,
  disable,
  elementPrefix,
  elementSuffix,
  type,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();

  return (
    <Column className={`gap-1 w-full h-full ${className}`}>
      {label && <Span>{label}</Span>}
      <Row
        className={`h-[40px] items-center gap-1 rounded border-solid border-[1px] rounded-md ${
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
};
