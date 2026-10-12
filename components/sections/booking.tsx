import { CalendarDays, Clock, Target, UserRound, type LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { BookingForm } from "./booking-form";

const PERKS: { icon: LucideIcon; text: string }[] = [
  { icon: Clock, text: "Free 40-minute brand diagnosis" },
  { icon: UserRound, text: "Meet our Head of Strategy" },
  { icon: Target, text: "A personalized action plan to take away" },
  { icon: CalendarDays, text: "Monday to Friday, 7am to 10pm (Brasília time)" },
];

export function Booking() {
  return (
    <section id="book" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand sm:text-sm">{"Let's play together"}</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-fg">
              Your first call is <span className="text-brand">on us.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
              One 40-minute conversation can change where your brand goes in sport. No sales script, no fluff. Just
              strategy, straight from the people who will run your project.
            </p>
          </Reveal>
          <Stagger className="flex flex-col gap-4">
            {PERKS.map(({ icon: Icon, text }) => (
              <StaggerItem key={text} className="flex items-center gap-4 text-base text-fg">
                <span className="grid size-10 shrink-0 place-items-center border border-brand/30 text-brand">
                  <Icon size={20} strokeWidth={2} aria-hidden />
                </span>
                {text}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
