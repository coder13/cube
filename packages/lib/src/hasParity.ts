import Cube, { Corners, Moves } from "./cube";
import { perm } from "./utils";

// const UFL = 0;
// const UBL = 1;
// const UBR = 2;
// const UFR = 3;
const DFR = 5;
const DBR = 6;
const DFL = 7;

// https://www.speedsolving.com/threads/parity-algorithms.13596/
/**
 * Check if a permutation has parity
 * Works because a 3-cycle has odd parity
 * But what is parity?
 * Parity is the number of swaps needed to sort a permutation
 * If the number of swaps is odd, the permutation has odd parity
 */
export const hasParity = (cube: Cube): string | undefined => {
  const cp = translateCP(cube.corners.perm);
  if (cp.some((i) => i === null)) {
    return undefined;
  }

  const [_, __, ___, ufr, dfr, dbr, dfl] = cp;

  if (cube.moves.length > 600) {
    console.log(cp, cube.moves);
    throw new Error("Infinite loop");
  }

  if (dfl !== DFL) {
    if (DFL === dbr || DFL === dfr) {
      const newCube = new Cube(cube.moves);
      newCube.doMoves("R");
      return hasParity(newCube);
    } else if (DFL !== ufr) {
      const newCube = new Cube(cube.moves);
      newCube.doMoves("U");
      return hasParity(newCube);
    } else if (DFL === ufr) {
      const newCube = new Cube(cube.moves);
      newCube.doMoves("F U F");
      return hasParity(newCube);
    }
  }

  // base case
  if (dfr === DFR && dbr === DBR) {
    let fourIndex = cp.findIndex((i) => i === 4);
    let [a, b] = [cp[(fourIndex + 1) % 4], cp[(fourIndex + 2) % 4]];
    return `${a}${b}`;
  }

  if (DBR === dfr || DBR === ufr) {
    const newCube = new Cube(cube.moves);
    newCube.doMoves("R2");
    return hasParity(newCube);
  }

  if (DBR === dbr && DFR === ufr) {
    const newCube = new Cube(cube.moves);
    newCube.doMoves("R2 U R2 U' R2");

    return hasParity(newCube);
  }

  const newCube = new Cube(cube.moves);
  newCube.doMoves("U");

  return hasParity(newCube);
};

const translation = [2, 3, 4, 1, null, 6, 5, 7];
export const translateCP = (cp: number[], depth = 0): number[] => {
  const DBL = cp[4];
  const corner = Corners[DBL];

  if (corner[0] === "up") {
    const newPerm = Moves["x2"].corners!.perm.map(perm(cp));
    return translateCP(newPerm, depth + 1);
  } else if (
    corner.join("").indexOf("left") === -1 ||
    corner.join("").indexOf("back") === -1
  ) {
    const newPerm = Moves["y"].corners!.perm.map(perm(cp));
    return translateCP(newPerm, depth + 1);
  }

  const [ubl, ubr, ufr, ufl, _, dbr, dfr, dfl] = cp;
  return [ufl, ubl, ubr, ufr, dfr, dbr, dfl].map(
    (i) => translation[i]
  ) as number[];
};
