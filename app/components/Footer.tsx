import { MatrixBackground, GlowBlobs, Wordmark, MARTIAN, HANKEN } from "./shared";
import { Reveal, Stagger } from "./motion";
import Newsletter from "./Newsletter";

const COLUMNS = [
  {
    head: "Event",
    links: [
      { label: "Thesis", href: "#thesis" },
      { label: "Who it's for", href: "#who" },
      { label: "Agenda", href: "#agenda" },
      { label: "Apply to attend", href: "#apply" },
    ],
  },
  {
    head: "Craft",
    links: [
      { label: "Craft Ventures", href: "#" },
      { label: "Portfolio", href: "#" },
      { label: "Founder Stories", href: "#" },
    ],
  },
  {
    head: "Connect",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
      { label: "Get updates", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#000", borderTop: "1px solid var(--gray-50)" }}>
      <MatrixBackground />
      <GlowBlobs />

      <div
        className="relative z-10 mx-auto section-x"
        style={{ maxWidth: 1440, paddingTop: 64, paddingBottom: 32, display: "flex", flexDirection: "column", gap: 64 }}
      >
        {/* Top row */}
        <Reveal className="flex flex-col lg:flex-row justify-between" style={{ gap: 64 }}>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <p className="uppercase" style={{ fontFamily: MARTIAN, fontSize: 14, color: "#34c759", lineHeight: "24px", margin: 0 }}>
              Invite-Only Summit
            </p>
            <Wordmark size={54} />
            <div className="flex items-center uppercase" style={{ gap: 6 }}>
              <span style={{ fontFamily: MARTIAN, fontWeight: 500, fontSize: 14.222, lineHeight: "19px", color: "#9d9d9d", letterSpacing: "-0.03em" }}>
                presented by
              </span>
              <span style={{ fontFamily: MARTIAN, fontWeight: 600, fontSize: 14.222, lineHeight: "19px", color: "#fff", letterSpacing: "-0.03em" }}>
                Craft
              </span>
            </div>
          </div>

          <Newsletter />
        </Reveal>

        {/* Link columns */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3">
          {COLUMNS.map((col, idx) => (
            <div
              key={col.head}
              className="flex flex-col"
              style={{
                padding: 32,
                gap: 24,
                borderTop: "1px solid var(--gray-3a)",
                borderLeft: "1px solid var(--gray-3a)",
                borderBottom: "1px solid var(--gray-3a)",
                borderRight: idx === COLUMNS.length - 1 ? "1px solid var(--gray-3a)" : undefined,
              }}
            >
              <span className="uppercase" style={{ fontFamily: MARTIAN, fontWeight: 700, fontSize: 14, letterSpacing: "1.47px", lineHeight: "20px", color: "#9d9d9d" }}>
                {col.head}
              </span>
              <div className="flex flex-col" style={{ gap: 8 }}>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-link"
                    style={{ fontFamily: HANKEN, fontWeight: 400, fontSize: 16, lineHeight: "24px", width: "fit-content" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Stagger>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between"
          style={{ gap: 12, fontFamily: MARTIAN, fontSize: 14, color: "#fff", letterSpacing: "-1px", lineHeight: "20px" }}
        >
          <span>San Francisco · October 1, 2026</span>
          <span>© 2026 Craft Ventures</span>
        </div>
      </div>
    </footer>
  );
}
