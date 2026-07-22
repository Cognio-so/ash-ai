import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: Transition["ease"] | "power3.out";
  splitType?: "chars" | "words";
  from?: TargetAndTransition;
  to?: TargetAndTransition;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
};

const resolveEase = (ease: SplitTextProps["ease"]): Transition["ease"] => {
  if (ease === "power3.out") return [0.22, 1, 0.36, 1];
  return ease;
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const segments = useMemo(() => {
    if (splitType === "words") return text.split(" ");
    return Array.from(text);
  }, [splitType, text]);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(current);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleComplete = (index: number) => {
    if (hasCompleted || index !== segments.length - 1) return;
    setHasCompleted(true);
    if (showCallback) onLetterAnimationComplete?.();
  };

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : undefined,
        textAlign,
      }}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="inline-block whitespace-pre will-change-[transform,opacity]"
          initial={from}
          animate={inView ? to : from}
          transition={{
            delay: (index * delay) / 1000,
            duration,
            ease: resolveEase(ease),
          }}
          onAnimationComplete={() => handleComplete(index)}
        >
          {segment}
          {splitType === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </p>
  );
}
