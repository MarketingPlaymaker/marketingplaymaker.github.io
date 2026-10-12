"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    q: "Do you work with small, local sports businesses?",
    a: "Yes, that's our focus: gyms, sports schools, arenas and local sports businesses that want to grow through positioning, not just effort.",
  },
  {
    q: "How do I measure the return on marketing for my gym or sports school?",
    a: "We set clear goals and metrics during the diagnosis. Every month we review the results and adjust the plan based on them.",
  },
  {
    q: "What's the minimum contract length?",
    a: "It depends on the scope of each project. On the first call, which is free, we'll recommend the right format for where you are.",
  },
  {
    q: "Do you work outside Rio de Janeiro?",
    a: "Get in touch. On the diagnosis call we'll look at your project and how we can help.",
  },
  {
    q: "Do I need an established brand to work with Playmaker?",
    a: "No. If your brand doesn't exist yet or feels improvised, we start with brand strategy: positioning and visual identity.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
        >
          <span className="text-base font-semibold leading-snug text-fg group-hover:text-brand sm:text-lg">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease }}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-brand/40 text-brand"
          >
            <Plus size={18} strokeWidth={2.25} aria-hidden />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-base leading-relaxed text-fg-muted sm:text-lg">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-fg">
            Questions every client asks.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
            {"Didn't find what you need? "}
            <a href="#book" className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
              Talk to our team directly.
            </a>
          </p>
        </Reveal>
        <Stagger className="mt-10 border-t border-line sm:mt-14">
          {ITEMS.map((item) => (
            <StaggerItem key={item.q}>
              <Item {...item} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
