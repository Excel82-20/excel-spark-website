import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";

const images = [
  "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop",
  // Add more institute images here
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pause, setPause] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    drag: true,
    mode: "free-snap",
    renderMode: "performance",
    defaultAnimation: {
      duration: 1600,
      easing: t => 1 - Math.pow(1 - t, 3), // easeOutCubic
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      s.container.addEventListener("mouseover", () => setPause(true));
      s.container.addEventListener("mouseout", () => setPause(false));
    },
    destroyed() {
      setPause(false);
    },
  });

  // Autoplay effect with smooth timing
  useEffect(() => {
    if (!slider) return;
    if (pause) return;
    timer.current = setInterval(() => {
      slider.current?.next();
    }, 10000);
    return () => timer.current && clearInterval(timer.current);
  }, [slider, pause]);

  return (
    <section id="hero-section" className="relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Full-bleed Image Slider */}
      <div
        ref={sliderRef}
        className="keen-slider absolute inset-0 w-full h-full min-h-[500px] z-0"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        onFocus={() => setPause(true)}
        onBlur={() => setPause(false)}
      >
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide w-full h-full relative">
            <img
              src={src}
              alt={`Excel Institute ${idx + 1}`}
              className={`object-cover w-full h-full min-h-[500px] transition-transform duration-[1200ms] ease-in-out ${currentSlide === idx ? 'animate-hero-zoom' : ''}`}
            />
            {/* Cinematic gradient overlays with smooth transitions */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent transition-opacity duration-[1200ms] ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent transition-opacity duration-[1200ms] ease-in-out" />
          </div>
        ))}
      </div>

      {/* Minimal Overlay Content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-start z-10 px-4 md:px-24"
      >
        <div className="relative max-w-2xl w-full py-12 md:py-0">
          <h1 className="text-white mb-6 text-left tracking-tight leading-tight">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium block mb-2">Welcome to</span>
            <GradientText
              colors={["#ffffff", "#9ca3af", "#ffffff"]}
              animationSpeed={6}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold inline-block"
            >
              Excel Institute
            </GradientText>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-10 text-left font-normal">
          At Excel Institute, we don’t just teach — we explain, support, and help you grow with real skills you can use in school, work, and life.
          </p>
          <motion.a
            href="#courses-section"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent border border-white/60 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button content */}
            <span className="flex items-center gap-2">
              Explore Courses
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.a>
        </div>
      </motion.div>

      {/* Minimal Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full border border-white focus:outline-none transition-all duration-300 ease-out
              ${currentSlide === idx ? "bg-white border-white scale-110" : "bg-white/40"}
            `}
            onClick={() => slider.current?.moveToIdx(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;