import { useRef, useState, type ReactNode } from "react";

type LensProps = {
  children: ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
  className?: string;
};

export default function Lens({
  children,
  zoomFactor = 2,
  lensSize = 150,
  isStatic = false,
  ariaLabel = "Zoom area",
  className = "",
}: LensProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(isStatic);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || isStatic) return;

    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={`lens-root relative h-full w-full overflow-hidden ${className}`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(isStatic)}
      onPointerMove={handlePointerMove}
      style={
        {
          "--lens-x": `${position.x}%`,
          "--lens-y": `${position.y}%`,
          "--lens-size": `${lensSize}px`,
          "--lens-zoom": zoomFactor,
        } as React.CSSProperties
      }
    >
      <div className="lens-base h-full w-full">{children}</div>
      <div className={`lens-magnifier ${active ? "is-active" : ""}`} aria-hidden="true">
        <div className="lens-magnified h-full w-full">{children}</div>
      </div>
    </div>
  );
}
