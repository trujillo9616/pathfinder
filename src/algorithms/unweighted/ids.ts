import { NodeType, GridType } from '../../types/index';
import { getNeighbors } from './getNeighbors';

export function ids(grid: GridType, startNode: NodeType, endNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  let maxDepth = 6;
  let bottomReached = false;
  let i = 0;

  while (!bottomReached) {
    bottomReached = true;
    const result = dfs(grid, startNode, endNode, 0, maxDepth, visitedNodesInOrder, bottomReached);
    console.log(result);
    if (result) return result;
    maxDepth *= 2;
    i++;

    // Safety check to prevent infinite loop
    if (i > 1000) {
      console.log('infinite loop');
      break;
    }
  }
  return visitedNodesInOrder;
};

export function dfs(
  grid: GridType,
  currentNode: NodeType,
  endNode: NodeType,
  currentDepth: number,
  maxDepth: number,
  visitedNodesInOrder: NodeType[],
  bottomReached: boolean
): NodeType[] | null {
  if (currentNode.isWall) return null;
  if (currentNode.isVisited) currentNode.isVisited = false;
  currentNode.isVisited = true;
  visitedNodesInOrder.push(currentNode);

  if (currentNode === endNode) return visitedNodesInOrder;

  const neighbors = getNeighbors(currentNode, grid);
  if (currentDepth >= maxDepth) {
    if (neighbors.length > 0) bottomReached = false;
    return null;
  }

  for (const neighbor of neighbors) {
    neighbor.previousNode = currentNode;
    const result: NodeType[] | null = dfs(grid, neighbor, endNode, currentDepth + 1, maxDepth, visitedNodesInOrder, bottomReached);
    if (result !== null) return result;
  }
  return null;
};
