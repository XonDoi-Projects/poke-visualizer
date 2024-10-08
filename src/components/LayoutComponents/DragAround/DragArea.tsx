import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Column } from "../Column";
import { cloneDeep } from "lodash";
import { Container } from "../Container";
import { useDarkTheme } from "@/components/Providers";
import { useResize } from "@/components/Hooks";
import {
  BuilderCard,
  MoveAutocomplete,
  MoveCard,
  PokeDetailsWithSelectedMoves,
} from "@/components/PageComponents";
import { Popup } from "../Popup";
import { MoveDetailsType } from "@/utils";
import { H5, Span } from "../Typography";

export interface DragAreaProps {
  list: PokeDetailsWithSelectedMoves[];
  setList: (value: PokeDetailsWithSelectedMoves[]) => void;
}

export const DragArea: FunctionComponent<DragAreaProps> = ({
  list,
  setList,
}) => {
  const { light } = useDarkTheme();

  const [showMoves, setShowMoves] = useState(false);

  const [dragIndex, setDragIndex] = useState<number>();
  const [dragOver, setDragOver] = useState<number>();
  const ref = useRef<HTMLDivElement | null>(null);
  const absoluteRef = useRef<HTMLDivElement | null>(null);
  const currentDragOverRef = useRef<number | null>(null);

  const [newLocation, setNewLocation] = useState<{
    startY: number;
    startX: number;
    y: number;
    x: number;
    zeroY: number;
    zeroX: number;
  }>({ startX: 0, startY: 0, zeroX: 0, zeroY: 0, x: 0, y: 0 });

  const [itemPositions, setItemPositions] = useState<
    { index: number; top: number | undefined }[]
  >(list.map((_, index) => ({ index, top: undefined })));

  const [items, setItems] = useState<
    { index: number; item: PokeDetailsWithSelectedMoves }[]
  >(list.map((i, index) => ({ index, item: i })));

  const [item, setItem] = useState<{
    index: number;
    item: PokeDetailsWithSelectedMoves;
  }>();

  const [itemDims, setItemDims] = useState<DOMRect>();

  const handleDrop = () => {
    if (dragIndex !== undefined && dragOver !== undefined) {
      setList(items.map((i) => i.item));
      setItems(items.map((i, index) => ({ index, item: i.item })));
      setItemPositions(items.map((i, index) => ({ index, top: undefined })));
    }
    setItem(undefined);
  };

  const handleDragOver = (index: number) => {
    setDragOver(index);

    if (dragIndex !== undefined && dragOver !== undefined) {
      const tempList = cloneDeep(items);

      const [firstSlice] = tempList.splice(
        tempList.findIndex((l) => l.index === item?.index),
        1
      );

      tempList.splice(index, 0, firstSlice);

      setItems(tempList);
    }
  };

  const swapPositionsDrag = (
    newIndex: number,
    startIndex: number,
    tempPositions: {
      index: number;
      top: number | undefined;
    }[]
  ) => {
    const prevTop = tempPositions.find(
      (item) => item.index === startIndex
    )?.top;

    const newPosMatch = tempPositions.findIndex(
      (item) => item.index === startIndex
    );

    const currentTop = tempPositions[newIndex].top;

    tempPositions[newPosMatch].top = currentTop;
    tempPositions[newIndex].top = prevTop;

    let [secondSlice] = tempPositions.splice(
      tempPositions.findIndex((l) => l.index === item?.index),
      1
    );

    tempPositions.splice(newIndex, 0, secondSlice);
    return tempPositions;
  };

  const handleUpdatePosition = (newIndex: number) => {
    if (dragIndex !== undefined && dragOver !== undefined) {
      const tempItemPositions = cloneDeep(itemPositions);

      const result = swapPositionsDrag(newIndex, dragIndex, tempItemPositions);

      setItemPositions(result);
    }
  };

  const handleDragIndex = (
    index: number,
    item: PokeDetailsWithSelectedMoves
  ) => {
    setDragIndex(index);
    setItem({ index, item });
  };

  const handleRemovePokemon = (index: number) => {
    let tempPokemons = cloneDeep(list);

    if (tempPokemons) {
      tempPokemons.splice(index, 1);

      setList(tempPokemons);
    }
  };

  const swapPositionsManual = (
    newIndex: number,
    startIndex: number,
    tempPositions: {
      index: number;
      top: number | undefined;
    }[]
  ) => {
    const prevTop = tempPositions[startIndex].top;

    const currentTop = tempPositions[newIndex].top;

    tempPositions[startIndex].top = currentTop;
    tempPositions[newIndex].top = prevTop;

    let [secondSlice] = tempPositions.splice(startIndex, 1);

    tempPositions.splice(newIndex, 0, secondSlice);
    return tempPositions;
  };

  const handleMoveDown = (index: number) => {
    const tempItemPositions = cloneDeep(itemPositions);

    const result = swapPositionsManual(index, index + 1, tempItemPositions);

    setItemPositions(result);

    const tempItems = cloneDeep(items);

    const [firstSlice] = tempItems.splice(index + 1, 1);

    tempItems.splice(index, 0, firstSlice);

    setItems(tempItems);
  };

  const handleMoveUp = (index: number) => {
    const tempItemPositions = cloneDeep(itemPositions);

    const result = swapPositionsManual(index, index - 1, tempItemPositions);

    setItemPositions(result);

    const tempItems = cloneDeep(items);

    const [firstSlice] = tempItems.splice(index - 1, 1);

    tempItems.splice(index, 0, firstSlice);

    setItems(tempItems);
  };

  const handleMoveUpdate = (move?: MoveDetailsType) => {
    const tempItem = cloneDeep(item);

    if (tempItem && move) {
      if (tempItem?.item.selectedMoves) {
        tempItem.item.selectedMoves?.push(move);
      } else {
        tempItem.item["selectedMoves"] = [move];
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

  const handleConfirmMoves = () => {
    const tempItems = cloneDeep(items);

    if (tempItems && item) {
      tempItems[item.index].item = item.item;

      setItems(tempItems);
      setList(tempItems.map((item) => item.item));
      setShowMoves(false);
      setItem(undefined);
    }
  };

  useEffect(() => {
    setItems(list.map((i, index) => ({ index, item: i })));
    setItemPositions(list.map((_, index) => ({ index, top: undefined })));
  }, [list]);

  useEffect(() => {
    if (dragIndex !== undefined && item !== undefined && absoluteRef.current) {
      absoluteRef.current.style.top =
        newLocation.startY + (newLocation.y - newLocation.zeroY) + "px";
      absoluteRef.current.style.left =
        newLocation.startX + (newLocation.x - newLocation.zeroX) + "px";
    }
  }, [dragIndex, item, newLocation]);

  useResize(ref.current, setItemDims);

  useEffect(() => {
    if (itemDims) {
      const height =
        ref.current?.firstElementChild?.getBoundingClientRect().height || 0;

      setItemPositions((prev) =>
        prev.map((i, index) => ({
          ...i,
          top: height * index + 15 * index,
        }))
      );
    }
  }, [itemDims]);

  return (
    <Column ref={ref} className={`relative bg-transparent`}>
      {Array.apply(null, Array(6)).map((_, index) => (
        <Container
          key={index}
          className={`h-fit mb-[15px]`}
          style={{ opacity: index + 1 > items.length ? "1" : "0" }}
        >
          {index + 1 <= items.length ? (
            <BuilderCard pokemon={items[index].item} />
          ) : (
            <BuilderCard placeholder />
          )}
        </Container>
      ))}
      {items.map((item, index) => (
        <Container
          key={item.index}
          ref={(e) => {
            let tempItemPositions = cloneDeep(itemPositions);

            const itemIndex = tempItemPositions.findIndex(
              (pos) => pos.index === item.index
            );
            if (e && tempItemPositions[itemIndex].top === undefined) {
              tempItemPositions[itemIndex].top =
                e.getBoundingClientRect().height * index + 15 * index;

              setItemPositions(tempItemPositions);
            }
          }}
          className={`absolute flex-1 transition-all duration-75 rounded-lg mb-[15px] cursor-pointer ${
            item.index === dragIndex ? "shadow-border" : ""
          } ${light ? "shadow-black-200" : "shadow-zinc-500"}`}
          style={{
            top: itemPositions[index].top,
            width: itemDims?.width
              ? itemDims.width + "px"
              : ref.current?.getBoundingClientRect().width + "px",
          }}
          onDragStart={(e) => {
            e.currentTarget.style.opacity = "0.4";

            const transparentImage = new Image();
            transparentImage.src =
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

            e.dataTransfer.setDragImage(transparentImage, 0, 0);
            const top =
              e.currentTarget.getBoundingClientRect().top -
              (e.currentTarget.parentElement?.getBoundingClientRect().top || 0);
            const left =
              e.currentTarget.getBoundingClientRect().left -
              (e.currentTarget.parentElement?.getBoundingClientRect().left ||
                0);
            const clientY = e.clientY;
            const clientX = e.clientX;
            handleDragIndex(item.index, item.item);
            setNewLocation((prevLocation) => ({
              ...prevLocation,
              zeroY: clientY,
              zeroX: clientX,
              y: clientY,
              x: clientX,
              startY: top,
              startX: left,
            }));
          }}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (newLocation !== undefined) {
              setNewLocation((prevLocation) => ({
                ...prevLocation,
                y: e.clientY,
                x: e.clientX,
              }));
            }
            if (currentDragOverRef.current !== index) {
              currentDragOverRef.current = index;
              handleUpdatePosition(index);
              handleDragOver(index);
            }
          }}
          onDragEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.currentTarget.style.opacity = "1";
            setNewLocation({
              startX: 0,
              startY: 0,
              zeroX: 0,
              zeroY: 0,
              x: 0,
              y: 0,
            });
            setDragIndex(undefined);
            setItem(undefined);
            currentDragOverRef.current = null;
            handleDrop();
          }}
          draggable
        >
          <BuilderCard
            pokemon={item.item}
            removePokemon={() => handleRemovePokemon(item.index)}
            moveDown={() => handleMoveDown(index)}
            disableMoveDown={index === items.length - 1}
            moveUp={() => handleMoveUp(index)}
            disableMoveUp={index === 0}
            onClick={() => {
              setShowMoves(true);
              setItem(item);
            }}
          />
        </Container>
      ))}
      {item !== undefined && dragIndex !== undefined && (
        <Container
          ref={absoluteRef}
          className={`absolute pointer-events-none w-full z-10`}
        >
          <BuilderCard pokemon={item.item} />
        </Container>
      )}
      <Popup
        show={showMoves}
        onCancel={() => setShowMoves(false)}
        onConfirm={() => handleConfirmMoves()}
      >
        <Column
          className={`h-[400px] overflow-y-auto scrollbar ${
            light ? "light" : "dark"
          } gap-5`}
        >
          <Span>{`Select Moves for ${item?.item.name}`}</Span>
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
      </Popup>
    </Column>
  );
};
