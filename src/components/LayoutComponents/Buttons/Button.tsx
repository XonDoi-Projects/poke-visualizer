import {
  FunctionComponent,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
  useState,
} from "react";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components";
import { Container } from "../Container";
import { InfoTooltip } from "../InfoTooltip";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
  type?: "contained" | "outlined" | "text";
  disable?: boolean;
  tooltip?: boolean;
  tooltipDetails?: ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  type = "contained",
  onClick,
  disable,
  tooltip,
  tooltipDetails,
  ...props
}) => {
  const { light } = useDarkTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const [hoveringTooltip, setHoveringTooltip] = useState(false);

  return (
    <Container
      onTouchStart={() => setShowTooltip(true)}
      onTouchEnd={() => setShowTooltip(false)}
      onPointerEnter={() => setShowTooltip(true)}
      onPointerLeave={() => {
        if (!hoveringTooltip) {
          setShowTooltip(false);
        }
      }}
      className={`relative`}
    >
      <button
        {...props}
        onClick={(e) => {
          if (!disable) {
            onClick && onClick(e);
          }
        }}
        className={`flex flex-row max-w-[100px] px-[10px] py-[5px] rounded justify-center items-center ${
          !disable ? "cursor-pointer" : "cursor-auto"
        } transition-all group ${
          type === "contained"
            ? light
              ? `bg-blue-900 ${!disable ? "hover:bg-blue-800" : ""}`
              : `bg-slate-300 ${!disable ? "hover:bg-slate-400" : ""}`
            : type === "outlined"
            ? light
              ? `bg-transparent border-2 border-solid border-blue-900 ${
                  !disable ? "hover:border-blue-800" : ""
                }`
              : `bg-transparent border-2 border-solid border-slate-300 ${
                  !disable ? "hover:border-slate-400" : ""
                }`
            : light
            ? `bg-transparent ${!disable ? "hover:bg-blue-800/20" : ""}`
            : `bg-transparent ${!disable ? "hover:bg-slate-400/20" : ""}`
        } ${disable ? "opacity-20" : ""} ${className} `}
      >
        {typeof children === "string" ? (
          <Span
            className={`${
              type === "outlined"
                ? light
                  ? "!text-blue-900 group-hover:!text-blue-800"
                  : "!text-gray-400 group-hover:!text-gray-300"
                : light
                ? "!text-gray-400 group-hover:!text-gray-300"
                : "!text-blue-900 group-hover:!text-blue-800"
            }`}
          >
            {children}
          </Span>
        ) : (
          children
        )}
      </button>
      {tooltip && (showTooltip || hoveringTooltip) ? (
        <InfoTooltip
          details={tooltipDetails}
          setShowTooltip={setShowTooltip}
          setHoveringTooltip={setHoveringTooltip}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};
