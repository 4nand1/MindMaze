"use client";

import { useState } from "react";

// Mobile-only menu; client component so a tapped link can close it.
export function Menu({ links, labels }: { links: readonly (readonly [string, string])[]; labels: readonly [string, string] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        // Transparent 8px of padding around the visible pill enlarges the tap target (-m-2 keeps layout).
        className="-m-2 block rounded-full p-2"
      >
        <span className="block rounded-full border border-navy/25 px-3 py-2 text-sm">{open ? labels[1] : labels[0]}</span>
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-3 top-18 rounded-3xl border border-navy/10 bg-paper/95 p-6 text-navy shadow-2xl shadow-navy/20 backdrop-blur-xl"
        >
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="headline block py-2 text-4xl">
              {label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
