import { FunctionComponent } from "react";
import { Row } from "./Row";
import { Span } from "./Typography";
import { Container } from "./Container";

export interface LabelWithValueProps {
  label: string;
  value?: string;
}

export const LabelWithValue: FunctionComponent<LabelWithValueProps> = ({
  label,
  value,
}) => {
  return (
    <Row>
      <Container className={`flex-1`}>
        <Span>{label.toLocaleUpperCase()}</Span>
      </Container>
      <Container className={`flex-shrink-1`}>
        {value && <Span>{value}</Span>}
      </Container>
    </Row>
  );
};
