"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow, ArrowButton, BRICOLAGE } from "./shared";

const HEADING = "Marketing & growth will never be the same.";
const BODY = [
  "We are living in a new reality that mimics the inception of the internet. The challenge? How to grow, sustain, and retain in the Age of AI.",
  "AI, LLMs, GEO, agents, and new systems are reshaping how teams acquire, convert, and retain customers, fast. What worked pre-2023 is dead.",
  "Tactics go from successful to stale by the time you catch wind of them. The playbooks are constantly being rewritten. Unprompted brings together the founders, executives, operators, and builders at the forefront. Come learn what it takes to win in today's market from the best.",
];

const DIM = 0.28;
const SOFT = 5; // words over which each brightens

export default function Thesis() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Midway between the original pacing (finished only after the block had
      // scrolled past) and running fully ahead of it: the reveal now completes
      // shortly after the block settles into view.
      const p = (vh * 0.885 - r.top) / (r.height * 0.925 + vh * 0.075);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Flatten body into words with a global index for the reading highlight.
  const paras = BODY.map((p) => p.split(" "));
  const total = paras.reduce((n, w) => n + w.length, 0);
  let gi = 0;

  return (
    <section
      id="thesis"
      className="section-x"
      style={{ paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid var(--gray-3a)" }}
    >
      <div className="flex flex-col md:flex-row justify-between" style={{ gap: 40 }}>
        <div className="shrink-0">
          <Eyebrow num="01" label="The Thesis" />
        </div>

        <div ref={ref} className="w-full md:max-w-[793px] flex flex-col" style={{ gap: 64 }}>
          <div
            style={{
              fontFamily: BRICOLAGE,
              fontWeight: 400,
              fontSize: "clamp(24px, 2.6vw, 36px)",
              lineHeight: 1.17,
              letterSpacing: "-1px",
            }}
          >
            <p style={{ margin: "0 0 1.1em", color: "#f1f4f6" }}>{HEADING}</p>
            {paras.map((words, pi) => (
              <p key={pi} style={{ margin: pi < paras.length - 1 ? "0 0 1.1em" : 0 }}>
                {words.map((w, wi) => {
                  const idx = gi++;
                  // Sweep past the last word by SOFT, otherwise the highlight
                  // edge lands on the final word at progress 1 and the tail
                  // never reaches full opacity.
                  const head = progress * (total + SOFT);
                  const fill = Math.max(0, Math.min(1, (head - idx) / SOFT));
                  const opacity = DIM + (1 - DIM) * fill;
                  return (
                    <span key={wi} style={{ color: "#f1f4f6", opacity }}>
                      {w}{wi < words.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>

          <div>
            <a href="#apply">
              <ArrowButton label="Apply to Attend" bg="#24ad49" fontSize={16} squareSize={28} variant="btn" padLeft={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
