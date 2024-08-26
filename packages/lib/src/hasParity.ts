import Cube from "./cube";

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
export const hasParity = (cube: Cube): string => {
  const cp = translateCP(cube.corners.perm);

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
    let four = cp.findIndex((i) => i === 4);
    let [a, b] = [cp[(four + 1) % 4], cp[(four + 2) % 4]];
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

export const insertionSort = (arr: number[]) => {
  let swaps = 0;
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    const key = arr[i];
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      swaps++;
      j--;
    }
    arr[j + 1] = key;
  }
  return swaps % 2 === 1;
};

const translation = [2, 3, 4, 1, null, 6, 5, 7];
export const translateCP = (perm: number[]) => {
  const [UBL, UBR, UFR, UFL, _, DBR, DFR, DFL] = perm;
  return [UFL, UBL, UBR, UFR, DFR, DBR, DFL].map(
    (i) => translation[i]
  ) as number[];
};
