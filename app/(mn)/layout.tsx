import type { ReactNode } from "react";
import { Root, metadata as rootMetadata, viewport as rootViewport } from "../root";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <Root lang="mn">{children}</Root>;
}
