"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { selectService } from "@/lib/booking";

/**
 * Makes a whole service card a link to the booking form with that service
 * preselected. With a mouse, the cursor becomes a lime "Book this" pill
 * (brand button shape, arrow echoing the logo mark) that trails the pointer.
 * Touch and keyboard users get the plain card link.
 */
export function ServiceCardLink({ service }: { service: string }) {
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 550, damping: 38, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 550, damping: 38, mass: 0.4 });

  const track = (e: React.PointerEvent<HTMLAnchorElement>, enter: boolean) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px);
    y.set(py);
    if (enter) {
      // Start the pill under the pointer instead of flying in from a corner.
      springX.jump(px);
      springY.jump(py);
      setActive(true);
    }
  };

  return (
    <>
      <a
        href="#book"
        aria-label={`Book a call about ${service}`}
        onClick={() => selectService(service)}
        onPointerEnter={(e) => track(e, true)}
        onPointerMove={(e) => track(e, false)}
        onPointerLeave={() => setActive(false)}
        className="absolute inset-0 z-10 pointer-fine:cursor-none"
      />
      <AnimatePresence>
        {active && (
          <motion.span
            aria-hidden
            style={{ x: springX, y: springY }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="pointer-events-none absolute left-0 top-0 z-20"
          >
            <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-950 shadow-[0_8px_30px_rgb(200_241_53/0.35)]">
              Book this
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}
