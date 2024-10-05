import { FunctionComponent, ReactNode } from "react";
import { Container } from "../Container";

export interface TableCellProps {
  minWidth: string;
  cell: ReactNode;
}

export const TableCell: FunctionComponent<TableCellProps> = (props) => {
  return (
    <Container
      className={`flex-1 p-2 items-center gap-2`}
      style={{ minWidth: props.minWidth }}
    >
      {props.cell}
    </Container>
  );
};
