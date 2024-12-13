import { Row, Column, Container, H6 } from "@/components/LayoutComponents";
import { Card } from "@/components/LayoutComponents/Card";
import { useDarkTheme } from "@/components/Providers";
import { PokeDetails } from "@/utils";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi";
import { TypeChip } from "./TypeChip";
import clsx from "clsx";
import { useRouter } from "next/router";

export interface PokeCardRoundProps {
  data: PokeDetails;
  form: string;
}

export const PokeCardRound: FunctionComponent<PokeCardRoundProps> = (props) => {
  const router = useRouter();
  const [showShiny, setShowShiny] = useState(false);
  const [hover, setHover] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const { light } = useDarkTheme();

  const hovering = clsx({ "h-[100px]": hover, "h-[150px]": !hover });

  return (
    <Column className={`relative w-[250px] h-[300px] items-center gap-2`}>
      <Row className={`w-full justify-between`}>
        <H6>#{props.data.index.toString().padStart(4, "0")}</H6>
        <Row className={`gap-1 items-center`}>
          {props.data.types?.map((t, index) => (
            <TypeChip key={index} value={t} />
          ))}
        </Row>
      </Row>

      <Container className={`absolute top-[10%] right-0 cursor-pointer z-[1]`}>
        {props.data.imageLinkShiny ? (
          showShiny ? (
            <HiSparkles
              onClick={(e) => {
                e.stopPropagation();
                setShowShiny(!showShiny);
              }}
              className={
                light
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "20px" }}
            />
          ) : (
            <HiOutlineSparkles
              onClick={(e) => {
                e.stopPropagation();
                setShowShiny(!showShiny);
              }}
              className={
                light
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "20px" }}
            />
          )
        ) : null}
      </Container>
      <Card
        className={`w-[200px] h-[200px] hover:scale-105 rounded-full transition-all cursor-pointer overflow-hidden`}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          if (!isTouching) {
            setHover(false);
          }
        }}
        onTouchStart={() => {
          setIsTouching(true);
          setHover(true);
        }}
        onTouchEnd={() => {
          setIsTouching(false);
          setHover(false);
        }}
        onClick={() =>
          router.push(
            `/dex/${props.form === "variant" ? "variants/" : "bases/"}${
              props.data.index
            }`
          )
        }
      >
        <Container
          className={`relative flex-1 w-full items-center justify-center`}
        >
          <div
            className={`relative inline-block flex items-center justify-center overflow-hidden`}
            style={{
              maskImage: `url(${
                showShiny &&
                props.data?.imageLinkShiny &&
                hover &&
                props.data?.animatedShiny
                  ? props.data?.animatedShiny || "/placeholder.png"
                  : hover && props.data?.animated
                  ? props.data?.animated || "/placeholder.png"
                  : showShiny && props.data?.imageLinkShiny
                  ? props.data?.imageLinkShiny || "/placeholder.png"
                  : props.data?.imageLink || "/placeholder.png"
              })`,
              maskSize: "contain",
            }}
          >
            <Image
              src={
                showShiny &&
                props.data?.imageLinkShiny &&
                hover &&
                props.data?.animatedShiny
                  ? props.data?.animatedShiny || "/placeholder.png"
                  : hover && props.data?.animated
                  ? props.data?.animated || "/placeholder.png"
                  : showShiny && props.data?.imageLinkShiny
                  ? props.data?.imageLinkShiny || "/placeholder.png"
                  : props.data?.imageLink || "/placeholder.png"
              }
              alt={`#${props.data.index} ${props.data.name} Image`}
              sizes="100vw"
              width="0"
              height="0"
              loading="lazy"
              fetchPriority="low"
              className={`block w-auto ${hovering}`}
            />
            {showShiny && (
              <div className="absolute inset-0 bg-gradient-to-br from-transparent from-[45%] via-white via-[50%] to-transparent to-[55%] pointer-events-none animate-move-gradient" />
            )}
          </div>
        </Container>
      </Card>
      <H6>{props.data.name}</H6>
    </Column>
  );
};
