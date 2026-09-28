import type { Metadata } from "next";
import { Root } from "./root";

// Two root layouts (en / mn) means no single layout to build a 404 from, so it lives here.
export const metadata: Metadata = { title: "404 — MindMaze Mongolia" };

export default function GlobalNotFound() {
  return (
    <Root lang="mn">
      <main className="grid min-h-svh place-items-center p-6 text-center">
        <div>
          <p className="headline text-[clamp(5rem,20vw,12rem)] text-cobalt">404</p>
          <p className="mt-4 text-lg">Хуудас олдсонгүй · Page not found</p>
          <p className="mt-8 flex justify-center gap-3 text-sm">
            <a href="/mn" className="rounded-full border border-navy/25 px-5 py-3 hover:border-navy/60">
              Нүүр хуудас
            </a>
            <a href="/" className="rounded-full border border-navy/25 px-5 py-3 hover:border-navy/60">
              Home
            </a>
          </p>
        </div>
      </main>
    </Root>
  );
}
