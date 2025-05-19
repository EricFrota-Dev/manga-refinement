import type { Block } from "../types/Manga";

export function mergeBlocks(parent: Block, child: Block): Block {
  const newX = Math.min(parent.positionX, child.positionX);
  const newY = Math.min(parent.positionY, child.positionY);
  const maxY = Math.max(
    parent.positionY + parent.height,
    child.positionY + child.height
  );

  return {
    ...parent,
    positionX: newX,
    positionY: newY,
    width: parent.width + child.width,
    height: maxY - newY,
    text:
      newX === parent.positionX
        ? `${child.text}\n${parent.text}`
        : `${parent.text}\n${child.text}`,
  };
}

export function isOverlapping(a: Block, b: Block): boolean {
  const overlapX =
    Math.min(a.positionX + a.width, b.positionX + b.width) -
    Math.max(a.positionX, b.positionX);
  const overlapY =
    Math.min(a.positionY + a.height, b.positionY + b.height) -
    Math.max(a.positionY, b.positionY);
  return overlapX > 0 && overlapY > 0;
}
