"use client";

import { CircleDot, Dumbbell, Goal, Trophy } from "lucide-react";
import type { CSSProperties, PointerEvent } from "react";
import { useCallback, useRef } from "react";

type PointerStyle = CSSProperties & {
  "--tilt-x"?: string;
  "--tilt-y"?: string;
};

const items = [
  {
    label: "ROX FITNESS",
    Icon: Dumbbell,
    className: "left-[5%] top-[12%] rotate-[-12deg]",
  },
  {
    label: "NEX GAMES",
    Icon: Trophy,
    className: "right-[4%] top-[18%] rotate-[10deg]",
  },
  {
    label: "SPORTS",
    Icon: Goal,
    className: "bottom-[14%] left-[11%] rotate-[8deg]",
  },
  {
    label: "INDOOR",
    Icon: CircleDot,
    className: "bottom-[10%] right-[14%] rotate-[-9deg]",
  },
];

export function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
    scene.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    scene.style.setProperty("--tilt-x", "0deg");
    scene.style.setProperty("--tilt-y", "0deg");
  }, []);

  return (
    <div
      aria-label="Rox Fitness and Nex Games product collection visual"
      className="hero-scene"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={sceneRef}
      role="img"
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as PointerStyle}
    >
      <div className="hero-orbit" />
      <div className="hero-core">
        <div className="hero-core__panel hero-core__panel--rox">
          <span>ROX</span>
          <strong>FITNESS</strong>
        </div>
        <div className="hero-core__panel hero-core__panel--nex">
          <span>NEX</span>
          <strong>GAMES</strong>
        </div>
      </div>
      {items.map(({ Icon, className, label }) => (
        <div className={`hero-float ${className}`} key={label}>
          <Icon aria-hidden="true" size={24} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
