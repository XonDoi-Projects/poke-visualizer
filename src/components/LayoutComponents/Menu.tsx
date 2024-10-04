import { FunctionComponent, ReactNode } from "react";
import { Container } from "./Container";
import { useDarkTheme, useSize } from "../Providers";
import clsx from "clsx";
import { Row } from "./Row";
import { Span } from "./Typography";
import { Card } from "./Card";
import Link from "next/link";
import { Cover } from "./Cover";
import { BiX } from "react-icons/bi";
import { Button } from "./Buttons";

export type MenuItem = {
  icon: ReactNode;
  label: string;
  link: string;
};

export interface MenuProps {
  menuItems: MenuItem[];
  onClose: () => void;
}

export const Menu: FunctionComponent<MenuProps> = ({ menuItems, onClose }) => {
  const { mobile } = useSize();
  const { light } = useDarkTheme();

  const dimensions = clsx({
    "h-fit w-screen": mobile === true,
    "h-fit w-[200px]": mobile === false,
  });

  const position = clsx({
    "top-[0px] right-[0px]": mobile === true,
    "top-[100%] right-[0px]": mobile === false,
  });

  const menu = menuItems.map((item, index, arr) => (
    <Link
      key={index}
      href={item.link}
      className={`p-2 cursor-pointer transition-all ${
        light ? "hover:bg-slate-200" : "hover:bg-gray-700"
      }  ${
        index < arr.length - 1
          ? `border-b-[1px] ${
              light ? "border-blue-900/10" : "border-slate-300/10"
            }`
          : ""
      }`}
    >
      <Row className={`h-[30px] w-full gap-3 items-center cursor-pointer`}>
        {item.icon}
        <Span>{item.label}</Span>
      </Row>
    </Link>
  ));

  return mobile ? (
    <Cover onClick={onClose}>
      <Card
        className={`absolute ${dimensions} ${position} rounded-b-md overflow-hidden`}
      >
        <Row
          className={`w-full flex-row-reverse p-2 border-b-[1px] ${
            light ? "border-blue-900/10" : "border-slate-300/10"
          }`}
        >
          <Button
            className={`rounded-full h-[30px] w-[30px] px-[5px] py-[5px]`}
            onClick={onClose}
          >
            <BiX
              className={
                !light
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "24px" }}
            />
          </Button>
        </Row>

        {menu}
      </Card>
    </Cover>
  ) : (
    <Card
      className={`absolute ${dimensions} ${position} rounded-md overflow-hidden`}
    >
      {menu}
    </Card>
  );
};
