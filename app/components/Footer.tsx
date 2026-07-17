import { MatrixBackground, GlowBlobs, Wordmark } from "./shared";
import { Reveal, Stagger } from "./motion";

const COLUMNS = [
  { head: "Event", links: ["Thesis", "Who it's for", "Agenda", "Apply to attend"] },
  { head: "Craft", links: ["Craft Ventures", "Portfolio", "Founder Stories"] },
  { head: "Connect", links: ["LinkedIn", "X", "Get updates"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#09090a", borderTop: "1px solid #505050" }}>
      <MatrixBackground />
      <GlowBlobs />

      <div
        className="relative z-10 max-w-[1440px] mx-auto section-x"
        style={{ paddingTop: 64, paddingBottom: 32, display: "flex", flexDirection: "column", gap: 64 }}
      >
        {/* Top row */}
        <Reveal className="flex flex-col lg:flex-row justify-between gap-16">
          <div className="flex flex-col gap-5">
            <p
              className="uppercase"
              style={{ fontFamily: "var(--font-martian)", fontSize: 14, color: "#34c759", lineHeight: "24px" }}
            >
              Invite-Only Summit
            </p>
            <Wordmark size={54} />
            <div className="flex items-center gap-2 uppercase mt-1">
              <span style={{ fontFamily: "var(--font-martian)", fontSize: 14, color: "#9d9d9d", letterSpacing: "-0.03em" }}>
                presented by
              </span>
              <span style={{ fontFamily: "var(--font-martian)", fontWeight: 600, fontSize: 14, color: "#fff", letterSpacing: "-0.03em" }}>
                Craft
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-[443px] shrink-0 flex flex-col gap-5">
            <p
              style={{ fontFamily: "var(--font-hanken)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "#f2f0ec" }}
            >
              Sign Up For Our Newsletter
            </p>
            <input
              type="email"
              placeholder="Enter e-mail address"
              style={{
                background: "#060607",
                borderBottom: "1px solid #595959",
                padding: "24px 16px",
                fontFamily: "var(--font-martian)",
                fontSize: 16,
              }}
            />
          </div>
        </Reveal>

        {/* Link columns */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3">
          {COLUMNS.map((col, idx) => (
            <div
              key={col.head}
              className="flex flex-col gap-6"
              style={{
                padding: 32,
                borderTop: "1px solid #505050",
                borderLeft: "1px solid #505050",
                borderBottom: "1px solid #505050",
                borderRight: idx === COLUMNS.length - 1 ? "1px solid #505050" : undefined,
              }}
            >
              <span
                className="uppercase"
                style={{ fontFamily: "var(--font-martian)", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", color: "#9d9d9d" }}
              >
                {col.head}
              </span>
              <div className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-hanken)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#9d9d9d" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Stagger>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between gap-3"
          style={{ fontFamily: "var(--font-martian)", fontSize: 14, color: "#fff", letterSpacing: "-0.03em", lineHeight: "20px" }}
        >
          <span>San Francisco · October 1, 2026</span>
          <span>© 2026 Craft Ventures</span>
        </div>
      </div>
    </footer>
  );
}
