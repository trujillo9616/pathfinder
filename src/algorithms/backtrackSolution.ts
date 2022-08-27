import { NodeType } from "../types";

export function getShortestPathNodes(finishNode: NodeType): NodeType[] {
  const nodesInShortestPathOrder: NodeType[] = [];
  let currentNode: NodeType | null = finishNode;
  while (currentNode != null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
