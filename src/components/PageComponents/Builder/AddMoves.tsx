import { Column, Span } from "@/components/LayoutComponents";
import { FunctionComponent } from "react";
import { MoveAutocomplete } from "../PageAutocomplete";
import { MoveCard } from "./MoveCard";
import { MoveDetailsType } from "@/utils";
import { PokeDetailsWithSelectedMovesStatCalculator } from "./Builder";
import { useDarkTheme } from "@/components/Providers";
import { cloneDeep } from "lodash";

export interface AddMovesProps {
  item?: { index: number; item: PokeDetailsWithSelectedMovesStatCalculator };
  setItem: (item: {
    index: number;
    item: PokeDetailsWithSelectedMovesStatCalculator;
  }) => void;
  isEnemy: boolean;
}

export const AddMoves: FunctionComponent<AddMovesProps> = ({
  item,
  setItem,
  isEnemy,
}) => {
  const { light } = useDarkTheme();

  const handleMoveUpdate = (move?: MoveDetailsType) => {
    const tempItem = cloneDeep(item);

    if (tempItem && move) {
      if (tempItem?.item.selectedMoves) {
        tempItem.item.selectedMoves?.push({ ...move, isEnemy });
      } else {
        tempItem.item["selectedMoves"] = [{ ...move, isEnemy }];
      }

      setItem(tempItem);
    }
  };

  const handleRemoveMove = (moveIndex: number) => {
    const tempItem = cloneDeep(item);

    if (tempItem && moveIndex !== undefined) {
      tempItem.item.selectedMoves?.splice(moveIndex, 1);

      setItem(tempItem);
    }
  };

  return (
    <Column
      className={`h-[400px] overflow-y-auto scrollbar ${
        light ? "light" : "dark"
      } gap-5`}
    >
      <Span>{`Select moves for ${item?.item.name}`}</Span>
      <MoveAutocomplete
        data={item?.item.moves || []}
        label=""
        setMove={(move) => handleMoveUpdate(move)}
        disable={
          item?.item.selectedMoves && item?.item.selectedMoves.length >= 4
        }
      />
      <Column className={`gap-2`}>
        {item?.item.selectedMoves?.map((m, index) => (
          <MoveCard
            key={m.name}
            move={m}
            onRemove={() => handleRemoveMove(index)}
            index={index + 1}
          />
        ))}
      </Column>
    </Column>
  );
};
