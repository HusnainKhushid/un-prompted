import { Eyebrow, SectionHeading, MARTIAN } from "./shared";
import { Reveal, Stagger } from "./motion";

const ITEMS = [
  { n: "01", label: "Founders in AI & SaaS" },
  { n: "02", label: "Marketing leaders" },
  { n: "03", label: "Growth practitioners" },
  { n: "04", label: "GTM Engineering innovators" },
  { n: "05", label: "Applied AI tacticians" },
  { n: "06", label: "High-growth operators" },
];

export default function WhoItsFor() {
  return (
    <section id="who" className="section-x" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="flex flex-col" style={{ gap: 64 }}>
        <Reveal className="flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="02" label="Who It's For" />
          <SectionHeading width={649}>
            The highest-signal room for marketing &amp; growth in 2026.
          </SectionHeading>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, idx) => (
            <div
              key={item.n}
              className="who-cell flex flex-col justify-between"
              style={{
                minHeight: 224,
                padding: 44,
                gap: 64,
                borderTop: "1px solid var(--gray-3a)",
                borderLeft: "1px solid var(--gray-3a)",
                borderRight: (idx + 1) % 3 === 0 ? "1px solid var(--gray-3a)" : undefined,
                borderBottom: idx >= 3 ? "1px solid var(--gray-3a)" : undefined,
              }}
            >
              <span
                className="who-num uppercase"
                style={{ fontFamily: MARTIAN, fontSize: 18, color: "#24ad49", lineHeight: "26px" }}
              >
                {item.n}
              </span>
              <span
                style={{
                  fontFamily: MARTIAN,
                  fontSize: 24,
                  lineHeight: "28px",
                  letterSpacing: "-0.24px",
                  color: "#fff",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
