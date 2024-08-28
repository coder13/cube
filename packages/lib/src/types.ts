export interface PieceSetWithOrientation {
  perm: number[];
  orient: number[];
}

export interface Puzzle {
  corners: PieceSetWithOrientation;
  edges: PieceSetWithOrientation;
  centers: number[];
}

export interface MoveDef {
  corners?: PieceSetWithOrientation;
  edges?: PieceSetWithOrientation;
  centers?: number[];
}

export type Face = "up" | "down" | "left" | "right" | "back" | "front";

export enum Center {
  up = 0,
  left = 1,
  front = 2,
  right = 3,
  back = 4,
  down = 5,
}
