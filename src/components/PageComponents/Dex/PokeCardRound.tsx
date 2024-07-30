import { Row, Column, H5, Container } from "@/components/LayoutComponents";
import { Card } from "@/components/LayoutComponents/Card";
import { useDarkTheme } from "@/components/Providers";
import { PokeDetails, PokeRegion } from "@/utils";
import { data } from "autoprefixer";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi";
import { TypeChip } from "./TypeChip";
import clsx from "clsx";

export interface PokeCardRoundProps {
  data: PokeDetails;
}

export const PokeCardRound: FunctionComponent<PokeCardRoundProps> = (props) => {
  const [showShiny, setShowShiny] = useState(false);
  const [hover, setHover] = useState(false);

  const { light } = useDarkTheme();

  const hovering = clsx({ "h-[100px]": hover, "h-[150px]": !hover });

  return (
    <Column className={`w-[250px] h-[300px] items-center gap-2`}>
      <Row className={`w-full justify-between`}>
        <H5>#{props.data.index.toString().padStart(4, "0")}</H5>
        <Row className={`gap-1`}>
          {props.data.types?.map((t, index) => (
            <TypeChip key={index} value={t} />
          ))}
        </Row>
      </Row>

      <Card
        className={`w-[200px] h-[200px] hover:scale-105 rounded-full transition-all`}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
      >
        <Container
          className={"relative flex-1 w-full items-center justify-center"}
        >
          <Container className={`absolute top-0 right-0 cursor-pointer`}>
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
            className={`w-auto ${hovering}`}
          />
        </Container>
      </Card>
      <H5>{props.data.name}</H5>
    </Column>
  );
};
