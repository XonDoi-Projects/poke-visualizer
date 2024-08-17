import { useDarkTheme } from "@/components/Providers";
import {
  ChangeEvent,
  FunctionComponent,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
} from "react";
import { Field, FieldProps } from "../Field";

export interface InputFieldProps
  extends HTMLAttributes<HTMLInputElement>,
    FieldProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: HTMLProps<"HTMLElement">["className"];
}

export const InputField: FunctionComponent<InputFieldProps> = ({
  label,
  errorText,
  helperText,
  suffix,
  value,
  onValueChange,
  disable,
  placeHolder,
  type,
  className,
  ...props
}) => {
  const { light } = useDarkTheme();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.currentTarget.value);
  };

  return (
    <Field
      label={label}
      errorText={errorText}
      helperText={helperText}
      suffix={suffix}
      type={type}
    >
      <input
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={`w-full h-[20px] justify-center outline-0 items-center px-[10px]  ${
          !disable ? "cursor-text" : "cursor-auto"
        } transition-all bg-transparent
         ${
           light
             ? `text-blue-950 ${!disable ? "hover:text-blue-800" : ""}`
             : `text-slate-300 ${!disable ? "hover:text-slate-200" : ""}`
         }
        ${
          light
            ? `placeholder-blue-950 ${
                !disable ? "hover:placeholder-blue-800" : ""
              }`
            : `placeholder-slate-300 ${
                !disable ? "hover:placeholder-slate-200" : ""
              }`
        }
         ${disable ? "opacity-20" : ""} ${className} `}
      />
    </Field>
  );
};
