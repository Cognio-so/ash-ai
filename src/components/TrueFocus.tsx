import { useEffect, useMemo, useState } from "react";

type TrueFocusProps = {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
};

export default function TrueFocus({
  sentence,
  manualMode = false,
  blurAmount = 5,
  borderColor = "#5227FF",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = useMemo(() => sentence.split(" ").filter(Boolean), [sentence]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (manualMode || words.length <= 1) return;

    const interval = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % words.length),
      (animationDuration + pauseBetweenAnimations) * 1000,
    );

    return () => window.clearInterval(interval);
  }, [animationDuration, manualMode, pauseBetweenAnimations, words.length]);

  return (
    <div
      className={`true-focus ${className}`}
      style={
        {
          "--true-focus-blur": `${blurAmount}px`,
          "--true-focus-border": borderColor,
          "--true-focus-duration": `${animationDuration}s`,
        } as React.CSSProperties
      }
    >
      {words.map((word, index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={`${word}-${index}`}
            className={`true-focus-word ${isActive ? "is-active" : ""}`}
            onMouseEnter={() => {
              if (manualMode) setActiveIndex(index);
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
