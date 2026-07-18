"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "// VERIFYING INVITATION...",
  "// AUTHENTICATING ACCESS...",
  "// ESTABLISHING CONNECTION...",
  "// LOADING EVENT ENVIRONMENT...",
  "// RESERVING YOUR SEAT...",
  "// PREPARING EXPERIENCE...",
  "// ACCESS GRANTED.",
];
const N = BOOT_LINES.length;

const LINE_H = 40;
const SCRUB_DISTANCE = 2600;
const LOAD_DURATION = 3400; // ms for the loader to fill

type Phase = "loading" | "enter" | "scrub" | "reveal" | "held";
type Variant = "depth" | "simple";

function lineOpacity(d: number): number {
  if (d === 0) return 1;
  if (d < 0) return Math.max(0, 0.42 + d * 0.2);
  return Math.max(0, 0.55 - d * 0.2);
}

export default function IntroSequence({
  onReveal,
  variant = "depth",
}: {
  onReveal?: () => void;
  variant?: Variant;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [active, setActive] = useState(0);
  const [percent, setPercent] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoReady = useRef(false);
  const progress = useRef(0);
  const phaseRef = useRef<Phase>("loading");
  phaseRef.current = phase;

  const videoSrc = variant === "simple" ? "/assets/hero-v2-noreveal.mp4" : "/assets/hero-v2.mp4";

  // Reduced motion → skip to reveal / final frame.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (onReveal) onReveal();
      else setPhase("held");
    }
  }, [onReveal]);

  // Lock scroll while running.
  useEffect(() => {
    const locked = phase !== "held";
    document.body.style.overflow = locked ? "hidden" : "";
    if (locked) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Smooth progress-driven loader: one clock drives both the counter and the
  // conveyor so they finish together.
  useEffect(() => {
    if (phase !== "loading") return;
    const TICK = 40;
    const id = setInterval(() => {
      const cap = videoReady.current ? 1 : 0.9;
      progress.current = Math.min(cap, progress.current + TICK / LOAD_DURATION);
      const p = progress.current;
      setActive(Math.min(N - 1, Math.round(p * (N - 1))));
      setPercent(Math.min(100, Math.round(p * 100)));
    }, TICK);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "loading" && active === N - 1 && percent >= 100) {
      const t = window.setTimeout(() => setPhase("enter"), 560);
      return () => clearTimeout(t);
    }
  }, [phase, active, percent]);

  const onVideoReady = () => {
    videoReady.current = true;
    const v = videoRef.current;
    if (v && v.currentTime === 0) v.currentTime = 0.01; // force frame-1 paint
  };
  useEffect(() => {
    if (phase !== "loading") return;
    const id = setInterval(() => {
      const v = videoRef.current;
      if (v && v.readyState >= 2) {
        videoReady.current = true;
        clearInterval(id);
      }
    }, 150);
    return () => clearInterval(id);
  }, [phase]);

  const startScrub = useCallback((withAudio: boolean) => {
    const v = videoRef.current;
    if (v) {
      v.muted = !withAudio;
      v.volume = withAudio ? 1 : 0;
      v.pause();
      v.currentTime = 0;
    }
    setScrolled(false);
    setPhase("scrub");
  }, []);

  const replay = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    videoReady.current = true;
    progress.current = 0;
    setActive(0);
    setPercent(0);
    setPhase("loading");
  }, []);

  // Scroll / touch scrub → reveal at the last frame.
  useEffect(() => {
    if (phase !== "scrub") return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let target = 0;
    let current = 0;
    let finished = false;
    let hinted = false;
    let touchY = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (onReveal) {
        setPhase("reveal");
        window.setTimeout(onReveal, 620);
      } else {
        setPhase("held");
      }
    };
    const apply = (lerp: number) => {
      current += (target - current) * lerp;
      if (Math.abs(target - current) < 0.0005) current = target;
      const dur = video.duration;
      if (dur && Number.isFinite(dur)) {
        const t = current * (dur - 0.05);
        if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
      }
      if (current >= 0.999) finish();
    };
    const advance = (dy: number) => {
      if (!hinted && Math.abs(dy) > 0) {
        hinted = true;
        setScrolled(true);
      }
      target = Math.min(1, Math.max(0, target + dy / SCRUB_DISTANCE));
      apply(0.3);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0].clientY;
      advance((touchY - y) * 2.2);
      touchY = y;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      apply(0.16);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase, onReveal]);

  const loaderVisible = phase === "loading" || phase === "enter";
  const leaving = phase === "enter";

  return (
    <>
      {/* Fixed stage — the variant-specific video (frozen at frame 1 during load) */}
      <div className={`intro-stage ${phase === "reveal" ? "is-fading" : ""}`}>
        <video
          ref={videoRef}
          className="intro-v2"
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          onLoadedData={onVideoReady}
          onCanPlay={onVideoReady}
        />
      </div>

      {/* Loader / enter overlay */}
      {loaderVisible && (
        <div className="intro-overlay">
          {/* Boot log conveyor through the fixed highlight bar */}
          <div className={`intro-lines ${leaving ? "is-out" : ""}`}>
            <div className="intro-lines-track" style={{ transform: `translateY(${-active * LINE_H}px)` }}>
              {BOOT_LINES.map((line, i) => {
                const d = i - active;
                return (
                  <p
                    key={line}
                    className={`intro-line ${d === 0 ? "is-current" : ""}`}
                    style={{ height: LINE_H, opacity: lineOpacity(d) }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Status — mid right */}
          <p className={`intro-status ${leaving ? "is-out" : ""}`}>
            STATUS:
            <br />
            {leaving ? (
              <span style={{ color: "var(--green-bright)" }}>ACCESS&nbsp;GRANTED.</span>
            ) : (
              <span style={{ color: "#e8ff5a" }}>
                WAITING&nbsp;FOR&nbsp;ACCESS
                <span className="intro-dots" aria-hidden>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </span>
            )}
          </p>

          {/* Counter → morphs into the enter gate at 100% */}
          <div className="intro-bottom">
            {phase === "loading" && (
              <span className="intro-counter">(&nbsp;{String(percent).padStart(2, "0")}%&nbsp;)</span>
            )}
            {phase === "enter" && (
              <>
                <span className="intro-counter is-morphing">(&nbsp;100%&nbsp;)</span>
                <div className="intro-gate">
                  <button className="intro-audio-btn" onClick={() => startScrub(true)}>
                    ENTER WITH AUDIO
                    <span aria-hidden className="intro-audio-arrow">↳</span>
                  </button>
                  <button className="intro-nosound" onClick={() => startScrub(false)}>
                    ENTER WITHOUT SOUND
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Scroll prompt after entering */}
      {phase === "scrub" && (
        <div className={`intro-scrollhint ${scrolled ? "is-hidden" : ""}`} aria-hidden>
          <span className="intro-scrollhint-arrow">↓</span>
          SCROLL TO CONTINUE
        </div>
      )}

      {phase === "held" && (
        <button className="intro-replay" onClick={replay}>
          ↻&nbsp;&nbsp;REPLAY
        </button>
      )}
    </>
  );
}
