import Cube from "./cube";
import { hasParity, translateCP } from "./hasParity";

import { describe, expect, test } from "bun:test";

describe("hasParity", () => {
  test("should return false for solved", () => {
    expect(hasParity(new Cube(""))).toBe("12");
  });
  test("should return false for 2gen moves", () => {
    expect(hasParity(new Cube("U"))).toBe("12");
    expect(hasParity(new Cube("U"))).toBe("12");
    expect(hasParity(new Cube("U"))).toBe("12");
    expect(hasParity(new Cube("U"))).toBe("12");
    expect(hasParity(new Cube("R"))).toBe("12");
    expect(hasParity(new Cube("R"))).toBe("12");
    expect(hasParity(new Cube("R"))).toBe("12");
    expect(hasParity(new Cube("R"))).toBe("12");
    expect(hasParity(new Cube("R U R' U'"))).toBe("12");
    expect(hasParity(new Cube("R2 U R2 U' R2 U R2 U' R2"))).toBe("12");
  });

  test("should return true for Tperm", () => {
    const Tperm = "R U R' U' R' F R2 U' R' U' R U R' F'";
    expect(hasParity(new Cube(Tperm))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " U"))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " U2"))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " U'"))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " R"))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " R2"))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " R'"))).not.toBe("12");
    expect(hasParity(new Cube(Tperm + " R U R' U R'"))).not.toBe("12");
  });
  const diagDiag = "R2 U R2 U' R2 U R2 U' R2";

  test("should validate simple triggers", () => {
    let cube = new Cube();
    expect(hasParity(cube.doMoves("F' U' F"))).not.toBe("12"); // swap FR and FL
    expect(hasParity(cube.doMoves("R"))).not.toBe("12"); // 2 gen after swap
    expect(hasParity(cube.doMoves("F' U' F"))).toBe("12"); // swap FR and FL

    expect(hasParity(cube.doMoves("F' U F"))).not.toBe("12");
    expect(hasParity(cube.doMoves("U'"))).not.toBe("12");
    expect(hasParity(cube.doMoves("F' U F"))).toBe("12");

    expect(hasParity(cube.doMoves("F R F'"))).not.toBe("12");
    expect(hasParity(cube.doMoves("R'"))).not.toBe("12");
    expect(hasParity(cube.doMoves("F R F'"))).toBe("12");

    expect(hasParity(cube.doMoves(diagDiag))).toBe("12");
    expect(hasParity(cube.doMoves(diagDiag + " " + diagDiag))).toBe("12");
  });

  test("should handle DFL not being solved", () => {
    let cube = new Cube();
    expect(hasParity(cube.doMoves("F2"))).not.toBe("12");
    expect(hasParity(cube.doMoves("F"))).toBe("32");
    expect(hasParity(cube.doMoves("F'"))).not.toBe("12");
    expect(hasParity(cube.doMoves("F2 F U F"))).toBe("12");
  });
});

describe("translateCP", () => {
  test("should handle any corner in DBL", () => {
    expect(translateCP(new Cube("L2").corners.perm)).toMatchObject([
      1, 2, 5, 6, 3, 4, 7,
    ]);
    expect(translateCP(new Cube("L2 R2").corners.perm)).toMatchObject([
      1, 2, 3, 4, 5, 6, 7,
    ]);

    expect(translateCP(new Cube("D").corners.perm)).toMatchObject([
      4, 1, 2, 3, 5, 6, 7,
    ]);
    expect(translateCP(new Cube("D U'").corners.perm)).toMatchObject([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });
});
