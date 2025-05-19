import { useCallback, useRef, useState } from "react";

export const useUndoRedo = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const undoStack = useRef<T[]>([]);
  const redoStack = useRef<T[]>([]);

  const set = useCallback(
    (newState: T) => {
      undoStack.current.push(state);
      redoStack.current = [];
      setState(newState);
    },
    [state]
  );

  const undo = useCallback(() => {
    if (undoStack.current.length === 0) return;
    const prev = undoStack.current.pop()!;
    redoStack.current.push(state);
    setState(prev);
  }, [state]);

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return;
    const next = redoStack.current.pop()!;
    undoStack.current.push(state);
    setState(next);
  }, [state]);

  return { state, set, undo, redo };
};
