import { useEffect, useMemo, useState } from "react";

type TextTypeProps = {
  text?: string | string[];
  texts?: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  cursorBlinkDuration?: number;
};

const randomSpeed = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function TextType({
  text,
  texts,
  className = "",
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
}: TextTypeProps) {
  const phrases = useMemo(() => {
    const source = texts?.length ? texts : Array.isArray(text) ? text : text ? [text] : [""];
    return source.length ? source : [""];
  }, [text, texts]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex] ?? "";

    if (isPaused) {
      const timeout = window.setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(phrases.length > 1);
      }, pauseDuration);
      return () => window.clearTimeout(timeout);
    }

    if (!isDeleting && displayText === phrase) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % phrases.length);
      return;
    }

    const speed = isDeleting
      ? deletingSpeed
      : variableSpeedEnabled
        ? randomSpeed(variableSpeedMin, variableSpeedMax)
        : typingSpeed;

    const timeout = window.setTimeout(() => {
      setDisplayText((current) =>
        isDeleting ? current.slice(0, -1) : phrase.slice(0, current.length + 1),
      );
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    isPaused,
    pauseDuration,
    phraseIndex,
    phrases,
    typingSpeed,
    variableSpeedEnabled,
    variableSpeedMax,
    variableSpeedMin,
  ]);

  return (
    <p className={className} aria-label={phrases.join(" ")}>
      <span aria-hidden="true">{displayText}</span>
      {showCursor && (
        <span
          aria-hidden="true"
          className="text-type-cursor"
          style={{ animationDuration: `${cursorBlinkDuration}s` }}
        >
          {cursorCharacter}
        </span>
      )}
    </p>
  );
}
