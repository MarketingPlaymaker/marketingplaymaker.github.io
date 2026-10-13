"use client";

import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const STEPS = [
  {
    num: "01",
    title: "Diagnosis",
    desc: "We dig into your context: business goals, audience, competition and opportunities in the sports ecosystem.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "A tailored plan with clear goals, priority channels, estimated investment and success metrics.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "We put the plan into play, from creative work to relationships with local partners and your community.",
  },
  {
    num: "04",
    title: "Measure and adjust",
    desc: "We review the results and adjust the plan, coming back sharper for the next diagnosis.",
  },
];

export function WorkSteps() {
  return (
    <section aria-labelledby="method" className="relative isolate overflow-hidden bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 id="method" className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-fg">
            How we <span className="text-brand">play.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            The same process that turned 1,500 views into 275,000. Built on research and strategy. No guesswork.
          </p>
        </Reveal>

        <div className="relative mt-14 sm:mt-20">
          {/* Glow layer: soft lime light directly behind the panels, for the glass to frost. Static, one paint. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            {/* Kept moderate so body text on the panels stays readable. */}
            <div className="absolute left-[2%] top-[10%] size-64 rounded-full bg-brand/40 blur-[80px] sm:size-80" />
            <div className="absolute left-[40%] top-[35%] size-56 rounded-full bg-[#7fb51e]/45 blur-[80px] sm:size-72" />
            <div className="absolute right-[2%] top-[5%] size-64 rounded-full bg-brand/30 blur-[80px] sm:size-80" />
          </div>
          {/* Desktop: a lime line draws itself across the four panels as they enter view. */}
          <div aria-hidden className="absolute inset-x-0 -top-6 hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-brand"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, i) => (
              <StaggerItem key={step.num} lift className="glass relative flex flex-col rounded-2xl p-7 sm:p-8">
                <span
                  aria-hidden
                  className="absolute -top-[29px] left-8 hidden size-2.5 rounded-full bg-brand shadow-[0_0_12px_rgb(200_241_53/0.8)] lg:block"
                />
                <span aria-hidden className="font-display text-6xl leading-none text-brand/35">
                  {step.num}
                </span>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] uppercase leading-[1.02] text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-fg-muted">{step.desc}</p>
                {i === STEPS.length - 1 && (
                  <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                    <motion.span
                      className="inline-flex"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                    >
                      <RefreshCw size={16} strokeWidth={2.25} aria-hidden />
                    </motion.span>
                    Repeats every month
                  </p>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
