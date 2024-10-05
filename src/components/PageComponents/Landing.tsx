import { FunctionComponent, ReactNode } from "react";
import {
  Button,
  Column,
  Container,
  H3,
  H2,
  H5,
  Row,
} from "../LayoutComponents";
import { PokeBallBackground } from ".";
import { useDarkTheme, useSize } from "..";
import { BiAdjust } from "react-icons/bi";
import { Card } from "../LayoutComponents/Card";
import { useRouter } from "next/router";

export interface LandingProps {
  children: ReactNode;
}

export const Landing: FunctionComponent<LandingProps> = (props) => {
  const { light, setLight } = useDarkTheme();

  return (
    <Column
      className={`h-screen w-screen ${light ? "bg-gray-400" : "bg-gray-900"} `}
    >
      <Container className="flex w-full absolute flex-row-reverse z-[3]">
        <Button
          onClick={() => setLight(!light)}
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 !bg-transparent "
        >
          <BiAdjust
            className={
              light
                ? "text-blue-900 group-hover:text-blue-800"
                : "text-slate-300 group-hover:text-slate-200"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
      </Container>
      {props.children}
      <Container className="absolute z-[1] w-full h-full">
        <PokeBallBackground />
      </Container>
    </Column>
  );
};
