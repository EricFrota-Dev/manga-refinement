import { useCallback } from "react";
import type { Block } from "../types/Manga";

export const useToggleShape = (
  block: Block,
  onResizeStop: (w: number, h: number, x: number, y: number) => void
) => {
  const toggleShape = useCallback(() => {
    if (!block) return;

    if (block.isElipse) {
      // Voltar para retângulo original
      const newWidth = block.width / Math.SQRT2;
      const newHeight = block.height / Math.SQRT2;
      const deltaX = (block.width - newWidth) / 2;
      const deltaY = (block.height - newHeight) / 2;

      onResizeStop(
        newWidth,
        newHeight,
        block.positionX + deltaX,
        block.positionY + deltaY
      );
    } else {
      // Converter para elipse que envolve o retângulo
      const newWidth = block.width * Math.SQRT2;
      const newHeight = block.height * Math.SQRT2;
      const deltaX = (newWidth - block.width) / 2;
      const deltaY = (newHeight - block.height) / 2;

      onResizeStop(
        newWidth,
        newHeight,
        block.positionX - deltaX,
        block.positionY - deltaY
      );
    }

    block.isElipse = !block.isElipse;
  }, [block, onResizeStop]);

  return toggleShape;
};
