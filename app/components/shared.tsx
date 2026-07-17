import Image from "next/image";
import arrowBtn from "@/public/assets/arrow-btn.svg";
import arrowHero from "@/public/assets/arrow-hero.svg";
import arrowNav from "@/public/assets/arrow-nav.svg";

/* ---------- Matrix rain background text ---------- */
const MATRIX_TOKENS =
  "d8917fd cron { e152eb JOIN prompt# sched exec pid queue await $ ssh 200 OK SELECT * user_id attn 96db6ef apply agent.run() GET /growth/funnel model=gpt-x unprompted invite embed vec[ cache hit WHERE spawn conv++ geo.index ./deploy retain LTV CAC funnel[3] async yield 0xFA2 token.limit rag.query pipe | grep signal true false null void return { } => const let 42 3.14 npm run build ok fetch(url) await res.json() attn.head=12 loss=0.03 lr=1e-4 epoch 7/10 gpu:0 batch=64 SELECT count(*) FROM users WHERE cohort='2026' commit push origin main --force reindex done vector similarity 0.92 rerank top_k=8 stream chunk EOF ";

export function MatrixBackground() {
  const block = MATRIX_TOKENS.repeat(10);
  return (
    <div className="matrix-bg" aria-hidden>
      <pre>{block}</pre>
    </div>
  );
}

/* ---------- Green glow blobs ---------- */
export function GlowBlobs() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="glow"
        style={{
          width: 620,
          height: 420,
          top: -160,
          left: "38%",
          background:
            "radial-gradient(closest-side, rgba(112,229,88,0.30), rgba(112,229,88,0))",
        }}
      />
      <div
        className="glow"
        style={{
          width: 520,
          height: 420,
          top: -60,
          right: -120,
          background:
            "radial-gradient(closest-side, rgba(112,229,88,0.22), rgba(112,229,88,0))",
        }}
      />
      <div
        className="glow"
        style={{
          width: 560,
          height: 460,
          bottom: -180,
          left: -140,
          background:
            "radial-gradient(closest-side, rgba(112,229,88,0.18), rgba(112,229,88,0))",
        }}
      />
    </div>
  );
}

/* ---------- Big "un_prompted" animated wordmark ---------- */
export function Wordmark({
  size,
  className = "",
}: {
  size: number;
  className?: string;
}) {
  const before = "un".split("");
  const after = "prompted".split("");
  let i = 0;
  const delay = () => `${(i++ * 0.05).toFixed(2)}s`;

  const underscoreW = size * 0.42;
  const underscoreH = size * 0.11;

  return (
    <span
      className={`wordmark ${className}`}
      style={{ fontSize: size }}
      aria-label="un_prompted"
    >
      {before.map((c, idx) => (
        <span key={`b${idx}`} className="letter" style={{ animationDelay: delay() }}>
          {c}
        </span>
      ))}
      <span
        className="underscore"
        style={{
          width: underscoreW,
          height: underscoreH,
          marginLeft: size * 0.04,
          marginRight: size * 0.04,
          marginBottom: size * 0.02,
          animationDelay: delay(),
        }}
      />
      {after.map((c, idx) => (
        <span key={`a${idx}`} className="letter" style={{ animationDelay: delay() }}>
          {c}
        </span>
      ))}
    </span>
  );
}

/* ---------- Small inline "unprompted" logotype (nav / footer) ---------- */
export function LogoType({ size = 22 }: { size?: number }) {
  return (
    <span
      style={{ fontFamily: "var(--font-space)", fontSize: size, letterSpacing: "-0.02em" }}
      className="text-white inline-flex items-baseline leading-none"
      aria-label="un_prompted"
    >
      un
      <span
        style={{
          display: "inline-block",
          width: size * 0.42,
          height: size * 0.12,
          background: "var(--green-bright)",
          margin: `0 ${size * 0.04}px ${size * 0.02}px`,
          alignSelf: "flex-end",
        }}
      />
      prompted
    </span>
  );
}

/* ---------- Arrow button (recurring pattern) ---------- */
type ArrowVariant = "hero" | "nav" | "btn";
const arrowSrc = { hero: arrowHero, nav: arrowNav, btn: arrowBtn };

export function ArrowButton({
  label,
  bg = "#ffffff",
  fontSize = 16,
  squareSize = 28,
  variant = "btn",
  fullWidth = false,
}: {
  label: string;
  bg?: string;
  fontSize?: number;
  squareSize?: number;
  variant?: ArrowVariant;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      className={`arrow-btn press inline-flex items-center gap-3 ${
        fullWidth ? "w-full justify-between" : ""
      }`}
      style={{ background: bg, paddingLeft: 16, paddingRight: 8, paddingTop: 8, paddingBottom: 8 }}
    >
      <span
        style={{
          fontFamily: "var(--font-martian)",
          fontSize,
          color: "#151515",
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        className="arrow-square flex items-center justify-center shrink-0"
        style={{ width: squareSize, height: squareSize, background: "#151515" }}
      >
        <Image
          src={arrowSrc[variant]}
          alt=""
          width={Math.round(squareSize * 0.7)}
          height={Math.round(squareSize * 0.7)}
        />
      </span>
    </button>
  );
}

/* ---------- Section eyebrow: "01/  THE THESIS" ---------- */
export function Eyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2 uppercase"
      style={{ fontFamily: "var(--font-martian)", fontSize: 14, lineHeight: "14px", letterSpacing: "0.06em" }}
    >
      <span style={{ color: "var(--green)" }}>{num}/</span>
      <span className="text-white">{label}</span>
    </div>
  );
}
