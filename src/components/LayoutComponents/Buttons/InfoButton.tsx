import { FunctionComponent, ReactNode, useState } from "react";
import { Container } from "../Container";
import { Button } from "@/components/LayoutComponents";
import { BiInfoCircle } from "react-icons/bi";
import { useDarkTheme } from "@/components/Providers";

export interface InfoButtonProps {
  details: ReactNode;
}

export const InfoButton: FunctionComponent<InfoButtonProps> = (props) => {
  const { light } = useDarkTheme();

  const [show, setShow] = useState(false);
  return (
    <>
      <Container className="relative flex flex-row-reverse">
        <Button
          onTouchStart={() => setShow(!show)}
          onPointerEnter={() => setShow(true)}
          onPointerLeave={() => setShow(false)}
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
          type="text"
        >
          <BiInfoCircle
            className={
              light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-yellow-500 group-hover:text-yellow-400"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
        {show ? (
          <Container
            className={`absolute top-[100%] left-[50%] transform translate-x-[-50%] w-max-[200px] h-fit p-2 ${
              light ? "bg-slate-300" : "bg-gray-800"
            } shadow-border ${light ? "shadow-black-200" : "shadow-blue-400"} `}
          >
            {props.details}
          </Container>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};
