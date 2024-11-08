import { FunctionComponent, ReactNode } from "react";
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
      <Button
        className={`rounded-full !p-[0px] !w-[30px] !h-[30px] items-center justify-center`}
        type="text"
        tooltip
        tooltipDetails={props.tooltipDetails}
      >
        <BiInfoCircle
          className={
            light
              ? "text-blue-900 group-hover:text-blue-800"
              : "text-slate-300 group-hover:text-slate-200"
          }
          style={{ fontSize: "20px" }}
        />
      </Button>
    </>
  );
};
