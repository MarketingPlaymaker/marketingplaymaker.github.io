import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/booking";
import { NAV_LINKS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="#" className="flex items-center gap-3" aria-label="Playmaker, back to top">
          <Image src="/brand/playmaker-mark.png" alt="" width={490} height={414} className="h-7 w-auto" />
          <span className="font-display text-2xl uppercase text-fg">Playmaker</span>
        </a>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm uppercase tracking-[0.14em] text-fg-muted hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm text-fg-muted md:items-end">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">
            {CONTACT_EMAIL}
          </a>
          <p>© 2026 Playmaker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
