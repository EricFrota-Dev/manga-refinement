import { Rnd } from "react-rnd";
import BlockMenu from "./BlockMenu";
import type { Block } from "../../types/Block";

interface Props {
  block: Block;
  index: number;
  shiftPressed: boolean;
  draggingIndex: number | null;
  hoveredIndex: number | null;
  setDraggingIndex: (i: number | null) => void;
  setHoveredIndex: (i: number | null) => void;
  onDelete: () => void;
  onDragStop: (d: { x: number; y: number }) => void;
  onResizeStop: (w: number, h: number, x: number, y: number) => void;
  onTextChange: (text: string) => void;
  showIndexes: boolean;
}

const EditableBlock = ({
  block,
  index,
  shiftPressed,
  draggingIndex,
  hoveredIndex,
  setDraggingIndex,
  setHoveredIndex,
  onDelete,
  onDragStop,
  onResizeStop,
  onTextChange,
  showIndexes,
}: Props) => {
  return (
    <Rnd
      size={{ width: block.width, height: block.height }}
      position={{ x: block.positionX, y: block.positionY }}
      bounds="parent"
      disableDragging={!shiftPressed}
      onDragStart={() => {
        setDraggingIndex(index);
        setHoveredIndex(null);
      }}
      onDragStop={(_, d) => onDragStop(d)}
      onResizeStop={(_, __, ref, ___, pos) =>
        onResizeStop(
          parseInt(ref.style.width),
          parseInt(ref.style.height),
          pos.x,
          pos.y
        )
      }
      style={{
        zIndex: draggingIndex === index ? 1000 : 1,
        opacity: draggingIndex === index ? 0.5 : 1,
        backgroundColor:
          draggingIndex === index ? "rgba(128, 0, 128, 0.3)" : "transparent",
      }}>
      <div
        className="w-full h-full relative font-bold"
        onMouseEnter={() => draggingIndex === null && setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}>
        {hoveredIndex === index && draggingIndex === null && !shiftPressed && (
          <BlockMenu onDelete={onDelete} />
        )}
        {showIndexes && (
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "black",
              color: "yellow",
              fontSize: 14,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
            contentEditable
            suppressContentEditableWarning
            // onBlur={(e) => {
            //   block.order = index
            // }}
          >
            {index + 1}
          </div>
        )}
        <div
          contentEditable
          suppressContentEditableWarning
          className="w-full h-full bg-white bg-opacity-80 border border-purple-600 text-5 p-1 text-xs overflow-hidden japanese text-shadow-1 text-shadow-md"
          onBlur={(e) => onTextChange(e.currentTarget.innerText)}>
          {block.text}
        </div>
      </div>
    </Rnd>
  );
};

export default EditableBlock;
