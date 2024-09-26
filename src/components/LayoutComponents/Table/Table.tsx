import { FunctionComponent } from "react";
import { Container } from "../Container";
import { Column } from "../Column";
import { Row } from "../Row";
import { TableHeader, TableHeaderType } from "./TableHeader";
import { TableRow } from "./TableRow";
import { useDarkTheme } from "@/components/Providers";

export interface TableProps {
  headers: TableHeaderType[];
  rows: any[];
}

export const Table: FunctionComponent<TableProps> = (props) => {
  const { light } = useDarkTheme();

  return (
    <Container className={"h-fit w-full overflow-x-auto bg-transparent"}>
      <Column className={`flex-1`}>
        <Row className={`h-[40px]`}>
          <TableHeader headers={props.headers} />
        </Row>
        <Container
          className={`border-b-[1px] ${
            light ? "bg-slate-200" : "bg-gray-900"
          } border-solid`}
        />
        {props.rows.map((r, index) => (
          <Column
            key={index}
            className={`flex-1 w-full ${
              light
                ? index % 2 === 0
                  ? "bg-slate-300"
                  : "bg-slate-400"
                : index % 2 === 0
                ? "bg-gray-800"
                : "bg-gray-700"
            }`}
          >
            <TableRow headers={props.headers} value={r} index={index} />
          </Column>
        ))}
      </Column>
    </Container>
  );
};
