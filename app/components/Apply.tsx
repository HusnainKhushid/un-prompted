"use client";

import Image from "next/image";
import { Eyebrow, ArrowButton } from "./shared";
import { Reveal } from "./motion";
import chevron from "@/public/assets/chevron-down.svg";

function Field({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: "100%",
        paddingTop: 24,
        paddingBottom: 24,
        borderBottom: "1px solid #595959",
        fontFamily: "var(--font-martian)",
        fontSize: 16,
      }}
    />
  );
}

export default function Apply() {
  return (
    <section style={{ background: "rgba(0,0,0,0.3)", overflow: "hidden" }} id="apply">
      <div className="max-w-[1440px] mx-auto section-x" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: 96 }}>
          {/* Left */}
          <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col gap-6">
            <Eyebrow num="07" label="Apply" />
            <h2
              className="max-w-[388px]"
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "52px",
                letterSpacing: "-0.021em",
                color: "#fff",
              }}
            >
              Attendance is limited. Submit your application.
            </h2>
            <p
              style={{ fontFamily: "var(--font-martian)", fontSize: 16, lineHeight: "22px", color: "#9d9d9d" }}
            >
              We&apos;ll review every submission.
              <br />
              Selected guests will be invited.
            </p>
          </Reveal>

          {/* Right — form */}
          <Reveal className="flex-1" delay={100} as="div">
          <form className="flex flex-col" style={{ gap: 45 }} onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field placeholder="First Name" />
              <Field placeholder="Last Name" />
            </div>
            <Field placeholder="Work email" type="email" />
            <Field placeholder="Company" />

            <div
              className="flex items-center justify-between"
              style={{ paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid #595959" }}
            >
              <select defaultValue="" style={{ flex: 1, fontFamily: "var(--font-martian)", fontSize: 16, color: "#9d9d9d" }}>
                <option value="" disabled>
                  Role
                </option>
                <option value="marketing">Marketing leader</option>
                <option value="growth">Growth leader</option>
                <option value="founder">Founder</option>
                <option value="gtm">GTM operator</option>
                <option value="other">Other</option>
              </select>
              <Image src={chevron} alt="" width={22} height={22} />
            </div>

            <div className="pt-2">
              <ArrowButton label="Submit Application" fontSize={16} squareSize={28} variant="btn" fullWidth />
            </div>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
