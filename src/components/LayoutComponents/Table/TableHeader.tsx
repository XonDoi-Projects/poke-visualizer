import { FunctionComponent } from "react";
import { Span } from "../Typography";
import { TableCell } from "./TableCell";

export type TableHeaderType = {
  name: string;
  expandable?: boolean;
  keyId: string;
  subHeaders?: TableHeaderType[];
  minWidth?: string;
};

export interface TableHeaderProps {
  headers: TableHeaderType[];
  subLayer?: boolean;
}

export const TableHeader: FunctionComponent<TableHeaderProps> = (props) => {
  return props.headers.map((h) => (
    <TableCell
      key={h.keyId}
      minWidth={h.minWidth || "200px"}
      cell={
        <Span className={`${props.subLayer ? "text-xs" : ""}`}>
          {h.name.toUpperCase()}
        </Span>
      }
    />
  ));
};
