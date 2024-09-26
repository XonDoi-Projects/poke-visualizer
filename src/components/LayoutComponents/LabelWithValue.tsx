import { FunctionComponent } from "react";
import { Row } from "./Row";
import { Small, Span } from "./Typography";
import { Container } from "./Container";
import { useDarkTheme } from "../Providers";

export interface LabelWithValueProps {
  label: string;
  value?: string;
  small?: boolean;
}

export const LabelWithValue: FunctionComponent<LabelWithValueProps> = ({
  label,
  value,
  small,
}) => {
  const { light } = useDarkTheme();
  return (
    <Row>
      <Container className={`flex-1`}>
        {small ? (
          <Small className={`${light ? "text-blue-900" : "text-slate-300"} `}>
            {label.toLocaleUpperCase()}
          </Small>
        ) : (
          <Span>{label.toLocaleUpperCase()}</Span>
        )}
      </Container>
      <Container className={`flex-shrink-1`}>
        {small
          ? value && (
              <Small
                className={`${light ? "text-blue-900" : "text-slate-300"} `}
              >
                {value}
              </Small>
            )
          : value && <Span>{value}</Span>}
      </Container>
    </Row>
  );
};
