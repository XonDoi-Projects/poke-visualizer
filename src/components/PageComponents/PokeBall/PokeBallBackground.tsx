import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Column, Container } from "../../LayoutComponents";
import { useSize } from "@/components";

interface PokePosition {
  top: string;
  left: string;
}

export interface PokeBallBackgroundProps {
  hasHeader?: boolean;
}

export const PokeBallBackground: FunctionComponent<PokeBallBackgroundProps> = (
  props
) => {
  const { mobile } = useSize();
  const [oldPos, setOldPos] = useState<PokePosition>({
    top: "0px",
    left: "0px",
  });
  const [newPos, setNewPos] = useState<PokePosition>();

  const [isAnimate, setIsAnimate] = useState(false);
  const [animateCount, setAnimateCount] = useState(0);

  const timerRef = useRef<NodeJS.Timeout>();
  const animationRef = useRef<number>(0);

  const updatePositions = useCallback(() => {
    setIsAnimate(false);
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight - (props.hasHeader ? 50 : 0); //header height

    let widthSpread = winWidth - (mobile ? 100 : 300);
    let heightSpread = winHeight - (mobile ? 100 : 300);

    let newHeight = Math.round(Math.random() * heightSpread);
    let newWidth = Math.round(Math.random() * widthSpread);

    if (animateCount <= 5) {
      if (!newPos) {
        setNewPos((prev) => {
          if (prev) {
            setOldPos(prev);
          }
          return { top: 0 + "px", left: 0 + "px" };
        });
      } else if (newPos?.left === "0px") {
        setNewPos((prev) => {
          if (prev) {
            setOldPos(prev);
          }
          return { top: heightSpread + "px", left: newWidth + "px" };
        });
      } else if (newPos?.top === heightSpread + "px") {
        setNewPos((prev) => {
          if (prev) {
            setOldPos(prev);
          }
          return { top: newHeight + "px", left: widthSpread + "px" };
        });
      } else if (newPos?.left === widthSpread + "px") {
        setNewPos((prev) => {
          if (prev) {
            setOldPos(prev);
          }
          return { top: 0 + "px", left: newWidth + "px" };
        });
      } else if (newPos?.top === "0px") {
        setNewPos((prev) => {
          if (prev) {
            setOldPos(prev);
          }
          return { top: newHeight + "px", left: 0 + "px" };
        });
      }
      setAnimateCount((prev) => prev + 1);
    } else {
      setNewPos(undefined);
      setAnimateCount(0);
    }
  }, [animateCount, mobile, newPos, props.hasHeader]);

  const showBall = useMemo(() => {
    return animateCount <= 5;
  }, [animateCount]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (showBall) {
      timerRef.current = setTimeout(() => {
        animationRef.current = requestAnimationFrame(updatePositions);
      }, 2000);
    } else {
      setAnimateCount(0);
    }
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(animationRef.current);
    };
  }, [showBall, updatePositions]);

  useEffect(() => {
    if (newPos) {
      setIsAnimate(true);
    }
  }, [newPos]);

  return (
    <Container className={`flex-1 w-full h-full opacity-5 overflow-hidden`}>
      {showBall && isAnimate ? (
        <Column
          className={`relative  justify-center items-center overflow-hidden 
        ${isAnimate ? "animate-move-ball" : ""}
       `}
          style={
            isAnimate
              ? ({
                  width: mobile ? "100px" : "300px",
                  height: mobile ? "100px" : "300px",
                  animationFillMode: "forwards",
                  "--topOld": oldPos.top,
                  "--leftOld": oldPos.left,
                  "--topNew": newPos?.top,
                  "--leftNew": newPos?.left,
                } as CSSProperties)
              : {}
          }
        >
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
            className="absolute bg-white z-[2] rounded-[50%] border-black border-solid justify-center items-center"
            style={{
              width: mobile ? "27px" : "80px",
              height: mobile ? "27px" : "80px",
              top: `calc(50% - ${mobile ? "12.5px" : "40px"})`,
              left: `calc(50% - ${mobile ? "12.5px" : "40px"})`,
              borderWidth: mobile ? "6px" : "15px",
            }}
          >
            <Container
              className="flex w-[25px] h-[25px] rounded-[50%] border-2 border-black border-solid"
              style={{
                width: mobile ? "7px" : "25px",
                height: mobile ? "7px" : "25px",
              }}
            />
          </Container>
        </Column>
      ) : (
        <></>
      )}
    </Container>
  );
};
