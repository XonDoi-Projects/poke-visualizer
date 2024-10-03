import { Button, Column, Row, Span } from "@/components/LayoutComponents";
import { MoveDetailsType } from "@/utils";
import { FunctionComponent } from "react";
import { TypeChip } from "../Dex/TypeChip";
import { Chip } from "@/components/LayoutComponents/Chip";
import { BiX } from "react-icons/bi";
import { useDarkTheme } from "@/components/Providers";
import { ClassChip } from "../Dex";

export interface MoveCardProps {
  onRemove?: () => void;
  move: MoveDetailsType;
  index: number;
}

export const MoveCard: FunctionComponent<MoveCardProps> = ({
  onRemove,
  move,
  index,
}) => {
  const { light } = useDarkTheme();
  return (
    <Row
      className={`w-full p-2 items-center rounded-md border-[1px] gap-5 ${
        light ? "border-blue-900" : "border-slate-300"
      }`}
    >
      <Span>{index}.</Span>
      <Column className={`flex-1`}>
        <Span>{move.name.toUpperCase()}</Span>
        <Row className={`gap-1`}>
          {move.damageClass && <ClassChip value={move.damageClass} />}
          {move.type && <TypeChip value={move.type} />}
        </Row>
      </Column>
      <Button
        onClick={onRemove}
        className="!w-[20px] !h-[20px] rounded-[50%] !p-0 !m-0 transition-all"
        type="text"
      >
        <BiX
          className={
            light
              ? "text-blue-900 group-hover:text-blue-800"
              : "text-slate-300 group-hover:text-slate-200"
          }
          style={{ fontSize: "16px" }}
        />
      </Button>
    </Row>
  );
};
