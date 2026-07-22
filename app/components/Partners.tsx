import Image from "next/image";
import { Eyebrow, SectionHeading, HANKEN } from "./shared";
import { Reveal } from "./motion";
import linkedinWord from "@/public/assets/fig-linkedin-word.svg";
import linkedinIn from "@/public/assets/fig-linkedin-in.svg";
import clay from "@/public/assets/partner-clay.png";
import hubspot from "@/public/assets/fig-hubspot.svg";

/** One partner tier: label on the left, logos on the right. */
function Tier({
  label,
  children,
  first,
  divider,
}: {
  label: string;
  children: React.ReactNode;
  first?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className="flex flex-col md:flex-row md:items-center w-full"
      style={{
        gap: 24,
        /* Uniform 48px above and below every logo band, so the bands sit at an
           equal pitch and the divider lands midway between the first two. */
        paddingTop: first ? 0 : 48,
        paddingBottom: 48,
        /* box-shadow rather than border: it paints the same 1px rule without
           adding to the row's height, keeping the pitch exactly even. */
        boxShadow: divider ? "0 1px 0 var(--gray-3a)" : undefined,
      }}
    >
      <span
        className="shrink-0"
        style={{ fontFamily: HANKEN, fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", lineHeight: "28px", color: "#fff", width: 125 }}
      >
        {label}
      </span>
      {/* Fixed band height keeps the pitch even even though the logos differ
          in height (LinkedIn 42, Clay 50, HubSpot 36). */}
      <div className="flex flex-wrap items-center flex-1" style={{ gap: 64, minHeight: 50 }}>
        {children}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section style={{ background: "var(--page)" }} className="section-x">
      <div className="flex flex-col lg:flex-row" style={{ paddingTop: 64, paddingBottom: 64, gap: 140 }}>
        <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="05" label="Our Partners" />
          <SectionHeading color="#ffffff" width={383}>
            Partnering with Leading Products & Brands
          </SectionHeading>
        </Reveal>

        <Reveal className="flex-1 flex flex-col" delay={100}>
          <Tier label="Marquee" first divider>
            <span className="flex items-center" style={{ gap: 8 }}>
              <Image src={linkedinWord} alt="LinkedIn" height={38} style={{ height: 38, width: "auto" }} />
              <Image src={linkedinIn} alt="" height={42} style={{ height: 42, width: "auto" }} />
            </span>
          </Tier>

          <Tier label="Premium">
            <Image src={clay} alt="Clay" height={50} style={{ height: 50, width: "auto" }} />
          </Tier>

          <Tier label="Brand">
            <Image src={hubspot} alt="HubSpot" height={36} style={{ height: 36, width: "auto" }} />
          </Tier>
        </Reveal>
      </div>
    </section>
  );
}
