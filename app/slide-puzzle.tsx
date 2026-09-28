"use client";

import { useState, type CSSProperties } from "react";

// 3×3 sliding puzzle over the steppe photo. 0 is the gap; tile n belongs at index n - 1.
const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const START = [4, 1, 5, 8, 0, 2, 7, 6, 3]; // fixed (same on server and client), 12 moves from solved

const row = (i: number) => Math.floor(i / 3);
// A tile can move if it shares a row or column with the gap; the whole line between them slides.
const inLine = (i: number, gap: number) => i !== gap && (row(i) === row(gap) || i % 3 === gap % 3);
// Arrow keys move the tile on the opposite side of the gap into it.
const ARROWS: Record<string, number> = { ArrowLeft: 1, ArrowRight: -1, ArrowUp: 3, ArrowDown: -3 };

type Labels = { hint: string; moves: string; solved: string; reset: string; tile: string };

export function SlidePuzzle({ src, labels }: { src: string; labels: Labels }) {
  const [board, setBoard] = useState(START);
  const [moves, setMoves] = useState(0);
  const done = board.every((n, i) => n === SOLVED[i]);

  const gap = board.indexOf(0);

  function slide(i: number) {
    if (done || !inLine(i, gap)) return;
    const step = (row(i) === row(gap) ? 1 : 3) * Math.sign(i - gap);
    const next = [...board];
    for (let k = gap; k !== i; k += step) next[k] = next[k + step];
    next[i] = 0;
    setBoard(next);
    setMoves(moves + Math.abs(i - gap) / Math.abs(step));
  }

  return (
    <div>
      <div
        className={`slide-board ${done ? "is-solved" : ""}`}
        onKeyDown={(e) => {
          const d = ARROWS[e.key];
          if (d === undefined) return;
          e.preventDefault();
          const i = gap + d;
          // Left/right must stay in the gap's row.
          if (i >= 0 && i < 9 && (Math.abs(d) === 3 || row(i) === row(gap))) slide(i);
        }}
      >
        {/* Tiles keep their DOM order and move by translate, so slides animate. */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
          const home = n - 1;
          const at = n === 9 ? 8 : board.indexOf(n);
          const style = {
            "--x": at % 3,
            "--y": Math.floor(at / 3),
            backgroundImage: `url(${src})`,
            backgroundPosition: `${(home % 3) * 50}% ${Math.floor(home / 3) * 50}%`,
          } as CSSProperties;
          // The ninth piece only appears once the picture is complete.
          if (n === 9) return <div key={n} aria-hidden className="slide-tile slide-last" style={style} />;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${labels.tile} ${n}`}
              disabled={done}
              onClick={() => slide(at)}
              className={`slide-tile ${inLine(at, gap) ? "is-movable" : ""}`}
              style={style}
            >
              <span className="slide-num">{n}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <p aria-live="polite" className={done ? "font-semibold text-butter" : "text-navy/60"}>
          {done ? labels.solved.replace("{n}", String(moves)) : moves ? `${labels.moves}: ${moves}` : labels.hint}
        </p>
        {moves > 0 && (
          <button
            type="button"
            onClick={() => {
              setBoard(START);
              setMoves(0);
            }}
            className="rounded-full border border-navy/20 px-4 py-1.5 transition hover:border-navy/50"
          >
            {labels.reset}
          </button>
        )}
      </div>
    </div>
  );
}
