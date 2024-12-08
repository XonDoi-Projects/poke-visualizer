import {
  Button,
  Column,
  Container,
  LabelWithValue,
  Row,
  Small,
  Span,
} from "@/components/LayoutComponents";
import { statShortHand } from "@/utils";
import { FunctionComponent } from "react";
import Image from "next/image";
import { TypeChip } from "../Dex/TypeChip";
import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";
import { useDarkTheme, useSize } from "@/components/Providers";
import { PokeDetailsWithSelectedMovesStatCalculator } from "./Builder";

export interface BuilderCardProps {
  pokemon?: PokeDetailsWithSelectedMovesStatCalculator;
  removePokemon?: () => void;
  moveUp?: () => void;
  disableMoveUp?: boolean;
  moveDown?: () => void;
  disableMoveDown?: boolean;
  placeholder?: boolean;
  onShowMoves?: () => void;
  onShowStats?: () => void;
}

export const BuilderCard: FunctionComponent<BuilderCardProps> = ({
  pokemon,
  removePokemon,
  moveDown,
  disableMoveDown,
  moveUp,
  placeholder,
  disableMoveUp,
  onShowMoves,
  onShowStats,
}) => {
  const { light } = useDarkTheme();
  const { mobile } = useSize();

  return placeholder ? (
    <Column
      className={`rounded-lg p-3 flex-1 h-[100px] opacity-40 ${
        light ? "bg-slate-200" : " bg-gray-900"
      }`}
    >
      <Row
        className={`gap-5 w-full flex-wrap flex-1 justify-center items-center pointer-events-none p-1`}
      >
        <Span>Choose Pokemon!</Span>
      </Row>
    </Column>
  ) : (
    <Column
      className={`rounded-lg p-3 flex-1 h-fit ${
        light ? "bg-slate-200" : " bg-gray-900"
      }`}
    >
      <Row className={`gap-2 w-full flex-wrap flex-1 justify-between`}>
        <Row className={`gap-1`}>
          <Button className={`rounded-full px-[5px]`} onClick={onShowMoves}>
            <Small
              className={` ${!light ? "text-blue-900" : "text-slate-300"}`}
            >
              Add Moves
            </Small>
          </Button>
          <Button className={`rounded-full px-[5px]`} onClick={onShowStats}>
            <Small
              className={` ${!light ? "text-blue-900" : "text-slate-300"}`}
            >
              Manage Stats
            </Small>
          </Button>
        </Row>
        <Column
          className={`absolute top-[12px] right-[10px] gap-2 flex-wrap items-end`}
        >
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
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "16px" }}
            />
          </Button>
          {mobile && !disableMoveDown && (
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
                    ? "text-blue-900 group-hover:text-blue-800"
                    : "text-slate-300 group-hover:text-slate-200"
                }
                style={{ fontSize: "16px" }}
              />
            </Button>
          )}
          {mobile && !disableMoveUp && (
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
                    ? "text-blue-900 group-hover:text-blue-800"
                    : "text-slate-300 group-hover:text-slate-200"
                }
                style={{ fontSize: "16px" }}
              />
            </Button>
          )}
        </Column>
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
              alt={`#${pokemon?.index} ${pokemon?.name} Image`}
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

        <Column className={`flex-wrap w-[100px]`}>
          <LabelWithValue
            label="LEVEL"
            value={(pokemon?.statCalculatorDetails?.level || 1).toString()}
            small={mobile}
          />
        </Column>

        <Row className={`gap-2`}>
          <Column className={`flex-wrap w-[100px]`}>
            {pokemon?.stats?.slice(0, 3).map((s) => (
              <LabelWithValue
                key={s.name}
                label={statShortHand[s.name]}
                value={`${
                  pokemon.statCalculatorDetails?.stats
                    ?.find((stat) => stat.name === s.name)
                    ?.calculatedBase?.toString() || s.value.toString()
                } / ${(
                  pokemon.statCalculatorDetails?.stats?.find(
                    (stat) => stat.name === s.name
                  )?.calculatedValue || 0
                )?.toString()}`}
                small={mobile}
              />
            ))}
          </Column>

          <Column className={`flex-wrap w-[100px]`}>
            {pokemon?.stats?.slice(3, 6).map((s) => (
              <LabelWithValue
                key={s.name}
                label={statShortHand[s.name]}
                value={`${
                  pokemon.statCalculatorDetails?.stats
                    ?.find((stat) => stat.name === s.name)
                    ?.calculatedBase?.toString() || s.value.toString()
                } / ${(
                  pokemon.statCalculatorDetails?.stats?.find(
                    (stat) => stat.name === s.name
                  )?.calculatedValue || 0
                )?.toString()}`}
                small={mobile}
              />
            ))}
          </Column>
        </Row>
      </Row>
    </Column>
  );
};
