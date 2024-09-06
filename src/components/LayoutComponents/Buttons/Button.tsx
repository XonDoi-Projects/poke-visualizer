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
  type,
  onClick,
  disable,
  tooltip,
  tooltipDetails,
  ...props
}) => {
  const { light } = useDarkTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Container className={``}>
      <button
        {...props}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setShowTooltip(false)}
        onPointerEnter={() => setShowTooltip(true)}
        onPointerLeave={() => setShowTooltip(false)}
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
              ? `bg-blue-950 ${!disable ? "hover:bg-blue-800" : ""}`
              : `bg-yellow-500 ${!disable ? "hover:bg-yellow-400" : ""}`
            : type === "outlined"
            ? light
              ? `bg-transparent border-2 border-solid border-blue-950 ${
                  !disable ? "hover:border-blue-800" : ""
                }`
              : `bg-transparent border-2 border-solid border-yellow-500 ${
                  !disable ? "hover:border-yellow-400" : ""
                }`
            : light
            ? `bg-transparent ${!disable ? "hover:bg-blue-800/20" : ""}`
            : `bg-transparent ${!disable ? "hover:bg-yellow-400/20" : ""}`
        } ${disable ? "opacity-20" : ""} ${className} `}
      >
        {typeof children === "string" ? (
          <Span
            className={`${
              type === "outlined"
                ? light
                  ? "!text-blue-950 group-hover:!text-blue-800"
                  : "!text-gray-400 group-hover:!text-gray-300"
                : light
                ? "!text-gray-400 group-hover:!text-gray-300"
                : "!text-blue-950 group-hover:!text-blue-800"
            }`}
          >
            {children}
          </Span>
        ) : (
          children
        )}
      </button>{" "}
      {tooltip && showTooltip ? (
        <InfoTooltip details={tooltipDetails} />
      ) : (
        <></>
      )}
    </Container>
  );
};

Button.defaultProps = { type: "contained" };
