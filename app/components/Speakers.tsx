import Image from "next/image";
import { Eyebrow } from "./shared";
import { Reveal, Stagger } from "./motion";
import speaker1 from "@/public/assets/speaker-1.png";
import speaker2 from "@/public/assets/speaker-2.png";
import speaker3 from "@/public/assets/speaker-3.png";

const SPEAKERS = [
  { img: speaker1, name: "Jeff Fluhr", title: "Co-Founder and CEO, Cognition" },
  { img: speaker2, name: "Brian Murray", title: "Co-Founder and CEO, Cognition" },
  { img: speaker3, name: "Scott Wu", title: "Co-Founder and CEO, Cognition" },
];

export default function Speakers() {
  return (
    <section
      className="max-w-[1440px] mx-auto section-x"
      style={{ paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid #252525" }}
    >
      <div className="flex flex-col gap-16">
        <Reveal className="flex flex-col gap-16">
          <Eyebrow num="04" label="Speakers" />
          <h2
            style={{
              fontFamily: "var(--font-bricolage)",
              fontWeight: 500,
              fontSize: 48,
              lineHeight: "52px",
              letterSpacing: "-0.021em",
              color: "#f2f0ec",
            }}
          >
            Speakers
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKERS.map((s) => (
            <div key={s.name} className="speaker-card">
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "442 / 450",
                  background: "linear-gradient(180deg, #b1b1b1 0%, #010101 100%)",
                }}
              >
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 442px"
                  className="speaker-photo"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="pt-6 flex flex-col gap-2 uppercase">
                <span
                  style={{
                    fontFamily: "var(--font-bricolage)",
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: "24px",
                    letterSpacing: "-0.01em",
                    color: "#fff",
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-martian)",
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#9b9ba2",
                  }}
                >
                  {s.title}
                </span>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
