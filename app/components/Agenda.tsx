import { Eyebrow } from "./shared";
import { Reveal, Stagger } from "./motion";

const ROWS = [
  { time: "09:30", title: "Doors & coffee", sub: "Arrivals and early networking", tag: "Networking" },
  { time: "09:30", title: "Opening keynote", sub: "Setting the 2026 picture", tag: "Keynote 01" },
  { time: "09:30", title: "Panel — GEO & the new discovery layer", sub: "Speakers announced soon", tag: "Panel 01" },
  { time: "09:30", title: "Panel — Agents in the GTM stack", sub: "Speakers announced soon", tag: "Keynote 02" },
  { time: "09:30", title: "Keynote 02", sub: "To be announced", tag: "Panel 03" },
  { time: "09:30", title: "Reception", sub: "Curated networking & close", tag: "Networking" },
];

export default function Agenda() {
  return (
    <section style={{ background: "#09090a" }}>
      <div className="max-w-[1440px] mx-auto section-x" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: 96 }}>
          <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col gap-6">
            <Eyebrow num="06" label="Agenda" />
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
              Agenda Preview
            </h2>
          </Reveal>

          <Stagger className="flex-1">
            {ROWS.map((row, i) => (
              <div
                key={i}
                className="agenda-row flex items-start justify-between gap-8"
                style={{ paddingTop: 32, paddingBottom: 32, borderBottom: "1px solid #404040" }}
              >
                <div className="flex items-start gap-8 md:gap-16">
                  <span
                    style={{
                      fontFamily: "var(--font-martian)",
                      fontSize: 20,
                      color: "#24ad49",
                      letterSpacing: "0.013em",
                      lineHeight: "28px",
                      minWidth: 70,
                    }}
                  >
                    {row.time}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      style={{
                        fontFamily: "var(--font-hanken)",
                        fontWeight: 500,
                        fontSize: 24,
                        letterSpacing: "-0.01em",
                        color: "#fff",
                      }}
                    >
                      {row.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-hanken)",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "24px",
                        color: "#fff",
                        opacity: 0.7,
                      }}
                    >
                      {row.sub}
                    </span>
                  </div>
                </div>
                <span
                  className="agenda-tag uppercase shrink-0 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-martian)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    border: "1px solid",
                    padding: "8px 12px",
                  }}
                >
                  {row.tag}
                </span>
              </div>
            ))}

            {/* footer note */}
            <div className="flex items-center gap-3" style={{ paddingTop: 32, paddingBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "#24ad49" }} />
              <span
                style={{ fontFamily: "var(--font-hanken)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#f1f4f6" }}
              >
                More sessions &amp; speakers announced soon.
              </span>
            </div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
