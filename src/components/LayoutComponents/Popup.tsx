import { FunctionComponent, HTMLProps, PropsWithChildren } from "react";
import { Cover } from "./Cover";
import { Card } from "./Card";
import { Row } from "./Row";
import { Button } from "./Buttons";

export interface PopupProps {
  className?: HTMLProps<"HTMLElement">["className"];
  show: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Popup: FunctionComponent<PropsWithChildren<PopupProps>> = ({
  show,
  onCancel,
  onConfirm,
  ...props
}) => {
  return show ? (
    <Cover onClick={onCancel} className={`flex justify-center items-center`}>
      <Card
        className={`p-5 min-w-[250px] min-h-[400px] justify-between rounded-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <Row className={`justify-between`}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </Row>
      </Card>
    </Cover>
  ) : (
    <></>
  );
};
