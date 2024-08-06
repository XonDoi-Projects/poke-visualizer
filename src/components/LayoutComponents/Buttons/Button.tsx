import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
  type?: "contained" | "outlined";
  disable?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
  disable,
  ...props
}) => {
  const { light } = useDarkTheme();

  return (
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
            ? `bg-blue-950 ${!disable ? "hover:bg-blue-800" : ""}`
            : `bg-yellow-500 ${!disable ? "hover:bg-yellow-400" : ""}`
          : light
          ? `bg-transparent border-2 border-solid border-blue-950 ${
              !disable ? "hover:border-blue-800" : ""
            }`
          : `bg-transparent border-2 border-solid border-yellow-500 ${
              !disable ? "hover:border-yellow-400" : ""
            }`
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
    </button>
  );
};

Button.defaultProps = { type: "contained" };
