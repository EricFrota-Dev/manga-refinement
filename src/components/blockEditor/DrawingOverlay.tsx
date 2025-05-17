interface Props {
  startPos: { x: number; y: number } | null;
  currentPos: { x: number; y: number } | null;
}

const DrawingOverlay = ({ startPos, currentPos }: Props) => {
  if (!startPos || !currentPos) return null;

  const x = Math.min(startPos.x, currentPos.x);
  const y = Math.min(startPos.y, currentPos.y);
  const width = Math.abs(currentPos.x - startPos.x);
  const height = Math.abs(currentPos.y - startPos.y);

  return (
    <div
      className="absolute border border-blue-500 bg-blue-200 bg-opacity-20 pointer-events-none"
      style={{ left: x, top: y, width, height }}
    />
  );
};

export default DrawingOverlay;
