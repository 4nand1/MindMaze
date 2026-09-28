"use client";

import { useEffect, useState } from "react";

// Desktop nav with scroll-spy: the section crossing the middle of the screen gets underlined.
export function NavLinks({ links }: { links: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links.map(([href]) => document.querySelector(href)).filter((s) => s !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = `#${e.target.id}`;
          // Leaving a section (e.g. back up into the hero) clears it unless another took over.
          setActive((cur) => (e.isIntersecting ? id : cur === id ? "" : cur));
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [links]);

  return (
    <nav aria-label="Main" className="hidden gap-1 text-sm lg:flex">
      {links.map(([href, label]) => (
        <a
          key={href}
          href={href}
          aria-current={active === href ? "location" : undefined}
          className="flex min-h-12 min-w-12 items-center justify-center px-3 py-2 text-navy/70 decoration-cerulean decoration-2 underline-offset-8 transition hover:text-navy hover:underline aria-[current]:text-navy aria-[current]:underline"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
