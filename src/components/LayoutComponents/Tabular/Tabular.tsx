import { FunctionComponent, PropsWithChildren } from "react";
import { Container } from "../Container";
import { Row } from "../Row";
import { Span } from "../Typography";
import { useDarkTheme } from "@/components/Providers";
import { Card } from "../Card";
import { Column } from "../Column";

export interface TabularProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const Tabular: FunctionComponent<PropsWithChildren<TabularProps>> = ({
  tabs,
  activeTab,
  setActiveTab,
  children,
}) => {
  const { light } = useDarkTheme();

  return (
    <Column>
      <Row>
        {tabs.map((t, index) => (
          <Container
            className={`${
              light ? "bg-slate-300" : "bg-gray-800"
            } rounded-t-md p-2 ${
              activeTab === t ? "" : "opacity-50"
            } cursor-pointer `}
            key={index}
            onClick={() => setActiveTab(t)}
          >
            <Span>{t}</Span>
          </Container>
        ))}
      </Row>
      <Card noShadow className={`rounded-b-md rounded-tr-md p-2`}>
        {children}
      </Card>
    </Column>
  );
};
