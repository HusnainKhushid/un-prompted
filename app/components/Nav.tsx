"use client";

import { LogoType, CraftLogo, ArrowButton, MARTIAN } from "./shared";
import SoundToggle from "./SoundToggle";

const LINKS = [
  { label: "Thesis", href: "#thesis" },
  { label: "Who its for", href: "#who" },
  { label: "Program", href: "#agenda" },
  { label: "Speakers", href: "#speakers" },
  { label: "Apply", href: "#apply" },
];

export default function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 load-fade-up"
      style={{
        height: 69,
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Full-bleed: brand hugs the left edge, CTA cluster the right */}
      <div
        className="w-full h-full flex items-center justify-between"
        style={{ padding: "0 32px" }}
      >
      {/* Brand cluster */}
      <div className="flex items-center" style={{ gap: 12 }}>
        <a href="#top" aria-label="un_prompted home" className="sm:border-r sm:pr-3" style={{ borderColor: "rgba(255,255,255,0.5)" }}>
          <LogoType size={21} />
        </a>
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: MARTIAN,
            fontSize: 12,
            lineHeight: "16px",
            letterSpacing: "-1px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Presented by
        </span>
        <span className="hidden sm:inline">
          <CraftLogo width={68} />
        </span>
      </div>

      {/* Center nav links */}
      <nav className="hidden lg:flex items-center" style={{ gap: 24 }}>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="nav-link"
            style={{
              fontFamily: MARTIAN,
              fontSize: 14,
              lineHeight: "18px",
              letterSpacing: "-0.3px",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Sound + CTA */}
      <div className="flex items-center" style={{ gap: 12 }}>
        <SoundToggle />
        <a href="#apply" className="hidden sm:block">
          <ArrowButton label="Apply to Attend" variant="nav" fontSize={14} squareSize={26} padLeft={12} />
        </a>
      </div>
      </div>
    </header>
  );
}
