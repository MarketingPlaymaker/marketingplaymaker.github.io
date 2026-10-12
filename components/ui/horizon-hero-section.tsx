"use client";

/*
 * Horizon hero, adapted from the 21st.dev component for Playmaker:
 * - GSAP replaced by Motion (entrance stagger + scroll-linked panels).
 * - window scroll listener replaced by useScroll on the hero itself, so the
 *   effect works with sections below it.
 * - Three.js scene recoloured to the brand and lazy-loaded (see horizon-scene).
 */

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/utils";

// three.js stays out of the initial bundle; the poster gradient shows until it is ready.
const HorizonScene = dynamic(() => import("./horizon-scene").then((m) => m.HorizonScene), {
  ssr: false,
});

type Word = { text: string; accent?: boolean };

const ease = [0.16, 1, 0.3, 1] as const;

const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

// Headline and subtext animate transform only: they are painted in the server
// HTML before hydration, so they never delay Largest Contentful Paint.
const rise: Variants = {
  hidden: { y: "0.35em" },
  show: { y: "0em", transition: { duration: 0.9, ease } },
};

const settle: Variants = {
  hidden: { y: 14 },
  show: { y: 0, transition: { duration: 0.8, ease } },
};

// Secondary elements may fade, they are never the LCP element.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function Headline({ lines, as: Tag = "h1", className }: { lines: Word[][]; as?: "h1" | "h2"; className?: string }) {
  return (
    // Line height is set after the size class: twMerge drops `leading-*` when a font-size class follows it.
    <Tag className={cn("font-display uppercase tracking-[-0.01em] text-fg", className, "leading-[0.9]")}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.map((word, j) => (
            <span key={j} className="inline-block">
              <motion.span variants={rise} className={cn("inline-block", word.accent && "text-brand")}>
                {word.text}
              </motion.span>
              {j < line.length - 1 && " "}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** Clamped piecewise-linear map of `v` from `input` stops to `output` stops. */
function piecewise(v: number, input: number[], output: number[]) {
  if (v <= input[0]) return output[0];
  for (let i = 1; i < input.length; i++) {
    if (v <= input[i]) {
      const t = (v - input[i - 1]) / (input[i] - input[i - 1]);
      return output[i - 1] + (output[i] - output[i - 1]) * t;
    }
  }
  return output[output.length - 1];
}

/** A text panel whose visibility is scrubbed by hero scroll progress. */
function ScrollPanel({
  progress,
  input,
  opacity,
  y,
  reduce,
  children,
}: {
  progress: MotionValue<number>;
  input: number[];
  opacity: number[];
  y: number[];
  reduce: boolean;
  children: React.ReactNode;
}) {
  // Function transforms on purpose: the array form gets hardware-accelerated as a
  // ScrollTimeline whose ranges drift from the JS value that drives `visibility`.
  const panelOpacity = useTransform(progress, (v) => piecewise(v, input, opacity));
  const panelY = useTransform(progress, (v) => (reduce ? 0 : piecewise(v, input, y)));
  // Hidden panels must not be clickable or reachable by keyboard.
  const visibility = useTransform(panelOpacity, (v) => (v < 0.02 ? "hidden" : "visible"));
  const pointerEvents = useTransform(panelOpacity, (v) => (v > 0.6 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity: panelOpacity, y: panelY, visibility, pointerEvents }}
      className="col-start-1 row-start-1 self-end"
    >
      {children}
    </motion.div>
  );
}

export function HorizonHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);
  // Settle the scene into the page background on the final panel: keeps the CTA legible
  // and hands off cleanly to the next section.
  const sceneDim = useTransform(scrollYProgress, [0.65, 1], [1, 0.75]);

  return (
    <section ref={sectionRef} aria-label="Introduction" className="relative h-[220dvh] bg-ink-950">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Poster: visible before WebGL is ready and when it is unavailable. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_110%,rgb(200_241_53/0.16),transparent_60%)]"
        />

        <motion.div aria-hidden className="absolute inset-0" style={{ opacity: sceneDim }}>
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: sceneReady ? 1 : 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <HorizonScene
              progress={scrollYProgress}
              reducedMotion={reduce}
              onReady={() => setSceneReady(true)}
              className="block h-full w-full"
            />
          </motion.div>
        </motion.div>

        {/* Legibility scrims. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/20 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 to-transparent" />

        <div className="relative z-10 mx-auto grid h-full max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
          <ScrollPanel progress={scrollYProgress} reduce={reduce} input={[0, 0.2, 0.3]} opacity={[1, 1, 0]} y={[0, 0, -60]}>
            <motion.div variants={intro} initial="hidden" animate="show" className="max-w-6xl">
              <motion.p
                variants={fadeUp}
                className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand sm:mb-7 sm:text-sm sm:tracking-[0.4em]"
              >
                Sports marketing agency
              </motion.p>
              {/* Capped by viewport height too, so eyebrow + headline + CTAs fit on short laptop screens. */}
              <Headline
                className="text-[clamp(2.75rem,min(10vw,10.5dvh),7.5rem)]"
                lines={[
                  [{ text: "You" }, { text: "deliver." }],
                  [{ text: "Your" }, { text: "brand" }, { text: "doesn't.", accent: true }],
                ]}
              />
              <motion.p
                variants={settle}
                className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:mt-8 sm:text-lg md:text-xl"
              >
                We turn gyms, arenas and local sports businesses into brands people recognize, trust and pay more for.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <CtaLink href="#book">Book a call</CtaLink>
                <CtaLink href="#services" variant="ghost">
                  See services
                </CtaLink>
              </motion.div>
            </motion.div>
          </ScrollPanel>

          <ScrollPanel
            progress={scrollYProgress}
            reduce={reduce}
            input={[0.25, 0.35, 0.55, 0.65]}
            opacity={[0, 1, 1, 0]}
            y={[60, 0, 0, -60]}
          >
            <div className="max-w-3xl">
              <h2 className="font-display text-[clamp(2.5rem,min(8vw,10dvh),6.5rem)] uppercase leading-[0.9] text-fg">
                From the stands <span className="text-brand">to the court.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg md:text-xl">
                Gyms, sports schools, arenas and events. Brand strategy built for local sport.
              </p>
            </div>
          </ScrollPanel>

          <ScrollPanel progress={scrollYProgress} reduce={reduce} input={[0.6, 0.7, 1]} opacity={[0, 1, 1]} y={[60, 0, 0]}>
            <div className="max-w-3xl">
              <h2 className="font-display text-[clamp(2.5rem,min(8vw,10dvh),6.5rem)] uppercase leading-[0.9] text-fg">
                Time to take <span className="text-brand">the court.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg md:text-xl">
                Your first call is free: a 40-minute brand diagnosis with the team that will run your project.
              </p>
              <div className="mt-8 sm:mt-10">
                <CtaLink href="#book">Book a call</CtaLink>
              </div>
            </div>
          </ScrollPanel>
        </div>

        {/* Progress rail: shows where the visitor is in the three-panel story. */}
        <div aria-hidden className="absolute bottom-14 right-5 top-24 w-px bg-line sm:bottom-20 sm:right-8">
          <motion.div style={{ scaleY: railScale }} className="h-full w-full origin-top bg-brand" />
        </div>
      </div>
    </section>
  );
}

/** Alias kept for 21st.dev demo compatibility (`import { Component } ...`). */
export const Component = HorizonHero;
