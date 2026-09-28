"use client";

import type { MouseEvent } from "react";
import type { Lang } from "./content";

const HOME: Record<Lang, string> = { en: "/", mn: "/mn" };

// Switching language keeps your place: jump to the same section on the other page.
function keepSection(e: MouseEvent<HTMLAnchorElement>) {
  const section = document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest("main > [id]");
  if (section && section.id !== "top") e.currentTarget.hash = section.id;
}

export function LangSwitch({ lang }: { lang: Lang }) {
  return (
    <div className="flex rounded-full border border-navy/20 p-0.5 text-[11px] font-semibold uppercase">
      {(Object.keys(HOME) as Lang[]).map((l, i) => (
        <a
          key={l}
          href={HOME[l]}
          hrefLang={l}
          onClick={keepSection}
          aria-current={l === lang ? "page" : undefined}
          // Transparent 8px hit area via ::before; the two badges split the seam between them.
          className={`relative min-w-10 rounded-full px-3 py-2 text-center transition before:absolute before:-inset-y-2 ${
            i === 0 ? "before:-left-2 before:right-0" : "before:left-0 before:-right-2"
          } ${l === lang ? "bg-navy text-paper" : "text-navy/70 hover:text-navy"}`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
