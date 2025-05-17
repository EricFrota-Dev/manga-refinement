import React from "react";

type BlockProps = {
  text: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
};

export const Block: React.FC<BlockProps> = ({
  text,
  positionX,
  positionY,
  width,
  height,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: positionY,
        left: positionX,
        width: width,
        height: height,
        border: "1px solid red",
        color: "black",
        fontSize: "12px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.8)",
        padding: "2px",
        whiteSpace: "pre-wrap",
      }}>
      {text}
    </div>
  );
};
