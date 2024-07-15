import router from "next/router";
import { FunctionComponent } from "react";
import {
  Row,
  Column,
  H2,
  H3,
  H5,
  Button,
  Container,
} from "../LayoutComponents";
import { Card } from "../LayoutComponents/Card";
import { useSize } from "../Providers";

export interface IndexCardProps {}

export const IndexCard: FunctionComponent<IndexCardProps> = (props) => {
  const { mobile } = useSize();

  return (
    <Container className="flex-col z-[2] w-full h-full gap-5 justify-center items-center">
      {!mobile ? (
        <Card className={`w-[60%] h-[60%]`}>
          <Row className={`flex flex-wrap flex-1 gap-[10px] `}>
            <Column className="flex flex-1 justify-center items-end p-5">
              <H2 className="whitespace-pre-line">Welcome,</H2>
              <H3>Trainer!</H3>
            </Column>
            <Column className="flex flex-1 justify-center items-start p-5 gap-5">
              <H5>
                This is a Pokemon playground where you can you look up your
                favorite pokemon to view stats or find fun pokemon fusions!
              </H5>
              <Button onClick={() => router.push("/dex")}>{"Let's Go!"}</Button>
            </Column>
          </Row>
        </Card>
      ) : (
        <Container className={`flex flex-wrap gap-[10px] `}>
          <Column className="flex flex-1 justify-center items-end p-5 min-w-[300px]">
            <H2 className="whitespace-pre-line">Welcome,</H2>
            <H3>Trainer!</H3>
          </Column>
          <Column className="flex flex-1 justify-center items-start p-5 gap-5">
            <H5>
              This is a Pokemon playground where you can you look up your
              favorite pokemon to view stats or find fun pokemon fusions!
            </H5>
            <Button onClick={() => router.push("/dex")}>{"Let's Go!"}</Button>
          </Column>
        </Container>
      )}
    </Container>
  );
};
