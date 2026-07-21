"use client";

/* Scratch route — isolated comparison of footer background treatments.
   Not linked from anywhere; delete once an option is picked. */

import { useEffect, useRef, useState } from "react";
import { MARTIAN, HANKEN } from "../../components/shared";

const TOKENS =
  "d8917fd cron { e152eb JOIN prompt# sched exec pid queue await $ ssh 200 OK SELECT * user_id attn 96db6ef apply agent.run() GET /growth/funnel model=gpt-x unprompted invite embed vec[ cache hit WHERE spawn conv++ geo.index ./deploy retain LTV CAC funnel[3] async yield 0xFA2 token.limit rag.query pipe | grep signal true false null void return { } => const let 42 3.14 npm run build ok fetch(url) await res.json() attn.head=12 loss=0.03 lr=1e-4 epoch 7/10 gpu:0 batch=64 SELECT count(*) FROM users WHERE cohort='2026' commit push origin main --force reindex done vector similarity 0.92 rerank top_k=8 stream chunk EOF ";

const GLYPHS = "ABCDEF0123456789#$%&*<>/\\|{}[]_+=~^abcdefxyz";

/* ─────────────── A · Canvas matrix rain ─────────────── */
function CanvasRain({ speed = 1, density = 1 }: { speed?: number; density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cols: number[] = [];
    let w = 0, h = 0;
    const FS = 14;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.floor((w / (FS * 0.72)) * density);
      cols = Array.from({ length: n }, () => Math.random() * -h);
    };
    resize();
    window.addEventListener("resize", resize);

    let lastT = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - lastT < 55) return; // ~18fps — matrix rain reads better chunky
      lastT = t;

      // Trail: paint translucent black over the last frame.
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${FS}px ${getComputedStyle(cv).getPropertyValue("--mono") || "monospace"}`;

      const step = w / cols.length;
      for (let i = 0; i < cols.length; i++) {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const x = i * step;
        const y = cols[i];
        ctx.fillStyle = "rgba(180,255,190,0.55)"; // bright head
        ctx.fillText(ch, x, y);
        ctx.fillStyle = "rgba(52,199,89,0.30)"; // green tail
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, y - FS);

        cols[i] = y > h + Math.random() * 400 ? 0 : y + FS * speed;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [speed, density]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", "--mono": MARTIAN } as React.CSSProperties} />;
}

/* ─────────────── B · Character mutation ─────────────── */
function MutationField({ rate = 90, perTick = 14 }: { rate?: number; perTick?: number }) {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = TOKENS.repeat(10).split("");
    el.textContent = chars.join("");

    const id = setInterval(() => {
      for (let i = 0; i < perTick; i++) {
        const idx = (Math.random() * chars.length) | 0;
        if (chars[idx] === " ") continue; // keep the word rhythm intact
        chars[idx] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = chars.join("");
    }, rate);

    return () => clearInterval(id);
  }, [rate, perTick]);

  return <pre ref={ref} className="lab-field" />;
}

/* ─────────────── C · CSS-only drift ─────────────── */
function DriftField() {
  const block = TOKENS.repeat(6);
  return (
    <div className="lab-drift">
      <pre className="lab-field">{block}</pre>
      <pre className="lab-field">{block}</pre>
    </div>
  );
}

/* ─────────────── D · Combined (rain behind mutation) ─────────────── */
function Combined() {
  return (
    <>
      <MutationField rate={120} perTick={10} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        <CanvasRain speed={0.75} density={0.55} />
      </div>
    </>
  );
}

/* ─────────────── Sample footer content overlay ─────────────── */
function FooterSample() {
  return (
    <div style={{ position: "relative", zIndex: 2, padding: 32, display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
      <div>
        <p className="uppercase" style={{ fontFamily: MARTIAN, fontSize: 12, color: "#34c759", margin: 0 }}>Invite-Only Summit</p>
        <p style={{ fontFamily: "var(--font-space)", fontSize: 40, fontWeight: 400, color: "#fff", margin: "8px 0 0", letterSpacing: "-0.045em" }}>
          un<span style={{ display: "inline-block", width: "0.42em", height: "0.11em", background: "var(--green-bright)", margin: "0 0.04em 0.06em" }} />prompted
        </p>
      </div>
      <div style={{ display: "flex", gap: 40, fontFamily: HANKEN, fontSize: 15, color: "#9d9d9d" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: MARTIAN, fontSize: 12, letterSpacing: "1.4px", color: "#9d9d9d" }}>EVENT</span>
          <span>Thesis</span><span>Agenda</span><span>Apply to attend</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: MARTIAN, fontSize: 12, letterSpacing: "1.4px", color: "#9d9d9d" }}>CONNECT</span>
          <span>LinkedIn</span><span>X</span><span>Get updates</span>
        </div>
      </div>
    </div>
  );
}

const OPTIONS = [
  {
    key: "current",
    title: "Current — static",
    note: "What ships today. Legible, but inert.",
    render: () => <pre className="lab-field">{TOKENS.repeat(6)}</pre>,
  },
  {
    key: "mutate",
    title: "B · Character mutation  ← recommended",
    note: "The existing token field, with ~14 random characters swapping every 90ms. Reads as live terminal output. No new assets, ~0.5KB of JS, text stays selectable.",
    render: () => <MutationField />,
  },
  {
    key: "rain",
    title: "A · Canvas matrix rain",
    note: "Classic falling glyph columns on <canvas>, throttled to ~18fps. Most literally 'Matrix', but it's a different texture from the current wordy background.",
    render: () => <CanvasRain />,
  },
  {
    key: "drift",
    title: "C · CSS-only drift",
    note: "Token field scrolls upward on a seamless loop. Zero JS, cheapest possible. Motion is uniform, so it can read as a moving texture rather than living data.",
    render: () => <DriftField />,
  },
  {
    key: "combo",
    title: "D · Combined (B + A at 50%)",
    note: "Mutation field with faint rain behind it for depth.",
    render: () => <Combined />,
  },
];

export default function FooterBgLab() {
  const [speed, setSpeed] = useState(1);
  return (
    <main style={{ background: "#050505", minHeight: "100svh", padding: "48px 32px 96px" }}>
      <h1 style={{ fontFamily: MARTIAN, fontSize: 18, color: "#fff", margin: "0 0 8px" }}>
        Footer background — options
      </h1>
      <p style={{ fontFamily: HANKEN, fontSize: 15, color: "#9d9d9d", margin: "0 0 40px", maxWidth: 720 }}>
        Each panel is the real footer text over a candidate background, at the real size. Video is deliberately not
        shown — see the notes below the panels for why.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {OPTIONS.map((o) => (
          <section key={o.key}>
            <h2 style={{ fontFamily: MARTIAN, fontSize: 14, color: "#34c759", margin: "0 0 6px" }}>{o.title}</h2>
            <p style={{ fontFamily: HANKEN, fontSize: 14, color: "#9d9d9d", margin: "0 0 12px", maxWidth: 820 }}>{o.note}</p>
            <div className="lab-panel">
              {o.render()}
              <FooterSample />
            </div>
          </section>
        ))}
      </div>

      <p style={{ fontFamily: HANKEN, fontSize: 14, color: "#9d9d9d", marginTop: 48, maxWidth: 820 }}>
        Speed/density are tunable per option — this page just shows defaults. Current rain speed:&nbsp;
        <input type="range" min={0.4} max={2} step={0.1} value={speed} onChange={(e) => setSpeed(+e.target.value)} />
        &nbsp;{speed.toFixed(1)}×
      </p>
      <div className="lab-panel" style={{ marginTop: 12 }}>
        <CanvasRain speed={speed} />
        <FooterSample />
      </div>
    </main>
  );
}
