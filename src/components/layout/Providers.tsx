"use client";

import { MotionConfig } from "framer-motion";

/** reducedMotion="user" — Framer Motion уважает системную настройку prefers-reduced-motion */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
