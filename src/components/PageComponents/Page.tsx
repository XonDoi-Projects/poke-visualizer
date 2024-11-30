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
    <Column className="h-[100dvh] w-screen">
      <Header />

      <Column
        id="main-content"
        className={`h-fit w-screen flex-1 ${
          light ? "bg-slate-200" : " bg-gray-900"
        } overflow-auto scrollbar ${light ? "light" : "dark"} gap-5`}
      >
        <Column className={`relative flex-1 items-center`}>
          <Column className={"flex-1 p-5 max-w-[1440px] w-full"}>
            {props.children}
          </Column>
          <Container className={`absolute bottom-[-15px] left-[5px]`}>
            <Link href={"https://buymeacoffee.com/nathanmagro"} target="_blank">
              <Button
                className={`h-[40px] px-[5px] py-[5px] rounded-full bg-yellow-500 hover:bg-yellow-400 shadow-border ${
                  light ? "shadow-black-200" : "shadow-zinc-500"
                }
                `}
              >
                <Small
                  className={"text-blue-900"}
                  style={{ fontSize: "20px", lineHeight: "16px" }}
                >
                  Buy me a coffee
                </Small>
              </Button>
            </Link>
          </Container>
        </Column>
        <Footer />
      </Column>
    </Column>
  );
};
