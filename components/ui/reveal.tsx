"use client";

import { motion, type Variants } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades content up the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Reveals its StaggerItem children one after another on first view. */
export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Lift and light the border on hover (for cards). */
  lift?: boolean;
}) {
  return (
    <motion.div
      variants={item}
      whileHover={lift ? { y: -4, borderColor: "rgba(200,241,53,0.45)" } : undefined}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
