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
import { PokeBall } from "./PokeBall";

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
    <Container
      className={`flex-1 w-full h-full overflow-hidden ${
        newPos ? "animate-show-ball" : ""
      }`}
    >
      {showBall && isAnimate ? (
        <Column
          className={`relative justify-center items-center overflow-hidden 
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
          <PokeBall />
        </Column>
      ) : (
        <></>
      )}
    </Container>
  );
};
