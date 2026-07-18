"use client";

import { useState } from "react";
import SiteContent from "./components/SiteContent";
import IntroSequence from "./components/IntroSequence";

/** Combined route — the intro animation plays over the site, then its mask
 *  wipes away to reveal the site beneath. No navigation, so scrolling and the
 *  browser back button behave normally afterwards. */
export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <SiteContent />
      {!revealed && <IntroSequence onReveal={() => setRevealed(true)} variant="simple" />}
    </>
  );
}
