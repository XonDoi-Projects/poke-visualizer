import { useDarkTheme } from "..";
import { Column, Row, Small } from "../LayoutComponents";

export const Footer = () => {
  const { light } = useDarkTheme();

  return (
    <Row className={`h-fit ${light ? "bg-slate-400" : "bg-gray-700"} p-3`}>
      <Column>
        <Small>
          Pokémon and Pokémon character names are trademarks of Nintendo.
        </Small>
        <Small>Pokémon designs are © 1995–2024 of The Pokémon Company.</Small>
        <Small>
          This website is not affiliated with The Pokémon Company, Nintendo,
          Game Freak Inc., or Creatures Inc.
        </Small>
      </Column>
    </Row>
  );
};
