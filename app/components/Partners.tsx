import Image from "next/image";
import { Eyebrow } from "./shared";
import { Reveal } from "./motion";
import kpWordmark from "@/public/assets/keypartner-wordmark.svg";
import kpMark from "@/public/assets/keypartner-mark.svg";

function PlaceholderLogo() {
  // "logoipsum"-style placeholder partner logo
  return (
    <div className="flex items-center gap-2 opacity-60" style={{ height: 24 }}>
      <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 0L26 7.5v9L13 24 0 16.5v-9L13 0z" fill="#9d9d9d" />
        <path d="M13 5l8 4.6v4.8L13 19l-8-4.6V9.6L13 5z" fill="#151515" />
      </svg>
      <span
        style={{ fontFamily: "var(--font-hanken)", fontWeight: 600, fontSize: 18, color: "#9d9d9d", letterSpacing: "-0.01em" }}
      >
        logoipsum
      </span>
    </div>
  );
}

export default function Partners() {
  return (
    <section style={{ background: "#09090a", borderBottom: "1px solid #252525" }}>
      <div className="max-w-[1440px] mx-auto section-x" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: 96 }}>
          <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col gap-6">
            <Eyebrow num="05" label="Partners" />
            <h2
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "52px",
                letterSpacing: "-0.021em",
                color: "#fff",
              }}
            >
              Our Sponsors
            </h2>
          </Reveal>

          <Reveal className="flex-1" delay={100}>
            {/* Key partner */}
            <div
              className="flex flex-col md:flex-row md:items-center gap-6"
              style={{ paddingBottom: 48, borderBottom: "1px solid #151515" }}
            >
              <span
                className="md:w-[160px]"
                style={{ fontFamily: "var(--font-hanken)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "#fff" }}
              >
                Key Partner
              </span>
              <div className="flex items-center gap-2">
                <Image src={kpWordmark} alt="LinkedIn" height={36} style={{ height: 36, width: "auto" }} />
                <Image src={kpMark} alt="" height={40} style={{ height: 40, width: "auto" }} />
              </div>
            </div>

            {/* Partners */}
            <div className="flex flex-col md:flex-row md:items-center gap-6" style={{ paddingTop: 48 }}>
              <span
                className="md:w-[160px]"
                style={{ fontFamily: "var(--font-hanken)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "#fff" }}
              >
                Partners
              </span>
              <div className="flex flex-wrap items-center gap-16">
                <PlaceholderLogo />
                <PlaceholderLogo />
                <PlaceholderLogo />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
