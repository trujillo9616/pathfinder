import { NodeType, GridType } from '../../types/index';
import { getNeighbors } from './getNeighbors';

export function bfs(grid: GridType, startNode: NodeType, endNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  const queue: NodeType[] = [];
  queue.push(startNode);

  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode === undefined) break;

    if (currentNode.isWall || currentNode.isVisited) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.isWall) continue;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  return visitedNodesInOrder;
};
