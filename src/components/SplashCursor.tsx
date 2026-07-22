import { useEffect, useRef } from "react";

type SplashCursorProps = {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
  SHADING?: boolean;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: number;
};

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized,
    16,
  );

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export default function SplashCursor({
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  COLOR_UPDATE_SPEED = 10,
  SHADING = true,
  RAINBOW_MODE = false,
  COLOR = "#7C3AED",
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = performance.now();
    let hue = 265;
    const particles: Particle[] = [];
    const color = hexToRgb(COLOR);
    const pressureScale = Math.max(0.05, PRESSURE);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addSplat = (x: number, y: number, movementX: number, movementY: number) => {
      const speed = Math.hypot(movementX, movementY) || 1;
      const count = Math.min(12, Math.max(4, Math.round(pressureScale * 42)));
      const baseRadius = Math.max(18, Math.min(width, height) * SPLAT_RADIUS * 0.12);

      for (let index = 0; index < count; index += 1) {
        const angle = Math.atan2(movementY, movementX) + (Math.random() - 0.5) * Math.PI * 1.3;
        const force = (SPLAT_FORCE / 1100) * (0.45 + Math.random() * 0.85) + speed * 0.08;
        particles.push({
          x: x + (Math.random() - 0.5) * baseRadius,
          y: y + (Math.random() - 0.5) * baseRadius,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          radius: baseRadius * (0.55 + Math.random() * 0.95),
          alpha: 0.22 + pressureScale * 0.72,
          hue,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      addSplat(event.clientX, event.clientY, event.movementX, event.movementY);
    };

    const onPointerDown = (event: PointerEvent) => {
      addSplat(event.clientX, event.clientY, 18, -12);
    };

    const animate = (time: number) => {
      const delta = Math.min(0.033, (time - lastTime) / 1000);
      lastTime = time;
      hue = (hue + COLOR_UPDATE_SPEED * delta * 12) % 360;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        const curlX = -particle.vy * CURL * 0.012;
        const curlY = particle.vx * CURL * 0.012;

        particle.vx = (particle.vx + curlX) * Math.exp(-VELOCITY_DISSIPATION * delta);
        particle.vy = (particle.vy + curlY) * Math.exp(-VELOCITY_DISSIPATION * delta);
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.radius *= 1 + delta * 0.65;
        particle.alpha -= delta * DENSITY_DISSIPATION * 0.22;

        if (particle.alpha <= 0.01 || particle.radius <= 1) {
          particles.splice(index, 1);
          continue;
        }

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius,
        );
        const particleColor = RAINBOW_MODE
          ? `hsla(${particle.hue}, 88%, 62%, ${particle.alpha})`
          : `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.alpha})`;
        const edgeColor = RAINBOW_MODE
          ? `hsla(${particle.hue}, 88%, 62%, 0)`
          : `rgba(${color.r}, ${color.g}, ${color.b}, 0)`;

        gradient.addColorStop(0, SHADING ? "rgba(255, 255, 255, 0.36)" : particleColor);
        gradient.addColorStop(0.2, particleColor);
        gradient.addColorStop(1, edgeColor);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [
    COLOR,
    COLOR_UPDATE_SPEED,
    CURL,
    DENSITY_DISSIPATION,
    PRESSURE,
    RAINBOW_MODE,
    SHADING,
    SPLAT_FORCE,
    SPLAT_RADIUS,
    VELOCITY_DISSIPATION,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply"
    />
  );
}
