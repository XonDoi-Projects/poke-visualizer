import { useDarkTheme } from "..";
import { Row } from "../LayoutComponents";

export const Footer = () => {
  const { light } = useDarkTheme();

  return (
    <Row
      className={`min-h-[100px] ${light ? "bg-slate-400" : "bg-gray-700"}`}
    ></Row>
  );
};
