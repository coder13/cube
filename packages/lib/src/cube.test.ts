import Cube from "./cube";

import { describe, expect, test } from "bun:test";

describe("Cube", () => {
  test("Can do basic moves", () => {
    const cube = new Cube("U");
    expect(cube).toMatchSnapshot();
    cube.doMoves("R");
    expect(cube).toMatchSnapshot();
    cube.doMoves("F");
    expect(cube).toMatchSnapshot();
    cube.doMoves("D");
    expect(cube).toMatchSnapshot();
    cube.doMoves("L");
    expect(cube).toMatchSnapshot();
    cube.doMoves("B");
    expect(cube).toMatchSnapshot();
  });

  test("Cube.getFace", () => {
    const cube = new Cube();
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
  });

  test("U", () => {
    const cube = new Cube("U");
    expect(cube.getFace("up")).toMatchSnapshot("U up");
    expect(cube.getFace("down")).toMatchSnapshot("U down");
    expect(cube.getFace("left")).toMatchSnapshot("U left");
    expect(cube.getFace("right")).toMatchSnapshot("U right");
    expect(cube.getFace("front")).toMatchSnapshot("U front");
    expect(cube.getFace("back")).toMatchSnapshot("U back");
  });
  test("R", () => {
    const cube = new Cube("R");
    expect(cube.getFace("up")).toMatchSnapshot("R up");
    expect(cube.getFace("down")).toMatchSnapshot("R down");
    expect(cube.getFace("left")).toMatchSnapshot("R left");
    expect(cube.getFace("right")).toMatchSnapshot("R right");
    expect(cube.getFace("front")).toMatchSnapshot("R front");
    expect(cube.getFace("back")).toMatchSnapshot("R back");
  });

  test("F", () => {
    const cube = new Cube("F");
    expect(cube.getFace("up")).toMatchSnapshot("F up");
    expect(cube.getFace("down")).toMatchSnapshot("F down");
    expect(cube.getFace("left")).toMatchSnapshot("F left");
    expect(cube.getFace("right")).toMatchSnapshot("F right");
    expect(cube.getFace("front")).toMatchSnapshot("F front");
    expect(cube.getFace("back")).toMatchSnapshot("F back");
  });

  test("D", () => {
    const cube = new Cube("D");
    expect(cube.getFace("up")).toMatchSnapshot("D up");
    expect(cube.getFace("down")).toMatchSnapshot("D down");
    expect(cube.getFace("left")).toMatchSnapshot("D left");
    expect(cube.getFace("right")).toMatchSnapshot("D right");
    expect(cube.getFace("front")).toMatchSnapshot("D front");
    expect(cube.getFace("back")).toMatchSnapshot("D back");
  });
  test("L", () => {
    const cube = new Cube("L");
    expect(cube.getFace("up")).toMatchSnapshot("L up");
    expect(cube.getFace("down")).toMatchSnapshot("L down");
    expect(cube.getFace("left")).toMatchSnapshot("L left");
    expect(cube.getFace("right")).toMatchSnapshot("L right");
    expect(cube.getFace("front")).toMatchSnapshot("L front");
    expect(cube.getFace("back")).toMatchSnapshot("L back");
  });

  test("B", () => {
    const cube = new Cube("B");
    expect(cube.getFace("up")).toMatchSnapshot("B up");
    expect(cube.getFace("down")).toMatchSnapshot("B down");
    expect(cube.getFace("left")).toMatchSnapshot("B left");
    expect(cube.getFace("right")).toMatchSnapshot("B right");
    expect(cube.getFace("front")).toMatchSnapshot("B front");
    expect(cube.getFace("back")).toMatchSnapshot("B back");
  });

  test("M", () => {
    const cube = new Cube("M");
    expect(cube.getFace("up")).toMatchSnapshot("M up");
    expect(cube.getFace("down")).toMatchSnapshot("M down");
    expect(cube.getFace("left")).toMatchSnapshot("M left");
    expect(cube.getFace("right")).toMatchSnapshot("M right");
    expect(cube.getFace("front")).toMatchSnapshot("M front");
    expect(cube.getFace("back")).toMatchSnapshot("M back");
  });

  test("E", () => {
    const cube = new Cube("E");
    expect(cube.getFace("up")).toMatchSnapshot("E up");
    expect(cube.getFace("down")).toMatchSnapshot("E down");
    expect(cube.getFace("left")).toMatchSnapshot("E left");
    expect(cube.getFace("right")).toMatchSnapshot("E right");
    expect(cube.getFace("front")).toMatchSnapshot("E front");
    expect(cube.getFace("back")).toMatchSnapshot("E back");
  });

  test("S", () => {
    const cube = new Cube("S");
    expect(cube.getFace("up")).toMatchSnapshot("S up");
    expect(cube.getFace("down")).toMatchSnapshot("S down");
    expect(cube.getFace("left")).toMatchSnapshot("S left");
    expect(cube.getFace("right")).toMatchSnapshot("S right");
    expect(cube.getFace("front")).toMatchSnapshot("S front");
    expect(cube.getFace("back")).toMatchSnapshot("S back");
  });

  test.each(["l", "r", "f", "b", "u", "d", "y", "x", "z"])("%s", (move) => {
    const cube = new Cube(move);
    expect(cube).toMatchSnapshot(`${move} cube`);
    expect(cube.getFace("up")).toMatchSnapshot(`${move} up`);
    expect(cube.getFace("down")).toMatchSnapshot(`${move} down`);
    expect(cube.getFace("left")).toMatchSnapshot(`${move} left`);
    expect(cube.getFace("right")).toMatchSnapshot(`${move} right`);
    expect(cube.getFace("front")).toMatchSnapshot(`${move} front`);
    expect(cube.getFace("back")).toMatchSnapshot(`${move} back`);
  });

  test("scramble", () => {
    const cube = new Cube(
      "D2 F2 L B2 U2 R' B2 L' R U2 B U' R' F' L F' D U2 F'"
    );
    expect(cube).toMatchSnapshot();
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
  });
});
