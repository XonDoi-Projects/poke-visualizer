import {
  Row,
  Column,
  H5,
  Button,
  Container,
  Span,
  Small,
} from "@/components/LayoutComponents";
import { Card } from "@/components/LayoutComponents/Card";
import { useDarkTheme } from "@/components/Providers";
import { PokeDetails, PokeForm, PokeRegion } from "@/utils";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi";

export interface PokeCardProps {
  form: PokeForm;
}

export const PokeCard: FunctionComponent<PokeCardProps> = (props) => {
  const [showShiny, setShowShiny] = useState(false);

  const { light } = useDarkTheme();

  return (
    <Card className={`w-[200px] h-[200px] rounded-lg transition-all`} noShadow>
      <Row className="flex justify-between items-start p-3 gap-2">
        <Small className={light ? "text-blue-900" : "text-slate-300"}>
          #{props.form.index.toString().padStart(4, "0")}
        </Small>
        <Small
          className={`text-right ${light ? "text-blue-900" : "text-slate-300"}`}
        >
          {props.form.name}
        </Small>
      </Row>
      <Container
        className={"relative flex-1 w-full items-center justify-center"}
      >
        {props.form.imageLink ? (
          <>
            <Container className={`absolute top-0 right-0 pr-5 z-[5]`}>
              {showShiny && props.form.imageLinkShiny ? (
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
            <div
              className={`relative inline-block flex items-center justify-center overflow-hidden w-auto h-full`}
              style={{
                maskImage: `url(${
                  showShiny && props.form.imageLinkShiny
                    ? props.form.imageLinkShiny
                    : props.form.imageLink
                })`,
                maskSize: "contain",
              }}
            >
              <Image
                src={
                  showShiny && props.form.imageLinkShiny
                    ? props.form.imageLinkShiny
                    : props.form.imageLink
                }
                alt={`${props.form.name} | ${props.form.index}`}
                sizes="100vw"
                width="0"
                height="0"
                loading="lazy"
                fetchPriority="low"
                className={`w-auto h-full`}
              />
              {showShiny && (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent from-[45%] via-white via-[50%] to-transparent to-[55%] pointer-events-none animate-move-gradient" />
              )}
            </div>
          </>
        ) : (
          <Span>Sprite not available</Span>
        )}
      </Container>
    </Card>
  );
};
