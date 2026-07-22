import Image, { type StaticImageData } from "next/image";
import { Eyebrow, SectionHeading, BRICOLAGE, MARTIAN } from "./shared";
import { Reveal, Stagger } from "./motion";
import amjad from "@/public/assets/speaker-amjad.png";
import amjadHover from "@/public/assets/speaker-amjad-hover.png";
import michael from "@/public/assets/speaker-michael.png";
import michaelHover from "@/public/assets/speaker-michael-hover.png";
import sarika from "@/public/assets/speaker-sarika.png";
import sarikaHover from "@/public/assets/speaker-sarika-hover.png";

type Speaker = {
  img: StaticImageData;
  /** Green matrix-tinted variant shown on hover. */
  hover: StaticImageData;
  name: string;
  title: string;
};

const SPEAKERS: Speaker[] = [
  { img: amjad, hover: amjadHover, name: "Amjad Masad", title: "Founder, Replit" },
  { img: michael, hover: michaelHover, name: "Michael Grinich", title: "Founder, WorkOS" },
  { img: sarika, hover: sarikaHover, name: "Sarika Garg", title: "GM, HubSpot" },
];

const SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 442px";

function Card({ s }: { s: Speaker }) {
  return (
    <div className="speaker-card">
      {/* Black, not the Figma frame's white: these photos are near-black at the
          edges, so a white backdrop shows as a bright seam wherever the image
          isn't painting — while loading, or along a composite edge. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "442 / 450", background: "#000" }}
      >
        <Image
          src={s.img}
          alt={s.name}
          fill
          sizes={SIZES}
          className="speaker-photo"
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
        />
        <Image
          src={s.hover}
          alt=""
          aria-hidden
          fill
          sizes={SIZES}
          className="speaker-photo speaker-photo-hover"
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
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
    <section id="speakers" className="section-x" style={{ background: "#000", paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid var(--gray-3a)" }}>
      <div className="flex flex-col" style={{ gap: 64 }}>
        <Reveal className="flex flex-col" style={{ gap: 24 }}>
          <Eyebrow num="04" label="Featured Speakers" />
          <SectionHeading width={719}>World-Class AI Founders, Builders, Executives & Operators</SectionHeading>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
          {SPEAKERS.map((s) => (
            <Card key={s.name} s={s} />
          ))}
        </Stagger>

        <Reveal>
          <SectionHeading width={719} size={36}>
            Many more being announced soon...
          </SectionHeading>
        </Reveal>
      </div>
    </section>
  );
}
