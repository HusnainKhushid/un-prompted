import IntroSequence from "../components/IntroSequence";

/** Animation-only route (depth variant) — holds on the final frame. */
export default function AnimationPage() {
  return (
    <main style={{ minHeight: "100svh", background: "#000" }}>
      <IntroSequence variant="depth" />
    </main>
  );
}
