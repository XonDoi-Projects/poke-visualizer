import { FunctionComponent, ReactNode } from "react";
import { Button, Column, Container, Small } from "../LayoutComponents";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useDarkTheme } from "..";
import Link from "next/link";

export interface PageProps {
  children: ReactNode;
}

export const Page: FunctionComponent<PageProps> = (props) => {
  const { light } = useDarkTheme();

  return (
    <Column className="h-screen w-screen">
      <Header />

      <Column
        id="main-content"
        className={`h-fit w-screen flex-1 ${
          light ? "bg-slate-200" : " bg-gray-900"
        } overflow-auto gap-5`}
      >
        <Column className={`relative flex-1 items-center`}>
          <Column className={"flex-1 p-5 max-w-[1440px] w-full"}>
            {props.children}
          </Column>
          <Container className={`absolute bottom-[-5px] left-[10px]`}>
            <Link href={"https://buymeacoffee.com/nathanmagro"} target="_blank">
              {" "}
              <Button className={`px-[5px] py-[5px] rounded-full`}>
                <Small>Buy me a coffee</Small>
              </Button>
            </Link>
          </Container>
        </Column>
        <Footer />
      </Column>
    </Column>
  );
};
