import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Service = { num: string; title: string; desc: string; tags: string[]; image: string };

// Background photos: athlete from the brand kit; the rest from Unsplash (free license),
// credits in README.md.
const FEATURED: Service = {
  num: "01",
  title: "Brand strategy",
  desc: "Positioning and identity that make your gym, sports school or arena the reference in your area, not just another option.",
  tags: ["Branding", "Positioning", "Visual identity"],
  image: "/brand/athlete.png",
};

const SERVICES: Service[] = [
  {
    num: "02",
    title: "Sports marketing",
    desc: "Tailored strategies to win and keep members, customers and partners, built for how local sports businesses actually run.",
    tags: ["Acquisition", "Retention", "Partnerships & sponsorships"],
    image: "/services/sports-marketing.jpg",
  },
  {
    num: "03",
    title: "Event activation",
    desc: "Planning and promotion that fill game days, in-house tournaments and season openers, and turn first-timers into regulars.",
    tags: ["Events", "Experience", "B2B & B2C"],
    image: "/services/event-activation.jpg",
  },
  {
    num: "04",
    title: "Digital campaigns",
    desc: "Content that stops the scroll for people who live or train near you and keeps your business top of mind locally.",
    tags: ["Social media", "Performance", "Influencers"],
    image: "/services/digital-campaigns.jpg",
  },
  {
    num: "05",
    title: "Community & belonging",
    desc: "Rituals, content and activations that make members feel part of something, not just customers of a service.",
    tags: ["Community", "Engagement"],
    image: "/services/community.jpg",
  },
];

const WIDE: Service = {
  num: "06",
  title: "Content production",
  desc: "Photos, videos and assets that show your routine, facilities and behind-the-scenes at professional quality.",
  tags: ["Media", "Storytelling"],
  image: "/services/content-production.jpg",
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-white/15 bg-ink-950/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-fg-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Num({ children }: { children: string }) {
  return <span className="font-mono text-sm font-bold tracking-[0.14em] text-brand/70">{children}</span>;
}

/** Dimmed photo behind a card, with a scrim so the text stays readable. */
function Backdrop({ src, sizes, scrim }: { src: string; sizes: string; scrim: string }) {
  return (
    <>
      <Image src={src} alt="" fill sizes={sizes} className="-z-10 object-cover opacity-40 saturate-[0.65]" />
      <div aria-hidden className={cn("absolute inset-0 -z-10", scrim)} />
    </>
  );
}

const card = "relative isolate flex flex-col overflow-hidden border border-line bg-ink-950";
const scrimUp = "bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/25";

export function Services() {
  return (
    <section id="services" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand sm:text-sm">What we do</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-fg">
            Solutions that <span className="text-brand">transform</span> your brand.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            From strategic planning to creative execution, end-to-end solutions for the whole sports ecosystem.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured: the most chosen service. */}
          <StaggerItem lift className={cn(card, "min-h-[24rem] justify-end gap-4 p-7 sm:col-span-2 sm:p-10")}>
            <Backdrop src={FEATURED.image} sizes="(min-width: 1024px) 66vw, 100vw" scrim={scrimUp} />
            <div className="flex items-center justify-between gap-4">
              <Num>{FEATURED.num}</Num>
              <span className="border border-brand px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                Most popular
              </span>
            </div>
            <h3 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.95] text-fg">
              {FEATURED.title}
            </h3>
            <p className="max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">{FEATURED.desc}</p>
            <Tags tags={FEATURED.tags} />
          </StaggerItem>

          {SERVICES.map((s) => (
            <StaggerItem key={s.num} lift className={cn(card, "min-h-[24rem] justify-end gap-4 p-7 sm:p-8")}>
              <Backdrop src={s.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" scrim={scrimUp} />
              <Num>{s.num}</Num>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] uppercase leading-[1.02] text-fg">{s.title}</h3>
              <p className="text-base leading-relaxed text-fg-muted">{s.desc}</p>
              <Tags tags={s.tags} />
            </StaggerItem>
          ))}

          {/* Wide closing tile: spans the full row at every breakpoint so the grid never leaves an empty cell. */}
          <StaggerItem
            lift
            className={cn(
              card,
              "min-h-[18rem] justify-end gap-4 p-7 sm:col-span-2 sm:p-10 lg:col-span-3 lg:flex-row lg:items-end lg:gap-10",
            )}
          >
            <Backdrop
              src={WIDE.image}
              sizes="100vw"
              scrim="bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/20 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/70 lg:to-ink-950/10"
            />
            <div className="flex flex-col gap-4 lg:w-1/2">
              <Num>{WIDE.num}</Num>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] uppercase leading-[1.02] text-fg">
                {WIDE.title}
              </h3>
            </div>
            <div className="flex flex-col gap-4 lg:w-1/2">
              <p className="text-base leading-relaxed text-fg-muted">{WIDE.desc}</p>
              <Tags tags={WIDE.tags} />
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
