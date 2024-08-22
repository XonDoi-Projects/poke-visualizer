import { FunctionComponent, PropsWithChildren, ReactNode } from "react";
import { Container } from "./Container";
import { useDarkTheme } from "../Providers";

export interface CoverProps {
  onClick?: () => void;
}

export const Cover: FunctionComponent<PropsWithChildren<CoverProps>> = ({
  children,
  onClick,
}) => {
  const { light } = useDarkTheme();

  return (
    <Container
      className={`h-screen w-screen fixed top-0 left-0 ${
        light ? "bg-indigo-900/[0.75]" : "bg-yellow-900/[0.75]"
      } z-20`}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};
