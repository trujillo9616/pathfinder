export type NodeType = {
  row: number,
  col: number,
  isStart: boolean,
  isFinish: boolean,
  distance: number,
  isVisited: boolean,
  isWall: boolean,
  previousNode: NodeType | null,
}

export type GridType = NodeType[][];
