import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  random,
} from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type ParticleFlowProps = {
  theme: keyof typeof THEMES;
  particleCount: number;
  speed: number; // 0.5 = pelan, 1 = normal, 2 = cepat
  particleSize: number; // radius dasar dalam px
  direction: "up" | "down" | "diagonal";
};

export const particleFlowDefaultProps: ParticleFlowProps = {
  theme: "oceanBlue",
  particleCount: 140,
  speed: 1,
  particleSize: 6,
  direction: "up",
};

type Particle = {
  seed: number;
  x: number;
  startY: number;
  size: number;
  depth: number; // 0..1, mempengaruhi parallax + blur + opacity
};

export const ParticleFlow: React.FC<ParticleFlowProps> = ({
  theme,
  particleCount,
  speed,
  particleSize,
  direction,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0..1 sepanjang durasi, untuk seamless loop

  const themeData = THEMES[theme];

  const particles: Particle[] = useMemo(() => {
    return new Array(particleCount).fill(0).map((_, i) => {
      const seed = i * 999.37;
      return {
        seed,
        x: random(`x-${seed}`) * width,
        startY: random(`y-${seed}`) * height,
        size: particleSize * (0.4 + random(`s-${seed}`) * 1.2),
        depth: random(`d-${seed}`),
      };
    });
  }, [particleCount, width, height, particleSize]);

  const bgTop = sampleGradient(themeData.colors, t * 0.3);
  const bgBottom = themeData.background;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 20%, ${bgTop}22, ${bgBottom} 70%)`,
      }}
    >
      {particles.map((p, i) => {
        const travel = (t * speed + p.depth * 0.5) % 1;
        let dx = 0;
        let dy = 0;

        if (direction === "up") {
          dy = -travel * height * 1.2;
        } else if (direction === "down") {
          dy = travel * height * 1.2;
        } else {
          dy = -travel * height * 1.2;
          dx = travel * width * 0.3;
        }

        // wrap posisi Y supaya loop mulus (partikel yang keluar layar muncul lagi dari bawah/atas)
        let y = ((p.startY + dy) % (height + 200)) - 100;
        if (y < -100) y += height + 200;

        const x = (p.x + dx) % width;

        const twinkle = 0.5 + 0.5 * Math.sin((frame / fps) * 2 + p.seed);
        const opacity = interpolate(p.depth, [0, 1], [0.15, 0.9]) * twinkle;
        const blur = interpolate(p.depth, [0, 1], [3, 0]);
        const color = sampleGradient(themeData.colors, p.depth + t * 0.2);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.size * 2,
              height: p.size * 2,
              borderRadius: "50%",
              background: color,
              opacity,
              filter: `blur(${blur}px)`,
              boxShadow: `0 0 ${p.size * 3}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
