import Image, { type StaticImageData } from "next/image";
import { Eyebrow, SectionHeading, BRICOLAGE, MARTIAN } from "./shared";
import { Reveal, Stagger } from "./motion";
import jeff from "@/public/assets/fig-speaker-jeff.png";
import brian from "@/public/assets/fig-speaker-brian.png";
import scott from "@/public/assets/fig-speaker-scott.png";
import placeholder from "@/public/assets/fig-speaker-placeholder.png";

type Speaker = { img: StaticImageData; name: string; title: string };

const ROW_1: Speaker[] = [
  { img: jeff, name: "Jeff Fluhr", title: "Co-Founder and CEO, Cognition" },
  { img: brian, name: "Brian Murray", title: "Co-Founder and CEO, Cognition" },
  { img: scott, name: "Scott Wu", title: "Co-Founder and CEO, Cognition" },
];
const ROW_2: Speaker[] = [
  { img: placeholder, name: "Name", title: "Designation" },
  { img: placeholder, name: "Name", title: "Designation" },
  { img: placeholder, name: "Name", title: "Designation" },
];

function Card({ s }: { s: Speaker }) {
  return (
    <div className="speaker-card">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "442 / 450", background: "linear-gradient(180deg, #b1b1b1 0%, #010101 100%)" }}
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
      <div className="flex flex-col uppercase" style={{ paddingTop: 24, gap: 8 }}>
        <span style={{ fontFamily: BRICOLAGE, fontWeight: 400, fontSize: 20, lineHeight: "24px", letterSpacing: "-0.2px", color: "#fff" }}>
          {s.name}
        </span>
        <span style={{ fontFamily: MARTIAN, fontSize: 14, lineHeight: "20px", color: "#9b9ba2" }}>{s.title}</span>
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <section id="speakers" className="section-x" style={{ paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid var(--gray-3a)" }}>
      <div className="flex flex-col" style={{ gap: 64 }}>
        <Reveal className="flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="04" label="Speakers" />
          <SectionHeading width={649}>Speakers</SectionHeading>
        </Reveal>

        <div className="flex flex-col" style={{ gap: 24 }}>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {ROW_1.map((s, i) => (
              <Card key={`r1-${i}`} s={s} />
            ))}
          </Stagger>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {ROW_2.map((s, i) => (
              <Card key={`r2-${i}`} s={s} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
