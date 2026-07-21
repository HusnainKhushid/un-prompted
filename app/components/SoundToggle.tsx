"use client";

import Image from "next/image";
import soundIcon from "@/public/assets/icon-sound.svg";
import { MARTIAN } from "./shared";
import { useSound } from "./SoundContext";

/** "SOUND ((•))" pill — sits next to the nav CTA (Figma 9887:6167). */
export default function SoundToggle() {
  const { on, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute sound" : "Unmute sound"}
      className="sound-toggle press inline-flex items-center justify-center"
      style={{
        gap: 6.8,
        /* 26px arrow square + 8px padding top/bottom = the nav CTA's height */
        height: 42,
        padding: "0 12px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(2.5px)",
        WebkitBackdropFilter: "blur(2.5px)",
      }}
    >
      <span
        style={{
          fontFamily: MARTIAN,
          fontSize: 14,
          lineHeight: "18px",
          textTransform: "uppercase",
          color: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        Sound
      </span>
      <span
        className={`sound-toggle-icon ${on ? "is-on" : ""}`}
        style={{ width: 20, height: 20, display: "block", position: "relative" }}
      >
        <Image src={soundIcon} alt="" width={20} height={20} />
      </span>
    </button>
  );
}
