import { FunctionComponent, ReactNode, useState } from "react";
import { Container } from "../Container";
import { Button } from "@/components/LayoutComponents";
import { BiInfoCircle } from "react-icons/bi";
import { useDarkTheme } from "@/components/Providers";

export interface InfoButtonProps {
  tooltipDetails: ReactNode;
}

export const InfoButton: FunctionComponent<InfoButtonProps> = (props) => {
  const { light } = useDarkTheme();

  return (
    <>
      <Container className="relative flex flex-row">
        <Button
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
          type="text"
          tooltip
          tooltipDetails={props.tooltipDetails}
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
      </Container>
    </>
  );
};