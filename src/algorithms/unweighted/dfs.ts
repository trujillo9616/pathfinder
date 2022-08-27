import { NodeType, GridType } from '../../types/index';
import { getNeighbors } from './getNeighbors';

export function dfs(grid: GridType, startNode: NodeType, endNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  const stack: NodeType[] = [];
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode === undefined) break;

    if (currentNode.isWall || currentNode.isVisited) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.isWall) continue;
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
};
