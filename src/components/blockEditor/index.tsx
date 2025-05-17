import { useEffect, useState } from "react";
import EditableBlock from "./EditableBlock";
import DrawingOverlay from "./DrawingOverlay";
import type { Block, Page } from "../../types/Block";
import { useModifierKeys } from "../../hooks/useBlockEvents";
import { isOverlapping, mergeBlocks } from "../../hooks/useBlockMerge";

interface Props {
  page: Page;
  setPage: (updatedPage: Page) => void;
}

const BlockEditor = ({ page, setPage }: Props) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { shiftPressed, altPressed } = useModifierKeys();

  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [showIndexes, setShowIndexes] = useState(false);

  const updateBlock = (i: number, data: Partial<Block>) => {
    const updated = [...page.blocks];
    updated[i] = { ...updated[i], ...data };
    setPage({ ...page, blocks: updated });
  };

  const handleDragStop = (i: number, d: { x: number; y: number }) => {
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
    setDraggingIndex(null);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        setShowIndexes((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEvents = {
    onMouseDown: (e: React.MouseEvent) => {
      if (!altPressed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setCurrentPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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

  return (
    <div className="w-full h-full flex justify-center items-center overflow-auto">
      <div
        className="relative"
        style={{
          width: page.image_info.width,
          height: page.image_info.height,
          backgroundImage: `url(${page.image_info.url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        {...handleMouseEvents}>
        <DrawingOverlay startPos={startPos} currentPos={currentPos} />
        {page.blocks.map((block, i) => (
          <EditableBlock
            key={i}
            block={block}
            index={i}
            shiftPressed={shiftPressed}
            draggingIndex={draggingIndex}
            hoveredIndex={hoveredIndex}
            setDraggingIndex={setDraggingIndex}
            setHoveredIndex={setHoveredIndex}
            showIndexes={showIndexes}
            onDelete={() => {
              const blocks = [...page.blocks];
              blocks.splice(i, 1);
              setPage({ ...page, blocks });
              setHoveredIndex(null);
            }}
            onDragStop={(d) => handleDragStop(i, d)}
            onResizeStop={(w, h, x, y) =>
              updateBlock(i, {
                width: w,
                height: h,
                positionX: x,
                positionY: y,
              })
            }
            onTextChange={(text) => updateBlock(i, { text })}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockEditor;
