import { Eyebrow } from "./shared";
import { Reveal, Stagger } from "./motion";

const ROWS = [
  {
    title: "Deep tactical conversations",
    desc: 'No "future of marketing" platitudes. Specific plays, real numbers, what\'s working in 2026.',
  },
  {
    title: "Curated networking",
    desc: "A small room by design. Every introduction is one worth making.",
  },
  {
    title: "High-signal, all day",
    desc: "One focused day on how growth marketing is changing — and what to do about it now.",
  },
];

function StatCard({ n, caption, bg }: { n: string; caption: string; bg: string }) {
  return (
    <div style={{ background: bg, padding: 44, color: "#151515" }} className="flex flex-col gap-6">
      <span
        style={{
          fontFamily: "var(--font-bricolage)",
          fontWeight: 500,
          fontSize: 84,
          lineHeight: "67px",
          letterSpacing: "-0.04em",
        }}
      >
        {n}
      </span>
      <span style={{ fontFamily: "var(--font-martian)", fontSize: 16, letterSpacing: "-0.04em", lineHeight: "22px" }}>
        {caption}
      </span>
    </div>
  );
}

export default function WhatToExpect() {
  return (
    <section
      style={{ background: "#09090a", borderBottom: "1px solid #252525" }}
    >
      <div className="max-w-[1440px] mx-auto section-x" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="flex flex-col gap-16">
          <Reveal className="flex flex-col gap-16">
            <Eyebrow num="03" label="What to Expect" />
            <h2
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "52px",
                letterSpacing: "-0.021em",
                color: "#fff",
              }}
            >
              What to Expect
            </h2>
          </Reveal>

          <div className="flex flex-col lg:flex-row" style={{ gap: 96 }}>
            {/* stat cards */}
            <Stagger className="flex flex-col gap-6 w-full lg:w-[326px] shrink-0">
              <StatCard n="3" caption="Panels — built for depth, not theater" bg="#24ad49" />
              <StatCard n="2" caption="Keynotes — from people building the shift" bg="#ffffff" />
            </Stagger>

            {/* rows */}
            <Stagger className="flex-1">
              {ROWS.map((row, i) => (
                <div
                  key={row.title}
                  className="flex flex-col md:flex-row justify-between gap-6"
                  style={{
                    paddingTop: i === 0 ? 0 : 48,
                    paddingBottom: 48,
                    borderBottom: "1px solid #505050",
                  }}
                >
                  <h3
                    className="md:w-[328px]"
                    style={{
                      fontFamily: "var(--font-hanken)",
                      fontWeight: 500,
                      fontSize: 30,
                      lineHeight: "36px",
                      letterSpacing: "-0.01em",
                      color: "#fff",
                    }}
                  >
                    {row.title}
                  </h3>
                  <p
                    className="md:w-[443px]"
                    style={{
                      fontFamily: "var(--font-martian)",
                      fontSize: 16,
                      letterSpacing: "-0.04em",
                      lineHeight: "24px",
                      color: "#9d9d9d",
                    }}
                  >
                    {row.desc}
                  </p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
