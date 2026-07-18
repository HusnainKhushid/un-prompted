import { Eyebrow, SectionHeading, BRICOLAGE, MARTIAN } from "./shared";
import { Reveal, Stagger } from "./motion";

const ROWS = [
  {
    title: "Deep discussions on marketing & growth",
    desc: 'No "future of" or "state of" platitudes. Get deep into the details as the leading names share specific plays & real numbers for what\'s working right now.',
  },
  {
    title: "Curated speaker and attendee selection",
    desc: "Every single person attending is intentionally selected to make each interaction worth your time, whether up on stage or sitting next to you.",
  },
  {
    title: "Clear outcomes and high-signal, all day",
    desc: "The topical selections for panels and keynotes are driven from Craft's hands-on operating experience and approach. This isn't guess work, it's hyper-focus.",
  },
];

function StatCard({ n, caption, bg }: { n: string; caption: string; bg: string }) {
  return (
    <div style={{ background: bg, padding: 44, color: "#151515", display: "flex", flexDirection: "column", gap: 18 }}>
      <span style={{ fontFamily: BRICOLAGE, fontWeight: 500, fontSize: 84, lineHeight: "67.2px", letterSpacing: "-3.36px" }}>
        {n}
      </span>
      <span style={{ fontFamily: MARTIAN, fontSize: 16, letterSpacing: "-1px", lineHeight: "22px" }}>{caption}</span>
    </div>
  );
}

export default function WhatToExpect() {
  return (
    <section
      style={{ background: "var(--page)", borderBottom: "1px solid var(--gray-3a)" }}
      className="section-x"
    >
      <div className="flex flex-col" style={{ paddingTop: 64, paddingBottom: 64, gap: 64 }}>
        <Reveal className="flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="03" label="What to Expect" />
          <SectionHeading color="#ffffff" width={649}>
            What to Expect
          </SectionHeading>
        </Reveal>

        <div className="flex flex-col lg:flex-row" style={{ gap: 139 }}>
          {/* Stat cards */}
          <Stagger className="flex flex-col w-full lg:w-[326px] shrink-0" style={{ gap: 24 }}>
            <StatCard n="3" caption="Panels — 50/50 founders and executives in the trenches everyday" bg="#24ad49" />
            <StatCard n="2" caption="Keynotes — from founders who's products are leading the shift" bg="#ffffff" />
          </Stagger>

          {/* Rows */}
          <Stagger className="flex-1">
            {ROWS.map((row, i) => (
              <div
                key={row.title}
                className="flex flex-col md:flex-row justify-between"
                style={{
                  gap: 24,
                  paddingTop: i === 0 ? 0 : 48,
                  paddingBottom: 48,
                  borderBottom: i < ROWS.length - 1 ? "1px solid var(--gray-3a)" : undefined,
                }}
              >
                <h3
                  className="md:w-[328px] shrink-0"
                  style={{ fontFamily: BRICOLAGE, fontWeight: 400, fontSize: 30, lineHeight: "36px", letterSpacing: "-0.3px", color: "#fff", margin: 0 }}
                >
                  {row.title}
                </h3>
                <p
                  className="md:w-[443px]"
                  style={{ fontFamily: MARTIAN, fontSize: 16, letterSpacing: "-1px", lineHeight: "22px", color: "#9d9d9d", margin: 0 }}
                >
                  {row.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
