import { BarChart3, Copy, Palette, UserPlus, type LucideIcon } from "lucide-react";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const PAINS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Palette,
    title: "Great facility, amateur brand",
    desc: "Operations run well, but your visual identity and messaging still look improvised. That costs you credibility every time you set a price.",
  },
  {
    icon: UserPlus,
    title: "Members stay. New ones don't come.",
    desc: "Without strong positioning, price becomes the tiebreaker between you and the competition. That keeps you from charging more.",
  },
  {
    icon: BarChart3,
    title: "Events that don't sell out",
    desc: "Game day, race or tournament: everything is ready except the crowd.",
  },
  {
    icon: Copy,
    title: "Content that looks like everyone else's",
    desc: "Generic posts don't show what makes your business different, so nobody stops scrolling.",
  },
];

export function ClientPains() {
  return (
    <section id="problems" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Headline stays pinned while the list scrolls past on desktop. */}
          <Reveal className="self-start lg:sticky lg:top-28">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-fg">
              The problems <span className="text-brand">stalling</span> your growth.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
              We mapped the most common roadblocks for local sports businesses and built a specific fix for each one.
            </p>
          </Reveal>

          <Stagger className="flex flex-col">
            {PAINS.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title} className="flex gap-5 border-t border-line py-8 sm:gap-7 sm:py-10">
                <div className="grid size-12 shrink-0 place-items-center border border-brand/30 text-brand sm:size-14">
                  <Icon size={24} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] uppercase leading-[1.02] text-fg">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-14 flex flex-col items-start gap-6 border border-brand/30 bg-brand/5 p-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="max-w-2xl text-base leading-snug text-fg sm:text-xl">
            <span className="font-semibold">This is exactly what Playmaker fixes.</span>{" "}
            <span className="text-fg-muted">Our method turns these roadblocks into real competitive advantages.</span>
          </p>
          <CtaLink href="#book">Book a call</CtaLink>
        </Reveal>
      </div>
    </section>
  );
}
