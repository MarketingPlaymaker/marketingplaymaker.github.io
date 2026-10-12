"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  /** primary: lime on dark. dark: ink on lime sections. ghost: outline. */
  variant?: "primary" | "dark" | "ghost";
  className?: string;
};

const spring = { type: "spring", stiffness: 420, damping: 30 } as const;

const surface: Record<NonNullable<CtaLinkProps["variant"]>, Variants> = {
  primary: {
    rest: { y: 0, scale: 1, backgroundColor: "#c8f135" },
    hover: { y: -2, scale: 1, backgroundColor: "#d8ff40" },
    tap: { y: 0, scale: 0.98, backgroundColor: "#d8ff40" },
  },
  dark: {
    rest: { y: 0, scale: 1, backgroundColor: "#0a0a0a" },
    hover: { y: -2, scale: 1, backgroundColor: "#1c1c1c" },
    tap: { y: 0, scale: 0.98, backgroundColor: "#1c1c1c" },
  },
  ghost: {
    rest: { y: 0, scale: 1, borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0)" },
    hover: { y: -2, scale: 1, borderColor: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.04)" },
    tap: { y: 0, scale: 0.98, borderColor: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.04)" },
  },
};

const arrow: Variants = {
  rest: { x: 0 },
  hover: { x: 4 },
  tap: { x: 4 },
};

/** Brand CTA. Pill-shaped (buttons are round, cards are square), motion-driven hover and press feedback. */
export function CtaLink({ href, children, variant = "primary", className }: CtaLinkProps) {
  return (
    <motion.a
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      variants={surface[variant]}
      transition={spring}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] sm:px-9 sm:text-base",
        variant === "primary" && "text-ink-950",
        variant === "dark" && "text-fg",
        variant === "ghost" && "border text-fg",
        className,
      )}
    >
      {children}
      {variant !== "ghost" && (
        <motion.span variants={arrow} transition={spring} className="inline-flex">
          <ArrowRight size={18} strokeWidth={2} aria-hidden />
        </motion.span>
      )}
    </motion.a>
  );
}
