"use client";

import { createContext, useCallback, useContext, useState } from "react";

type SoundState = { on: boolean; toggle: () => void };

const SoundCtx = createContext<SoundState>({ on: false, toggle: () => {} });

/** Site-wide sound switch — the nav toggle drives the hero loop's audio. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return <SoundCtx.Provider value={{ on, toggle }}>{children}</SoundCtx.Provider>;
}

export function useSound() {
  return useContext(SoundCtx);
}
