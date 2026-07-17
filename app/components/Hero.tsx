import { MatrixBackground, GlowBlobs, Wordmark, ArrowButton } from "./shared";

function TerminalCard() {
  const green = "rgba(135,234,92,0.62)";
  return (
    <div
      className="w-full max-w-[640px] mx-auto"
      style={{
        border: "1px solid rgba(135,234,92,0.26)",
        background: "rgba(9,9,10,0.7)",
        boxShadow:
          "0px 24px 80px rgba(0,0,0,0.5), inset 0 0 70px rgba(135,234,92,0.05)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(135,234,92,0.18)" }}
      >
        <span className="flex gap-2">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "rgba(135,234,92,0.9)",
              boxShadow: "0 0 8px rgba(135,234,92,0.8)",
            }}
          />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "rgba(135,234,92,0.34)" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "rgba(135,234,92,0.2)" }} />
        </span>
        <span
          style={{
            fontFamily: "var(--font-space)",
            fontSize: 14,
            color: "rgba(135,234,92,0.6)",
            letterSpacing: "0.1em",
          }}
        >
          unprompted
        </span>
      </div>

      {/* Body */}
      <div className="p-4" style={{ fontFamily: "var(--font-martian)", fontSize: 14 }}>
        <p className="leading-[28px]">
          <span style={{ color: green }}>unprompted:~$ </span>
          <span style={{ color: "var(--light-green-text)" }}>event</span>
        </p>
        <p className="text-white leading-[28px]" style={{ fontSize: 16 }}>
          UNPROMPTED 2026
        </p>
        <p className="leading-[28px] mt-1">
          <span style={{ color: green }}>unprompted:~$ </span>
          <span style={{ color: "var(--light-green-text)" }}>what is unprompted?</span>
        </p>
        <p
          className="leading-[24px] mt-1"
          style={{ fontSize: 16, color: "rgba(223,251,224,0.58)" }}
        >
          Where growth leaders,
          <br />
          AI builders, and operators
          <br />
          share what&apos;s working now.
          <span className="cursor-blink" style={{ color: green }}>
            {" "}
            ▊
          </span>
        </p>

        <div className="mt-5">
          <ArrowButton label="Apply to Attend" fontSize={16} squareSize={32} variant="hero" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#09090a" }}>
      <MatrixBackground />
      <GlowBlobs />
      {/* bottom fade */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 z-[1]"
        style={{ height: 458, background: "linear-gradient(to top, #09090a, rgba(9,9,10,0))" }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Terminal */}
        <div className="section-x load-fade-up" style={{ paddingTop: 132, animationDelay: "80ms" }}>
          <TerminalCard />
        </div>

        {/* Big wordmark block */}
        <div className="section-x" style={{ paddingTop: 120, paddingBottom: 56 }}>
          <p
            className="uppercase load-fade-up"
            style={{
              fontFamily: "var(--font-martian)",
              fontSize: 16,
              color: "var(--green-bright)",
              lineHeight: "22px",
              animationDelay: "320ms",
            }}
          >
            Invite-Only Summit
          </p>
          <div className="mt-4 overflow-hidden">
            <Wordmark size={200} className="max-md:!text-[15vw]" />
          </div>
        </div>

        {/* Date / location bar */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 load-fade-up"
          style={{ borderTop: "1px solid #373737", borderBottom: "1px solid #373737", animationDelay: "460ms" }}
        >
          <div
            className="section-x"
            style={{ paddingTop: 40, paddingBottom: 40, borderLeft: "1px solid #373737" }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: "var(--font-martian)", fontSize: 16, color: "#9d9d9d", letterSpacing: "0.06em" }}
            >
              Date
            </p>
            <p className="text-white mt-3" style={{ fontSize: 20, letterSpacing: "-0.05em", lineHeight: "28px" }}>
              October 1, 2026
            </p>
          </div>
          <div
            className="section-x"
            style={{ paddingTop: 40, paddingBottom: 40, borderLeft: "1px solid #373737" }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: "var(--font-martian)", fontSize: 16, color: "#9d9d9d", letterSpacing: "0.06em" }}
            >
              Location
            </p>
            <p className="mt-3" style={{ fontSize: 20, lineHeight: "28px" }}>
              <span className="text-white">San Francisco </span>
              <span
                className="uppercase"
                style={{ fontSize: 16, color: "#9d9d9d", letterSpacing: "0.06em" }}
              >
                · venue revealed to invited guests
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
