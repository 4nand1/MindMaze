import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geologica, Oswald, Noto_Sans_Mongolian } from "next/font/google";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  axes: ["slnt", "SHRP"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
});

const mongolian = Noto_Sans_Mongolian({
  variable: "--font-mongolian",
  subsets: ["mongolian"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindmaze.mn"),
  title: "MindMaze Mongolia",
  description:
    "MindMaze is a cultural anchor promoting Mongolian cultural heritage and cognitive exercises with traditional puzzle games.",
};

export const viewport: Viewport = {
  themeColor: "#fffcf5",
};

// Shared by the (en) and (mn) root layouts — each language gets its own <html lang>.
export function Root({ lang, children }: { lang: "en" | "mn"; children: ReactNode }) {
  return (
    <html lang={lang} className={`${geologica.variable} ${oswald.variable} ${mongolian.variable}`}>
      <body>{children}</body>
    </html>
  );
}
