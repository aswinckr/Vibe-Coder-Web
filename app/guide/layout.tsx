import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your App - Vibe Code Guide",
  description:
    "Step-by-step guide to building full-stack web applications with AI coding tools",
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
