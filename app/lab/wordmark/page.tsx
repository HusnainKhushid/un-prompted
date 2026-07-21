"use client";

/* Scratch route — 10 entrance animations for the hero wordmark, side by side.
   Not linked from anywhere; delete once one is chosen. */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MARTIAN, HANKEN } from "../../components/shared";

const BEFORE = "un".split("");
const AFTER = "prompted".split("");
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BLOCKS = "█▓▒░";

type Ctx = {
  root: HTMLElement;
  chars: HTMLElement[];
  bar: HTMLElement;
  finals: string[];
};

type Variant = {
  id: number;
  name: string;
  note: string;
  run: (c: Ctx) => void;
};

/* ── shared helpers ───────────────────────────────────────── */
const rnd = (s: string) => s[(Math.random() * s.length) | 0];

/** Drive a per-character reveal from a single tween. `paint` decides what each
 *  character shows given how far the head has passed it. */
function sweep(
  c: Ctx,
  opts: { duration: number; ease: string; lead: number },
  paint: (el: HTMLElement, d: number, final: string, frame: number) => void,
  onDone?: () => void,
) {
  const proxy = { i: 0 };
  let frame = 0;
  gsap.to(proxy, {
    i: c.chars.length + opts.lead,
    duration: opts.duration,
    ease: opts.ease,
    onUpdate() {
      frame += 1;
      c.chars.forEach((el, idx) => paint(el, proxy.i - idx, c.finals[idx], frame));
    },
    onComplete() {
      c.chars.forEach((el, i) => {
        el.textContent = c.finals[i];
        el.style.cssText = "";
      });
      onDone?.();
    },
  });
}

const barWipe = (c: Ctx, at = 0.3, dur = 0.5) =>
  gsap.fromTo(
    c.bar,
    { scaleX: 0, transformOrigin: "left center", opacity: 1 },
    { scaleX: 1, duration: dur, ease: "power3.out", delay: at },
  );

const barPop = (c: Ctx, at = 0.4) =>
  gsap.fromTo(c.bar, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.35, ease: "back.out(3)", delay: at });

/* ── the 10 variants ──────────────────────────────────────── */
const VARIANTS: Variant[] = [
  {
    id: 1,
    name: "Scramble decode",
    note: "Currently live. Characters churn through random letters and resolve left→right; only the leading ~2.5 are still moving.",
    run: (c) => {
      gsap.set(c.chars, { opacity: 0 });
      gsap.set(c.bar, { opacity: 0 });
      barWipe(c, 0.3);
      gsap.set(c.bar, { opacity: 1, delay: 0.3 });
      sweep(c, { duration: 1.4, ease: "power1.inOut", lead: 0 }, (el, d, final, frame) => {
        if (d >= 1) {
          el.textContent = final;
          el.style.opacity = "1";
        } else if (d > -2.5) {
          el.style.opacity = String(0.18 + ((d + 2.5) / 3.5) * 0.82);
          if (frame % 3 === 0) el.textContent = rnd(GLYPHS);
        } else el.style.opacity = "0";
      });
    },
  },
  {
    id: 2,
    name: "Typewriter",
    note: "Straight terminal typing, one character at a time, with a block cursor riding the end. Most literal match for the terminal card above it.",
    run: (c) => {
      gsap.set(c.chars, { opacity: 0 });
      gsap.set(c.bar, { opacity: 0 });
      sweep(c, { duration: 1.3, ease: "none", lead: 1 }, (el, d, final) => {
        if (d >= 0) {
          el.textContent = final;
          el.style.opacity = "1";
        } else if (d > -1) {
          el.textContent = "▊";
          el.style.opacity = "1";
        } else el.style.opacity = "0";
      });
      barPop(c, 0.75);
    },
  },
  {
    id: 3,
    name: "Letter rise",
    note: "Each letter fades up from below on a 45ms stagger. The calmest option — reads as typography, not an effect.",
    run: (c) => {
      gsap.set(c.bar, { opacity: 0 });
      gsap.fromTo(
        c.chars,
        { opacity: 0, yPercent: 45 },
        { opacity: 1, yPercent: 0, duration: 0.75, ease: "power3.out", stagger: 0.045 },
      );
      barPop(c, 0.55);
    },
  },
  {
    id: 4,
    name: "Mask wipe",
    note: "A single left-to-right reveal via clip-path. No per-letter work at all — the whole mark is one moving edge.",
    run: (c) => {
      gsap.set(c.chars, { opacity: 1 });
      gsap.set(c.bar, { opacity: 1 });
      gsap.fromTo(
        c.root,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" },
      );
    },
  },
  {
    id: 5,
    name: "Blur focus",
    note: "Starts out of focus and slightly oversized, then snaps sharp. Feels like a lens finding the subject.",
    run: (c) => {
      gsap.set(c.bar, { opacity: 0 });
      gsap.fromTo(
        c.chars,
        { opacity: 0, filter: "blur(18px)", scale: 1.14 },
        { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power3.out", stagger: 0.03 },
      );
      barPop(c, 0.7);
    },
  },
  {
    id: 6,
    name: "Glitch slice",
    note: "Letters arrive already split into red/cyan channels and offset, then snap into register. Loudest option.",
    run: (c) => {
      gsap.set(c.chars, { opacity: 1 });
      gsap.set(c.bar, { opacity: 1 });
      c.root.classList.add("wml-split");
      c.chars.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: gsap.utils.random(-40, 40), skewX: gsap.utils.random(-25, 25) },
          { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: "power4.out", delay: Math.random() * 0.45 },
        );
      });
      gsap.delayedCall(1.05, () => c.root.classList.remove("wml-split"));
    },
  },
  {
    id: 7,
    name: "Underscore print",
    note: "The green underscore travels the full width first, printing each letter as it passes — the bar becomes the playhead.",
    run: (c) => {
      gsap.set(c.chars, { opacity: 0 });
      const w = c.root.offsetWidth;
      const bx = c.bar.offsetLeft;
      gsap.set(c.bar, { opacity: 1, x: -bx });
      gsap.to(c.bar, { x: w - bx - c.bar.offsetWidth, duration: 1.1, ease: "power1.inOut" });
      gsap.to(c.bar, { x: 0, duration: 0.45, ease: "power2.inOut", delay: 1.1 });
      sweep(c, { duration: 1.1, ease: "power1.inOut", lead: 0 }, (el, d, final) => {
        if (d >= 0) {
          el.textContent = final;
          el.style.opacity = "1";
        } else el.style.opacity = "0";
      });
    },
  },
  {
    id: 8,
    name: "Drop & settle",
    note: "Letters fall from above and overshoot slightly before settling. Playful — the only variant with real bounce.",
    run: (c) => {
      gsap.set(c.bar, { opacity: 0 });
      gsap.fromTo(
        c.chars,
        { opacity: 0, yPercent: -85 },
        { opacity: 1, yPercent: 0, duration: 0.9, ease: "back.out(2.2)", stagger: 0.04 },
      );
      barPop(c, 0.7);
    },
  },
  {
    id: 9,
    name: "Block boot",
    note: "Every slot fills with a solid █ first, so the mark's silhouette exists immediately, then the blocks dissolve into letters.",
    run: (c) => {
      gsap.set(c.bar, { opacity: 0 });
      c.chars.forEach((el) => {
        el.textContent = rnd(BLOCKS);
        el.style.opacity = "0";
      });
      gsap.to(c.chars, { opacity: 1, duration: 0.28, ease: "none", stagger: 0.025 });
      sweep(c, { duration: 1.5, ease: "power2.in", lead: 0 }, (el, d, final, frame) => {
        if (d >= 1) el.textContent = final;
        else if (d > -4 && frame % 4 === 0) el.textContent = rnd(BLOCKS);
      });
      barPop(c, 1.1);
    },
  },
  {
    id: 10,
    name: "Tracking expand",
    note: "Starts tightly overlapped and breathes out to final tracking while fading in. Very subtle — closest to 'no animation'.",
    run: (c) => {
      gsap.set(c.bar, { opacity: 0 });
      gsap.fromTo(
        c.root,
        { letterSpacing: "-0.34em", opacity: 0 },
        { letterSpacing: "-0.045em", opacity: 1, duration: 1.15, ease: "power3.out" },
      );
      barPop(c, 0.75);
    },
  },
];

/* ── panel ────────────────────────────────────────────────── */
function Panel({ v, nonce }: { v: Variant; nonce: number }) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [localNonce, setLocalNonce] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".wml-char"));
    const bar = root.querySelector<HTMLElement>(".wml-bar");
    if (!bar) return;
    const finals = chars.map((el) => el.dataset.char ?? "");

    // reset everything the previous run touched
    gsap.killTweensOf([...chars, bar, root]);
    root.classList.remove("wml-split");
    root.style.cssText = "";
    chars.forEach((el, i) => {
      el.style.cssText = "";
      el.textContent = finals[i];
    });
    bar.style.cssText = "";

    const ctx = gsap.context(() => v.run({ root, chars, bar, finals }), root);
    return () => ctx.revert();
  }, [v, nonce, localNonce]);

  return (
    <section className="wml-panel">
      <div className="wml-head">
        <h2>
          <span className="wml-num">{String(v.id).padStart(2, "0")}/</span> {v.name}
        </h2>
        <button onClick={() => setLocalNonce((n) => n + 1)}>↻ replay</button>
      </div>
      <p className="wml-note">{v.note}</p>
      <div className="wml-stage">
        <span ref={rootRef} className="wml-mark" aria-label="un_prompted">
          {BEFORE.map((ch, i) => (
            <span key={`b${i}`} className="wml-char" data-char={ch} style={{ fontWeight: 700 }}>
              {ch}
            </span>
          ))}
          <span className="wml-bar" />
          {AFTER.map((ch, i) => (
            <span key={`a${i}`} className="wml-char" data-char={ch}>
              {ch}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}

export default function WordmarkLab() {
  const [nonce, setNonce] = useState(0);
  const replayAll = useCallback(() => setNonce((n) => n + 1), []);

  return (
    <main className="wml-page">
      <header className="wml-top">
        <div>
          <h1>Hero wordmark — 10 entrance animations</h1>
          <p>
            Real Space Mono at hero proportions. Each panel replays on its own; 01 is what ships today. Tell me the
            number(s) you want and I&apos;ll wire it into the hero.
          </p>
        </div>
        <button onClick={replayAll}>↻ replay all</button>
      </header>

      <div className="wml-grid">
        {VARIANTS.map((v) => (
          <Panel key={v.id} v={v} nonce={nonce} />
        ))}
      </div>
    </main>
  );
}
