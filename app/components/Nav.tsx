import Image from "next/image";
import craftLogo from "@/public/assets/craft-logo.svg";
import { LogoType, ArrowButton } from "./shared";

const NAV_ITEMS = ["Thesis", "Who its for", "Program", "Speakers", "Apply"];

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        height: 69,
        padding: "16px 32px",
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Left lockup */}
      <div className="flex items-center gap-3">
        <div style={{ borderRight: "0.5px solid rgba(255,255,255,0.5)", paddingRight: 12 }}>
          <LogoType size={20} />
        </div>
        <div className="flex items-center gap-2">
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-martian)",
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "-0.05em",
            }}
          >
            presented by
          </span>
          <Image src={craftLogo} alt="Craft Ventures" height={10} style={{ height: 10, width: "auto" }} />
        </div>
      </div>

      {/* Center nav */}
      <div className="hidden lg:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href="#"
            className="nav-link uppercase text-white/90 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-martian)", fontSize: 14, lineHeight: "18px" }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right button */}
      <ArrowButton label="Apply to Attend" fontSize={14} squareSize={26} variant="nav" />
    </nav>
  );
}
