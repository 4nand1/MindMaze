"use client";

import { useState } from "react";

// Mobile-only menu as a native popover: Escape and tapping outside close it for free.
export function Menu({ links, labels }: { links: readonly (readonly [string, string])[]; labels: readonly [string, string] }) {
  const [open, setOpen] = useState(false);
  const close = () => document.getElementById("mobile-menu")?.hidePopover();
  return (
    <div className="lg:hidden">
      <button
        type="button"
        popoverTarget="mobile-menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        // Transparent 8px of padding around the visible pill enlarges the tap target (-m-2 keeps layout).
        className="-m-2 block rounded-full p-2"
      >
        <span className="block rounded-full border border-navy/25 px-3 py-2 text-sm">{open ? labels[1] : labels[0]}</span>
      </button>
      <nav
        id="mobile-menu"
        popover="auto"
        aria-label="Mobile"
        onToggle={(e) => setOpen(e.newState === "open")}
        className="fixed inset-x-3 top-18 bottom-auto m-0 w-auto rounded-3xl border border-navy/10 bg-paper/95 p-6 text-navy shadow-2xl shadow-navy/20 backdrop-blur-xl"
      >
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={close} className="headline block py-2 text-4xl">
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
