import { FunctionComponent, useState } from "react";
import { TableHeader, TableHeaderType } from "./TableHeader";
import { Row } from "../Row";
import { Container } from "../Container";
import { Span } from "../Typography";
import { Column } from "../Column";
import { useDarkTheme } from "@/components/Providers";
import { Button } from "../Buttons";
import { BiChevronDown } from "react-icons/bi";
import { TableCell } from "./TableCell";

export interface TableRowProps {
  headers: TableHeaderType[];
  value: any;
  subLayer?: boolean;
  index?: number;
}

export const TableRow: FunctionComponent<TableRowProps> = (props) => {
  const { light } = useDarkTheme();
  const [expand, setExpand] = useState<{ value: boolean; keyId: string }>();

  return (
    <Column className={`flex-1`}>
      <Row className={`min-h-[40px]`}>
        {props.headers.map((h, index) => (
          <TableCell
            key={h.keyId + index}
            cell={
              props.value ? (
                typeof props.value[h.keyId] === "string" ? (
                  <Span className={`${props.subLayer ? "text-xs" : ""}`}>
                    {props.value[h.keyId]
                      ?.toString()
                      .split("-")
                      .map((s: string) => s[0].toUpperCase() + s.slice(1))
                      .join("-")}
                  </Span>
                ) : typeof props.value[h.keyId] === "number" ? (
                  <Span className={`${props.subLayer ? "text-xs" : ""}`}>
                    {props.value[h.keyId].toString()}
                  </Span>
                ) : !props.value[h.keyId] ? (
                  <Span className={`${props.subLayer ? "text-xs" : ""}`}>
                    -
                  </Span>
                ) : typeof props.value[h.keyId] === "object" && h.expandable ? (
                  <Row className={`gap-2 items-center`}>
                    <Span className={`${props.subLayer ? "text-xs" : ""}`}>
                      {props.value[h.keyId].cellData
                        ?.toString()
                        ?.split("-")
                        .map((s: string) => s[0].toUpperCase() + s.slice(1))
                        .join("-")}
                    </Span>
                    {props.value[h.keyId].subLayer.length ? (
                      <Button
                        onClick={() =>
                          setExpand({
                            value:
                              expand?.value === undefined
                                ? true
                                : !expand.value,
                            keyId: h.keyId,
                          })
                        }
                        className="!w-[15px] !h-[15px] rounded-[50%] !p-0 !m-0 transition-all"
                        type="text"
                      >
                        <BiChevronDown
                          className={`transform transition-all ${
                            expand?.value ? "rotate-180" : "rotate-0"
                          } ${
                            light
                              ? "text-blue-900 group-hover:text-blue-800"
                              : "text-slate-300 group-hover:text-slate-200"
                          }`}
                          style={{ fontSize: "20px" }}
                        />
                      </Button>
                    ) : null}
                  </Row>
                ) : (
                  props.value[h.keyId]
                )
              ) : (
                <></>
              )
            }
            minWidth={h.minWidth || "200px"}
          />
        ))}
      </Row>
      {expand?.value && props.index !== undefined ? (
        <Column
          className={`${
            light
              ? props.index % 2 !== 0
                ? "bg-slate-300/50"
                : "bg-slate-400/50"
              : props.index % 2 !== 0
              ? "bg-gray-800/50"
              : "bg-gray-700/50"
          }
           bg-opacity-50
          `}
        >
          <Container
            className={`border-b-[1px] ${
              light ? "bg-slate-200" : "bg-gray-900"
            } border-solid`}
          />
          <Row className={`max-h-[40px]`}>
            <TableHeader
              headers={
                props.headers.find((h) => h.keyId === expand.keyId)
                  ?.subHeaders || []
              }
              subLayer
            />
          </Row>
          <Container
            className={`border-b-[1px] ${
              light ? "bg-slate-200" : "bg-gray-900"
            } border-solid`}
          />
          {props.value[expand.keyId].subLayer.map((r: any, index: number) => (
            <Row
              key={index}
              className={`flex-1 w-full max-h-[40px] items-center `}
            >
              <TableRow
                headers={
                  props.headers.find((h) => h.keyId === expand.keyId)
                    ?.subHeaders || []
                }
                value={r}
                subLayer
              />
            </Row>
          ))}
        </Column>
      ) : (
        <></>
      )}
    </Column>
  );
};
