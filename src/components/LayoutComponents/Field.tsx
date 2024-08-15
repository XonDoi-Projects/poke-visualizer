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
  suffix?: ReactNode;
  disable?: boolean;
  placeHolder?: string;
  className?: HTMLProps<"HTMLElement">["className"];
}
export const Field: FunctionComponent<PropsWithChildren<FieldProps>> = ({
  label,
  errorText,
  helperText,
  disable,
  suffix,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();
  return (
    <Column className={`gap-1 w-full h-full ${className}`}>
      <Span>{label}</Span>
      <Row
        className={`h-full items-center gap-2 rounded border-solid border-2 rounded-md border-solid ${
          light ? "border-blue-900" : "border-slate-300"
        } ${
          light
            ? "bg-slate-300 hover:bg-slate-200"
            : "bg-blue-500 hover:bg-blue-400"
        } px-1 group`}
      >
        {props.children}
        {suffix}
      </Row>
      {(errorText || helperText) && <Small>{errorText || helperText}</Small>}
    </Column>
  );
};
