import Nav from "./Nav";
import Hero from "./Hero";
import Thesis from "./Thesis";
import WhoItsFor from "./WhoItsFor";
import WhatToExpect from "./WhatToExpect";
import Speakers from "./Speakers";
import Partners from "./Partners";
import Agenda from "./Agenda";
import Apply from "./Apply";
import Footer from "./Footer";
import { SoundProvider } from "./SoundContext";

/** The full marketing site — shared by the `/home` route and the combined `/` route. */
export default function SiteContent() {
  return (
    <SoundProvider>
      <main className="page-fade-in" style={{ background: "var(--page)" }}>
        <Nav />
        <Hero />
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Thesis />
          <WhoItsFor />
          <WhatToExpect />
          <Speakers />
          <Partners />
          <Agenda />
          <Apply />
        </div>
        <Footer />
      </main>
    </SoundProvider>
  );
}
