// components/BlockList.tsx
import EditableBlock from "./EditableBlock";
import type { Page } from "../../types/Manga";

interface Props {
  page: Page;
  shiftPressed: boolean;
  cPressed: boolean;
  draggingIndex: number | null;
  hoveredIndex: number | null;
  showIndexes: boolean;
  setDraggingIndex: (index: number | null) => void;
  setHoveredIndex: (index: number | null) => void;
  onDelete: (index: number) => void;
  onDragStop: (index: number, d: { x: number; y: number }) => void;
  onResizeStop: (
    index: number,
    w: number,
    h: number,
    x: number,
    y: number
  ) => void;
  onTextChange: (index: number, text: string) => void;
}

export default function BlockList({
  page,
  shiftPressed,
  cPressed,
  draggingIndex,
  hoveredIndex,
  showIndexes,
  setDraggingIndex,
  setHoveredIndex,
  onDelete,
  onDragStop,
  onResizeStop,
  onTextChange,
}: Props) {
  return (
    <>
      {page.blocks.map((block, i) => (
        <EditableBlock
          key={i}
          block={block}
          index={i}
          shiftPressed={shiftPressed}
          cPressed={cPressed}
          draggingIndex={draggingIndex}
          hoveredIndex={hoveredIndex}
          setDraggingIndex={setDraggingIndex}
          setHoveredIndex={setHoveredIndex}
          showIndexes={showIndexes}
          onDelete={() => onDelete(i)}
          onDragStop={(d) => onDragStop(i, d)}
          onResizeStop={(w, h, x, y) => onResizeStop(i, w, h, x, y)}
          onTextChange={(text) => onTextChange(i, text)}
        />
      ))}
    </>
  );
}
