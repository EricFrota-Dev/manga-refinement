import { isOverlapping, mergeBlocks } from "./useBlockMerge";
import type { Block, Page } from "../types/Manga";

export const updateBlock = (
  page: Page,
  setPage: (updatedPage: Page) => void,
  i: number,
  data: Partial<Block>
) => {
  const updated = [...page.blocks];
  updated[i] = { ...updated[i], ...data };
  setPage({ ...page, blocks: updated });
};

export const handleDragStop = (
  page: Page,
  setPage: (updatedPage: Page) => void,
  i: number,
  d: { x: number; y: number }
) => {
  const moved = { ...page.blocks[i], positionX: d.x, positionY: d.y };
  let newBlocks = [...page.blocks];
  let merged = false;

  for (let j = 0; j < newBlocks.length; j++) {
    if (i === j) continue;
    if (isOverlapping(moved, newBlocks[j])) {
      const mergedBlock = mergeBlocks(newBlocks[j], moved);
      newBlocks = newBlocks.filter((_, idx) => idx !== i && idx !== j);
      newBlocks.push(mergedBlock);
      merged = true;
      break;
    }
  }

  if (!merged) newBlocks[i] = moved;

  setPage({ ...page, blocks: newBlocks });
};
