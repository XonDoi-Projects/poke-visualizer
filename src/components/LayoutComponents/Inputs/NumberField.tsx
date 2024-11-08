import { useDarkTheme } from "@/components/Providers";
import {
  ChangeEvent,
  FunctionComponent,
  HTMLProps,
  InputHTMLAttributes,
  useMemo,
} from "react";
import { Field, FieldProps } from "../Field";

export interface NumberFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FieldProps {
  value: string;
  onValueChange: (value?: string) => void;
  className?: HTMLProps<"HTMLElement">["className"];
  fieldClassName?: HTMLProps<"HTMLInputElement">["className"];
}

export const NumberField: FunctionComponent<NumberFieldProps> = ({
  ref,
  label,
  errorText,
  helperText,
  elementPrefix,
  elementSuffix,
  value,
  onValueChange,
  disable,
  placeHolder,
  fieldType,
  className,
  fieldClassName,
  style,
  ...props
}) => {
  const { light } = useDarkTheme();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disable && e.currentTarget.value.match(/[0-9]+/g)) {
      onValueChange(e.currentTarget.value);
    } else if (!disable && !e.currentTarget.value) {
      onValueChange(undefined);
    }
  };

  const width = useMemo(() => {
    if (style?.width) {
      return style.width as number;
    }
  }, [style?.width]);

  return (
    <Field
      label={label}
      errorText={errorText}
      helperText={helperText}
      elementPrefix={elementPrefix}
      elementSuffix={elementSuffix}
      fieldType={fieldType}
      className={className}
    >
      <input
        {...props}
        type="number"
        style={{ ...style, width: width ? width + "px" : "100%" }}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={` h-[30px] justify-center outline-0 items-center px-[5px] ${
          !disable ? "cursor-text" : "cursor-auto"
        } transition-all bg-transparent
         ${
           light
             ? `text-blue-900 ${!disable ? "hover:text-blue-800" : ""}`
             : `text-slate-300 ${!disable ? "hover:text-slate-200" : ""}`
         }
        ${
          light
            ? `placeholder-blue-900/50 ${
                !disable ? "hover:placeholder-blue-800/50" : ""
              }`
            : `placeholder-slate-300/50 ${
                !disable ? "hover:placeholder-slate-200/50" : ""
              }`
        }
         ${disable ? "opacity-20" : ""} ${fieldClassName} `}
      />
    </Field>
  );
};
