import IntroSequence from "./components/IntroSequence";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Thesis from "./components/Thesis";
import WhoItsFor from "./components/WhoItsFor";
import WhatToExpect from "./components/WhatToExpect";
import Speakers from "./components/Speakers";
import Partners from "./components/Partners";
import Agenda from "./components/Agenda";
import Apply from "./components/Apply";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#09090a" }}>
      <IntroSequence />
      <Nav />
      <Hero />
      <Thesis />
      <WhoItsFor />
      <WhatToExpect />
      <Speakers />
      <Partners />
      <Agenda />
      <Apply />
      <Footer />
    </main>
  );
}
