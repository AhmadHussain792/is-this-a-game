"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface LetterPhaseProps {
  onNext: () => void;
}

// The letter content — each string is a line that fades in sequentially.
// The final line is the grand "Happy Birthday" wish.
const letterLines: string[] = [
  "Hey eshaal,",
  "",
  "Another year together yet it feels like yesterday",
  "when we sat at the quadrangle, you telling me about your favorite music",
  "and about the little things that annoyed you today,",
  "",
  "You were always such a character",
  "kind, funny, and cuteness-overloaded",
  "meeting you felt like taking the freshest breath on the countryside",
  "the most calmest and exciting experience ever,",
  "",
"There's so much I want to tell you",
  "but words always feel too small",
  "for what you mean to me.",
  "",
  "Though this year has not been easy to say the least",
  "I hope the next one greets you more gently",
  "",
  "Happy Birthday",
];

export default function LetterPhase({ onNext }: LetterPhaseProps) {
  const [showNext, setShowNext] = useState(false);

  // Each line fades in with a stagger. The total time depends on the
  // number of lines and the delay between each.
  const lineDelay = 1.5; // seconds between each line
  const lineDuration = 1.8; // fade-in duration per line

  // The "Next" button appears after the final line has fully appeared
  const totalLetterTime = letterLines.length * lineDelay + lineDuration;

  // Auto-reveal the Next button after all lines have appeared
  // Using a motion callback instead to time it precisely

  return (
    <motion.div
      className="glass-panel rounded-[2rem] px-8 sm:px-16 py-12 sm:py-16 w-full max-w-lg sm:max-w-2xl flex flex-col items-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30, transition: { duration: 1.5 } }}
    >
      <motion.div
        className="flex flex-col items-center gap-1 text-center w-full"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: lineDelay,
            },
          },
        }}
        initial="hidden"
        animate="show"
        onAnimationComplete={() => setShowNext(true)}
      >
        {letterLines.map((line, index) => {
          const isFinalWish = index === letterLines.length - 1;
          return (
            <motion.p
              key={index}
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: lineDuration, ease: "easeOut" },
                },
              }}
              className={
                isFinalWish
                  ? "text-white text-3xl sm:text-4xl font-medium mt-4 glow-text"
                  : line === ""
                  ? "h-2"
                  : "text-white/85 text-lg sm:text-xl font-light leading-relaxed"
              }
            >
              {line === "" ? "\u00A0" : line}
            </motion.p>
          );
        })}
      </motion.div>

      {/* Next button */}
      <motion.button
        onClick={onNext}
        className="mt-10 mb-2 text-white/60 hover:text-white/90 text-sm tracking-[0.2em] uppercase font-light transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: showNext ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        style={{ pointerEvents: showNext ? "auto" : "none" }}
      >
        next →
      </motion.button>
    </motion.div>
  );
}
