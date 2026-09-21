"use client";

import { useEffect, useState } from "react";

export type Phase = "countdown" | "letter" | "scrapbook";

// Each phase has its own color palette
const phaseGradients: Record<string, string> = {
  countdown: "bg-gradient-to-b from-[#1a0b2e] via-[#2d1b4e] to-[#0d0216]",
  letter: "bg-gradient-to-b from-[#3d1b2e] via-[#6b2d4e] to-[#1a0b2e]",
  scrapbook: "bg-gradient-to-b from-[#2d1b4e] via-[#3d2b5e] to-[#1a0b2e]",
};

// Each scrapbook slide now carries its own gradient in ScrapbookPhase,
// so we no longer need a separate array here. The gradient is passed
// via the "slide-change" custom event.

interface AmbientBackgroundProps {
  phase: Phase;
}

export default function AmbientBackground({
  phase,
}: AmbientBackgroundProps) {
  const [gradient, setGradient] = useState(phaseGradients["countdown"]);
  const [slideGradient, setSlideGradient] = useState<string | null>(null);

  // Listen for slide change events from the ScrapbookPhase
  // The event carries the slide's own gradient string
  useEffect(() => {
    const handleSlideChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.gradient === "string") {
        setSlideGradient(detail.gradient);
      }
    };
    window.addEventListener("slide-change", handleSlideChange);
    return () => window.removeEventListener("slide-change", handleSlideChange);
  }, []);

  useEffect(() => {
    if (phase === "scrapbook" && slideGradient) {
      setGradient(slideGradient);
    } else {
      setGradient(phaseGradients[phase]);
    }
  }, [phase, slideGradient]);

  return (
    <div
      className={`fixed inset-0 transition-all duration-[3000ms] ease-in-out ${gradient}`}
    />
  );
}
