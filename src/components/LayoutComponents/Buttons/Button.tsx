import { FunctionComponent, HTMLAttributes, HTMLProps, ReactNode } from "react";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: HTMLProps<"HTMLElement">["className"];
  type?: "contained" | "outlined";
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  type,
  ...props
}) => {
  const { light } = useDarkTheme();

  return (
    <button
      {...props}
      className={`flex flex-row max-w-[100px] h-[40px] px-[10px] py-[5px] rounded justify-center items-center cursor-pointer transition-all group ${
        type === "contained"
          ? light
            ? "bg-blue-950 hover:bg-blue-800"
            : "bg-yellow-500 hover:bg-yellow-400"
          : light
          ? "bg-transparent border-2 border-solid border-blue-950 hover:border-blue-800"
          : "bg-transparent border-2 border-solid border-yellow-500 hover:border-yellow-400"
      } ${className}`}
    >
      {typeof children === "string" ? (
        <Span
          className={`${
            type === "outlined"
              ? light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-yellow-500 group-hover:text-yellow-400"
              : light
              ? "text-yellow-500 group-hover:text-yellow-400"
              : "text-blue-950 group-hover:text-blue-800"
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
