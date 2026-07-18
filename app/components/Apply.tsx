"use client";

import Image from "next/image";
import { Eyebrow, SectionHeading, ArrowButton, MARTIAN } from "./shared";
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
        borderBottom: "1px solid var(--gray-59)",
        fontFamily: MARTIAN,
        fontSize: 16,
        lineHeight: "22px",
      }}
    />
  );
}

export default function Apply() {
  return (
    <section id="apply" className="section-x" style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid var(--gray-3a)", overflow: "hidden" }}>
      <div className="flex flex-col lg:flex-row items-start" style={{ paddingTop: 64, paddingBottom: 64, gap: 140 }}>
        {/* Left */}
        <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="07" label="Apply" />
          <SectionHeading color="#ffffff" width={388}>
            Attendance is limited. Submit your application.
          </SectionHeading>
          <p style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", color: "#9d9d9d", margin: 0 }}>
            We&apos;ll review every submission.
            <br />
            Selected guests will be invited.
          </p>
        </Reveal>

        {/* Right — form */}
        <Reveal className="flex-1 w-full" delay={100}>
          <form className="flex flex-col" style={{ gap: 45 }} onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col" style={{ gap: 32 }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 24 }}>
                <Field placeholder="First Name" />
                <Field placeholder="Last Name" />
              </div>
              <Field placeholder="Work email" type="email" />
              <Field placeholder="Company" />
              <div
                className="field-underline flex items-center justify-between"
                style={{ paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--gray-59)" }}
              >
                <select defaultValue="" style={{ flex: 1, fontFamily: MARTIAN, fontSize: 16, color: "#9d9d9d" }}>
                  <option value="" disabled>Role</option>
                  <option value="founder">Founder</option>
                  <option value="marketing">Marketing leader</option>
                  <option value="growth">Growth practitioner</option>
                  <option value="gtm">GTM operator</option>
                  <option value="other">Other</option>
                </select>
                <Image src={chevron} alt="" width={22} height={22} />
              </div>
            </div>

            <ArrowButton label="Submit Application" fontSize={16} squareSize={28} variant="btn" fullWidth padLeft={12} />
          </form>
        </Reveal>
      </div>
    </section>
  );
}
