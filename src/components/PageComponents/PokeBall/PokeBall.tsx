import { Column, Container } from "@/components/LayoutComponents";
import { useSize } from "@/components/Providers";
import { FunctionComponent } from "react";

export interface PokeBallProps {
  isLoading?: boolean;
}

export const PokeBall: FunctionComponent<PokeBallProps> = (props) => {
  const { mobile } = useSize();

  return (
    <Container className={`${props.isLoading ? "scale-[0.2]" : ""}`}>
      <Column
        className="flex rounded-[50%] border-[5px] border-black border-solid overflow-hidden box-content"
        style={{ borderWidth: mobile ? "2px" : "5px" }}
      >
        <Container
          className={`flex bg-red-600 border-black border-solid overflow-hidden`}
          style={{
            width: mobile ? "96px" : "290px",
            height: mobile ? "48px" : "145px",
            borderTopRightRadius: mobile ? "48px" : "145px",
            borderTopLeftRadius: mobile ? "48px" : "145px",
            borderBottomWidth: mobile ? "3px" : "7.5px",
          }}
        />
        <Container
          className="flex bg-slate-100 border-black border-solid overflow-hidden"
          style={{
            width: mobile ? "96px" : "290px",
            height: mobile ? "48px" : "145px",
            borderBottomRightRadius: mobile ? "48px" : "145px",
            borderBottomLeftRadius: mobile ? "48px" : "145px",
            borderTopWidth: mobile ? "3px" : "7.5px",
          }}
        />
      </Column>
      <Container
        className={`absolute bg-white z-[2] rounded-[50%] border-black border-solid justify-center items-center`}
        style={{
          width: mobile ? "27px" : "80px",
          height: mobile ? "27px" : "80px",
          top: `calc(50% - ${mobile ? "12.5px" : "40px"})`,
          left: `calc(50% - ${mobile ? "12.5px" : "40px"})`,
          borderWidth: mobile ? "6px" : "15px",
        }}
      >
        <Container
          className={`flex w-[25px] h-[25px] rounded-[50%] border-2 border-black border-solid ${
            props.isLoading ? "animate-pokeball-pulse" : ""
          }`}
          style={{
            width: mobile ? "7px" : "25px",
            height: mobile ? "7px" : "25px",
          }}
        />
      </Container>
    </Container>
  );
};
