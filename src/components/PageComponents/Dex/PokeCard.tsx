import {
  Row,
  Column,
  H5,
  Button,
  Container,
  Span,
} from "@/components/LayoutComponents";
import { Card } from "@/components/LayoutComponents/Card";
import { useDarkTheme } from "@/components/Providers";
import Image from "next/image";
import router from "next/router";
import { FunctionComponent, useState } from "react";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi";

export interface PokeDetails {
  name: string;
  index: string;
  imageLink: string;
  imageLinkShiny?: string;
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
  const [showShiny, setShowShiny] = useState(false);

  const { light } = useDarkTheme();

  return (
    <Card className={`w-[250px] h-[400px]`}>
      <Row className="flex justify-between items-start p-5 gap-10">
        <H5>#{props.data.index.toString().padStart(4, "0")}</H5>
        <H5>{props.data.name}</H5>
      </Row>
      <Container
        className={"relative flex-1 w-full items-center justify-center"}
      >
        <Container className={`absolute top-0 right-0 pr-5`}>
          {showShiny && props.data.imageLinkShiny ? (
            <HiSparkles
              onClick={() => setShowShiny(!showShiny)}
              className={
                light
                  ? "text-blue-950 group-hover:text-blue-800"
                  : "text-yellow-500 group-hover:text-yellow-400"
              }
              style={{ fontSize: "20px" }}
            />
          ) : (
            <HiOutlineSparkles
              onClick={() => setShowShiny(!showShiny)}
              className={
                light
                  ? "text-blue-950 group-hover:text-blue-800"
                  : "text-yellow-500 group-hover:text-yellow-400"
              }
              style={{ fontSize: "20px" }}
            />
          )}
        </Container>
        <Image
          src={
            showShiny && props.data.imageLinkShiny
              ? props.data.imageLinkShiny
              : props.data.imageLink
          }
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
