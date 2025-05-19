// hooks/useDrawBlocks.ts
import { useState } from "react";
import type { Page } from "../types/Manga";

export const useDrawBlocks = (
  page: Page,
  setPage: (updatedPage: Page) => void,
  altPressed: boolean
) => {
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleMouseEvents = {
    onMouseDown: (e: React.MouseEvent) => {
      if (!altPressed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setStartPos(pos);
      setCurrentPos(pos);
      setDrawing(true);
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (!drawing || !altPressed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCurrentPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    onMouseUp: () => {
      if (!drawing || !startPos || !currentPos) return;
      const x = Math.min(startPos.x, currentPos.x);
      const y = Math.min(startPos.y, currentPos.y);
      const width = Math.abs(startPos.x - currentPos.x);
      const height = Math.abs(startPos.y - currentPos.y);
      if (width > 5 && height > 5) {
        setPage({
          ...page,
          blocks: [
            ...page.blocks,
            { text: "", positionX: x, positionY: y, width, height },
          ],
        });
      }
      setDrawing(false);
      setStartPos(null);
      setCurrentPos(null);
    },
  };

  return { drawing, startPos, currentPos, handleMouseEvents };
};
