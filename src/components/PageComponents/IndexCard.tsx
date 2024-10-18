import router from "next/router";
import {
  Row,
  Column,
  H2,
  H3,
  Button,
  Container,
  Span,
} from "../LayoutComponents";
import { Card } from "../LayoutComponents/Card";
import { useSize } from "../Providers";

export const IndexCard = () => {
  const { mobile } = useSize();

  return (
    <Container className="flex-col z-[2] w-full h-full gap-5 justify-center items-center">
      {!mobile ? (
        <Card className={`w-[60%] min-h-[60%] rounded-md`}>
          <Row className={`flex flex-wrap flex-1 gap-[10px] `}>
            <Column className="flex flex-1 justify-center items-end p-5">
              <H2 className="whitespace-pre-line">Welcome,</H2>
              <H3>Trainer!</H3>
            </Column>
            <Column className="flex flex-1 justify-center items-start p-5 gap-5 overflow-y-hidden">
              <Column className={`overflow-y-auto gap-5`}>
                <Span className={`mr-10`}>
                  This is a Pokemon playground where you can you look up your
                  favorite pokemon to view them, compare stats or plan your
                  team!
                </Span>
                <Button onClick={() => router.push("/dex")}>
                  {"Let's Go!"}
                </Button>
              </Column>
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
            <Span>
              This is a Pokemon playground where you can you look up your
              favorite pokemon to view them, compare stats or plan your team!
            </Span>
            <Button onClick={() => router.push("/dex")}>{"Let's Go!"}</Button>
          </Column>
        </Container>
      )}
    </Container>
  );
};
