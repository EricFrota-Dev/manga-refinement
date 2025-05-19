import { useEffect, useState } from "react";
import DrawingOverlay from "./DrawingOverlay";
import BlockList from "./BlockList";
import type { Page } from "../../types/Manga";
import { useModifierKeys } from "../../hooks/useBlockEvents";
import { useDrawBlocks } from "../../hooks/useDrawBlocks";
import {
  updateBlock,
  handleDragStop as handleDrag,
} from "../../hooks/useBlockEditorHelpers";
import { useUndoRedo } from "../../hooks/useUndoRedo";

interface Props {
  page: Page;
  onPageChange: (updatedPage: Page) => void;
}

const BlockEditor = ({ page, onPageChange }: Props) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showIndexes, setShowIndexes] = useState(false);
  const { shiftPressed, altPressed, cPressed } = useModifierKeys();

  const {
    state: currentPage,
    set: setPage,
    undo,
    redo,
  } = useUndoRedo<Page>(page);

  const { startPos, currentPos, handleMouseEvents } = useDrawBlocks(
    currentPage,
    setPage,
    altPressed
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      } else if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        setShowIndexes((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-auto">
      <div
        className="relative"
        style={{
          width: currentPage.page_width,
          height: currentPage.page_height,
          backgroundImage: `url(${currentPage.img_url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        {...handleMouseEvents}>
        <DrawingOverlay startPos={startPos} currentPos={currentPos} />
        <BlockList
          page={currentPage}
          shiftPressed={shiftPressed}
          cPressed={cPressed}
          draggingIndex={draggingIndex}
          hoveredIndex={hoveredIndex}
          showIndexes={showIndexes}
          setDraggingIndex={setDraggingIndex}
          setHoveredIndex={setHoveredIndex}
          onDelete={(i) => {
            const blocks = [...currentPage.blocks];
            blocks.splice(i, 1);
            setPage({ ...currentPage, blocks });
            setHoveredIndex(null);
          }}
          onDragStop={(i, d) => {
            handleDrag(currentPage, setPage, i, d);
            setDraggingIndex(null);
          }}
          onResizeStop={(i, w, h, x, y) =>
            updateBlock(currentPage, setPage, i, {
              width: w,
              height: h,
              positionX: x,
              positionY: y,
            })
          }
          onTextChange={(i, text) =>
            updateBlock(currentPage, setPage, i, { text })
          }
        />
      </div>
    </div>
  );
};

export default BlockEditor;
