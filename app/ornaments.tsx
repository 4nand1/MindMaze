import type { CSSProperties, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

// Shared gradient for every glyph: pale sky at the centre, sinking into the card's own blue
// at the rim — tone on tone, so the glyph reads as texture, not a second colour.
export function Defs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="100">
        <stop offset="0" stopColor="#bfe8f5" />
        <stop offset="1" stopColor="#14306a" />
      </radialGradient>
    </svg>
  );
}

// Square spiral — the "maze" in MindMaze, drawn like alkhan khee (алхан хээ).
export function Mark(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden {...p}>
      <path d="M3 3h18v18H3V7h14v10H7v-6h6v2" />
    </svg>
  );
}

// Frame corner: double rule + spiral knot, mirrored into all four corners.
function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M1 64V1h63M7 64V7h57" />
      <path d="M13 40V13h27v21H19V19h15v9h-9v-3" />
    </svg>
  );
}

const CORNERS = [
  "top-0 left-0",
  "top-0 right-0 -scale-x-100",
  "bottom-0 left-0 -scale-y-100",
  "bottom-0 right-0 -scale-100",
];

export function Corners({ className = "" }: { className?: string }) {
  return CORNERS.map((pos) => (
    <Corner key={pos} className={`pointer-events-none absolute ${pos} ${className}`} />
  ));
}

export const SPOKES = [0, 45, 90, 135, 180, 225, 270, 315];
// Zig-zag rope lashing along a spoke, between radii r0 and r1.
export const lashing = (r0: number, r1: number) =>
  Array.from({ length: Math.floor((r1 - r0) / 10) + 1 }, (_, i) => `${i % 2 ? 5 : -5},${r0 + i * 10}`).join(" ");
const TICKS = Array.from({ length: 48 }, (_, i) => i * 7.5);

// Line-art toono (ger crown) — dari-style rotating wheel with an optional text ring.
// Rim sits at r=150 of 400: the hero's sky aperture uses that 0.375 ratio.
// spokes={false} leaves the wheel empty so the hero puzzle can draw its own turnable rings.
export function ToonoArt({ ring, spokes = true, className }: { ring?: string; spokes?: boolean; className?: string }) {
  return (
    <svg viewBox="-200 -200 400 400" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden className={className}>
      <g className="toono-spin">
        {[150, 156, 196, 34, 26].map((r) => (
          <circle key={r} r={r} pathLength={1} className="draw" />
        ))}
        <g className="ticks">
          {TICKS.map((a) => (
            <path key={a} d="M0-150v-6" transform={`rotate(${a})`} />
          ))}
        </g>
        {spokes &&
          SPOKES.map((a, i) => (
            <g key={a} transform={`rotate(${a})`} style={{ "--d": `${0.5 + i * 0.07}s` } as CSSProperties}>
              <path d="M-5 34V150" pathLength={1} className="draw" />
              <path d="M5 34V150" pathLength={1} className="draw" />
              <polyline points={lashing(40, 140)} pathLength={1} className="draw" />
            </g>
          ))}
      </g>
      {ring && (
        <g className="toono-ring">
          <path id="toono-ring" d="M0-172a172 172 0 1 1 0 344a172 172 0 1 1 0-344" stroke="none" />
          <text fill="currentColor" stroke="none" fontSize="12" fontWeight="600" letterSpacing="2">
            <textPath href="#toono-ring" textLength="1078" lengthAdjust="spacing">
              {ring.repeat(2)}
            </textPath>
          </text>
        </g>
      )}
    </svg>
  );
}

const GLYPHS = {
  petals: [45, 135, 225, 315].map((a) => (
    <ellipse key={a} cy="-52" rx="33" ry="44" transform={`rotate(${a})`} fill="url(#glow)" />
  )),
  toono: (
    <>
      <circle r="86" fill="none" stroke="url(#glow)" strokeWidth="20" pathLength="360" strokeDasharray="7.5 3.75" />
      <circle r="62" fill="none" stroke="url(#glow)" strokeWidth="6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="-4.5" y="-62" width="9" height="42" rx="4.5" transform={`rotate(${a})`} fill="url(#glow)" />
      ))}
      <circle r="18" fill="url(#glow)" />
    </>
  ),
  dots: [-2, -1, 0, 1, 2].flatMap((x) =>
    [-2, -1, 0, 1, 2].map((y) => {
      const d = Math.hypot(x, y);
      return d > 2.3 ? null : <circle key={`${x}${y}`} cx={x * 38} cy={y * 38} r={17 - d * 3} fill="url(#glow)" />;
    }),
  ),
  curl: [0, 90, 180, 270].map((a) => (
    <path
      key={a}
      transform={`rotate(${a})`}
      d="M6-6C10-50 60-82 82-46c14 26-10 50-32 36-14-9-6-30 10-26"
      fill="none"
      stroke="url(#glow)"
      strokeWidth="14"
      strokeLinecap="round"
    />
  )),
};

export type GlyphName = keyof typeof GLYPHS;

// newnomad-style gradient emblems, built from Mongolian motifs.
export function Glyph({ name, ...p }: P & { name: GlyphName }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden {...p}>
      {GLYPHS[name]}
    </svg>
  );
}

const ART = {
  burr: (
    <>
      <path d="M26 6h12v20h20v12H38v20H26V38H6V26h20z" />
      <path d="M26 26h12v12H26zM32 6v20M32 38v20M6 32h20M38 32h20" />
    </>
  ),
  turtle: (
    <>
      <ellipse cx="32" cy="35" rx="18" ry="14" />
      <path d="M26 29h12l4 6-4 6H26l-4-6zM14 35h8M42 35h8M26 22l-2-2M38 22l2-2M22 45l-4 6M42 45l4 6" />
      <circle cx="32" cy="15" r="5" />
    </>
  ),
  lock: (
    <>
      <rect x="10" y="26" width="44" height="16" rx="3" />
      <path d="M18 26v-8h24v8M16 34h6M44 34h4" />
      <circle cx="32" cy="34" r="3" />
    </>
  ),
  rings: (
    <>
      <circle cx="24" cy="32" r="13" />
      <circle cx="40" cy="32" r="13" />
      <circle cx="32" cy="16" r="7" />
    </>
  ),
  holes: (
    <>
      <rect x="6" y="24" width="52" height="14" rx="2" />
      {[11, 16.5, 22, 27.5, 33, 38.5, 44, 49.5, 55].map((x) => (
        <circle key={x} cx={x - 2} cy="31" r="1.8" />
      ))}
      <path d="M4 40c8 14 48 14 56 0" />
    </>
  ),
  knot: <path d="M8 40c10 0 12-16 24-16s14 16 24 16M8 24c10 0 12 16 24 16s14-16 24-16" />,
};

export type PuzzleArt = keyof typeof ART;

// Thin line drawings of traditional puzzles (dari-style).
export function PuzzleIcon({ name, ...p }: P & { name: PuzzleArt }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden {...p}>
      {ART[name]}
    </svg>
  );
}
