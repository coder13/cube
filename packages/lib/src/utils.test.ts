import Cube, { Moves } from "./cube";
import { PieceSetWithOrientation } from "./types";
import { combine, cycle, solved } from "./utils";
import { describe, expect, test } from "bun:test";

describe("cycle", () => {
  test("should return the correct cycle for corners and edges", () => {
    expect(cycle(solved(), solved())).toMatchObject(solved());

    expect(cycle(Moves["U"], solved()).corners).toMatchObject(
      Moves["U"].corners as PieceSetWithOrientation
    );
    expect(cycle(Moves["U"], solved()).edges).toMatchObject(
      Moves["U"].edges as PieceSetWithOrientation
    );
  });

  test("inverting moves", () => {
    expect(cycle(Moves["U"], cycle(Moves["U'"], solved()))).toMatchObject(
      solved()
    );

    const sexy = [Moves["R"], Moves["U"], Moves["R'"], Moves["U'"]];
    const combinedMoves = combine(sexy);

    expect(
      combine([
        combinedMoves,
        combinedMoves,
        combinedMoves,
        combinedMoves,
        combinedMoves,
        combinedMoves,
      ])
    ).toMatchObject(solved());
  });

  test("should combine moves correctly", () => {
    const cube = cycle(Moves["U"], solved());
    const cube2 = cycle(Moves["U'"], cube);
    expect(cube2).toMatchObject(solved());

    expect(combine([Moves["U"], Moves["U'"]])).toMatchObject(solved());

    const cube3 = new Cube("R U R' U R U2 R' U2");
    expect(cube3.getFace("up")).toMatchSnapshot();
    expect(cube3.getFace("down")).toMatchSnapshot();
  });
});
