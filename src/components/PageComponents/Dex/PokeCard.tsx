import {
  Row,
  Column,
  H5,
  Button,
  Container,
  Span,
} from "@/components/LayoutComponents";
import { Card } from "@/components/LayoutComponents/Card";
import Image from "next/image";
import router from "next/router";
import { FunctionComponent } from "react";

export interface PokeDetails {
  name: string;
  index: string;
  imageLink: string;
  description?: string;
  types?: string[];
  preEvolution?: string;
  postEvolution?: string;
  stats?: any;
}

export interface PokeCardProps {
  data: PokeDetails;
}

export const PokeCard: FunctionComponent<PokeCardProps> = (props) => {
  return (
    <Card className={`w-[250px] h-[400px]`}>
      <Row className="flex justify-between items-end p-5">
        <H5>{props.data.index}</H5>
        <H5>{props.data.name}</H5>
      </Row>
      <Container className={"flex-1 w-full items-center justify-center"}>
        <Image
          src={props.data.imageLink}
          alt="Pokemon Image"
          sizes="100vw"
          width="0"
          height="0"
          className="w-auto h-full"
        />
      </Container>
      <Column className="flex flex-1 justify-start items-start p-5 gap-5">
        <Span>{props.data.description}</Span>
      </Column>
    </Card>
  );
};
