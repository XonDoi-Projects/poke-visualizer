import { MutableRefObject, useCallback, useEffect } from "react";

export const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  onClick: () => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        onClick();
      }
    },
    [ref, onClick]
  );

  useEffect(() => {
    document.removeEventListener("mousedown", handleClickOutside);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};
