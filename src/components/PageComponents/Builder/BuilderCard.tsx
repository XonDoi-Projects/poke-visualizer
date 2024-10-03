import {
  Button,
  Column,
  Container,
  LabelWithValue,
  Row,
  Span,
} from "@/components/LayoutComponents";
import { PokeDetails, statShortHand } from "@/utils";
import { FunctionComponent } from "react";
import Image from "next/image";
import { TypeChip } from "../Dex/TypeChip";
import { Card } from "@/components/LayoutComponents/Card";
import { BiAdjust, BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";
import { useDarkTheme, useSize } from "@/components/Providers";

export interface BuilderCardProps {
  pokemon?: PokeDetails;
  removePokemon?: () => void;
  moveUp?: () => void;
  disableMoveUp?: boolean;
  moveDown?: () => void;
  disableMoveDown?: boolean;
  placeholder?: boolean;
}

export const BuilderCard: FunctionComponent<BuilderCardProps> = ({
  pokemon,
  removePokemon,
  moveDown,
  disableMoveDown,
  moveUp,
  placeholder,
  disableMoveUp,
}) => {
  const { light } = useDarkTheme();
  const { mobile } = useSize();
  return placeholder ? (
    <Card className={`rounded-lg p-3 flex-1 h-[100px] opacity-40`} noShadow>
      <Row
        className={`gap-5 w-full flex-wrap flex-1 justify-center items-center pointer-events-none p-1`}
      >
        <Span>Choose Pokemon!</Span>
      </Row>
    </Card>
  ) : (
    <Card className={`rounded-lg p-3 flex-1 h-fit`} noShadow>
      <Row className={`gap-2 w-full flex-wrap flex-1 justify-end`}>
        {mobile && (
          <>
            {!disableMoveDown && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  moveDown && moveDown();
                }}
                className="!w-[20px] !h-[20px] rounded-[50%] !p-0 !m-0 transition-all"
              >
                <BiChevronDown
                  className={
                    !light
                      ? "text-blue-950 group-hover:text-blue-800"
                      : "text-slate-300 group-hover:text-slate-200"
                  }
                  style={{ fontSize: "16px" }}
                />
              </Button>
            )}
            {!disableMoveUp && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  moveUp && moveUp();
                }}
                className="!w-[20px] !h-[20px] rounded-[50%] !p-0 !m-0 transition-all"
              >
                <BiChevronUp
                  className={
                    !light
                      ? "text-blue-950 group-hover:text-blue-800"
                      : "text-slate-300 group-hover:text-slate-200"
                  }
                  style={{ fontSize: "16px" }}
                />
              </Button>
            )}
          </>
        )}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            removePokemon && removePokemon();
          }}
          className="!w-[20px] !h-[20px] rounded-[50%] !p-0 !m-0 transition-all"
        >
          <BiX
            className={
              !light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-slate-300 group-hover:text-slate-200"
            }
            style={{ fontSize: "16px" }}
          />
        </Button>
      </Row>
      <Row
        className={`gap-5 w-full flex-wrap flex-1 justify-between pointer-events-none p-1`}
      >
        <Row className={`gap-5`}>
          <Container
            className={`relative h-[75px] w-[75px] items-center justify-center cursor-pointer`}
          >
            <Image
              src={pokemon?.imageLinkHighRes || ""}
              alt="Pokemon Image"
              sizes="100vw"
              width="0"
              height="0"
              loading="lazy"
              fetchPriority="low"
              className={`block w-auto`}
            />
          </Container>
          <Column className={`gap-1`}>
            <Span>{pokemon?.name}</Span>
            <Column className={`gap-1`}>
              {pokemon?.types?.map((t, index) => (
                <TypeChip key={index} value={t} />
              ))}
            </Column>
          </Column>
        </Row>

        <Row className={`gap-5`}>
          <Column className={`flex-wrap w-[100px]`}>
            {pokemon?.stats?.slice(0, 3).map((s) => (
              <LabelWithValue
                key={s.name}
                label={statShortHand[s.name]}
                value={s.value.toString()}
              />
            ))}
          </Column>

          <Column className={`flex-wrap w-[100px]`}>
            {pokemon?.stats?.slice(3, 6).map((s) => (
              <LabelWithValue
                key={s.name}
                label={statShortHand[s.name]}
                value={s.value.toString()}
              />
            ))}
          </Column>
        </Row>
      </Row>
    </Card>
  );
};
