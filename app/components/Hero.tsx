"use client";

import { GlowBlobs, Wordmark, ArrowButton, CraftLogo, MARTIAN, SPACE } from "./shared";

const PROMPT = "rgba(135,234,92,0.62)";

function TerminalCard() {
  return (
    <div
      className="load-fade-up"
      style={{
        width: "min(640px, 100%)",
        border: "1px solid rgba(135,234,92,0.32)",
        background: "rgba(9,9,10,0.8)",
        backdropFilter: "blur(5.9px)",
        WebkitBackdropFilter: "blur(5.9px)",
        boxShadow: "inset 0 0 70px rgba(135,234,92,0.05)",
        animationDelay: "120ms",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center"
        style={{ gap: 8, padding: "11px 15px 12px", borderBottom: "1px solid rgba(135,234,92,0.18)" }}
      >
        <span className="flex" style={{ gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(135,234,92,0.9)", boxShadow: "0 0 9px rgba(135,234,92,0.8)" }} />
          <span style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(135,234,92,0.34)" }} />
          <span style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(135,234,92,0.2)" }} />
        </span>
        <span style={{ fontFamily: SPACE, fontSize: 14, lineHeight: "20px", letterSpacing: "1.4px", color: "rgba(135,234,92,0.6)", paddingLeft: 10 }}>
          unprompted
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "16px 16px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: MARTIAN, fontSize: 14 }}>
          <p style={{ margin: 0, lineHeight: "22px" }}>
            <span style={{ color: PROMPT }}>unprompted:~$ </span>
            <span style={{ color: "var(--terminal-green)" }}>event</span>
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: "28px", color: "#fff" }}>WELCOME TO UNPROMPTED 2026</p>
        </div>

        <div className="load-fade-up" style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: MARTIAN, fontSize: 14, animationDelay: "560ms" }}>
          <p style={{ margin: 0, lineHeight: "22px" }}>
            <span style={{ color: PROMPT }}>unprompted:~$ </span>
            <span style={{ color: "var(--terminal-green)" }}>what is unprompted?</span>
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: "24px", color: "rgba(223,251,224,0.58)" }}>
            The premier destination where founders, executives,
            <br />
            AI builders, and operators share off-the-record marketing &amp; growth takes on winning in the Age of AI.
            <span className="cursor-blink" style={{ color: PROMPT }}> ▊</span>
          </p>
        </div>

        <div className="load-fade-up" style={{ animationDelay: "820ms" }}>
          <ArrowButton label="Apply to Attend" fontSize={16} squareSize={32} variant="hero" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: "min(920px, 100svh)", background: "#000" }}
    >
      {/* Background video */}
      <video
        aria-hidden
        src="/assets/hero-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, objectPosition: "center 40%" }}
      />
      <GlowBlobs />
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0"
        style={{ height: 460, zIndex: 1, background: "linear-gradient(to top, #09090a 12%, rgba(9,9,10,0))" }}
      />

      {/* Content column — terminal top, wordmark + date bar bottom; flex keeps them apart */}
      <div className="relative mx-auto w-full flex flex-col" style={{ maxWidth: 1440, zIndex: 3, flex: 1, paddingTop: 80 }}>
        <div style={{ paddingLeft: 32, paddingRight: 32, maxWidth: 704 }}>
          <TerminalCard />
        </div>

        <div style={{ flex: 1, minHeight: 8 }} />

        {/* Wordmark block */}
        <div style={{ paddingLeft: 32, paddingRight: 32 }}>
          <p
            className="uppercase load-fade-up"
            style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", color: "#34c759", margin: 0, animationDelay: "260ms" }}
          >
            Invite-Only Summit
          </p>
          <div style={{ marginTop: 2 }}>
            <Wordmark size="clamp(44px, min(15vw, 25vh), 216px)" />
          </div>
          <div className="flex items-end load-fade-up" style={{ gap: 16, marginTop: 4, animationDelay: "520ms" }}>
            <span
              className="uppercase"
              style={{ fontFamily: MARTIAN, fontWeight: 500, fontSize: "clamp(16px, 2vw, 28px)", letterSpacing: "-0.08em", lineHeight: 1, color: "rgba(255,255,255,0.65)" }}
            >
              by
            </span>
            <CraftLogo width={150} />
          </div>
        </div>

        {/* Date / Location bar */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 load-fade-up"
          style={{ marginTop: 16, borderTop: "1px solid var(--gray-3a)", borderBottom: "1px solid var(--gray-3a)", animationDelay: "620ms" }}
        >
          <div style={{ padding: "22px 24px", borderLeft: "1px solid var(--gray-3a)", display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="uppercase" style={{ fontFamily: MARTIAN, fontSize: 20, lineHeight: "28px", letterSpacing: "1px", color: "#9d9d9d", margin: 0 }}>
              Date
            </p>
            <p style={{ fontFamily: MARTIAN, fontSize: 24, lineHeight: "32px", letterSpacing: "-1px", color: "#fff", margin: 0 }}>
              October 1, 2026
            </p>
          </div>
          <div style={{ padding: "22px 24px", borderLeft: "1px solid var(--gray-3a)", borderRight: "1px solid var(--gray-3a)", display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="uppercase" style={{ fontFamily: MARTIAN, fontSize: 20, lineHeight: "28px", letterSpacing: "1px", color: "#9d9d9d", margin: 0 }}>
              Location
            </p>
            <p style={{ margin: 0, display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
              <span style={{ fontFamily: MARTIAN, fontSize: 24, lineHeight: "32px", letterSpacing: "-1px", color: "#fff" }}>San Francisco</span>
              <span className="uppercase" style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", letterSpacing: "1px", color: "#9d9d9d" }}>
                · venue revealed to invited guests
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
