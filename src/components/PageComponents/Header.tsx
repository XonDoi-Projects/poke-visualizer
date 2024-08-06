import { Button, Container, Row } from "../LayoutComponents";
import { useDarkTheme } from "..";
import { BiAdjust } from "react-icons/bi";
import Image from "next/image";

export const Header = () => {
  const { light, setLight } = useDarkTheme();

  return (
    <Row
      className={`h-[50px] z-10 sticky justify-between items-center transition-all ${
        light
          ? "bg-slate-200 shadow-bottom shadow-slate-300"
          : "bg-gray-900 shadow-bottom shadow-gray-800"
      } ${
        light
          ? " hover:bg-slate-100 hover:shadow-slate-300"
          : "hover:bg-gray-700 hover:shadow-gray-800"
      }  `}
    >
      <Container
        className={`relative w-[100px] items-center justify-center pl-5`}
      >
        <Image
          src={light ? "/PokeVis_Logo_Light.png" : "/PokeVis_Logo_Dark.png"}
          alt="Logo"
          sizes="100vw"
          width="0"
          height="0"
          className="w-auto h-full"
        />
      </Container>
      <Container className="flex w-full absolute flex-row-reverse z-[3] pr-5">
        <Button
          onClick={() => setLight(!light)}
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 !bg-transparent "
        >
          <BiAdjust
            className={
              light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-yellow-500 group-hover:text-yellow-400"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
      </Container>
    </Row>
  );
};
