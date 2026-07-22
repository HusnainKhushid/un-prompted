"use client";

import Image from "next/image";
import { useState } from "react";
import { Eyebrow, SectionHeading, ArrowButton, BRICOLAGE, MARTIAN } from "./shared";
import { Reveal } from "./motion";
import chevron from "@/public/assets/chevron-down.svg";

function Field({
  placeholder,
  type = "text",
  name,
}: {
  placeholder: string;
  type?: string;
  name: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
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

/** Replaces the form once the application is in. */
function Submitted() {
  return (
    <div
      className="flex flex-col justify-center h-full apply-submitted"
      style={{ background: "#151515", padding: 32, gap: 16 }}
    >
      <p style={{ fontFamily: BRICOLAGE, fontWeight: 400, fontSize: 24, lineHeight: "28px", color: "#34c759", margin: 0 }}>
        We&apos;ve received your application for Unprompted 2026.
      </p>
      <p style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", color: "#fff", margin: 0 }}>
        Our team is reviewing submissions to curate an exceptional group of founders, operators, and AI leaders. If
        selected, you&apos;ll receive an invitation with everything you need to know.
      </p>
    </div>
  );
}

export default function Apply() {
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="apply" className="section-x" style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid var(--gray-3a)", overflow: "hidden" }}>
      <div className="flex flex-col lg:flex-row items-start" style={{ paddingTop: 64, paddingBottom: 64, gap: 140 }}>
        {/* Left */}
        <Reveal className="w-full lg:w-[443px] shrink-0 flex flex-col" style={{ gap: 32 }}>
          <Eyebrow num="07" label="Apply" />
          <SectionHeading color="#ffffff" width={388}>
            Attendance is limited.
          </SectionHeading>
          <p style={{ fontFamily: MARTIAN, fontSize: 16, lineHeight: "22px", color: "#9d9d9d", margin: 0 }}>
            We&apos;ll review every submission.
            <br />
            Selected guests will be invited.
          </p>
        </Reveal>

        {/* Right — form and confirmation share one grid cell, so the panel
            inherits the (taller) form's height and the section never jumps. */}
        <Reveal className="flex-1 w-full self-stretch" delay={100}>
          <div className="apply-swap">
            <div className={`apply-face apply-form-face ${submitted ? "is-hidden" : ""}`} inert={submitted}>
              <form
                className="flex flex-col"
                style={{ gap: 45 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="flex flex-col" style={{ gap: 32 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 24 }}>
                    <Field name="firstName" placeholder="First Name" />
                    <Field name="lastName" placeholder="Last Name" />
                  </div>
                  <Field name="email" placeholder="Work email" type="email" />
                  <Field name="company" placeholder="Company" />
                  <div
                    className="field-underline flex items-center justify-between"
                    style={{ paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--gray-59)" }}
                  >
                    {/* Grey while it still reads as a placeholder, white once chosen
                        so it matches the filled text fields above. */}
                    <select
                      name="role"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ flex: 1, fontFamily: MARTIAN, fontSize: 16, color: role ? "#fff" : "#9d9d9d" }}
                    >
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

                <ArrowButton label="Submit Application" fontSize={16} squareSize={28} variant="btn" fullWidth padLeft={12} type="submit" />
              </form>
            </div>

            <div
              className={`apply-face apply-panel-face ${submitted ? "" : "is-hidden"}`}
              aria-live="polite"
              inert={!submitted}
            >
              <Submitted />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
