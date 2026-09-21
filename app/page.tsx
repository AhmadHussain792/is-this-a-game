"use client";

import { useState, useEffect } from "react";
import CountdownPhase from "@/components/CountdownPhase";
import LetterPhase from "@/components/LetterPhase";
import ScrapbookPhase from "@/components/ScrapbookPhase";
import AmbientBackground from "@/components/AmbientBackground";

export type Phase = "countdown" | "letter" | "scrapbook";

// The fixed target time: 3:00 AM Hong Kong Time (UTC+8)
// This is a specific date+time the birthday content unlocks.
// September 21, 2026 at 3:00 AM HKT = September 20, 2026 at 19:00 UTC
const TARGET_ISO_UTC = "2026-09-20T20:00:00Z";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("countdown");
  const [mounted, setMounted] = useState(false);
  const [isPastTarget, setIsPastTarget] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if we're already past the target time
    const now = new Date();
    const target = new Date(TARGET_ISO_UTC);
    setIsPastTarget(now.getTime() >= target.getTime());
  }, []);

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a0b2e] via-[#2d1b4e] to-[#0d0216]">
        <div className="min-h-screen flex items-center justify-center" />
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AmbientBackground phase={phase} />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        {phase === "countdown" && (
          <CountdownPhase
            targetIso={TARGET_ISO_UTC}
            isPastTarget={isPastTarget}
            onTransitionToLetter={() => setPhase("letter")}
          />
        )}
        {phase === "letter" && (
          <LetterPhase onNext={() => setPhase("scrapbook")} />
        )}
        {phase === "scrapbook" && <ScrapbookPhase />}
      </div>
    </main>
  );
}
