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
import { PokeDetails, PokeRegion } from "@/utils";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi";

export interface PokeCardProps {
  data: PokeDetails;
}

export const PokeCard: FunctionComponent<PokeCardProps> = (props) => {
  const [showShiny, setShowShiny] = useState(false);
  const [hover, setHover] = useState(false);

  const { light } = useDarkTheme();

  return (
    <Card
      className={`w-[250px] h-[400px] hover:scale-105 transition-all`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
    >
      <Row className="flex justify-between items-start p-3 ">
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
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "20px" }}
            />
          ) : (
            <HiOutlineSparkles
              onClick={() => setShowShiny(!showShiny)}
              className={
                light
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "20px" }}
            />
          )}
        </Container>
        <picture>
          <Image
            src={
              showShiny &&
              props.data.imageLinkShiny &&
              hover &&
              props.data.animatedShiny
                ? props.data.animatedShiny
                : hover && props.data.animated
                ? props.data.animated
                : showShiny && props.data.imageLinkShiny
                ? props.data.imageLinkShiny
                : props.data.imageLink
            }
            alt="Pokemon Image"
            sizes="100vw"
            width="0"
            height="0"
            loading="lazy"
            fetchPriority="low"
            className={`w-auto h-[${hover ? "100px" : "150px"}]`}
          />
        </picture>
      </Container>
      <Column className="flex flex-1 justify-start items-start p-5 gap-5">
        <Span>{props.data.description}</Span>
      </Column>
    </Card>
  );
};
