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
    // Bind the event listener
    document.removeEventListener("mousedown", handleClickOutside);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};
