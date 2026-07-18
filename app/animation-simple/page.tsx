import IntroSequence from "../components/IntroSequence";

/** Animation-only route (simple / no-depth variant) — holds on the final frame. */
export default function AnimationSimplePage() {
  return (
    <main style={{ minHeight: "100svh", background: "#000" }}>
      <IntroSequence variant="simple" />
    </main>
  );
}
