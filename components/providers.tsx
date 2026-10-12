"use client";

import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Honor the OS "reduce motion" setting for every motion component.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
