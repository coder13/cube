import { hasParity, Cube, translateCP } from "@cp/lib";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [input, setInput] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has("moves") && query.get("moves")) {
      return decodeURIComponent(query.get("moves")!.toString());
    }
    return "";
  });

  useEffect(() => {
    if (input) {
      const url = new URL(location.href);
      url.search =
        "?" +
        new URLSearchParams({
          moves: encodeURIComponent(input),
        }).toString();

      window.history.pushState(null, "", url.toString());
    } else {
      window.history.pushState(null, "", new URL(location.origin));
    }
  }, [input]);

  const cube = useMemo(() => {
    const trimmed = input
      .split("\n")
      .map((i) => i.replace(/\/\/.*$/, ""))
      .join(" ");

    return new Cube(trimmed);
  }, [input]);

  const swaps = useMemo(() => {
    const cp = translateCP(cube.corners.perm);
    const sp = hasParity(cube);

    if (!sp || sp === "12") {
      return undefined;
    }

    const swapMap: Record<string, string[]> = {
      "13": ["23", "16", "45"],
      "21": ["21", "46", "35"],
      "23": ["14", "15", "26"],
      "31": ["34", "15", "26"],
      "32": ["32", "14", "56"],
    };

    const actualSwaps = swapMap[sp];

    const locationsTranslated = [
      "UFL",
      "UBL",
      "UBR",
      "UFR",
      "DFR",
      "DBR",
      "DFL",
    ];

    const DFLLocation = cp.findIndex((i) => i === 7);
    const swapLocation = locationsTranslated[DFLLocation];

    const newCP = [...cp];
    if (cp[6] !== 7) {
      // swap DFL with the piece in DFL
      const DFLIndex = cp.findIndex((i) => i === 7);
      const DFLPiece = cp[6];
      newCP[DFLIndex] = DFLPiece;
      newCP[6] = 7;
    }

    return actualSwaps
      .map((actualSwap) => {
        const a = +actualSwap[0];
        const b = +actualSwap[1];

        const ALocation = newCP.findIndex((i) => i === a);
        const BLocation = newCP.findIndex((i) => i === b);

        return [locationsTranslated[ALocation], locationsTranslated[BLocation]];
      })
      .filter((swap) => {
        if (DFLLocation === 6) {
          return true;
        } else {
          return swap.some((i) => i === swapLocation);
        }
      });
  }, [cube]);

  return (
    <>
      <div
        style={{
          padding: "0.25em",
        }}
      >
        <p>
          Input *must* be a space separated list of moves. You can have moves
          {`<R, U, L, D, F, B, M, S, E, y, x, z>`} on separate lines and
          comments with `//`.
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "50%",
          }}
        />
      </div>
      <div
        style={{
          padding: "0.25em",
          display: "flex",
          gap: "1em",
        }}
      >
        <span>
          [
          {translateCP(cube.corners.perm)
            .map((i) => (i === 7 ? "DFL" : i))
            .join(", ")}
          ]
        </span>
        <span>Tracing: {hasParity(cube)}</span>
        {swaps && <span>Swap: {swaps.map((i) => i.join("-")).join(", ")}</span>}
      </div>
      <a
        href={`https://alg.cubing.net/?alg=${input}`}
        target="_blank"
        referrerPolicy="no-referrer"
      >
        View in alg.cubing.net
      </a>
    </>
  );
}

export default App;
