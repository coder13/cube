import { MoveDef, Puzzle } from "./types";

export const swap = (arr: number[], i: number, j: number) => {
  let newArr = [...arr];
  [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  return newArr;
};

export type PermutationFunc = (
  how: number[]
) => (p: number, i: number, what: number[]) => number;
export type OrientFunc = (
  how: number[],
  n: number
) => (p: number, i: number) => number;

export const perm: PermutationFunc = (how) => (_, i, what) => what[how[i]];

export const orient: OrientFunc = (how, n) => (p, i) => (p + how[i]) % n;

export const solved = (): Puzzle => ({
  corners: {
    perm: [0, 1, 2, 3, 4, 5, 6, 7],
    orient: [0, 0, 0, 0, 0, 0, 0, 0],
  },
  edges: {
    perm: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    orient: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  centers: [0, 1, 2, 3, 4, 5],
});

export const cycle = (_move: MoveDef, _cube: MoveDef) => {
  const cube: Puzzle = { ...solved(), ..._cube };
  const move: Puzzle = { ...solved(), ..._move }; // fill in the gaps

  const cp = perm(move.corners.perm);
  const co = orient(move.corners.orient, 3);
  const ep = perm(move.edges.perm);
  const eo = orient(move.edges.orient, 2);

  return {
    corners: {
      perm: cube.corners.perm.map(cp),
      orient: cube.corners.orient.map(co).map(cp),
    },
    edges: {
      perm: cube.edges.perm.map(ep),
      orient: cube.edges.orient.map(eo).map(ep),
    },
    centers: cube.centers.map(perm(move.centers)),
  };
};

export const combine = (moves: MoveDef[]): Puzzle => {
  return moves.reduce(cycle, solved()) as Puzzle;
};
