"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

function useInView<T extends HTMLElement>(rootMargin = "0px 0px -80px 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io: IntersectionObserver | undefined;

    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
      cleanup();
    };

    // Fallback: reveal once the element is within the viewport.
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) reveal();
    };

    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
    const onScroll = () => check();

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { threshold: 0.12, rootMargin },
      );
      io.observe(el);
    }

    // Immediate check (above-the-fold) + scroll/resize safety net so content
    // is never left permanently hidden if the observer doesn't deliver.
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return cleanup;
  }, [rootMargin]);

  return { ref, inView };
}

type MotionProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** delay in ms before this block reveals */
  delay?: number;
  style?: React.CSSProperties;
  id?: string;
};

/** Fades + rises a block into place once it scrolls into view. */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  style,
  id,
}: MotionProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      className: `reveal ${inView ? "is-visible" : ""} ${className}`.trim(),
      style: delay ? { ...style, transitionDelay: `${delay}ms` } : style,
    },
    children,
  );
}

/** Same as Reveal, but its direct children cascade in with a stagger. */
export function Stagger({
  children,
  as = "div",
  className = "",
  style,
  id,
}: MotionProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      className: `stagger ${inView ? "is-visible" : ""} ${className}`.trim(),
      style,
    },
    children,
  );
}
