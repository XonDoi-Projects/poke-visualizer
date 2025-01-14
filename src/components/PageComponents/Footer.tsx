import { useDarkTheme } from "..";
import { Column, Row, Small } from "../LayoutComponents";

export const Footer = () => {
  const { light } = useDarkTheme();

  return (
    <Row className={`h-fit ${light ? "bg-slate-400" : "bg-gray-700"} p-3`}>
      <Column className={`gap-2`}>
        <Small className={` ${light ? "text-blue-900" : "text-slate-300"} `}>
          Pokémon and Pokémon character names are trademarks of Nintendo.
        </Small>
        <Small className={` ${light ? "text-blue-900" : "text-slate-300"} `}>
          {`Pokémon designs are © 1995–${new Date().getFullYear()} of The Pokémon Company.`}
        </Small>
        <Small className={` ${light ? "text-blue-900" : "text-slate-300"} `}>
          This website is not affiliated with The Pokémon Company, Nintendo,
          Game Freak Inc., or Creatures Inc.
        </Small>
      </Column>
    </Row>
  );
};
