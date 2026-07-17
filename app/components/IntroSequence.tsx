"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "// VERIFYING INVITATION...",
  "// AUTHENTICATING ACCESS...",
  "// ESTABLISHING CONNECTION...",
  "// LOADING EVENT ENVIRONMENT...",
  "// PREPARING EXPERIENCE...",
  "// ACCESS GRANTED.",
];

/** Total wheel distance (px) that scrubs the full video. */
const SCRUB_DISTANCE = 2600;

type Phase = "boot" | "ready" | "scrub" | "reveal" | "done";

export default function IntroSequence() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [overlayLeaving, setOverlayLeaving] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [reduced, setReduced] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoReady = useRef(false);
  const phaseRef = useRef<Phase>("boot");
  phaseRef.current = phase;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setPhase("done");
    }
  }, []);

  // Page scroll stays locked until the intro fully finishes.
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Boot sequence: reveal lines one by one while the counter climbs.
  useEffect(() => {
    if (phase !== "boot") return;
    const lineTimer = setInterval(() => {
      setLineCount((n) => Math.min(n + 1, BOOT_LINES.length));
    }, 380);
    const pctTimer = setInterval(() => {
      setPercent((p) => {
        const cap = videoReady.current ? 100 : 92;
        return Math.min(p + Math.ceil(Math.random() * 4), cap);
      });
    }, 70);
    return () => {
      clearInterval(lineTimer);
      clearInterval(pctTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "boot" && lineCount === BOOT_LINES.length && percent >= 100) {
      setPhase("ready");
    }
  }, [phase, lineCount, percent]);

  const onVideoReady = () => {
    videoReady.current = true;
  };

  // The video can finish loading before hydration attaches the event
  // handlers — poll readyState so the counter never stalls.
  useEffect(() => {
    if (phase !== "boot") return;
    const id = setInterval(() => {
      const v = videoRef.current;
      if (v && v.readyState >= 3) {
        videoReady.current = true;
        clearInterval(id);
      }
    }, 200);
    return () => clearInterval(id);
  }, [phase]);

  const enter = useCallback(() => {
    if (phaseRef.current !== "ready") return;
    setOverlayLeaving(true);
    window.setTimeout(() => setPhase("scrub"), 650);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enter]);

  // Wheel / touch-driven scrub — the page itself never moves. When the
  // video hits its last frame, the mask reveal plays and the intro ends.
  useEffect(() => {
    if (phase !== "scrub") return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let target = 0;
    let current = 0;
    let finished = false;
    let touchY = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase("reveal");
      window.setTimeout(() => setPhase("done"), 1000);
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

    const advance = (deltaY: number) => {
      target = Math.min(1, Math.max(0, target + deltaY / SCRUB_DISTANCE));
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
  }, [phase]);

  if (reduced || phase === "done") return null;

  const overlayVisible = phase === "boot" || phase === "ready";

  return (
    <>
      {/* Fixed video stage — sits above the page; the hero waits beneath. */}
      <div ref={stageRef} className={`intro-stage ${phase === "reveal" ? "is-revealing" : ""}`}>
        <video
          ref={videoRef}
          src="/assets/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={onVideoReady}
          onLoadedData={onVideoReady}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Boot / loading overlay */}
      {overlayVisible && (
        <div
          className="intro-overlay"
          style={{ opacity: overlayLeaving ? 0 : 1 }}
          onClick={phase === "ready" ? enter : undefined}
        >
          <div className="intro-lines">
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <p key={line} className={`intro-line ${i === lineCount - 1 && phase === "boot" ? "is-current" : ""}`}>
                {line}
              </p>
            ))}
          </div>

          <div className="intro-center">
            {phase === "boot" ? (
              <span className="intro-counter">(&nbsp;{String(percent).padStart(2, "0")}%&nbsp;)</span>
            ) : (
              <button className="intro-enter" onClick={enter}>
                ENTER
              </button>
            )}
          </div>

          <p className="intro-status">
            {phase === "boot" ? (
              <>
                STATUS:{" "}
                <span style={{ color: "#e8ff5a" }}>WAITING&nbsp;FOR&nbsp;ACCESS.</span>
              </>
            ) : (
              <>
                STATUS: <span style={{ color: "var(--green-bright)" }}>ACCESS&nbsp;GRANTED.</span>
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
}
