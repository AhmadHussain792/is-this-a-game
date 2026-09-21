"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ScrapbookPhaseProps {}

interface Slide {
  title: string;
  caption: string;
  // CSS gradient applied to the inner image area
  gradient: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    title: "Perfect Sunset?",
    caption: "\'batman lego gif moment\'",
    gradient: "bg-gradient-to-br from-[#ff7e47] via-[#ff5e62] to-[#3d1b5e]",
    image: "/sunset.jpg",
    alt: "A perfect sunset with a breathtaking view",
  },
  {
    title: "The Odd (Right) One Out",
    caption: "\'she's different\'",
    gradient: "bg-gradient-to-br from-[#f5d68b] via-[#e6b85c] to-[#8a6a2e]",
    image: "/single_red.jpg",
    alt: "A single red flower in a field of yellow flowers",
  },
  {
    title: "Sheep in Wolf's clothing",
    caption: "\'rude on the outside but a warm spirit under the hood\'",
    gradient: "bg-gradient-to-br from-[#9E9D98] via-[#faf0bb] to-[#e8d4b0]",
    image: "/raging_cat.jpg",
    alt: "A raging cat with cuteness like you've never seen",
  },
];

export default function ScrapbookPhase({}: ScrapbookPhaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  // First, "how i see u" fades in for a brief moment, then dissolves
  // to reveal the carousel.
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(false);
    }, 2700); // title shows for ~2.8s then dissolves

    return () => clearTimeout(titleTimer);
  }, []);

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* Tell the AmbientBackground which gradient to use for this slide */}
      <SlideBackgroundSync gradient={slides[currentSlide].gradient} />

      <div className="glass-panel rounded-[2rem] px-6 sm:px-10 py-10 sm:py-14 w-full max-w-md sm:max-w-lg flex flex-col items-center min-h-[420px]">
        <AnimatePresence mode="wait">
          {showTitle ? (
            <motion.div
              key="title"
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 1.2 } }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <p className="text-white/70 text-2xl sm:text-3xl font-light italic tracking-wide">
                how i see u
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              className="flex-1 flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              {/* Image area — frameless */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className={`relative w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-2xl`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 400px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`caption-${currentSlide}`}
                  className="text-center w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-white/90 text-xl sm:text-2xl font-medium mb-2">
                    {slides[currentSlide].title}
                  </p>
                  <p className="text-white/60 text-sm sm:text-base font-light italic leading-relaxed">
                    {slides[currentSlide].caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex items-center gap-3 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-8 h-2 bg-white/70"
                        : "w-2 h-2 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next arrows */}
              <div className="flex items-center justify-between w-full mt-6">
                <button
                  onClick={goPrev}
                  className="text-white/50 hover:text-white/80 text-sm tracking-wider transition-colors duration-300"
                >
                  ← prev
                </button>
                <span className="text-white/30 text-xs tracking-widest">
                  {currentSlide + 1} / {slides.length}
                </span>
                <button
                  onClick={goNext}
                  className="text-white/50 hover:text-white/80 text-sm tracking-wider transition-colors duration-300"
                >
                  next →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// This component syncs the AmbientBackground via a custom event.
// It passes the slide's gradient string so AmbientBackground can apply it.
function SlideBackgroundSync({ gradient }: { gradient: string }) {
  useEffect(() => {
    const event = new CustomEvent("slide-change", { detail: { gradient } });
    window.dispatchEvent(event);
  }, [gradient]);

  return null;
}