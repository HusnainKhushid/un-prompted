import Image from "next/image";
import { Eyebrow, SectionHeading, MARTIAN, HANKEN } from "./shared";
import { Reveal } from "./motion";
import linkedinWord from "@/public/assets/fig-linkedin-word.svg";
import linkedinIn from "@/public/assets/fig-linkedin-in.svg";
import hubspot from "@/public/assets/fig-hubspot.svg";

function PlaceholderLogo() {
  return (
    <div className="flex items-center gap-2" style={{ height: 24, opacity: 0.85 }}>
      <svg width="24" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 0L26 7.5v9L13 24 0 16.5v-9L13 0z" fill="#CACACA" />
        <path d="M13 5l8 4.6v4.8L13 19l-8-4.6V9.6L13 5z" fill="#09090a" />
      </svg>
      <span style={{ fontFamily: HANKEN, fontWeight: 600, fontSize: 20, color: "#CACACA", letterSpacing: "-0.01em" }}>
        Logoipsum
      </span>
    </div>
  );
}

export default function Partners() {
  return (
    <section style={{ background: "var(--page)" }} className="section-x">
      <div className="flex flex-col lg:flex-row" style={{ paddingTop: 64, paddingBottom: 64, gap: 140 }}>
        <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="05" label="Partners" />
          <SectionHeading color="#ffffff">Our Sponsors</SectionHeading>
        </Reveal>

        <Reveal className="flex-1" delay={100}>
          {/* Key partner */}
          <div
            className="flex flex-col md:flex-row md:items-center"
            style={{ gap: 24, paddingBottom: 48, borderBottom: "1px solid var(--gray-3a)" }}
          >
            <span style={{ fontFamily: MARTIAN, fontSize: 24, letterSpacing: "-0.24px", lineHeight: "28px", color: "#fff", minWidth: 160 }}>
              Key Partner
            </span>
            <div className="flex items-center" style={{ gap: 8 }}>
              <Image src={linkedinWord} alt="LinkedIn" height={38} style={{ height: 38, width: "auto" }} />
              <Image src={linkedinIn} alt="" height={42} style={{ height: 42, width: "auto" }} />
            </div>
          </div>

          {/* Partners */}
          <div className="flex flex-col md:flex-row md:items-center" style={{ gap: 24, paddingTop: 48 }}>
            <span style={{ fontFamily: HANKEN, fontWeight: 500, fontSize: 24, letterSpacing: "-0.24px", color: "#fff", minWidth: 160 }}>
              Partners
            </span>
            <div className="flex flex-wrap items-center" style={{ gap: 64 }}>
              <Image src={hubspot} alt="HubSpot" height={36} style={{ height: 36, width: "auto" }} />
              <PlaceholderLogo />
              <PlaceholderLogo />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
