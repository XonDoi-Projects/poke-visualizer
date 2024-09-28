import {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { Column } from "./Column";
import { useDarkTheme, useSize } from "../Providers";
import { Cover } from "./Cover";
import { BiX } from "react-icons/bi";
import { Button } from "./Buttons";
import { Container } from "./Container";

export interface DrawerProps {
  openDirection?: "right" | "left";
  noCover?: boolean;
  show?: boolean;
  onClose?: () => void;
}

export const Drawer: FunctionComponent<PropsWithChildren<DrawerProps>> = ({
  openDirection = "right",
  noCover,
  show,
  onClose,
  children,
}) => {
  const { mobile } = useSize();
  const { light } = useDarkTheme();

  const DrawerCover = () => {
    return (
      <Column
        className={`p-5 absolute h-full ${mobile ? "w-full" : "w-[400px]"} ${
          openDirection === "right" ? "right-0" : "left-0"
        } ${light ? "bg-slate-200" : " bg-gray-900"} shadow-border ${
          light ? "shadow-slate-200" : "shadow-gray-900"
        } overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <Container className={`w-full justify-end`}>
          <Button
            onClick={onClose}
            className={`items-center justify-center rounded-full w-[25px] h-[25px] cursor-pointer transition-all`}
            style={{ padding: "5px" }}
          >
            <BiX
              className={!light ? "text-blue-900" : "text-slate-300"}
              style={{
                fontSize: "24px",
              }}
            />
          </Button>
        </Container>

        {children}
      </Column>
    );
  };

  return (
    show &&
    (!noCover ? (
      <Cover onClick={onClose}>
        <DrawerCover />
      </Cover>
    ) : (
      <DrawerCover />
    ))
  );
};
