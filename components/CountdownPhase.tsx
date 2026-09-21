"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownPhaseProps {
  targetIso: string;
  isPastTarget: boolean;
  onTransitionToLetter: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

export default function CountdownPhase({
  targetIso,
  isPastTarget,
  onTransitionToLetter,
}: CountdownPhaseProps) {
  const targetDate = new Date(targetIso);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );
  const [timerDissolved, setTimerDissolved] = useState(false);
  const breathingDelayRef = useRef(false);

  // Countdown tick
  useEffect(() => {
    // If past target, we skip straight to the breathing delay -> letter
    if (isPastTarget) {
      // 3-4 second ambient breathing delay before the letter begins
      const delay = 3500; // 3.5 seconds
      setTimerDissolved(true);
      const timer = setTimeout(() => {
        onTransitionToLetter();
      }, delay);
      return () => clearTimeout(timer);
    }

    // Otherwise, run the countdown
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft(targetDate);
      setTimeLeft(newTime);

      if (newTime.total <= 0) {
        clearInterval(interval);
        // Numbers dissolve, then breathing delay, then transition to letter
        setTimerDissolved(true);
        const delay = 3000; // 3-second breathing delay
        const transitionTimer = setTimeout(() => {
          onTransitionToLetter();
        }, delay);
        return () => clearTimeout(transitionTimer);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPastTarget, onTransitionToLetter, targetDate]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <motion.div
      className="glass-panel rounded-[2rem] px-8 sm:px-16 py-12 sm:py-16 w-full max-w-md sm:max-w-lg flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.p
        className="text-white/40 text-xs sm:text-sm uppercase tracking-[0.3em] font-light mb-8 sm:mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        something special awaits
      </motion.p>

      <div className="flex items-center gap-2 sm:gap-4">
        <AnimatePresence>
          {!timerDissolved ? (
            <motion.div
              key="timer"
              className="flex items-center gap-2 sm:gap-4"
              exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 2 } }}
            >
              <TimeUnit value={pad(timeLeft.hours)} label="hours" />
              <Colon />
              <TimeUnit value={pad(timeLeft.minutes)} label="minutes" />
              <Colon />
              <TimeUnit value={pad(timeLeft.seconds)} label="seconds" />
            </motion.div>
          ) : (
            <motion.div
              key="breathing"
              className="flex items-center justify-center h-[72px] sm:h-[96px] w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3, 0.5, 0.3] }}
              transition={{ duration: 3.5, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity }}
            >
              <div className="w-3 h-3 rounded-full bg-white/30" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white/90 text-4xl sm:text-6xl font-light tabular-nums tracking-tight">
        {value}
      </span>
      <span className="text-white/30 text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-2">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span className="text-white/30 text-3xl sm:text-5xl font-light pb-4 animate-pulse">
      :
    </span>
  );
}
