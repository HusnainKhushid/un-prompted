import { Eyebrow, ArrowButton } from "./shared";
import { Reveal } from "./motion";

export default function Thesis() {
  return (
    <section
      className="max-w-[1440px] mx-auto section-x"
      style={{ paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid #252525" }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <Reveal className="shrink-0">
          <Eyebrow num="01" label="The Thesis" />
        </Reveal>
        <Reveal className="w-full md:max-w-[793px] flex flex-col gap-16" delay={80}>
          <h2
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 400,
              fontSize: 36,
              lineHeight: "42px",
              letterSpacing: "-0.028em",
              color: "#f1f4f6",
            }}
          >
            Growth marketing is being rewritten. Most teams haven&apos;t noticed yet.
            <br />
            <br />
            AI, LLMs, GEO, agents, and new systems are reshaping how teams acquire,
            convert, and retain customers — fast. The playbooks that worked in 2023 are
            already overhead. Unprompted brings together the people building and adapting
            to that shift, for one day of deep, tactical, high-signal conversation.
          </h2>
          <div>
            <ArrowButton label="Apply to Attend" bg="#24ad49" fontSize={16} squareSize={28} variant="btn" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
