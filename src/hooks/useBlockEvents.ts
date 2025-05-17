import { useEffect, useState } from "react";

export function useModifierKeys() {
  const [shiftPressed, setShiftPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(true);
      if (e.key === "Alt") setAltPressed(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(false);
      if (e.key === "Alt") setAltPressed(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return { shiftPressed, altPressed };
}
