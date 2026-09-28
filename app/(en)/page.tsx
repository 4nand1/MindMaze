import type { Metadata } from "next";
import { Site } from "../site";

export const metadata: Metadata = {
  title: "MindMaze Mongolia",
  description:
    "MindMaze is a cultural anchor promoting Mongolian cultural heritage and cognitive exercises with traditional puzzle games.",
  alternates: { canonical: "/", languages: { en: "/", mn: "/mn" } },
};

export default function Page() {
  return <Site lang="en" />;
}
