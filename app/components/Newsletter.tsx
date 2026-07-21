"use client";

import { useState } from "react";
import { HANKEN, MARTIAN } from "./shared";

/** Arrow matches the site's ↗ CTA glyph, but inherits colour so it can sit on
 *  a white chip (the imported arrow SVGs are hard-coded white). */
function SendArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M3.5 11.5L11.5 3.5M11.5 3.5H5.1M11.5 3.5V9.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // The arrow only appears once there's something to send.
  const ready = email.trim().length > 0;

  return (
    <div className="w-full lg:w-[443px] shrink-0 flex flex-col" style={{ gap: 15 }}>
      <p style={{ fontFamily: HANKEN, fontWeight: 500, fontSize: 24, letterSpacing: "-0.24px", lineHeight: "28px", color: "#f2f0ec", margin: 0 }}>
        Sign Up For Our Newsletter
      </p>

      {/* The box stays put; only its contents crossfade. */}
      <div className="newsletter-box">
        <div className="newsletter-swap">
          <form
            className={`newsletter-face newsletter-form ${sent ? "is-hidden" : ""}`}
            inert={sent}
            onSubmit={(e) => {
              e.preventDefault();
              if (ready) setSent(true);
            }}
          >
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              aria-label="Email address"
              style={{ flex: 1, minWidth: 0, fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", padding: "24px 0" }}
            />
            <button
              type="submit"
              className={`newsletter-send ${ready ? "is-ready" : ""}`}
              tabIndex={ready ? 0 : -1}
              aria-hidden={!ready}
              aria-label="Subscribe"
            >
              <SendArrow />
            </button>
          </form>

          <p
            className={`newsletter-face newsletter-done ${sent ? "" : "is-hidden"}`}
            aria-live="polite"
            style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", color: "var(--green-bright)", margin: 0 }}
          >
            You&apos;re on the list. Watch your inbox.
          </p>
        </div>
      </div>
    </div>
  );
}
