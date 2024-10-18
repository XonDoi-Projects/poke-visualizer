import { FunctionComponent, HTMLProps, PropsWithChildren } from "react";
import { Container } from "./Container";
import { useDarkTheme } from "../Providers";

export interface CoverProps {
  className?: HTMLProps<"HTMLElement">["className"];
  onClick?: () => void;
}

export const Cover: FunctionComponent<PropsWithChildren<CoverProps>> = ({
  onClick,
  ...props
}) => {
  const { light } = useDarkTheme();

  return (
    <Container
      className={`h-screen w-screen fixed top-0 left-0 ${
        light ? "bg-indigo-900/[0.75]" : "bg-zinc-500/[0.75]"
      } z-20 ${props.className}`}
      onClick={onClick}
    >
      {props.children}
    </Container>
  );
};
