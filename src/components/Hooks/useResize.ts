import { useCallback, useEffect } from "react";

export const useResize = (
  ref: Element | null,
  setValue: (value: DOMRect) => void
) => {
  const handleResize = useCallback(() => {
    if (ref) {
      setValue(ref.getBoundingClientRect());
    }
  }, [ref, setValue]);

  useEffect(() => {
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
};
