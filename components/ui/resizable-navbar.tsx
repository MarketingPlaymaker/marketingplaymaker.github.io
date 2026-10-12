"use client";

/*
 * Resizable navbar, adapted from the 21st.dev component for Playmaker:
 * - dark brand surfaces, pill-shaped bar and buttons;
 * - lucide icons (the project's icon family) instead of @tabler/icons-react;
 * - fixed positioning, an accessible menu toggle, Escape closes the menu;
 * - every hover/press effect is Motion, no CSS transitions.
 */

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const spring = { type: "spring", stiffness: 200, damping: 50 } as const;

// Raised state: hairline edge plus a deep shadow, tuned for a dark page.
const RAISED_SHADOW = "0 0 0 1px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.45)";
const FLAT_SHADOW = "0 0 0 0px rgba(255,255,255,0), 0 0px 0px rgba(0,0,0,0)";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/** Fixed shell. Tells its children whether the page has scrolled past 100px. */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  // Only flips state when crossing the threshold, not on every scroll frame.
  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 100));

  return (
    <motion.header ref={ref} className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child,
      )}
    </motion.header>
  );
};

/** Desktop bar: full width at the top, shrinks into a floating bar on scroll. */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        backgroundColor: visible ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0)",
        boxShadow: visible ? RAISED_SHADOW : FLAT_SHADOW,
        width: visible ? "60%" : "100%",
        y: visible ? 16 : 0,
      }}
      transition={spring}
      // Wide enough that the centered links never touch the logo or the CTA.
      style={{ minWidth: "980px" }}
      className={cn(
        "relative mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full py-3 pl-6 pr-3 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

/** Centered links with a highlight that slides between items on hover. */
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav
      aria-label="Main"
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "pointer-events-none absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-1 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={item.link}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onFocus={() => setHovered(idx)}
          onBlur={() => setHovered(null)}
          onClick={onItemClick}
          className={cn(
            "pointer-events-auto relative px-4 py-2 text-sm font-medium uppercase tracking-[0.16em]",
            hovered === idx ? "text-fg" : "text-fg-muted",
          )}
        >
          {hovered === idx && (
            <motion.span
              layoutId="nav-hover"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
              className="absolute inset-0 rounded-full bg-white/[0.08]"
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </nav>
  );
};

/** Mobile bar: same shrink-on-scroll behaviour, below the lg breakpoint. */
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        backgroundColor: visible ? "rgba(10,10,10,0.88)" : "rgba(10,10,10,0)",
        boxShadow: visible ? RAISED_SHADOW : FLAT_SHADOW,
        width: visible ? "92%" : "100%",
        paddingLeft: visible ? "14px" : "20px",
        paddingRight: visible ? "8px" : "12px",
        y: visible ? 12 : 0,
      }}
      transition={spring}
      className={cn("relative mx-auto flex w-full flex-col items-center justify-between rounded-full py-2 lg:hidden", className)}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>;
};

const menuVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0, transition: { duration: 0.25, staggerChildren: 0.05, delayChildren: 0.05 } },
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
  // Escape closes the menu.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="mobile-menu"
          aria-label="Main"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className={cn(
            "absolute inset-x-0 top-[calc(100%+8px)] flex w-full flex-col items-stretch gap-1 rounded-3xl border border-line bg-ink-950 px-6 py-6 shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
            className,
          )}
        >
          {children}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: -12 },
  open: { opacity: 1, x: 0 },
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="grid size-11 place-items-center rounded-full text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          {isOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <a href="#" aria-label="Playmaker, back to top" className="relative z-20 flex items-center gap-3 px-1 py-1">
      <Image src="/brand/playmaker-mark.png" alt="" width={490} height={414} className="h-7 w-auto sm:h-8" />
      <span className="font-display text-xl uppercase tracking-[0.02em] text-fg sm:text-2xl">Playmaker</span>
    </a>
  );
};

const buttonVariants: Record<"primary" | "secondary", Variants> = {
  primary: {
    rest: { y: 0, scale: 1, backgroundColor: "#c8f135" },
    hover: { y: -2, scale: 1, backgroundColor: "#d8ff40" },
    tap: { y: 0, scale: 0.98, backgroundColor: "#d8ff40" },
  },
  secondary: {
    rest: { y: 0, scale: 1, backgroundColor: "rgba(255,255,255,0)" },
    hover: { y: -2, scale: 1, backgroundColor: "rgba(255,255,255,0.07)" },
    tap: { y: 0, scale: 0.98, backgroundColor: "rgba(255,255,255,0.07)" },
  },
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants[variant]}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={cn(
        "relative z-20 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] sm:text-sm",
        variant === "primary" ? "text-ink-950" : "text-fg",
        className,
      )}
    >
      {children}
    </motion.a>
  );
};
