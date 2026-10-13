"use client";

/*
 * Opening sequence, after lenis.dev: a full-screen brand-colour panel, the
 * horizontal logo (mark + wordmark) rising in piece by piece through masks,
 * then the panel lifts like a curtain to reveal the page underneath.
 * It is a separate layer above the page; the hero itself is untouched.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Phase = "in" | "out" | "done";

const WORDMARK = "PLAYMAKER".split("");
const curtainEase = [0.76, 0, 0.24, 1] as const;
const riseEase = [0.22, 1, 0.36, 1] as const;

const pieces: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const piece: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.95, ease: riseEase } },
};

const HOLD_MS = 650; // full logo on screen before the curtain lifts
const CURTAIN_S = 1.1;

/** One masked piece of the logo: it rises from below its own clipping box. */
function Piece({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className ?? ""}`}>
      <motion.span variants={piece} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("in");
  const [fontReady, setFontReady] = useState(false);
  const reduce = useReducedMotion() ?? false;

  // Start only once the display font is in, so the wordmark never rises in a fallback face.
  useEffect(() => {
    let alive = true;
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 1200));
    Promise.race([document.fonts.ready, timeout]).then(() => alive && setFontReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // Keep the page still while the intro plays.
  useEffect(() => {
    if (phase === "done") return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <motion.div
      id="intro"
      aria-hidden
      className="fixed inset-0 z-[60] grid place-items-center bg-brand"
      initial={false}
      animate={
        phase === "out"
          ? reduce
            ? { opacity: 0 }
            : { clipPath: "inset(0% 0% 100% 0%)" }
          : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
      }
      transition={reduce ? { duration: 0.4 } : { duration: CURTAIN_S, ease: curtainEase }}
      onAnimationComplete={() => phase === "out" && setPhase("done")}
    >
      {/* Outer layer: lifts with the curtain. Inner layer: orchestrates the pieces
          (it must own initial/animate itself so the variant labels reach them). */}
      <motion.div
        className="px-5 text-[clamp(3.25rem,13vw,12rem)] text-ink-950"
        animate={phase === "out" && !reduce ? { y: "-30vh", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: CURTAIN_S, ease: curtainEase }}
      >
        <motion.div
          variants={pieces}
          initial="hidden"
          animate={fontReady ? "show" : "hidden"}
          onAnimationComplete={(definition) => {
            if (definition === "show") window.setTimeout(() => setPhase("out"), reduce ? 150 : HOLD_MS);
          }}
          className="flex items-center gap-[0.18em]"
        >
          <Piece className="pb-[0.04em]">
            {/* The white mark, turned black for the lime panel. */}
            <Image
              src="/brand/playmaker-mark.png"
              alt=""
              width={490}
              height={414}
              priority
              className="h-[0.78em] w-auto brightness-0"
            />
          </Piece>
          <span className="font-display uppercase leading-[0.86] tracking-[-0.01em]">
            {WORDMARK.map((letter, i) => (
              <Piece key={i}>{letter}</Piece>
            ))}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
