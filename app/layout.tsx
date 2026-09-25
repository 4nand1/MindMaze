import type { Metadata, Viewport } from "next";
import { Geologica, Noto_Sans_Mongolian } from "next/font/google";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  axes: ["slnt", "SHRP"],
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
  themeColor: "#f7edd3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geologica.variable} ${mongolian.variable}`}>
      <body>{children}</body>
    </html>
  );
}
