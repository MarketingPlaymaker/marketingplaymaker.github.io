import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const FACTS = [
  { value: "2026", label: "Founded" },
  { value: "+10", label: "Projects" },
  { value: "6", label: "Services" },
];

const PROOF = [
  "Communications background",
  "Sold-out event (CONJEF)",
  "Tailored diagnosis",
  "Ongoing support",
];

export function About() {
  return (
    <section id="about" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="self-start">
          <div className="relative aspect-[4/5] overflow-hidden border border-line">
            <Image
              src="/brand/team.png"
              alt="The Playmaker team in action"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-70 grayscale"
            />
            {/* Brand duotone: lime light over the grayscale photo. */}
            <div aria-hidden className="absolute inset-0 bg-brand/15 mix-blend-color" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
          </div>
          <dl className="grid grid-cols-3 bg-brand text-ink-950">
            {FACTS.map((fact, i) => (
              <div key={fact.label} className={cn("flex flex-col gap-1 p-5", i > 0 && "border-l border-ink-950/15")}>
                <dt className="order-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-950/70">{fact.label}</dt>
                <dd className="order-1 font-display text-3xl leading-none sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-fg">
              Strategy is our <span className="text-brand">sport.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            <p>
              Playmaker was founded in 2026 in Rio de Janeiro on one belief: sport is the most powerful engagement
              platform in the world, and local sports businesses deserve the same level of brand strategy that big clubs
              and brands already use.
            </p>
            <p>
              Before Playmaker, we built brands, communities and real results for projects like GDO Fantasy Game, CONJEF
              and Sports Hub, turning small numbers into real growth.
            </p>
            <p>
              Today we bring the same method to gyms, sports schools, arenas and local sports businesses ready to grow
              through positioning, not just effort.
            </p>
          </Reveal>
          <Stagger className="grid gap-x-6 gap-y-4 border-t border-line pt-8 sm:grid-cols-2">
            {PROOF.map((item) => (
              <StaggerItem key={item} className="flex items-center gap-3 text-base text-fg">
                <span className="grid size-6 shrink-0 place-items-center bg-brand text-ink-950">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
