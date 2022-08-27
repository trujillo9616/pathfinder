import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra } from "../../algorithms/weighted/dijkstra";
import { bfs } from "../../algorithms/unweighted/bfs";
import { dfs } from "../../algorithms/unweighted/dfs";
import { ids } from "../../algorithms/unweighted/ids";
import { getShortestPathNodes } from "../../algorithms/backtrackSolution";
import { GridType, NodeType } from "../../types/index";

import "./pathfinder.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 35;

const getInitialGrid = () => {
  const grid: GridType = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row: number, col: number) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWalls = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const PathfinderVisualizer: React.FC = () => {
  const [grid, setGrid] = useState<Array<Array<NodeType>>>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    const newGrid = getNewGridWithWalls(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWalls(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateAlgo = (
    visitedNodesInOrder: NodeType[] | undefined | null,
    nodesInShortestPathOrder: NodeType[]
  ) => {
    if (!visitedNodesInOrder) return;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-visited";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-shortest-path";
        }
      }, 50 * i);
    }
  };

  const visualizeAlgo = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getShortestPathNodes(finishNode);

    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const handleReset = () => {
    for (const row of grid) {
      for (const node of row) {
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          if (node.isStart) {
            nodeElement.className = "node node-start";
          } else if (node.isFinish) {
            nodeElement.className = "node node-finish";
          } else {
            nodeElement.className = "node";
          }

          node.isVisited = false;
          node.distance = Infinity;
          node.previousNode = null;
          node.isWall = false;
        }
      }
    }
  };

  return (
    <>
      <button onClick={() => visualizeAlgo()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => handleReset()}>Reset</button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathfinderVisualizer;
