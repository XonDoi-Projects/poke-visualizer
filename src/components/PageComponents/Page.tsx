import { FunctionComponent, ReactNode } from "react";
import { Column, H2, H3, Row } from "../LayoutComponents";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useDarkTheme } from "..";

export interface PageProps {
  children: ReactNode;
}

export const Page: FunctionComponent<PageProps> = (props) => {
  const { light } = useDarkTheme();
  return (
    <Column className="h-screen w-screen">
      <Header />
      <Column
        className={`h-fit flex-1 ${
          light ? "bg-slate-200" : " bg-gray-900"
        } overflow-auto gap-5`}
      >
        <Column className={"flex-1 p-5"}>
          <H2>Welcome to PokeVis</H2>
          {props.children}
        </Column>
        <Footer />
      </Column>
    </Column>
  );
};
