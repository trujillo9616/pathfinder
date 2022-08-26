import React from "react";

import "./node.css";

interface NodeProps {
  key: number;
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
}

const Node: React.FC<NodeProps> = ({ row, col, isStart, isFinish, isWall }) => {
  const additionalClass = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return <div className={`node ${additionalClass}`}></div>;
};

export default Node;
