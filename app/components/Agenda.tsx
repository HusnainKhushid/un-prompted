import { Eyebrow, SectionHeading, BRICOLAGE, MARTIAN } from "./shared";
import { Reveal, Stagger } from "./motion";

type Row = { time: string; title: string; sub: string; tag: string; pending?: boolean };

const ROWS: Row[] = [
  { time: "09:00", title: "Check in opens", sub: "Registration, breakfast & networking", tag: "Networking" },
  { time: "10:00", title: "Apps where everyone can ship", sub: "Amjad Masad · Founder & CEO of Replit", tag: "Keynote 01" },
  { time: "11:00", title: "Earning attention from agents", sub: "Panel speakers will be announced soon", tag: "Panel 01 - Execution", pending: true },
  { time: "12:00", title: "Lunch & curated networking", sub: "Break and more networking", tag: "Networking" },
  { time: "01:00", title: "AI productivity & connectivity", sub: "Panel speakers will be announced soon", tag: "Panel 02 - Workflows", pending: true },
  { time: "02:15", title: "Agentic systems of record", sub: "Panel speakers will be announced soon", tag: "Panel 03 - Systems", pending: true },
  { time: "03:15", title: "Infra for the next million AI apps", sub: "Paul Copplestone · Co-Founder & CEO of Supabase", tag: "Keynote 02" },
  { time: "04:00 -\n06:00", title: "Reception", sub: "Closing remarks followed by happy hour", tag: "Networking" },
];

export default function Agenda() {
  return (
    <section id="agenda" style={{ background: "var(--page)", borderTop: "1px solid var(--gray-3a)" }} className="section-x">
      <div className="flex flex-col lg:flex-row justify-between" style={{ paddingTop: 64, paddingBottom: 64, gap: 64 }}>
        <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="06" label="Agenda" />
          <SectionHeading color="#ffffff">Agenda Preview</SectionHeading>
        </Reveal>

        <Stagger className="w-full lg:max-w-[879px] flex-1">
          {ROWS.map((row, i) => (
            <div
              key={i}
              className="agenda-row flex items-start justify-between"
              style={{
                gap: 24,
                paddingTop: i === 0 ? 0 : 32,
                paddingBottom: 32,
                borderBottom: i < ROWS.length - 1 ? "1px solid var(--gray-3a)" : undefined,
              }}
            >
              <span
                style={{ fontFamily: MARTIAN, fontSize: 20, color: "#24ad49", letterSpacing: "0.26px", lineHeight: "28px", minWidth: 100, flexShrink: 0, whiteSpace: "pre-line" }}
              >
                {row.time}
              </span>
              <div className="flex flex-col flex-1" style={{ gap: 8 }}>
                <span style={{ fontFamily: BRICOLAGE, fontWeight: 400, fontSize: 24, letterSpacing: "-0.24px", lineHeight: "28px", color: "#fff" }}>
                  {row.title}
                </span>
                <span className="flex items-center" style={{ gap: 8 }}>
                  {row.pending && <span style={{ width: 7, height: 7, borderRadius: 3.5, background: "#24ad49", flexShrink: 0 }} />}
                  <span style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "20px", color: row.pending ? "#f1f4f6" : "#fff" }}>
                    {row.sub}
                  </span>
                </span>
              </div>
              <span
                className="agenda-tag uppercase shrink-0 whitespace-nowrap"
                style={{ fontFamily: MARTIAN, fontSize: 12, letterSpacing: "1.05px", lineHeight: "14px", border: "1px solid", padding: "8px 12px" }}
              >
                {row.tag}
              </span>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
