import { PieceSetWithOrientation, MoveDef, Face, Center } from "./types";
import { solved, cycle, combine } from "./utils";

// cube containing corners and edges each containing a permutation and orientation array
export const Moves: { [x: string]: MoveDef } = {
  /* Normal Moves: */
  U: {
    corners: {
      perm: [3, 0, 1, 2, 4, 5, 6, 7],
      orient: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    edges: {
      perm: [3, 0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11],
      orient: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  R: {
    corners: {
      perm: [0, 2, 6, 3, 4, 1, 5, 7],
      orient: [0, 1, 2, 0, 0, 2, 1, 0],
    },
    edges: {
      perm: [0, 6, 2, 3, 4, 1, 9, 7, 8, 5, 10, 11],
      orient: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  F: {
    corners: {
      perm: [0, 1, 3, 7, 4, 5, 2, 6],
      orient: [0, 0, 1, 2, 0, 0, 2, 1],
    },
    edges: {
      perm: [0, 1, 7, 3, 4, 5, 2, 10, 8, 9, 6, 11],
      orient: [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    },
  },
  D: {
    corners: {
      perm: [0, 1, 2, 3, 5, 6, 7, 4],
      orient: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    edges: {
      perm: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8],
      orient: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  L: {
    corners: {
      perm: [4, 1, 2, 0, 7, 5, 6, 3],
      orient: [2, 0, 0, 1, 1, 0, 0, 2],
    },
    edges: {
      perm: [0, 1, 2, 4, 11, 5, 6, 3, 8, 9, 10, 7],
      orient: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  B: {
    corners: {
      perm: [1, 5, 2, 3, 0, 4, 6, 7],
      orient: [1, 2, 0, 0, 2, 1, 0, 0],
    },
    edges: {
      perm: [5, 1, 2, 3, 0, 8, 6, 7, 4, 9, 10, 11],
      orient: [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    },
  },
  /* Slice Moves: */
  M: {
    edges: {
      perm: [8, 1, 0, 3, 4, 5, 6, 7, 10, 9, 2, 11],
      orient: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    },
    centers: [
      Center.back,
      Center.left,
      Center.up,
      Center.right,
      Center.down,
      Center.front,
    ],
  },
  S: {
    edges: {
      perm: [0, 3, 2, 11, 4, 5, 6, 7, 8, 1, 10, 9],
      orient: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    },
    centers: [
      Center.left,
      Center.down,
      Center.front,
      Center.up,
      Center.back,
      Center.right,
    ],
  },
  E: {
    edges: {
      perm: [0, 1, 2, 3, 5, 6, 7, 4, 8, 9, 10, 11],
      orient: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    },
    centers: [
      Center.up,
      Center.back,
      Center.left,
      Center.front,
      Center.right,
      Center.down,
    ],
  },
};

// generate ' and 2 moves.
const gen = function (key: keyof typeof Moves) {
  const move = Moves[key];
  Moves[key + "2"] = cycle(cycle(move, solved()), move);
  Moves[key + "'"] = cycle(cycle(Moves[key + "2"], solved()), move);
};

["U", "D", "R", "L", "F", "B", "M", "S", "E"].forEach(gen);

/* Rotations: */
Moves.y = combine([Moves.U, Moves["E'"], Moves["D'"]]);
Moves.x = combine([Moves.R, Moves["M'"], Moves["L'"]]);
Moves.z = combine([Moves.F, Moves["S"], Moves["B'"]]);

Moves.u = combine([Moves["E'"], Moves.U]);
Moves.r = combine([Moves["M'"], Moves.R]);
Moves.f = combine([Moves["S"], Moves.F]);
Moves.d = combine([Moves["E"], Moves.D]);
Moves.l = combine([Moves["M"], Moves.L]);
Moves.b = combine([Moves["S'"], Moves.B]);
["u", "r", "f", "d", "l", "b", "y", "x", "z"].forEach(gen);

// 0    1     2    3     4    5     6    7
// UBL, UBR,  UFR, UFL,  DBL, DBR,  DFR, DFL
export const Corners: Face[][] = [
  ["up", "left", "back"],
  ["up", "back", "right"],
  ["up", "right", "front"],
  ["up", "front", "left"],
  ["down", "back", "left"],
  ["down", "right", "back"],
  ["down", "front", "right"],
  ["down", "left", "front"],
];

// 0   1   2   3    4   5   6   7     8   9   10  11
// UB, UR, UF, UL,  BL, BR, FR, FL,   DB, DR, DF, DL
const Edges: Face[][] = [
  ["up", "back"],
  ["up", "right"],
  ["up", "front"],
  ["up", "left"],
  ["back", "left"],
  ["back", "right"],
  ["front", "right"],
  ["front", "left"],
  ["down", "back"],
  ["down", "right"],
  ["down", "front"],
  ["down", "left"],
];

const Centers: Face[] = ["up", "left", "front", "right", "back", "down"];

const corner = (p: number, o: number, offset = 0) =>
  Corners[p][(o + offset) % 3];
const edge = (p: number, o: number, offset = 0) => Edges[p][(o + offset) % 2];
const center = (p: number) => Centers[p];

const Faces: Record<
  Face,
  (
    cp: number[],
    co: number[],
    ep: number[],
    eo: number[],
    centers: number[]
  ) => [[Face, Face, Face], [Face, Face, Face], [Face, Face, Face]]
> = {
  up: (cp, co, ep, eo, centers) => [
    [corner(cp[0], co[0]), edge(ep[0], eo[0]), corner(cp[1], co[1])],
    [edge(ep[3], eo[3]), center(centers[Center.up]), edge(ep[1], eo[1])],
    [corner(cp[3], co[3]), edge(ep[2], eo[2]), corner(cp[2], co[2])],
  ],
  left: (cp, co, ep, eo, centers) => [
    [corner(cp[0], co[0], 1), edge(ep[3], eo[3], 1), corner(cp[3], co[3], 2)],
    [
      edge(ep[4], eo[4], 1),
      center(centers[Center.left]),
      edge(ep[7], eo[7], 1),
    ],
    [corner(cp[4], co[4], 2), edge(ep[11], eo[11], 1), corner(cp[7], co[7], 1)],
  ],
  front: (cp, co, ep, eo, centers) => [
    [corner(cp[3], co[3], 1), edge(ep[2], eo[2], 1), corner(cp[2], co[2], 2)],
    [edge(ep[7], eo[7]), center(centers[Center.front]), edge(ep[6], eo[6])],
    [corner(cp[7], co[7], 2), edge(ep[10], eo[10], 1), corner(cp[6], co[6], 1)],
  ],
  right: (cp, co, ep, eo, centers) => [
    [corner(cp[2], co[2], 1), edge(ep[1], eo[1], 1), corner(cp[1], co[1], 2)],
    [
      edge(ep[6], eo[6], 1),
      center(centers[Center.right]),
      edge(ep[5], eo[5], 1),
    ],
    [corner(cp[6], co[6], 2), edge(ep[9], eo[9], 1), corner(cp[5], co[5], 1)],
  ],
  back: (cp, co, ep, eo, centers) => [
    [corner(cp[1], co[1], 1), edge(ep[0], eo[0], 1), corner(cp[0], co[0], 2)],
    [edge(ep[5], eo[5]), center(centers[Center.back]), edge(ep[4], eo[4])],
    [corner(cp[5], co[5], 2), edge(ep[8], eo[8], 1), corner(cp[4], co[4], 1)],
  ],
  down: (cp, co, ep, eo, centers) => [
    [corner(cp[7], co[7]), edge(ep[10], eo[10]), corner(cp[6], co[6])],
    [edge(ep[11], eo[11]), center(centers[Center.down]), edge(ep[9], eo[9])],
    [corner(cp[4], co[4]), edge(ep[8], eo[8]), corner(cp[5], co[5])],
  ],
};

export default class Cube {
  corners: PieceSetWithOrientation;
  edges: PieceSetWithOrientation;
  centers: number[];
  moves: string;

  constructor(state?: string) {
    const s = solved();
    this.corners = s.corners;
    this.edges = s.edges;
    this.centers = s.centers || [0, 1, 2, 3, 4, 5];

    if (state) {
      this.moves = "";
      this.doMoves(state);
    } else {
      this.moves = "";
    }
  }

  static fromCubeState(cube: Cube) {
    const newCube = new Cube();
    newCube.corners = { ...cube.corners };
    newCube.edges = { ...cube.edges };
    newCube.centers = [...cube.centers];
    return newCube;
  }

  doMoves(moves: string) {
    this.moves = this.moves.concat(" " + moves);
    let newEdges = this.edges;
    let newCorners = this.corners;
    let newCenters = this.centers;

    moves.split(/\s/).forEach(function (m: string) {
      if (Moves[m]) {
        const nextState = cycle(Moves[m], {
          corners: newCorners,
          edges: newEdges,
          centers: newCenters,
        });
        newCorners = nextState.corners;
        newEdges = nextState.edges;
        newCenters = nextState.centers;
      }
    }, this);

    this.corners = newCorners;
    this.edges = newEdges;
    this.centers = newCenters;

    return this;
  }

  getFace(face: "up" | "left" | "front" | "right" | "back" | "down") {
    const { corners, edges, centers } = this;
    return Faces[face](
      corners.perm,
      corners.orient,
      edges.perm,
      edges.orient,
      centers
    );
  }
}
