"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { SPOKES, lashing } from "./ornaments";

// The toono's spokes split into three bands (inner → outer). Turning a band also drags the band
// inside it, so it's solved from the outside in. 3 steps of 15° = 45° = the 8 spokes line up again.
const BANDS: [number, number][] = [
  [34, 76],
  [76, 114],
  [114, 150],
];
const START = [1, 2, 1]; // fixed scramble (same on server and client), 4 taps from solved
const STEP = 15;

const aligned = (steps: number[]) => steps.every((s) => s % 3 === 0);

export function ToonoPuzzle({ label, hint, solved, children }: { label: string; hint: string; solved: string; children: ReactNode }) {
  const [steps, setSteps] = useState(START);
  const done = aligned(steps);

  function turn(k: number) {
    if (done) return;
    const next = steps.map((s, j) => (j === k || j === k - 1 ? s + 1 : s));
    setSteps(next);
    const solvedNow = aligned(next);
    navigator.vibrate?.(solvedNow ? [20, 60, 40] : 8); // ponytail: Android only, a no-op elsewhere
    if (!solvedNow) return;
    // Solved: fly up through the toono — the hero's scroll-driven iris does the rest.
    const hero = document.getElementById("top");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hero)
      setTimeout(
        () => window.scrollTo({ top: hero.offsetTop + (hero.offsetHeight - innerHeight) * 0.78, behavior: reduce ? "auto" : "smooth" }),
        reduce ? 0 : 1300,
      );
  }

  return (
    <>
      <div className={`h-toono text-butter ${done ? "is-solved" : ""}`}>
        {children}
        <svg viewBox="-200 -200 400 400" fill="none" stroke="currentColor" strokeWidth="1.4" className="absolute inset-0 size-full">
          <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <circle r="76" strokeDasharray="2 5" opacity=".35" />
          <circle r="114" strokeDasharray="2 5" opacity=".35" />
          {BANDS.map(([r0, r1], k) => (
            <g
              key={k}
              role="button"
              tabIndex={done ? -1 : 0}
              aria-label={`${label} ${k + 1}`}
              aria-disabled={done}
              className={`ring ${steps[k] % 3 === 0 ? "is-aligned" : ""}`}
              style={{ rotate: `${steps[k] * STEP}deg` }}
              onClick={() => turn(k)}
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                e.preventDefault();
                turn(k);
              }}
            >
              <circle className="hit" r={(r0 + r1) / 2} strokeWidth={r1 - r0} stroke="transparent" pointerEvents="stroke" />
              {SPOKES.map((a, i) => (
                <g key={a} transform={`rotate(${a})`} style={{ "--d": `${0.5 + k * 0.2 + i * 0.07}s` } as CSSProperties}>
                  <path d={`M-5 ${r0}V${r1}`} pathLength={1} className="draw" />
                  <path d={`M5 ${r0}V${r1}`} pathLength={1} className="draw" />
                  <polyline points={lashing(r0 + 5, r1 - 5)} pathLength={1} className="draw" />
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
      <p className="puzzle-hint" aria-live="polite">
        {done ? solved : hint}
      </p>
    </>
  );
}
