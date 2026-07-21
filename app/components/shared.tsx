"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import arrowBtn from "@/public/assets/arrow-btn.svg";
import arrowNav from "@/public/assets/arrow-nav.svg";
import arrowHero from "@/public/assets/arrow-hero.svg";
import craftLogo from "@/public/assets/craft-logo.svg";

/* Shared font stacks (variable fonts loaded in layout.tsx). */
export const BRICOLAGE = "var(--font-bricolage)";
export const MARTIAN = "var(--font-martian)";
export const SPACE = "var(--font-space)";
export const HANKEN = "var(--font-hanken)";

/* ---------- Matrix rain background text ---------- */
const MATRIX_TOKENS =
  "d8917fd cron { e152eb JOIN prompt# sched exec pid queue await $ ssh 200 OK SELECT * user_id attn 96db6ef apply agent.run() GET /growth/funnel model=gpt-x unprompted invite embed vec[ cache hit WHERE spawn conv++ geo.index ./deploy retain LTV CAC funnel[3] async yield 0xFA2 token.limit rag.query pipe | grep signal true false null void return { } => const let 42 3.14 npm run build ok fetch(url) await res.json() attn.head=12 loss=0.03 lr=1e-4 epoch 7/10 gpu:0 batch=64 SELECT count(*) FROM users WHERE cohort='2026' commit push origin main --force reindex done vector similarity 0.92 rerank top_k=8 stream chunk EOF ";

export function MatrixBackground() {
  const block = MATRIX_TOKENS.repeat(12);
  return (
    <div className="matrix-bg" aria-hidden>
      <pre>{block}</pre>
    </div>
  );
}

/* ---------- Green glow blobs ---------- */
export function GlowBlobs() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="glow"
        style={{
          width: 1200,
          height: 760,
          top: -340,
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(4px)",
          opacity: 0.32,
          background:
            "radial-gradient(closest-side, rgba(112,229,88,1), rgba(112,229,88,0) 72%)",
        }}
      />
      <div
        className="glow"
        style={{
          width: 680,
          height: 680,
          top: -120,
          right: -180,
          filter: "blur(20px)",
          opacity: 0.12,
          background:
            "radial-gradient(closest-side, rgba(112,229,88,1), rgba(112,229,88,0) 70%)",
        }}
      />
    </div>
  );
}

/* ---------- Big "un_prompted" animated wordmark ----------
   `size` may be a number (px) or any CSS length string (e.g. a clamp()).
   The underscore is sized in em so it scales with the font size.

   `effect`:
     "rise"   — the original per-letter fade/rise (CSS keyframes)
     "decode" — GSAP scramble-decode: each character churns through a few
                glyphs and settles, resolving left→right. No jitter, no RGB
                split — it should read as the mark quietly resolving. */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/* The mark renders fully visible in the markup — the animation hides it in a
   layout effect (before paint) and animates it back. If GSAP never runs, the
   worst case is no animation rather than an invisible wordmark. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useDecodeWordmark(enabled: boolean) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;

    const chars = Array.from(root.querySelectorAll<HTMLElement>(".wm-char"));
    const bar = root.querySelector<HTMLElement>(".wm-bar");
    const finals = chars.map((el) => el.dataset.char ?? el.textContent ?? "");

    const settle = () => {
      chars.forEach((el, i) => {
        el.textContent = finals[i];
        el.style.opacity = "1";
      });
      if (bar) bar.style.opacity = "1";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    chars.forEach((el) => (el.style.opacity = "0"));
    if (bar) bar.style.opacity = "0";

    // Safety net: if the ticker never advances (backgrounded tab, GSAP failure),
    // show the mark anyway rather than leaving a blank hero.
    const failsafe = window.setTimeout(settle, 3200);

    const ctx = gsap.context(() => {
      const proxy = { i: 0 };
      let frame = 0;

      const tl = gsap.timeline({ delay: 0.2 });

      // Characters resolve left→right; only the ~2.5 characters at the leading
      // edge are still churning, and they fade up as they approach.
      tl.to(proxy, {
        i: chars.length,
        duration: 1.4,
        ease: "power1.inOut",
        onUpdate() {
          frame += 1;
          const swap = frame % 3 === 0; // ~20fps churn — calmer than every frame
          chars.forEach((el, idx) => {
            const d = proxy.i - idx;
            if (d >= 1) {
              if (el.textContent !== finals[idx]) el.textContent = finals[idx];
              el.style.opacity = "1";
            } else if (d > -2.5) {
              el.style.opacity = (0.18 + ((d + 2.5) / 3.5) * 0.82).toFixed(3);
              if (swap) el.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            } else {
              el.style.opacity = "0";
            }
          });
          // The underscore lights up as the decode sweeps past it (it sits
          // between "un" and "prompted", i.e. index 2).
          if (bar) bar.style.opacity = proxy.i >= 2 ? "1" : "0";
        },
        onComplete: () => {
          window.clearTimeout(failsafe);
          settle();
        },
      });
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      settle();
    };
  }, [enabled]);

  return rootRef;
}

export function Wordmark({
  size,
  className = "",
  animate = true,
  effect = "rise",
}: {
  size: number | string;
  className?: string;
  animate?: boolean;
  effect?: "rise" | "decode";
}) {
  const glitch = animate && effect === "decode";
  const rootRef = useDecodeWordmark(glitch);

  const before = "un".split("");
  const after = "prompted".split("");
  let i = 0;
  const delay = () => (animate && !glitch ? `${(i++ * 0.05).toFixed(2)}s` : "0s");
  const letterCls = glitch ? "wm-char" : animate ? "letter" : "";
  const fontSize = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      ref={rootRef}
      className={`wordmark ${className}`}
      style={{ fontSize }}
      aria-label="un_prompted"
    >
      {before.map((c, idx) => (
        <span
          key={`b${idx}`}
          className={letterCls}
          data-char={c}
          style={{ animationDelay: delay(), fontWeight: 700 }}
        >
          {c}
        </span>
      ))}
      <span
        className={glitch ? "wm-bar" : animate ? "underscore" : ""}
        style={{
          display: "inline-block",
          background: "var(--green-bright)",
          alignSelf: "flex-end",
          boxShadow: "0 0 24px rgba(52,199,89,0.6)",
          width: "0.42em",
          height: "0.11em",
          marginLeft: "0.04em",
          marginRight: "0.04em",
          marginBottom: "0.02em",
          animationDelay: delay(),
        }}
      />
      {after.map((c, idx) => (
        <span
          key={`a${idx}`}
          className={letterCls}
          data-char={c}
          style={{ animationDelay: delay() }}
        >
          {c}
        </span>
      ))}
    </span>
  );
}

/* ---------- Small inline "un_prompted" logotype (nav / footer) ---------- */
export function LogoType({ size = 22 }: { size?: number }) {
  return (
    <span
      style={{ fontFamily: SPACE, fontSize: size, letterSpacing: "-0.02em" }}
      className="text-white inline-flex items-baseline leading-none"
      aria-label="un_prompted"
    >
      <span style={{ fontWeight: 700 }}>un</span>
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

/* ---------- Craft Ventures logo ---------- */
export function CraftLogo({ width = 68, className = "" }: { width?: number; className?: string }) {
  return (
    <Image
      src={craftLogo}
      alt="Craft Ventures"
      width={width}
      height={Math.round(width * 0.146)}
      className={className}
      style={{ width, height: "auto" }}
    />
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
  padLeft = 16,
  type = "button",
}: {
  label: string;
  bg?: string;
  fontSize?: number;
  squareSize?: number;
  variant?: ArrowVariant;
  fullWidth?: boolean;
  padLeft?: number;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`arrow-btn press inline-flex items-center gap-3 ${
        fullWidth ? "w-full justify-between" : ""
      }`}
      style={{ background: bg, paddingLeft: padLeft, paddingRight: 8, paddingTop: 8, paddingBottom: 8 }}
    >
      <span
        style={{
          fontFamily: MARTIAN,
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
          width={Math.round(squareSize * 0.72)}
          height={Math.round(squareSize * 0.72)}
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
      style={{ fontFamily: MARTIAN, fontSize: 14, lineHeight: "14px", letterSpacing: "1.2px" }}
    >
      <span style={{ color: "var(--green)" }}>{num}/</span>
      <span className="text-white">{label}</span>
    </div>
  );
}

/* ---------- Big Bricolage section heading ---------- */
export function SectionHeading({
  children,
  color = "#f2f0ec",
  width,
  weight = 500,
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  width?: number;
  weight?: number;
  className?: string;
}) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: BRICOLAGE,
        fontWeight: weight,
        fontSize: 48,
        lineHeight: "52px",
        letterSpacing: "-1px",
        color,
        maxWidth: width,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}
