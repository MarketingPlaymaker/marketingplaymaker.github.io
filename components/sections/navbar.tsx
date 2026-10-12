"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar as ResizableNavbar,
  NavbarButton,
  NavbarLogo,
  mobileMenuItem,
} from "@/components/ui/resizable-navbar";
import { NAV_LINKS } from "@/lib/nav";

const items = NAV_LINKS.map((link) => ({ name: link.label, link: link.href }));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ResizableNavbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={items} />
        <NavbarButton href="#book">
          Book a call <ArrowRight size={16} aria-hidden />
        </NavbarButton>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open} onClose={close}>
          {items.map((item) => (
            <motion.a
              key={item.link}
              href={item.link}
              variants={mobileMenuItem}
              onClick={close}
              className="py-3 text-base font-medium uppercase tracking-[0.16em] text-fg-muted"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.div variants={mobileMenuItem} className="mt-3">
            <NavbarButton href="#book" onClick={close} className="w-full py-4">
              Book a call <ArrowRight size={16} aria-hidden />
            </NavbarButton>
          </motion.div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
