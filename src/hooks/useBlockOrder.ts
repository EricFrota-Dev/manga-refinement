import { useState, useEffect } from "react";
import type { Block, BlockWithOrder } from "../types/Manga";

export function useBlockOrder(initialBlocks: Block[]) {
  const [blocks, setBlocks] = useState<BlockWithOrder[]>([]);

  useEffect(() => {
    const ordered = initialBlocks.map((block, index) => ({
      ...block,
      order: index,
    }));
    setBlocks(ordered);
  }, [initialBlocks]);

  const updateOrder = (index: number, newOrder: number) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], order: newOrder };

    updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    // Corrige sequência 0,1,2...
    const corrected = updated.map((block, i) => ({
      ...block,
      order: i,
    }));

    setBlocks(corrected);
  };

  const orderedBlocks = blocks
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const getExportableBlocks = (): Block[] =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    orderedBlocks.map(({ order, ...rest }) => rest);

  return { blocks: orderedBlocks, setBlocks, updateOrder, getExportableBlocks };
}
