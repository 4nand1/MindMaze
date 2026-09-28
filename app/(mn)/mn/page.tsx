import type { Metadata } from "next";
import { Site } from "../../site";

export const metadata: Metadata = {
  title: "MindMaze Mongolia — Монгол уламжлалт оньсон тоглоом",
  description:
    "MindMaze нь уламжлалт оньсон тоглоомуудаар дамжуулан Монголын соёлын өвийг сурталчлан таниулж, оюуны чадавхыг хөгжүүлэх соёлын тулгуур төв юм.",
  alternates: { canonical: "/mn", languages: { en: "/", mn: "/mn" } },
};

export default function Page() {
  return <Site lang="mn" />;
}
