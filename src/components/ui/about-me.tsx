"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface AboutCard {
  title: string;
  description: string;
  items: string[]; 
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
interface CircularTestimonialsProps {
  cards: AboutCard[];
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

export const CircularTestimonials = ({
  cards,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => cards.length, [cards]);
  const activeTestimonial = useMemo(() => cards[activeIndex], [activeIndex, cards]);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => { if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current); };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  function getBoxStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return { zIndex: 3, opacity: 1, transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    }
    if (isLeft) {
      return { zIndex: 2, opacity: 1, transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    }
    if (isRight) {
      return { zIndex: 2, opacity: 1, transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* Box Container (Menggantikan Image Container) */}
        <div className="image-container" ref={containerRef}>
          {cards.map((t, index) => (
            <motion.div
              key={index}
              className="testimonial-box"
              style={{
                ...getBoxStyle(index),
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                backgroundColor: "#987ed0",
                borderRadius: "1.5rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                cursor: "pointer"
              }}
              onClick={handleNext}
            >
              <h3 className="text-white font-bold text-xl">{t.title}</h3>
              <p className="text-white/70 text-sm mt-2">{t.items}</p>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h3 className="name" style={{ color: colorName, fontSize: fontSizeName }}>{activeTestimonial.title}</h3>
              <p className="designation" style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>{activeTestimonial.items}</p>
              <p className="quote" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>{activeTestimonial.description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="arrow-buttons">
            <button className="arrow-button" onClick={handlePrev} style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }} onMouseEnter={() => setHoverPrev(true)} onMouseLeave={() => setHoverPrev(false)}>
              <FaArrowLeft size={20} color={colorArrowFg} />
            </button>
            <button className="arrow-button" onClick={handleNext} style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }} onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}>
              <FaArrowRight size={20} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS Styles tetap sama */}
      <style>{`
        .testimonial-container { width: 100%; max-width: 56rem; padding: 2rem; }
        .testimonial-grid { display: grid; gap: 5rem; }
        .image-container { position: relative; width: 100%; height: 24rem; perspective: 1000px; }
        .arrow-buttons { display: flex; gap: 1.5rem; padding-top: 3rem; }
        .arrow-button { width: 2.7rem; height: 2.7rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; }
        @media (min-width: 768px) { .testimonial-grid { grid-template-columns: 1fr 1fr; } .arrow-buttons { padding-top: 0; } }
      `}</style>
    </div>
  );
};
export default CircularTestimonials;