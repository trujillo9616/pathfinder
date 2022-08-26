import React, { useState, useEffect } from "react";
import Node from "./Node/Node";

import "./pathfinder.css";

interface PathfinderVisualizerProps {}

type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
};

const PathfinderVisualizer: React.FC<PathfinderVisualizerProps> = () => {
  const [nodes, setNodes] = useState<Array<Array<NodeType>>>([]);

  useEffect(() => {
    const nodes: NodeType[][] = [];
    for (let row = 0; row < 20; row++) {
      const currentRow: NodeType[] = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          row,
          col,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45,
          isWall: false,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    setNodes(nodes);
  }, []);

  return (
    <div className="grid">
      {nodes.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                row={node.row}
                col={node.col}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isWall={node.isWall}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PathfinderVisualizer;
