import { Row, Span } from "@/components/LayoutComponents";
import { Card } from "@/components/LayoutComponents/Card";
import { useDarkTheme } from "@/components/Providers";
import { FunctionComponent } from "react";

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip: FunctionComponent<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { light } = useDarkTheme();

  return (
    active &&
    payload &&
    payload.length &&
    label && (
      <Card className={`p-2 rounded-md bg-opacity-[0.9]`}>
        <Span>{`${label}`}</Span>

        {payload.map((payload) => (
          <Row key={payload.name} className={`w-full gap-2`}>
            <Span
              className={`flex-1`}
              style={{ color: payload.fill }}
            >{`${payload.name} :`}</Span>
            <Span style={{ color: payload.fill }}>{`${payload.value}`}</Span>
          </Row>
        ))}
      </Card>
    )
  );
};
