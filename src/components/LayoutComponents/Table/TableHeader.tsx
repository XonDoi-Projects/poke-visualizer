import { FunctionComponent } from "react";
import { Container } from "../Container";
import { Span } from "../Typography";

export type TableHeaderType = {
  name: string;
  expandable?: boolean;
  keyId: string;
  subHeaders?: TableHeaderType[];
};

export interface TableHeaderProps {
  headers: TableHeaderType[];
  subLayer?: boolean;
}

export const TableHeader: FunctionComponent<TableHeaderProps> = (props) => {
  return props.headers.map((h) => (
    <Container
      key={h.keyId}
      className={`max-w-[200px] min-w-[200px] p-2 items-center`}
    >
      <Span className={`${props.subLayer ? "text-xs" : ""}`}>
        {h.name.toUpperCase()}
      </Span>
    </Container>
  ));
};
