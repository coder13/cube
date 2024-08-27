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
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
  });
  test("R", () => {
    const cube = new Cube("R");
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
  });

  test("F", () => {
    const cube = new Cube("F");
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
  });

  test("D", () => {
    const cube = new Cube("D");
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
  });
  test("L", () => {
    const cube = new Cube("L");
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
  });

  test("B", () => {
    const cube = new Cube("B");
    expect(cube.getFace("up")).toMatchSnapshot();
    expect(cube.getFace("down")).toMatchSnapshot();
    expect(cube.getFace("left")).toMatchSnapshot();
    expect(cube.getFace("right")).toMatchSnapshot();
    expect(cube.getFace("front")).toMatchSnapshot();
    expect(cube.getFace("back")).toMatchSnapshot();
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
