import { FunctionComponent, ReactNode } from "react";
import { Column, Container, H2, H3, Row } from "../LayoutComponents";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { total, useDarkTheme, useData } from "..";
import clsx from "clsx";

export interface PageProps {
  children: ReactNode;
}

export const Page: FunctionComponent<PageProps> = (props) => {
  const { light } = useDarkTheme();
  const { loadingState, isCached } = useData();

  const loadingWidth = clsx({
    "w-[10%]": loadingState >= 10,
    "w-[20%]": loadingState >= 20,
    "w-[30%]": loadingState >= 30,
    "w-[40%]": loadingState >= 40,
    "w-[50%]": loadingState >= 50,
    "w-[60%]": loadingState >= 60,
    "w-[70%]": loadingState >= 70,
    "w-[80%]": loadingState >= 80,
    "w-[90%]": loadingState >= 90,
    "w-[100%]": loadingState >= 100,
  });

  return (
    <Column className="h-screen w-screen">
      <Header />

      <Column
        id="main-content"
        className={`h-fit w-screen flex-1 ${
          light ? "bg-slate-200" : " bg-gray-900"
        } overflow-auto gap-5`}
      >
        {loadingState !== 100 && !isCached ? (
          <Column className={"flex-1 p-5 items-center justify-center gap-2"}>
            <H2>Please be patient while we get the data</H2>
            <Container
              className={`w-[100px] h-[20px] rounded-md border-solid border-2 ${
                light ? "border-blue-800" : "border-slate-300"
              }`}
            >
              <Container
                className={`${loadingWidth} h-full ${
                  light ? "bg-blue-800" : "bg-slate-300"
                }`}
              />
            </Container>
          </Column>
        ) : (
          <Column className={`flex-1 items-center`}>
            <Column className={"flex-1 p-5 max-w-[1440px]"}>
              {props.children}
            </Column>
          </Column>
        )}

        <Footer />
      </Column>
    </Column>
  );
};
