"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface TeamSectionProps {
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const TeamSection = ({
  autoplay = true,
  colors = {},
  fontSizes = {},
}: TeamSectionProps) => {
  // Fetch team members from Supabase
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase.from('team_members').select('*');
      if (error) throw error;
      return data;
    },
  });

  // Map Supabase data to TeamMember format
  const members: TeamMember[] = teamMembers?.map((member) => ({
    quote: member.bio,
    name: member.name,
    designation: member.role,
    src: member.photo_url || 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })) || [];

  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const membersLength = useMemo(() => members.length, [members]);
  const activeMember = useMemo(
    () => members[activeIndex],
    [activeIndex, members]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay && membersLength > 0) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % membersLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, membersLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, membersLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % membersLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [membersLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + membersLength) % membersLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [membersLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + membersLength) % membersLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + membersLength) % membersLength === index;
    const isRight = (activeIndex + 1) % membersLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background" id="team-section">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">Meet Our Team</h2>
          <div className="py-20 text-xl text-gray-500">Loading team members...</div>
        </div>
      </section>
    );
  }

  if (!membersLength) {
    return null;
  }

  return (
    <section className="py-24 bg-background" id="team-section">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 text-center mb-20 max-w-2xl mx-auto">
          Say hello to our young, passionate team and instructors — the kind of teachers who make you say "Ohh now I get it."
        </p>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Images */}
            <div className="relative w-full h-96 flex items-center justify-center self-center" ref={imageContainerRef}>
              {members.map((member, index) => (
                <img
                  key={member.src}
                  src={member.src}
                  alt={member.name}
                  className="rounded-2xl shadow-lg absolute object-cover w-80 h-96 transition-all duration-700"
                  data-index={index}
                  style={getImageStyle(index)}
                />
              ))}
            </div>
            {/* Content */}
            <div className="flex flex-col items-center md:items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={quoteVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <h3
                    className="font-bold mb-1"
                    style={{ color: colorName, fontSize: fontSizeName }}
                  >
                    {activeMember.name}
                  </h3>
                  <p
                    className="mb-4 text-gray-500"
                    style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                  >
                    {activeMember.designation}
                  </p>
                  <motion.p
                    className="mb-6 text-lg"
                    style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                  >
                    {activeMember.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.22,
                          ease: "easeInOut",
                          delay: 0.025 * i,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-4 mt-6 justify-center w-full">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-blue-500 transition-colors"
                  onClick={handlePrev}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  aria-label="Previous team member"
                >
                  <FaArrowLeft size={22} color={colorArrowFg} />
                </button>
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-blue-500 transition-colors"
                  onClick={handleNext}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  aria-label="Next team member"
                >
                  <FaArrowRight size={22} color={colorArrowFg} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 