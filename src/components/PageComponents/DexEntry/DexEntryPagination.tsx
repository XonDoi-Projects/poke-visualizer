import { Row, Button, Span } from "@/components/LayoutComponents";
import { useDarkTheme } from "@/components/Providers";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { BiChevronLeft, BiGridAlt, BiChevronRight } from "react-icons/bi";

export interface DexEntryPaginationProps {
  isVariant?: boolean;
  prevValue?: number;
  nextValue?: number;
}

export const DexEntryPagination: FunctionComponent<DexEntryPaginationProps> = ({
  isVariant,
  nextValue,
  prevValue,
}) => {
  const router = useRouter();
  const { light } = useDarkTheme();

  return (
    <Row className={`gap-5 justify-between`}>
      <Row
        className={`relative items-center gap-2 h-[35px] w-[100px] justify-start`}
      >
        <Button
          onClick={() =>
            router.push(`/dex/${isVariant ? "variants/" : "bases"}${prevValue}`)
          }
          className={`items-center justify-center rounded-full w-[35px] h-[35px] ${
            prevValue !== undefined ? "cursor-pointer" : "cursor-auto"
          } transition-all`}
          style={{ padding: "5px" }}
          disable={prevValue === undefined}
        >
          <BiChevronLeft
            className={!light ? "text-blue-900" : "text-slate-300"}
            style={{ fontSize: "20px" }}
          />
        </Button>
        <Span>Prev</Span>
      </Row>
      <Button
        onClick={() => router.push(`/dex`)}
        className={`items-center justify-center rounded-full w-[35px] h-[35px] cursor-pointer transition-all`}
        style={{ padding: "5px" }}
      >
        <BiGridAlt
          className={!light ? "text-blue-900" : "text-slate-300"}
          style={{ fontSize: "20px" }}
        />
      </Button>
      <Row
        className={`relative items-center gap-2 h-[35px] w-[100px] justify-end`}
      >
        <Span>Next</Span>
        <Button
          onClick={() =>
            router.push(
              `/dex/${isVariant ? "variants/" : "bases/"}${nextValue}`
            )
          }
          className={`items-center justify-center rounded-full w-[35px] h-[35px] ${
            nextValue !== undefined ? "cursor-pointer" : "cursor-auto"
          } transition-all `}
          style={{ padding: "5px" }}
          disable={nextValue === undefined}
        >
          <BiChevronRight
            className={!light ? "text-blue-900" : "text-slate-300"}
            style={{
              fontSize: "20px",
            }}
          />
        </Button>
      </Row>
    </Row>
  );
};
