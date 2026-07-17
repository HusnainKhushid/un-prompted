import { Eyebrow } from "./shared";
import { Reveal, Stagger } from "./motion";

const ITEMS = [
  { n: "01", label: "Marketing leaders" },
  { n: "02", label: "Growth leaders" },
  { n: "03", label: "Founders" },
  { n: "04", label: "GTM operators" },
  { n: "05", label: "AI-forward teams" },
  { n: "06", label: "Senior operators, high-growth companies" },
];

export default function WhoItsFor() {
  return (
    <section
      className="max-w-[1440px] mx-auto section-x"
      style={{ paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid #252525" }}
    >
      <div className="flex flex-col gap-16">
        <Reveal className="flex flex-col gap-16">
          <Eyebrow num="02" label="Who It's For" />
          <h2
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 500,
              fontSize: 48,
              lineHeight: "52px",
              letterSpacing: "-0.021em",
              color: "#f2f0ec",
              maxWidth: 649,
            }}
          >
            A curated room of operators who actually ship.
          </h2>
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
                borderTop: "1px solid #505050",
                borderLeft: "1px solid #505050",
                // right & bottom edges close the grid
                borderRight: (idx + 1) % 3 === 0 ? "1px solid #505050" : undefined,
                borderBottom: idx >= 3 ? "1px solid #505050" : undefined,
              }}
            >
              <span
                className="who-num uppercase"
                style={{ fontFamily: "var(--font-martian)", fontSize: 18, color: "#24ad49", lineHeight: "26px" }}
              >
                {item.n}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-hanken)",
                  fontWeight: 500,
                  fontSize: 24,
                  lineHeight: "28px",
                  letterSpacing: "-0.01em",
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
